<?php

namespace App\Http\Controllers;

use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Tag\TagRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Util\AppConstant;
use Illuminate\Http\Request;
use App\Util\AuthService;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class ReplyController extends Controller
{

    protected $threadRepository;
    protected $userRepository;
    protected $tagRepository;

    protected $replyRepository;
    public function __construct(
        ThreadRepositoryInterface $threadRepository,
        UserRepositoryInterface $userRepository,
        TagRepositoryInterface $tagRepository,
        ReplyRepositoryInterface $replyRepository,

    ) {
        $this->threadRepository = $threadRepository;
        $this->userRepository = $userRepository;
        $this->tagRepository = $tagRepository;
        $this->replyRepository = $replyRepository;
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

        $data = [];
        $memberData = [];
        foreach ($replies as $reply) {
            $memberData['id'] = $reply->id;
            $memberData['user'] =  $this->userRepository->getById($reply->user_id);
            $memberData['create_at'] = Carbon::parse($reply->created_at)->diffForHumans(Carbon::now());
            $memberData['total_like'] = $reply->total_like;
            $memberData['total_dislike'] = $reply->total_dislike;
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

        // $validator = Validator::make($request->all(), [
        //     'product_id' => 'required|integer|min:1',
        //     'parent_id' => 'required|integer|min:0',
        //     'reply_on' => 'required|integer|min:0',
        //     'rating' => 'required|integer|between:0,5'
        // ]);

        // if ($validator->fails()) {
        //      return response()->json(['error' => $validator->errors()], 400);
        // }

        // if ($request->content == '') {
        //     return response()->json([
        //         'status' => 'Lỗi',
        //         'message' => 'Nội dung comment không thể rỗng'
        //     ], 400);
        // }

        // if ($request->parent_id != 0 && $request->rating != 0) {
        //     return response()->json([
        //         'status'=> 'Lỗi',
        //         'message' => 'Khi reply không được rating'
        //     ], 400);
        // }

        // if ($request->parent_id == 0 && $request->rating == 0) {
        //     return response()->json([
        //         'status'=> 'Lỗi',
        //         'message' => 'Khi comment phải rating, chỉ reply comment là không rating!'
        //     ], 400);
        // }

        // $this->ratingRepository->rating($request->product_id, $request->rating, $userId);

        // $result = $this->commentRepository->save([
        //     'content' => $request->input('content'),
        //     'owner_id' => $userId,
        //     'parent_id' => $request->input('parent_id'),
        //     'product_id' => $request->input('product_id'),
        //     'reply_on' => $request->input('reply_on'),
        //     'vote' => 0,
        //     'rating_id' => $request->input('rating'),
        //     'created_by' => $userId,
        //     'updated_by' => $userId,
        //     'created_at' => Carbon::now(),
        //     'updated_at'=> Carbon::now()
        // ]);

        // if ($result) {
        //     return response()->json([
        //         'status'=> 'Thành công',
        //         'message' => 'Comment thành công',
        //     ]);
        // } else {
        //     return response()->json([
        //         'status'=> 'Thất bại',
        //         'message' => 'Comment thất bại',
        //     ],400);
        // }
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
}
