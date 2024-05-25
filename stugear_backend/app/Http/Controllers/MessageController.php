<?php

namespace App\Http\Controllers;

use App\Events\Message;
use Illuminate\Http\Request;
use App\Util\AuthService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use App\Repositories\Message\MessageRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Util\AppConstant;

class MessageController extends Controller
{
    protected $messageRepository;
    protected $userRepository;

    public function __construct(
        MessageRepositoryInterface $messageRepository,
        UserRepositoryInterface $userRepository
    ) {
        Carbon::setLocale('vi');
        $this->messageRepository = $messageRepository;
        $this->userRepository = $userRepository;
    }



    public function sendMessage(Request $request, $roomId)
    {
        $sender_id = $request->sender_id;
        $receiver_id = $request->receiver_id;
        Carbon::setLocale('vi');
        event(new Message($sender_id, $receiver_id, $request->content, Carbon::now()));

        $this->messageRepository->save([
            'room' => $roomId,
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'content' => $request->content,
            'created_by' => $sender_id,
            'updated_by' => $sender_id,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // lưu message vô database
        return response()->json([
            'status' => 'Thành công',
            'message' => 'Gửi tin nhắn thành công',
            'data' => [
                'sender_id' => $sender_id,
                'receiver_id' => $receiver_id,
                'content' => $request->content
            ]
        ]);
    }

    public function show(Request $request, $roomId) {
        $messages = $this->messageRepository->getFullMessagesByRoomId($roomId);

        $id = Auth::guard('web')->id();

        $currentPeopleId = str_replace(strval($id), '', strval($roomId));

        $currentPeople = $this->userRepository->getById($currentPeopleId);
        $currentPeopleInfo = $this->userRepository->getContactDetail($currentPeopleId);
        if ($currentPeople->image_id == null) {
            if (!isset($currentPeopleInfo->gender) || $currentPeopleInfo->gender == 0 || $currentPeopleInfo->gender == null) {
                $image = AppConstant::$AVATAR_MALE;
            } else {
                $image = AppConstant::$AVATAR_FEMALE;
            }
        } else {
            $image = AppConstant::$DOMAIN . 'api/users/' . $currentPeople->id . '/images';
        }
        $listPeople = $this->messageRepository->getListChat($id);
        $data = [];
        $memberData = [];
        foreach ($listPeople as $people) {
            if ($people->sender_id == $id) {
                $userId = $people->receiver_id;
            } else {
                $userId = $people->sender_id;
            }
            $user = $this->userRepository->getById($userId);
            $userInfo = $this->userRepository->getContactDetail($userId);
            $memberData['room'] = $people->room;
            $memberData['username'] = $user->name;
            if ($user->image_id == null) {
                if (!isset($userInfo->gender) || $userInfo->gender == 0 || $userInfo->gender == null) {
                    $memberData['image'] = AppConstant::$AVATAR_MALE;
                } else {
                    $memberData['image'] = AppConstant::$AVATAR_FEMALE;
                }
            } else {
                $memberData['image'] = AppConstant::$DOMAIN . 'api/users/' . $user->id . '/images';
            }
            $memberData['content'] = $people->content;
            $memberData['time'] = $people->created_at->format("H:i, d/m/Y");
            array_push($data, $memberData);
        }


        return view('welcome', [
            'id' => $id,
            'messagePasts' => $messages,
            'listPeople' => $data,
            'currentRoomId' => $roomId,
            'currentPeopleImage' => $image
        ]);
    }

    public function loginUISSR() {
        return view('loginSSR');
    }

    public function loginSSR(Request $request)
    {
        $credential = [
            'email' => $request->email,
            'password' => $request->password
        ];
        $remember = $request->remember ?? false;
        if (Auth::guard('web')->attempt($credential, $remember)) {
            return Auth::guard('web')->id();
        }
        return 222;
    }

    // tạo function show UI chat, dùng vue 1 phần để load chat

    // tạo function get room, load all message
}
