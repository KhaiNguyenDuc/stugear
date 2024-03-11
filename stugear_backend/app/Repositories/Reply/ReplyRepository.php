<?php

namespace App\Repositories\Reply;

use App\Models\Reply;
use App\Repositories\BaseRepository;
use App\Repositories\Reply\ReplyRepositoryInterface;
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

}
