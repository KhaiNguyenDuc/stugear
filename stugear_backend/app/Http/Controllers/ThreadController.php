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
        $tag = $request->tag ?? '';
        $status = $request->status ?? '';
        $key = $request->key ?? '';
        $categories = $request->categories ?? [];
        $threads = $this->threadRepository->getWithCriteria($tag, $key, $status, $categories, $limit);
        $data = [];
        $memberData = [];
        foreach ($threads as $thread) {
            $memberData['id'] = $thread->id;
            $memberData['title'] = $thread->title;
            $memberData['description'] = $thread->description;
            $memberData['content'] = $thread->content;
            $memberData['view'] = $thread->view;
            $memberData['create_at'] =  Carbon::parse($thread->created_at)->format('d/m/Y');
            $memberData['like'] = $thread->like;
            $memberData['reply'] = $thread->reply;
            $memberData['category'] = $this->categoryRepository->getCategoryById($thread->category_id);
            $memberData['user_id'] = $thread->user_id;
            $memberData['user'] = $this->userRepository->getById($thread->user_id);
            // $threadTags = $thread->threadTags;
            $threadTags = $this->threadRepository->getThreadTagsByThreadId($thread->id);
            $tags = [];
            foreach ($threadTags as $threadTag) {
                $tagMember['id'] = $threadTag->tag_id;
                $tagMember['name'] = $threadTag->name;
                $tagMember['color'] = $threadTag->color;
                array_push($tags, $tagMember);
            }
            $memberData['tags'] = $tags;
            array_push($data, $memberData);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data,
            'page' => $request->page ?? 1,
            'total_page' => count($threads) <= $limit? 1 : $threads->lastPage(),
            'total_items' => count($threads)
        ]);
    }

    public function view($id)
    {
        Carbon::setLocale('vi');
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
            $data['created_at'] =  Carbon::parse($thread->created_at)->diffForHumans(Carbon::now());
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
            $view = [
                "view" => $thread->view + 1
            ];
            $this->threadRepository->save($view, $id);
        }


        return response()->json([
            'status' => 'success',
            'message' => 'Lấy dữ liệu thành công',
            'data' => $data
        ]);
    }

    public function create(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|integer|min:1',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
             return response()->json(['error' => $validator->errors()], 400);
        }

        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);

        $user = $this->userRepository->getById($userId);
        if ($user->reputation < 0) {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Không cho phép tạo bài đăng vì uy tín thấp!'
            ],400);
        }

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'condition' => strval($request->condition),
            'raw_content' => $request->raw_content,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'user_id' => $userId,
            'status' => 0, // Chờ duyệt
            'created_at' => Carbon::now(),
            'created_by' => $userId,
            'updated_at' => Carbon::now(),
            'updated_by' => $userId,
        ];
        $thread = $this->threadRepository->save($data);


        if (!$thread) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Tạo sản phẩm thất bại',
            ], 400);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'Tạo sản phẩm thành công',
                'data' => $thread
            ]);
        }
    }

    public function attachTag(Request $request, $id)
    {
        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);

        $thread = $this->threadRepository->getById($id);

        $role = DB::table('user_roles')
        ->where('user_id', $userId)
        ->join('roles', 'user_roles.role_id', '=', 'roles.id')
        ->pluck('roles.role_name')
        ->toArray();

        $tags = $request->tags;

        foreach ($tags as $tag) {
            if (!is_int($tag) || $tag < 1) {
                return response()->json([
                    'status'=> 'Lỗi',
                    'message'=> 'Mã tag không đúng'
                ], 400);
            }
        }

        if (in_array('USER', $role) && $userId != $thread->user_id) {
            return response()->json([
                'status'=> 'error',
                'message'=> 'Không được phép đính tag cho sản phẩm của user khác, hãy là chủ sở hữu hoặc admin!',
            ], 400);
        }

        $this->threadRepository->attachTag($id, $request->tags, $userId);

        return response()->json([
            'status'=> 'success',
            'message'=> 'Gắn tag thành công',
        ]);
    }
}
