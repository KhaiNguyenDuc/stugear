<?php

namespace App\Listeners;

use App\Dto\ValidationRequest;
use App\Events\ThreadCreated;
use App\Jobs\ValidateThreadJob;
use App\Models\Thread;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Validation\ValidationRepositoryInterface;
use Illuminate\Support\Facades\DB;

class ThreadCreatedListener
{

    protected ValidationRepositoryInterface $validationRepository;
    protected UserRepositoryInterface $userRepository;
    protected ReplyRepositoryInterface $replyRepository;

    /**
     * Create the event listener.
     */
    public function __construct(
        ValidationRepositoryInterface $validationRepository,
        UserRepositoryInterface $userRepository,
        ReplyRepositoryInterface $replyRepository
    ) {
        $this->validationRepository = $validationRepository;
        $this->userRepository = $userRepository;
        $this->replyRepository = $replyRepository;
    }

    /**
     * Handle the event.
     */
    public function handle(ThreadCreated $event): void
    {
        $waitingApproveStatus = 3;
        $this->createThreadValidation($event->getThread(), $waitingApproveStatus);
        $result = DB::table("configurations")->where('id',1)->select("is_auto_reviewed")->first();
        logger()->error("statusAI: ", [$result]);
        if($result->is_auto_reviewed == 0){
            return;
        }
        dispatch(new ValidateThreadJob(
            $event->getThread(),
            $this->userRepository,
            $this->replyRepository,
            $this->validationRepository
        ));
    }

    private function createThreadValidation(Thread $thread, $status){
        $validation = new ValidationRequest();
        $validation->setThreadId($thread->id);
        $validation->setStatus($status);
        $validation->setDescription("Đang chờ duyệt");
        $this->validationRepository->createThreadValidation($thread->id, $validation);
    }
}
