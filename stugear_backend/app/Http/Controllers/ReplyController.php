<?php

namespace App\Http\Controllers;

use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Tag\TagRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Util\AppConstant;
use Illuminate\Http\Request;

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
            $memberData['create_at'] = $reply->created_at;
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

    public function create(Request $request)
    {
        // validate thread_id, do not reply deleted thread

        // validate content, if it is bad word, return error, minus point

        // find @ to space, cut it, it is username that reply is reply on, if not move to step 4

        // find that user by username, if not reply_on = 0

        // insert into DB, if not reply any reply, parent_id = 0

        // return result
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

    public function delete(Request $request)
    {
        // validate authenticaion, if not owner of reply or admin or owner thread, return error

        // update deleted in DB

        // return result
    }
}
