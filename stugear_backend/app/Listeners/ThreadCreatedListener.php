<?php

namespace App\Listeners;

use App\Dto\ChatRequest;
use App\Dto\Message;
use App\Dto\ValidationRequest;
use App\Events\ThreadCreated;
use App\Jobs\ValidateThreadJob;
use App\Mail\ValidationMail;
use App\Models\Thread;
use App\Repositories\Validation\ValidationRepositoryInterface;
use App\Util\PromptConstant;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ThreadCreatedListener
{

    protected ValidationRepositoryInterface $validationRepository;
    /**
     * Create the event listener.
     */
    public function __construct(ValidationRepositoryInterface $validationRepository)
    {
        $this->validationRepository = $validationRepository;
    }

    /**
     * Handle the event.
     */
    public function handle(ThreadCreated $event): void
    {
        dispatch(new ValidateThreadJob($event->getThread(), $this->validationRepository));
    }


 
}
