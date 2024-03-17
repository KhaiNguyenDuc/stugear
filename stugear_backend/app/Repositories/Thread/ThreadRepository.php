<?php

namespace App\Repositories\Thread;

use App\Models\Thread;
use App\Repositories\BaseRepository;
use App\Repositories\Thread\ThreadRepositoryInterface;
use App\Util\AppConstant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ThreadRepository extends BaseRepository implements ThreadRepositoryInterface
{
    public function getModel()
    {
        return Thread::class;
    }

    public function attachTag($id, $tags, $userId)
    {
        if (empty($tags)) {
            return true;
        }
        $tagIds = DB::table('product_tags')
        ->where('thread_id', $id)
        ->pluck('tag_id')
        ->toArray();
        foreach ($tags as $key => $tag) {
            if (in_array($tag, $tagIds)) {
                unset($tags[$key]);
            }
        }

        if (empty($tags)) {
            return DB::table('product_tags')
            ->where('thread_id', $id)
            ->pluck('tag_id')
            ->toArray();
        }
        foreach ($tags as $tag) {
            $insertData[] = [
                'thread_id' => $id,
                'product_id' => null,
                'tag_id' => $tag,
                'created_at' => Carbon::now(),
                'updated_at'=> Carbon::now(),
                'created_by' => $userId,
                'updated_by' => $userId
            ];
        }
        DB::table('product_tags')->insert($insertData);
    }

    public function getWithCriteria($tag, $key, $status, $categories, $limit)
    {
        $query = DB::table('threads');
        if (!empty($key)) {
            $query->where(function ($subQuery) use ($key) {
                $subQuery->where('threads.title', 'like', '%' . $key . '%')
                      ->orWhere('threads.description', 'like', '%' . $key . '%')
                      ->orWhere('threads.raw_content', 'like', '%' . $key . '%');
                    }
                );
        }

        if (!empty($status) && array_key_exists($status, AppConstant::$FILTER_STATUS_THREAD)) {
            if ($status == 'new') {
                $query->orderBy('threads.updated_at', 'desc');
            } else if ($status == 'old') {
                $query->orderBy('threads.updated_at', 'asc');
            } else {
                $query->orderBy('threads.reply', 'desc');
            }
        }
        //[all, book, accessory, question, discuss]
        if (!empty($categories)) {
            $query->where(function ($subQuery) use ($categories) {
                        if (in_array('all', $categories)) {
                            return;
                        }
                        if (in_array('book', $categories)) {
                            $subQuery->where('category_id', '=', 1);
                        }
                        if (in_array('accessory', $categories)) {
                            $subQuery->orWhere('category_id', '=', 3);
                        }
                        if (in_array('question', $categories)) {
                            $subQuery->orWhere('category_id', '=', 4);
                        }
                        if (in_array('discuss', $categories)) {
                            $subQuery->orWhere('category_id', '=', 5);
                        }
                    }
                );

        }
        if (!empty($tag)) {
            $query->join('product_tags', 'threads.id', '=', 'product_tags.thread_id')
                ->join('tags', 'product_tags.tag_id', '=', 'tags.id')
                ->where('tags.name', '=', $tag);
            $query->select(
                'threads.id',
                'threads.title',
                'threads.description',
                'threads.content',
                'threads.view',
                'threads.created_at',
                'threads.like',
                'threads.reply',
                'threads.user_id',
                'threads.category_id',
            )->distinct();
        }

        return $query->paginate($limit);
    }

    public function getThreadTagsByThreadId($threadId) {
        $result = DB::table('threads')
            ->join('product_tags', 'threads.id', '=', 'product_tags.thread_id')
            ->join('tags', 'product_tags.tag_id', '=', 'tags.id')
            ->where('threads.id', '=', $threadId)
            ->get();
        return $result;
    }
}
