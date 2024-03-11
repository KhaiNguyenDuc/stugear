<?php

namespace App\Http\Controllers;

use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Tag\TagRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
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
        $replies = $this->replyRepository->getReplyByThreadId($threadId, $limit);

        $data = [];
        $memberData = [];
        foreach ($replies as $reply) {
            $memberData['id'] = $reply->id;
            $memberData['user'] =  $this->userRepository->getById($reply->user_id);
            $memberData['create_at'] = $reply->created_at;
            $memberData['like'] = $reply->like;
            $memberData['dislike'] = $reply->dislike;
            $memberData['content'] = $reply->content;
            if ($reply->parent_id != 0) {
                $parentComment = $this->replyRepository->getById($reply->id);
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
            'page' => $request->page,
            'total_page' => $replies->lastPage(),
            'total_items' => count($replies)
        ]);

        
    }
}
