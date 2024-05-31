<?php

namespace App\Repositories\Thread;

use App\Repositories\RepositoryInterface;

interface ThreadRepositoryInterface extends RepositoryInterface
{
    public function attachTag($id, $tags, $userId);

    public function getWithCriteria($tag, $key, $status, $categories, $limit, $request = null);

    public function getThreadTagsByThreadId($threadId);

    public function getCurrentUserThreads($userId, $limit);

    public function deletedReplyOfThread($threadId, $userId);

    public function getTotalThreads();



}
