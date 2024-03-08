<?php

namespace App\Repositories\Vote;

use App\Models\Vote;
use App\Repositories\BaseRepository;
use App\Repositories\Vote\VoteRepositoryInterface;
use Illuminate\Support\Facades\DB;

class VoteRepository extends BaseRepository implements VoteRepositoryInterface
{
    public function getModel()
    {
        return Vote::class;
    }
    
    public function getByUserAndComment($userId, $commentId)
    {
        $vote = $this->model->where("user_id", $userId)
                            ->where("comment_id", $commentId)
                            ->first();
        
        return $vote;
    }

}
