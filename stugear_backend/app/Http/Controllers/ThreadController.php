<?php

namespace App\Http\Controllers;

use App\Events\ThreadCreated;
use App\Jobs\ValidateThreadJob;
use App\Models\React;
use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Tag\TagRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Repositories\Category\CategoryRepositoryInterface;
use App\Repositories\Notification\NotificationRepositoryInterface;
use App\Repositories\React\ReactRepositoryInterface;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\AppConstant;
use App\Util\AuthService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ThreadStatus;

class ThreadController extends Controller
{

    protected $threadRepository;
    protected $userRepository;
    protected $tagRepository;
    protected $categoryRepository;
    protected $reactRepository;
    protected $replyRepository;
    protected $validationRepository;
    protected $notificationRepository;

    public function __construct(
        ThreadRepositoryInterface $threadRepository,
        UserRepositoryInterface $userRepository,
        TagRepositoryInterface $tagRepository,
        ReplyRepositoryInterface $replyRepository,
        CategoryRepositoryInterface $categoryRepository,
        ReactRepositoryInterface $reactRepository,
        ValidationRepositoryInterface $validationRepository,
        NotificationRepositoryInterface $notificationRepository

    ) {
        $this->threadRepository = $threadRepository;
        $this->userRepository = $userRepository;
        $this->tagRepository = $tagRepository;
        $this->replyRepository = $replyRepository;
        $this->categoryRepository = $categoryRepository;
        $this->reactRepository = $reactRepository;
        $this->validationRepository = $validationRepository;
        $this->notificationRepository = $notificationRepository;
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
            'total_page' => $threads->lastPage(),
            'total_items' => count($threads)
        ]);
    }

    public function getCurrentUserThreads(Request $request)
    {
        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);

        if (!$userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'not found thread for this user or user not login'
            ], 404);
        } else {
            $limit = $request->limit ?? 10;
            $threads = $this->threadRepository->getCurrentUserThreads($userId, $limit);
            $data = [];
            $memberData = [];
            foreach ($threads as $thread) {
                $memberData['id'] = $thread->id;
                $memberData['title'] = $thread->title;
                $memberData['description'] = $thread->description;
                $memberData['content'] = $thread->content;
                $validtion =  $this->validationRepository->getByThreadId($thread->id);

                if ($validtion->status == 1) {
                    $memberData['status'] = "Đã duyệt";
                } else if ($validtion->status == 0) {
                    $memberData['status'] = "Chặn";
                } else {
                    $memberData['status'] = "Chờ duyệt";
                }


                $memberData['create_at'] =  Carbon::parse($thread->created_at)->format('d/m/Y');

                array_push($data, $memberData);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Lấy dữ liệu thành công',
                'data' => $data,
                'page' => $request->page ?? 1,
                'total_page' => $threads->lastPage(),
                'total_items' => count($threads)
            ]);
        }
    }

    public function getThreadById(Request $request, $id)
    {
        logger()->info(config('queue.default'));
        Carbon::setLocale('vi');
        $userId = null; // Initialize $userId to null
        $thread = $this->threadRepository->getById($id);
        if (!$thread) {
            return response()->json([
                'status' => 'error',
                'message' => 'not found thread'
            ], 404);
        } else {
            $data = [];
            $token = $request->header();
            if (isset($token['authorization'][0])) {
                if ($token['authorization'][0] != "Bearer null") {
                    $bareToken = substr($token['authorization'][0], 7);
                    $userId = AuthService::getUserId($bareToken);
                    $react = $this->reactRepository->getByUserAndThread($userId, $thread->id);
                    if ($react) {
                        $data['is_like'] = $react->like == 1 ? true : false;
                    }
                }
            }
            $user = $this->userRepository->getById($thread->user_id);
            $data['user'] = $user;
            $validtion = $this->validationRepository->getByThreadId($thread->id);
            if ($userId !== null) {
                if ($user->id === $userId) {

                    $data['valid'] = $validtion;
                }
            } else {

                if ($validtion->status == 0 || $validtion->status == 3) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'not found thread'
                    ], 404);
                }
            }
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

        if (isset($token['authorization'][0])) {
            if ($token['authorization'][0] != "Bearer null") {
                $bareToken = substr($token['authorization'][0], 7);
                $userId = AuthService::getUserId($bareToken);
                if ($userId == $thread->user_id) {
                    $this->threadRepository->save([
                        'view_by_owner' => Carbon::now()
                    ], $thread->id);
                }
            }
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

        // $user = $this->userRepository->getById($userId);
        // if ($user->reputation < 0) {
        //     return response()->json([
        //         'status' => 'Lỗi',
        //         'message' => 'Không cho phép tạo bài đăng vì uy tín thấp!'
        //     ],400);
        // }

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'condition' => strval($request->condition),
            'raw_content' => $request->raw_content,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'user_id' => $userId,
            // 'status' => 0, // Chờ duyệt
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
            event(new ThreadCreated($thread));
            // dispatch(new ValidateThreadJob($thread, $this->validationRepository));
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
                    'status' => 'Lỗi',
                    'message' => 'Mã tag không đúng'
                ], 400);
            }
        }

        if (in_array('USER', $role) && $userId != $thread->user_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không được phép đính tag cho sản phẩm của user khác, hãy là chủ sở hữu hoặc admin!',
            ], 400);
        }

        $this->threadRepository->attachTag($id, $request->tags, $userId);

        return response()->json([
            'status' => 'success',
            'message' => 'Gắn tag thành công',
        ]);
    }

    public function delete(Request $request, $id)
    {
        $thread = $this->threadRepository->getById($id);
        if (!$thread) {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Thread này đã bị xóa!'
            ], 400);
        }

        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);
        $role = DB::table('user_roles')
            ->where('user_id', $userId)
            ->join('roles', 'user_roles.role_id', '=', 'roles.id')
            ->pluck('roles.role_name')
            ->toArray();
        if (in_array('ADMIN', $role) || $thread->user_id == $userId) {
            // update deleted in DB
            $result = $this->threadRepository->save([
                'deleted_by' => $userId,
                'deleted_at' => Carbon::now()
            ], $id);

            $this->threadRepository->deletedReplyOfThread($id, $userId);
            // return result
            if ($result) {
                return response()->json([
                    'status' => 'Thành công',
                    'message' => 'Xóa thread thành công',
                ]);
            } else {
                return response()->json([
                    'status' => 'Thất bại',
                    'message' => 'Xóa thread thất bại',
                ], 400);
            }
        } else {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Chỉ có Admin hoặc chủ thread được phép xóa!'
            ], 400);
        }
    }

    public function reactByThreadAndUser(Request $request, $id)
    {
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


        if (!in_array($request->like, $likeArray)) {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'React không được',
            ], 400);
        }

        $thread = $this->threadRepository->getById($id);
        $react = $this->reactRepository->getByUserAndThread($userId, $id);
        if ($react != null) {
            if ($react->like == true && $request->like == true) {
                return response()->json([
                    'status' => 'Lỗi',
                    'message' => 'react không được',
                ], 400);
            } else if ($react->like == false && $request->like == false) {
                return response()->json([
                    'status' => 'Lỗi',
                    'message' => 'react không được',
                ], 400);
            }
            // if it has already react, for each swap, reduce the other
            if ($request->like == true) {
                $thread->increment('like');
                $thread->decrement('dislike');
                $react->like = true;
            }

            if ($request->like == false) {
                $thread->increment('dislike');
                $thread->decrement('like');
                $react->like = false;
            }
        } else {
            $react = new React();
            // $react->id = null;
            $react->user_id = $userId;
            $react->thread_id = intval($id);
            // if new, then just increase or decrease
            if ($request->like == true) {
                $thread->increment('like');
                $react->like = true;
            }

            if ($request->like == false) {
                $thread->increment('dislike');
                $react->like = false;
            }
        }


        $result = $this->reactRepository->save([
            'thread_id' => $react->thread_id,
            'user_id' => $react->user_id,
            'like' => $react->like
        ], $react->id);
        logger()->info('React retrieved:', [$react]);
        if ($result) {
            return response()->json([
                'status' => 'Thành công',
                'message' => 'React thành công',
            ]);
        } else {
            return response()->json([
                'status' => 'Thất bại',
                'message' => 'React thất bại'
            ], 400);
        }
    }

    public function getGeneralInfo(){
        $threads = $this->threadRepository->getTotalThreads();

        $replies = $this->replyRepository->getTotalReply();

        return response()->json([
            'status' => 'Thành công',
            'message' => 'Lấy dữ liệu tổng quan thành công',
            'data' => [
                'threads' => $threads,
                'replies' => $replies
            ]
        ]);
    }

    public function updateStatusThread(Request $request, $threadId)
    {
        $status = $request->status ?? '';
        if ($status == '' || is_null($status) || !in_array($status, AppConstant::$STATUS_OF_THREAD))
        {
            return response()->json([
                'status' => 'Lỗi',
                'message' => 'Trạng thái cập nhật không phù hợp!'
            ], 400);
        }

        $token = $request->header();
        $bareToken = substr($token['authorization'][0], 7);
        $userId = AuthService::getUserId($bareToken);

        $result = $this->validationRepository->save([
            'status' => $status,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ], $threadId);

        $contentForNotification = [
            0 => 'thread '. $threadId . ' cập nhật trạng thái sang bị cấm',
            1 => 'thread '. $threadId . ' cập nhật trạng thái sang hoạt động',
            3 => 'thread '. $threadId . ' cập nhật trạng thái sang chờ duyệt'
        ];

        $thread = $this->threadRepository->getById($threadId);
        // dd($thread->user_id);

        $this->notificationRepository->save([
            'user_id' => $thread->user_id,
            'content'=> $contentForNotification[$status],
            'target_id' => $threadId,
            'type' => 'thread',
            'created_at' => Carbon::now(),
            'created_by' => $userId,
            'updated_at' => Carbon::now(),
            'updated_by' => $userId,
        ]);

        $mailData = [
            'subject' => 'Stugear xin chào',
            'content' => 'Link: ' . AppConstant::$DOMAIN_FE . 'thread/' . $thread->id . ' ' . $contentForNotification[$status],
            'signature' => 'Stugear'
        ];
        try {
            $user = $this->userRepository->getById($thread->user_id);
            Mail::to($user->email)->send(new ThreadStatus($mailData));
        } catch (\Throwable $th) {
            Log::error($th);
        }

        if ($result) {
            return response()->json([
                'status' => 'Thành công',
                'message' => 'Cập nhật trạng thái thành công',
            ]);
        } else {
            return response()->json([
                'status' => 'Thất bại',
                'message' => 'Cập nhật trạng thái thất bại'
            ], 400);
        }
    }
}
