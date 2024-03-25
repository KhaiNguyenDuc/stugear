<?php

namespace App\Jobs;

use App\Dto\ChatRequest;
use App\Dto\Message;
use App\Models\Thread;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Util\PromptConstant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ReplyAIJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected UserRepositoryInterface $userRepository;
    protected ReplyRepositoryInterface $replyRepository;
    private Thread $thread;
    /**
     * Create a new job instance.
     */
    public function __construct(
        Thread $thread,
        UserRepositoryInterface $userRepository,
        ReplyRepositoryInterface $replyRepository)
    {
        $this->thread = $thread;
        $this->userRepository = $userRepository;
        $this->replyRepository = $replyRepository;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $response = $this->sendToGPT($this->thread);
        if($response){
            $assistant = $this->userRepository->getAssistant();
            $this->publishReply($assistant, $response);
        }

    }

    private function getAssistant(){
        return $this->userRepository->getAssistant();
    }
    private function publishReply($assistant, $response){

        $this->replyRepository->save([
            'content' => $response['content'],
            'raw_content' => $response['raw_content'],
            'user_id' => $assistant->id,
            'thread_id' => $this->thread->id,
            'created_by' => 1,
            'created_at' => now()->subDays(rand(1, 30)),
            'updated_by' => 1,
            'updated_at' => now()->subDays(rand(1, 30)),
            'deleted_by' => null,
            'deleted_at' => null,
        ]);
    }

    private function sendToGPT(Thread $thread){
        $chatRequest = new ChatRequest(PromptConstant::$PROMPT_MODEL);
        $chatRequest->addMessages(new Message($this->getThreadReplyPrompt($thread)));
        $chatRequest->sendMessages();
        return $chatRequest->getResponse();
    }

    private function getThreadReplyPrompt(Thread $thread){

        return sprintf(PromptConstant::$THREAD_REPLY_PROMPT, $thread->toString());
    }
}
