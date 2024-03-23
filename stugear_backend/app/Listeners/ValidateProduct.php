<?php

namespace App\Listeners;

use App\Dto\ChatRequest;
use App\Dto\Message;
use App\Dto\ValidationRequest;
use App\Events\ProductCreated;
use App\Mail\ValidationMail;
use App\Models\Product;
use App\Repositories\Product\ProductRepositoryInterface;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\PromptConstant;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ValidateProduct
{
    protected ValidationRepositoryInterface $validationRepository;
    protected ProductRepositoryInterface $productRepository;
    /**
     * Create the event listener.
     */
    public function __construct(
        ValidationRepositoryInterface $validationRepository,
        ProductRepositoryInterface $productRepository,
        )
    {
        $this->validationRepository = $validationRepository;
        $this->productRepository = $productRepository;
    }

    /**
     * Handle the event.
     */
    public function handle(ProductCreated $event): void
    {
        $product = $event->getProduct();
        $response = $this->sendToGPT($product);
        logger()->info("ResponseGPT: ",[$response]);
        if($this->isValid($response)){
            logger()->info("Allow to publish");
            $this->publishProduct($product, $response);
        }else{
            logger()->info("Reject");
            $this->rejectProduct($product, $response);
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
      
        return sprintf(PromptConstant::$VALIDATE_PROMPT, $product->getValidationData());
    }

    private function publishproduct(Product $product, $response){
        $isValid = true;
        $this->updateProduct($product, $response, $isValid);
        $mailData = [
            'subject' => 'Sản phẩm đã được duyệt' . $product->title,
            'content' => 'Sản phẩm của bạn đã được duyệt. Link: '.env("APP_URL")."/product" ."/". $product->id,
            'signature' => 'Stugear'
        ];
        $this->sendEmail($product, $mailData);
    }

    private function rejectProduct(Product $product, $response){
        $isValid = false;
        $this->updateproduct($product, $response, $isValid);
        $mailData = [
            'subject' => 'Chúng tôi đã xem xét sản phẩm của bạn',
            'content' => 'Sản phẩm của bạn không được duyệt do chứa nội dung không hợp lệ',
            'signature' => 'Stugear'
        ];
        $this->sendEmail($product, $mailData);
    }

    private function updateproduct(Product $product, $response, $isValid){
        $validation = new ValidationRequest();
        $validation->setProductId($product->id);
        $validation->isValid($isValid);
        $validation->setDescription($response['description']);
        $this->validationRepository->createProductValidation($product->id, $validation);
        if($isValid === false){
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
