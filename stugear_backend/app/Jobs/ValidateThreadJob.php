<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Dto\ChatRequest;
use App\Dto\Message;
use App\Dto\ValidationRequest;
use App\Mail\ValidationMail;
use App\Models\Thread;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\PromptConstant;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ValidateThreadJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    protected ValidationRepositoryInterface $validationRepository;
    private $thread;
    /**
     * Create the event listener.
     */
    public function __construct($thread, $validationRepository)
    {
        $this->thread = $thread;
        $this->validationRepository = $validationRepository;

    }

    public function setValidationRepository(ValidationRepositoryInterface $validationRepository)
    {
        $this->validationRepository = $validationRepository;
    }

    public function handle(): void
    {
        $response = $this->sendToGPT($this->thread);
        logger()->info("ResponseGPT: ",[$response]);
        if($this->isValid($response)){
            logger()->info("Allow to publish");
            $this->publishThread($this->thread, $response);
        }else{
            logger()->info("Reject");
            $this->rejectThread($this->thread, $response);
        }
    }

    private function isValid($response){
        return $response['isValid'] === true ? true : false;
    }
    private function sendToGPT(Thread $thread){
        $chatRequest = new ChatRequest(PromptConstant::$PROMPT_MODEL);
        $chatRequest->addMessages(new Message($this->getValidatePrompt($thread)));
        $chatRequest->sendMessages();
        return $chatRequest->getResponse();
    }
    private function getValidatePrompt(Thread $thread){

        return sprintf(PromptConstant::$VALIDATE_PROMPT, $thread->getValidationData());
    }

    private function publishThread(Thread $thread, $response){
        $isValid = true;
        $this->updateThread($thread, $response, $isValid);
        $mailData = [
            'subject' => 'Bài đăng đã được duyệt' . $thread->title,
            'content' => 'Bài đăng của bạn đã được duyệt. Link: '.env("APP_URL")."/thread" ."/". $thread->id,
            'signature' => 'Stugear'
        ];
        $this->sendEmail($thread, $mailData);
    }

    private function rejectThread(Thread $thread, $response){
        $isValid = false;
        $this->updateThread($thread, $response, $isValid);
        $mailData = [
            'subject' => 'Chúng tôi đã xem xét bài đăng của bạn',
            'content' => 'Bài đăng của bạn không được duyệt do chứa nội dung không hợp lệ.' .$response['description'],
            'signature' => 'Stugear'
        ];
        $this->sendEmail($thread, $mailData);
    }

    private function updateThread(Thread $thread, $response, $isValid){
        $validation = new ValidationRequest();
        $validation->setThreadId($thread->id);
        $validation->isValid($isValid);
        $validation->setDescription($response['description']);
        $this->validationRepository->createThreadValidation($thread->id, $validation);
    }

    private function sendEmail(Thread $thread, $mailData){

        try {
            Mail::to($thread->user->email)->send(new ValidationMail($mailData));
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
