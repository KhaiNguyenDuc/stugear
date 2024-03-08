<?php

namespace App\Repositories\Vote;

use App\Repositories\RepositoryInterface;

interface VoteRepositoryInterface extends RepositoryInterface
{
    public function getByUserAndComment($userId, $commentId);
}
