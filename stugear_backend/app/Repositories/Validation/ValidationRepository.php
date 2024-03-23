<?php

namespace App\Repositories\Validation;

use App\Dto\ValidationRequest;
use App\Models\Validation;
use App\Repositories\BaseRepository;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\AppConstant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ValidationRepository extends BaseRepository implements ValidationRepositoryInterface
{
    public function getModel() 
    {
        return Validation::class;
    }


    public function createThreadValidation($threadId, ValidationRequest $validation){
        $result = DB::table('validations')->insert([
            'thread_id' => $threadId,
            'is_valid' => $validation->getIsValid(),
            'description' => $validation->getDescription(),
        ]);
    
        return $result;
    }

    
    public function createProductValidation($productId, ValidationRequest $validation){
        $result = DB::table('validations')->insert([
            'product_id' => $productId,
            'is_valid' => $validation->getIsValid(),
            'description' => $validation->getDescription(),
        ]);
    
        return $result;
    }

    public function getByThreadId($threadId){
        $result = DB::table('validations')
        ->where('thread_id', '=', $threadId)
        ->get();
        return $result;
    }

}
