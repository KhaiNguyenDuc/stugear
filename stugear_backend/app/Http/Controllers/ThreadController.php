<?php

namespace App\Http\Controllers;

use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Tag\TagRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Repositories\Category\CategoryRepositoryInterface;
use Illuminate\Http\Request;

class ThreadController extends Controller
{

    protected $threadRepository;
    protected $userRepository;
    protected $tagRepository;
    protected $categoryRepository;

    protected $replyRepository;
    public function __construct(
        ThreadRepositoryInterface $threadRepository,
        UserRepositoryInterface $userRepository,
        TagRepositoryInterface $tagRepository,
        ReplyRepositoryInterface $replyRepository,
        CategoryRepositoryInterface $categoryRepository

    ) {
        $this->threadRepository = $threadRepository;
        $this->userRepository = $userRepository;
        $this->tagRepository = $tagRepository;
        $this->replyRepository = $replyRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function index(Request $request)
    {
        $limit = $request->limit ?? 10;
        $threads = $this->threadRepository->getAll($limit);

        $data = [];
        $memberData = [];
        foreach ($threads as $thread) {
            $memberData['id'] = $thread->id;
            $memberData['title'] = $thread->title;
            $memberData['description'] = $thread->description;
            $memberData['content'] = $thread->content;
            $memberData['view'] = $thread->view;
            $memberData['like'] = $thread->like;
            $memberData['reply'] = $thread->reply;
            $memberData['total_like'] = $thread->total_like;
            $memberData['total_dislike'] = $thread->total_dislike;
            $memberData['category'] = $this->categoryRepository->getCategoryById($thread->category_id);
            $memberData['user_id'] = $thread->user_id;
            $memberData['total_like'] = $thread->total_like;
            $memberData['user'] = $this->userRepository->getById($thread->user_id);
            $threadTags = $thread->threadTags;
            $tags = [];
            foreach ($threadTags as $threadTag) {
                $tagMember['id'] = $threadTag->tag_id;
                $tagMember['name'] = $threadTag->tag->name;
                $tagMember['color'] = $threadTag->tag->color;
                array_push($tags, $tagMember);
            }
            $memberData['tags'] = $tags;
            array_push($data, $memberData);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data,
            'page' => $request->page,
            'total_page' => $threads->lastPage(),
            'total_items' => count($threads)
        ]);
    }

    public function view($id)
    {
            
        $thread = $this->threadRepository->getById($id);
        if (!$thread) {
            return response()->json([
                'status' => 'error',
                'message' => 'not found thread'
            ], 404);
        } else {
            $data = [];
            $data['id'] = $thread->id;
            $data['title'] = $thread->title;
            $data['description'] = $thread->description;
            $data['content'] = $thread->content;
            $data['view'] = $thread->view;
            $data['like'] = $thread->like;
            $data['reply'] = $thread->reply;
            $data['total_like'] = $thread->total_like;
            $data['total_dislike'] = $thread->total_dislike;
            $data['category'] = $this->categoryRepository->getCategoryById($thread->category_id);
            $data['user_id'] = $thread->user_id;
            $data['total_like'] = $thread->total_like;
            $data['user'] = $this->userRepository->getById($thread->user_id);
            $threadTags = $thread->threadTags;
            $tags = [];
            foreach ($threadTags as $threadTag) {
                $tagMember['id'] = $threadTag->tag_id;
                $tagMember['name'] = $threadTag->tag->name;
                $tagMember['color'] = $threadTag->tag->color;
                array_push($tags, $tagMember);
            }
            $data['tags'] = $tags;
        }


        return response()->json([
            'status' => 'success',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data
        ]);
    }
}
