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
            });
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

        if (!empty($categories)) {
            $query->whereIn('category_id', $categories);
        }

        // Join with the validations table
        $query->join('validations', 'threads.id', '=', 'validations.thread_id');

        // Add a condition to filter threads with validation.is_valid = true
        $query->where('validations.is_valid', true);

        if (!empty($tag)) {
            $query->join('product_tags', 'threads.id', '=', 'product_tags.thread_id')
                  ->join('tags', 'product_tags.tag_id', '=', 'tags.id')
                  ->whereIn('tags.id', $tag);
        }

        // Additional conditions
        $query->whereNull('threads.deleted_by');
        $query->whereNull('threads.deleted_at');

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
            'threads.category_id'
        )->distinct();

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

    public function getCurrentUserThreads($userId, $limit) {
        $query = DB::table('threads');

        //** ================= hỏi khải xem có cho user truy cập thread đã bị chặn ko ======================*/
        // // Join with the validations table
        // $query->join('validations', 'threads.id', '=', 'validations.thread_id');

        // // Add a condition to filter threads with validation.is_valid = true
        // $query->where('validations.is_valid', true);
        //** ================= hỏi khải xem có cho user truy cập thread đã bị chặn ko ======================*/

        // Additional conditions
        $query->where('threads.user_id', '=', $userId);
        $query->whereNull('threads.deleted_by');
        $query->whereNull('threads.deleted_at');

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
            'threads.category_id'
        )->distinct();

        $query->orderBy('threads.updated_at', 'desc');

        return $query->paginate($limit);
    }

}
