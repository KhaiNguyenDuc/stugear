<?php

namespace App\Repositories\Thread;

use App\Models\Thread;
use App\Repositories\BaseRepository;
use App\Repositories\Thread\ThreadRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ThreadRepository extends BaseRepository implements ThreadRepositoryInterface
{
    public function getModel()
    {
        return Thread::class;
    }
}
