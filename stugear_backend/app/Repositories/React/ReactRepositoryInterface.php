<?php

namespace App\Repositories\React;

use App\Repositories\RepositoryInterface;

interface ReactRepositoryInterface extends RepositoryInterface
{
    public function getByUserAndThread($userId, $threadId);
    public function getByUserAndReply($userId, $replyId);
}
