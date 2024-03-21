<?php

namespace App\Repositories\React;

use App\Models\React;
use App\Repositories\BaseRepository;
use App\Repositories\React\ReactRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ReactRepository extends BaseRepository implements ReactRepositoryInterface
{
    public function getModel()
    {
        return React::class;
    }

    public function getByUserAndThread($userId, $threadId){
        $react = $this->model->where("user_id", $userId)
        ->where("thread_id", $threadId)
        ->first();
        return $react;
    }

    public function getByUserAndReply($userId, $replyId){
        $react = $this->model->where("user_id", $userId)
        ->where("reply_id", $replyId)
        ->first();
        return $react;
    }

   


}
