<?php

namespace App\Repositories\Thread;

use App\Models\Thread;
use App\Repositories\BaseRepository;
use App\Repositories\Thread\ThreadRepositoryInterface;
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
}
