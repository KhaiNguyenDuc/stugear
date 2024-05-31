<?php

namespace App\Repositories\Validation;

use App\Dto\ValidationRequest;
use App\Models\Validation;
use App\Repositories\BaseRepository;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\AppConstant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ValidationRepository extends BaseRepository implements ValidationRepositoryInterface
{
    public function getModel()
    {
        return Validation::class;
    }


    public function createThreadValidation($threadId, ValidationRequest $validation)
    {
        $result = DB::table('validations')->insert([
            'thread_id' => $threadId,
            'status' => $validation->getStatus(),
            'description' => $validation->getDescription(),
        ]);

        return $result;
    }



    public function createProductValidation($productId, ValidationRequest $validation)
    {
        $result = DB::table('validations')->insert([
            'product_id' => $productId,
            'status' => $validation->getStatus(),
            'description' => $validation->getDescription(),
        ]);

        return $result;
    }



    public function getByThreadId($threadId)
    {
        $result = DB::table('validations')
            ->where('thread_id', '=', $threadId)
            ->first();
        return $result;
    }

    public function getByProductId($productId)
    {
        $result = DB::table('validations')
            ->where('product_id', '=', $productId)
            ->first();
        return $result;
    }

    public function updateStatusThread($threadId, $status)
    {
        try {
            $result = DB::table('validations')
                ->where('thread_id', '=', $threadId)
                ->update([
                    'status' => $status
                ]);
        } catch (\Throwable $th) {
            Log::error($th);
        }

        return $result;
    }

    
    public function updateStatusProduct($productId, $status) {
        try {
            $result = DB::table('validations')
                ->where('product_id', '=', $productId)
                ->update([
                    'status' => $status
                ]);
        } catch (\Throwable $th) {
            Log::error($th);
        }

        return $result;
    }

    public function getAllValidations($limit)
    {
        return DB::table('validations')
            ->get();
    }

}
