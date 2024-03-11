<?php

namespace App\Repositories\Reply;

use App\Repositories\RepositoryInterface;

interface ReplyRepositoryInterface extends RepositoryInterface
{
    public function getReplyByThreadId($id, $limit);

}
