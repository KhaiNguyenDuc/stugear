<?php

namespace App\Http\Controllers;

use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Tag\TagRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Repositories\Category\CategoryRepositoryInterface;
use App\Util\AuthService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
            $memberData['category'] = $this->categoryRepository->getCategoryById($thread->category_id);
            $memberData['user_id'] = $thread->user_id;
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
            $data['dislike'] = $thread->dislike;
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

    // public function create(Request $request)
    // {
  
    //     $validator = Validator::make($request->all(), [
    //         'title' => 'required|string',
    //         'description' => 'required|string',
    //         'raw_content' => 'required|string',
    //         'product_link' => 'required|string',
    //         'tags' => 'array',
    //         'category_id' => 'required|integer|min:1',
    //         'content' => 'required|string',
    //     ]);

    //     if ($validator->fails()) {
    //          return response()->json(['error' => $validator->errors()], 400);
    //     }

    //     $token = $request->header();
    //     $bareToken = substr($token['authorization'][0], 7);
    //     $userId = AuthService::getUserId($bareToken);

    //     $user = $this->userRepository->getById($userId);
    //     if ($user->reputation < 0) {
    //         return response()->json([
    //             'status' => 'Lỗi',
    //             'message' => 'Không cho phép tạo bài đăng vì uy tín thấp!'
    //         ],400);
    //     }

    //     // 'title' => 'required|string',
    //     // 'description' => 'required|string',
    //     // 'raw_content' => 'required|string',
    //     // 'product_link' => 'required|string',
    //     // 'tags' => 'array',
    //     // 'category_id' => 'required|integer|min:1',
    //     // 'content' => 'required|string',

    //     $data = [
    //         'title' => $request->title,
    //         'description' => $request->description,
    //         'condition' => strval($request->condition),
    //         'raw_content' => $request->raw_content,
    //         'category_id' => $request->category_id,
    //         // 'tags' =>
    //         'created_at' => Carbon::now(),
    //         'created_by' => $userId,
    //         'updated_at' => Carbon::now(),
    //         'updated_by' => $userId,
    //     ];
    //     $product = $this->threadRepository->save($data);

    //     // for ($i = 1; $i<=5; $i++) {
    //     //     DB::table('rating_products')->insert([
    //     //         'product_id'=> $product->id,
    //     //         'rating_id' => $i,
    //     //         'quantity' => 0,
    //     //         'created_at' => Carbon::now(),
    //     //         'created_by' => $userId,
    //     //         'updated_at' => Carbon::now(),
    //     //         'updated_by' => $userId
    //     //     ]);
    //     // }

    //     if (!$product) {
    //         return response()->json([
    //             'status' => 'fail',
    //             'message' => 'Tạo sản phẩm thất bại',
    //         ], 400);
    //     } else {
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Tạo sản phẩm thành công',
    //             'data' => $product
    //         ]);
    //     }
    // }

}
