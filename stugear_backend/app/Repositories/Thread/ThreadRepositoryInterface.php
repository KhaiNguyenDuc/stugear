<?php

namespace App\Repositories\Thread;

use App\Repositories\RepositoryInterface;

interface ThreadRepositoryInterface extends RepositoryInterface
{
    public function attachTag($id, $tags, $userId);
}
