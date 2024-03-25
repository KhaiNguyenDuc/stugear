<?php

namespace App\Listeners;

use App\Events\ThreadCreated;
use App\Jobs\ValidateThreadJob;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Validation\ValidationRepositoryInterface;

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
        dispatch(new ValidateThreadJob(
            $event->getThread(),
            $this->userRepository,
            $this->replyRepository,
            $this->validationRepository
        ));
    }
}
