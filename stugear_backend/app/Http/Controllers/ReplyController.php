<?php

namespace App\Http\Controllers;

use App\Models\React;
use App\Repositories\React\ReactRepositoryInterface;
use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Tag\TagRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Util\AppConstant;
use Illuminate\Http\Request;
use App\Util\AuthService;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
class ReplyController extends Controller
{

    protected $threadRepository;
    protected $userRepository;
    protected $tagRepository;
    protected $reactRepository;
    protected $replyRepository;
    public function __construct(
        ThreadRepositoryInterface $threadRepository,
        UserRepositoryInterface $userRepository,
        TagRepositoryInterface $tagRepository,
        ReplyRepositoryInterface $replyRepository,
        ReactRepositoryInterface $reactRepository,

    ) {
        $this->threadRepository = $threadRepository;
        $this->userRepository = $userRepository;
        $this->tagRepository = $tagRepository;
        $this->replyRepository = $replyRepository;
        $this->reactRepository = $reactRepository;
    }

    public function getReplyByThreadId(Request $request, $threadId)
    {
        Carbon::setLocale('vi');
        $limit = $request->limit ?? 10;
        $filter = $request->filter ?? '' ;
        $replies = $this->replyRepository->getReplyByThreadIdWithFilter(
            $threadId,
            $limit,
            AppConstant::$FILTER_REPLY[$filter] ?? $filter
        );

        $token = $request->header();
        if($token['authorization'][0] != "Bearer null"){
            $bareToken = substr($token['authorization'][0], 7);
            $userId = AuthService::getUserId($bareToken);
        }else{
            $userId = null;
        }

        $data = [];
        
        foreach ($replies as $reply) {
            $memberData = [];
            $memberData['id'] = $reply->id;
            if($userId){
                $react = $this->reactRepository->getByUserAndReply($userId, $reply->id);
                if($react){
                    $memberData['is_like'] = $react->like === 1 ? true : false;
                }

               
            }
            $memberData['user'] =  $this->userRepository->getById($reply->user_id);
            $memberData['create_at'] = Carbon::parse($reply->created_at)->diffForHumans(Carbon::now());
            $memberData['like'] = $reply->like;
            $memberData['dislike'] = $reply->dislike;
            $memberData['content'] = $reply->content;
            if ($reply->parent_id != 0) {
                $parentComment = $this->replyRepository->getById($reply->parent_id);
                $memberData['reply_on'] = $parentComment;
            }

            if ($reply->reply_on != 0) {
                $user = $this->userRepository->getById($reply->reply_on);
                $memberData['reply_on']["user"] = $user;
            }

            $memberData['thread_id'] = $reply->thread_id;
            array_push($data, $memberData);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data,
            'page' => $request->page ?? 1,
            'total_page' => $replies->lastPage(),
            'total_items' => count($replies)
        ]);


    }

    public function getAIByThreadId($threadId)
    {
        Carbon::setLocale('vi');
        $data  = [];
        $reply = $this->replyRepository->getAIReplyByThreadId($threadId);
        if($reply){
            $data['user'] =  $this->userRepository->getById($reply->user_id);
            $data['create_at'] = Carbon::parse($reply->created_at)->diffForHumans(Carbon::now());
            $data['content'] = $reply->content;
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy dữ liệu thành công',
                'data' => $data
            ]);
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'not found thread for this user or user not login'
            ], 404);
        }


    }

    public function create(Request $request, $threadId)
    {
        // validate thread_id, do not reply deleted thread

        // validate content, if it is bad word, return error, minus point

        // find @ to space, cut it, it is username that reply is reply on, if not move to step 4

        // find that user by username, if not reply_on = 0

        // insert into DB, if not reply any reply, parent_id = 0

        // return result
        $thread = $this->threadRepository->getById($threadId);
        if (!$thread) {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Thread này đã bị xóa!'
            ], 400);
        }

        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);

        $validator = Validator::make($request->all(), [
            'raw_content' => 'required|string',
            'content' => 'required|string'
        ]);


        if ($validator->fails()) {
             return response()->json(['error' => $validator->errors()], 400);
        }

        if ($request->content == '') {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Nội dung thread reply không thể rỗng'
            ], 400);
        }


        $result = $this->replyRepository->save([
            'content' => $request->input('content'),
            'raw_content' => $request->input('raw_content'),
            'user_id' => $userId,
            'parent_id' => $request->input('parent_id'), // id of reply
            'thread_id' => $threadId,
            'reply_on' => $request->input('reply_on'), // id of user has parent reply
            'created_by' => $userId,
            'updated_by' => $userId,
            'created_at' => Carbon::now(),
            'updated_at'=> Carbon::now()
        ]);

        if ($result) {
            return response()->json([
                'status'=> 'Thành công',
                'message' => 'Reply thread thành công',
            ]);
        } else {
            return response()->json([
                'status'=> 'Thất bại',
                'message' => 'Reply thread thất bại',
            ],400);
        }
    }

    public function update(Request $request)
    {
        // validate authenticaion, if not owner of reply, return error

        // validate content, if it is bad word, return error, minus point

        // find @ to space, cut it, it is username that reply is reply on, if not move to step 4

        // find that user by username, if not reply_on = 0

        // update into DB, if not reply any reply, parent_id = 0

        // return result
    }

    public function delete(Request $request, $replyId)
    {
        // validate authenticaion, if not owner of reply or admin or owner thread, return error
        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);
        $reply = $this->replyRepository->getById($replyId);
        $thread = $this->threadRepository->getById($reply->thread_id);
        $role = DB::table('user_roles')
        ->where('user_id', $userId)
        ->join('roles', 'user_roles.role_id', '=', 'roles.id')
        ->pluck('roles.role_name')
        ->toArray();
        if (!$reply) {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Reply này đã bị xóa!'
            ], 400);
        }
        // dd(($userId != $thread->user_id));
        if (($reply->user_id == $userId) || ($userId == $thread->user_id) || in_array('ADMIN', $role)) {
            // update deleted in DB
            $result = $this->replyRepository->save([
                'deleted_by' => $userId,
                'deleted_at' => Carbon::now()
            ], $replyId);
            // return result
            if ($result) {
                return response()->json([
                    'status'=> 'Thành công',
                    'message' => 'Xóa reply thành công',
                ]);
            } else {
                return response()->json([
                    'status'=> 'Thất bại',
                    'message' => 'Xóa reply thất bại',
                ],400);
            }
        } else {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Chỉ có Admin, chủ thread và chủ reply được phép xóa!'
            ], 400);
        }
    }

    public function reactByReplyAndUser(Request $request, $replyId) {
        $validator = Validator::make($request->all(), [
            'like' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);

        $likeArray = [true, false];


        if (!in_array($request->like, $likeArray))
        {
            return response()->json([
                'status'=> 'Lỗi',
                'message' => 'React không được',
            ], 400);
        }

        $reply = $this->replyRepository->getById($replyId);
        $react = $this->reactRepository->getByUserAndReply($userId, $replyId);
        if($react != null){
            if($react->like == true && $request->like == true){
                return response()->json([
                    'status'=> 'Lỗi',
                    'message' => 'react không được',
                ], 400);
            }else if($react->like == false && $request->like == false){
                return response()->json([
                    'status'=> 'Lỗi',
                    'message' => 'react không được',
                ], 400);
            }
            // if it has already react, for each swap, reduce the other
            if ($request->like == true) {
                $reply->increment('like');
                $reply->decrement('dislike');
                $react->like = true;
            }
    
            if ($request->like == false) {
                $reply->increment('dislike');
                $reply->decrement('like');
                $react->like = false;
            }
        }else{
            $react = new React();
            $react->user_id = $userId;
            $react->reply_id = intval($replyId);
            // if new, then just increase or decrease
            if ($request->like == true) {
                $reply->increment('like');
                $react->like = true;
            }
    
            if ($request->like == false) {
                $reply->increment('dislike');
                $react->like = false;
            }
        }

       
        $result = $this->reactRepository->save([
            'reply_id' => $react->reply_id,
            'user_id' => $react->user_id,
            'like' => $react->like
        ], $react->id);
        logger()->info('React retrieved:', [$react]);
        if ($result)
        {
            return response()->json([
                'status'=> 'Thành công',
                'message'=> 'React thành công',
            ]);
        } else {
            return response()->json([
                'status'=> 'Thất bại',
                'message'=> 'React thất bại'
            ]);
        }
    }
}
