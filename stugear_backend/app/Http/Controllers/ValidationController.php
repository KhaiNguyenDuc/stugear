<?php

namespace App\Http\Controllers;

use App\Repositories\Notification\NotificationRepositoryInterface;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\Thread\ThreadRepositoryInterface;
use Illuminate\Http\Request;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\AppConstant;
use App\Util\AuthService;
use Illuminate\Support\Facades\DB;

class ValidationController extends Controller
{
    protected $validationRepository;
    protected $threadRepository;
    protected $notificationRepository;
    protected $productRepository;
    public function __construct(
        ValidationRepositoryInterface $validationRepository, 
        ThreadRepositoryInterface $threadRepository,
        NotificationRepositoryInterface $notificationRepository,
        ProductRepositoryInterface $productRepository)
    {
        $this->validationRepository = $validationRepository;
        $this->threadRepository = $threadRepository;
        $this->notificationRepository = $notificationRepository;
        $this->productRepository = $productRepository;
    }

    public function getAllValidations(Request $request)
    {
        $limit = $request->limit ?? 10;
        $validations = $this->validationRepository->getAllValidations($limit);
        $data = [];
        
        foreach ($validations as $validation) {
            $memberData = [];
            $memberData['id'] = $validation->id;
            if($validation->thread_id !== null){

                $memberData['thread'] = DB::table('threads')
                ->where('id', $validation->thread_id)
                ->select('threads.*')
                ->first();
            }else if($validation->product_id !== null){
                $memberData['product'] = DB::table('products')
                ->where('id', $validation->product_id)
                ->select('products.*')
                ->first();
                
            }

            $memberData['created_at'] = $validation->created_at;
            $memberData['status'] = $validation->status;
            $memberData['description'] = $validation->description;
            array_push($data, $memberData);
            $validation = null;
        }

        return response()->json([
            'status' => 'success',
            'message' => 'get data sucesss',
            'data' => $data,
            'page' => $request->page,
            'total_items' => count($validations)
        ]);
    }
}
