<?php

namespace App\Repositories\Reply;

use App\Models\Reply;
use App\Repositories\BaseRepository;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Util\AppConstant;
use Illuminate\Support\Facades\DB;

class ReplyRepository extends BaseRepository implements ReplyRepositoryInterface
{
    public function getModel()
    {
        return Reply::class;
    }

    public function getReplyByThreadId($id, $limit)
    {
        $result = DB::table('replies')
            ->where('thread_id', $id )->paginate( $limit );
        return $result;
    }

    
    public function getAIReplyByThreadId($threadId){
        $result = DB::table('replies')
        ->select('replies.*', 'users.id', 'replies.content')
        ->join('users', 'replies.user_id', '=', 'users.id')
        ->join('user_roles', 'user_roles.user_id', '=', 'users.id')
        ->join('roles', 'roles.id', '=', 'user_roles.role_id')
        ->whereIn('roles.role_name', [AppConstant::$ROLE_ASSISTANT])
        ->where('replies.thread_id', $threadId)
        ->first();
    return $result;
    }

    public function getReplyByThreadIdWithFilter($id, $limit, $filter)
    {
        $query = DB::table('replies')->where('thread_id', $id);

        switch ($filter) {
            case '1':
                $query->orderByDesc('replies.created_at');
                break;
            case '2':
                $query->orderByDesc('like');
                break;
            case '3':
                $query->orderByDesc(DB::raw('LENGTH(raw_content)'));
                break;
            case '4':
                $query->orderBy(DB::raw('LENGTH(raw_content)'));
                break;
            case '5':
                // $query->orderBy(DB::raw('LENGTH(raw_content)'));
                // được đồng ý
                break;
            default:
                $query->orderByDesc('created_at');
                break;
        }

        $query->whereNull('replies.deleted_by');
        $query->whereNull('replies.deleted_at');


        return $query->paginate($limit);
    }


}
