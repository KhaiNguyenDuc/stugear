<?php

namespace App\Http\Controllers;

use App\Repositories\Notification\NotificationRepositoryInterface;
use Illuminate\Http\Request;
use App\Util\AppConstant;
use App\Util\AuthService;
use Carbon\Carbon;

class NotificationController extends Controller
{
    protected $notificationRepository;

    public function __construct(NotificationRepositoryInterface $notificationRepository) {
        $this->notificationRepository = $notificationRepository;
    }

    public function getAll(Request $request) {
        $limit = $request->limit ?? 5;
        $notifications = $this->notificationRepository->getAll($limit);
        $data = [];
        $memberData = [];
        $countNotificationPerPage = 0;
        foreach ($notifications as $notification) {
            $countNotificationPerPage++;
            $memberData['id'] = $notification->id;
            $memberData['user_id'] = $notification->user_id;
            $memberData['content'] = $notification->content;
            $memberData['type'] = $notification->type;
            $memberData['updated_at'] = $notification->updated_at;
            $memberData['link'] = $notification->type . '/' . $notification->target_id . '/';
            array_push($data, $memberData);
        }
        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data,
            'page' => $request->page ?? 1,
            'total_items' => $countNotificationPerPage,
            'total_pages' => $notifications->lastPage(),
            'total_in_all_page' => $notifications->total()
        ]);
    }

    public function getNotificationByCurrentUser(Request $request)
    {
        $limit = $request->limit ?? 5;
        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);
        Carbon::setLocale('vi');
        $notifications = $this->notificationRepository->getByCurrentUser($userId, $limit);
        $data = [];
        $memberData = [];
        $countNotificationPerPage = 0;
        
        foreach ($notifications as $notification) {  
            $countNotificationPerPage++;
            $memberData['id'] = $notification->id;
            $memberData['user_id'] = $notification->user_id;
            $memberData['content'] = $notification->content;
            $memberData['image'] = $notification->image;
            $memberData['target_id'] = $notification->target_id;
            $memberData['title'] = $notification->title;
            $memberData['type'] = $notification->type;
            $memberData['updated_at'] = Carbon::parse($notification->updated_at)->diffForHumans(Carbon::now());
            $memberData['interact_user'] = $notification->interact_user;
            $memberData['link'] = $notification->type . '/' . $notification->target_id . '/';
            array_push($data, $memberData);
        }
        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data,
            'page' => $request->page ?? 1,
            'total_items' => $countNotificationPerPage,
            'total_pages' => $notifications->lastPage(),
            'total_in_all_page' => $notifications->total()
        ]);
    }

}
