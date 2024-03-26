<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Dto\ChatRequest;
use App\Dto\Message;
use App\Mail\ValidationMail;
use App\Models\Product;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\AppConstant;
use App\Util\PromptConstant;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ValidateProductJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected ValidationRepositoryInterface $validationRepository;
    protected ProductRepositoryInterface $productRepository;
    private $product;
    /**
     * Create the event listener.
     */
    public function __construct(
        $product,
        ValidationRepositoryInterface $validationRepository,
        ProductRepositoryInterface $productRepository,
        )
    {
        $this->product = $product;
        $this->validationRepository = $validationRepository;
        $this->productRepository = $productRepository;
    }
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $response = $this->sendToGPT($this->product);
        logger()->info("ResponseGPT: ",[$response]);
        if($this->isValid($response)){
            logger()->info("Allow to publish");
            $this->publishProduct($this->product, $response);
        }else{
            logger()->info("Reject");
            $this->rejectProduct($this->product, $response);
        }
    }


    private function isValid($response){
        return $response['isValid'] === true ? true : false;
    }
    private function sendToGPT(Product $product){
        $chatRequest = new ChatRequest(PromptConstant::$PROMPT_MODEL);
        $chatRequest->addMessages(new Message($this->getValidatePrompt($product)));
        $chatRequest->sendMessages();
        return $chatRequest->getResponse();
    }
    private function getValidatePrompt(Product $product){
      
        return sprintf(PromptConstant::$VALIDATE_PROMPT, $product->toString());
    }

    private function publishproduct(Product $product, $response){
        $allowStatus = 1;
        $this->updateProduct($product, $response, $allowStatus);
        $mailData = [
            'subject' => 'Sản phẩm: ' . $product->title,
            'content' => 'Sản phẩm của bạn đã được duyệt. Link: '.AppConstant::$DOMAIN."product" ."/". $product->id,
            'signature' => 'Stugear'
        ];
        $this->sendEmail($product, $mailData);
    }

    private function rejectProduct(Product $product, $response){
        $rejectStatus = 0;
        $this->updateproduct($product, $response, $rejectStatus);
        $mailData = [
            'subject' => 'Chúng tôi đã xem xét sản phẩm của bạn',
            'content' => 'Sản phẩm của bạn không được duyệt do chứa nội dung không hợp lệ.' .$response['description'],
            'signature' => 'Stugear'
        ];
        $this->sendEmail($product, $mailData);
    }


    private function updateproduct(Product $product, $response, $status){

        $validation = $this->validationRepository->getByProductId($product->id);

        $this->validationRepository->save([
            'status' => $status,
            'description' => $response['description'],
        ], $validation->id);
        
        if($status === false){
            $this->updateProductStatus($product->id, 0);
        }else{
            $this->updateProductStatus($product->id, 3);
        }
    }

    // 'chặn' => '0',
    // 'nháp' => '1',
    // 'chờ duyệt' => '2',
    // 'đã duyệt' => '3',
    // 'đã bán' => '4',
    // 'đã thanh toán' => '5'

    private function updateProductStatus($productId, $status){
        $this->productRepository->save(['status' => strval($status)], $productId);
    }

    private function sendEmail(Product $product, $mailData){

        try {
            Mail::to($product->user->email)->send(new ValidationMail($mailData));
            return response()->json([
                'status' => 'success',
                'message' => 'send reset password email successfully'
            ],200);
        } catch (\Throwable $th) {
            Log::error($th);
            return response()->json([
                'status' => 'fail',
                'message' => 'could not send email, try again'
            ],502);
        }
    
    }

}
