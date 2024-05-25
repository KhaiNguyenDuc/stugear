<?php

namespace App\Jobs;

use App\Mail\ThreadStatus;
use App\Models\Notification;
use App\Models\Product;
use App\Models\Thread;
use App\Repositories\Notification\NotificationRepositoryInterface;
use App\Repositories\Reply\ReplyRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class NotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected NotificationRepositoryInterface $notificationRepository;
    protected UserRepositoryInterface $userRepository;
    private int $notificationId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $notificationId,
    UserRepositoryInterface $userRepository,
    NotificationRepositoryInterface $notificationRepository)
    {
        $this->notificationId = $notificationId;
        $this->notificationRepository = $notificationRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $notification = $this->notificationRepository->getById($this->notificationId);
        $mailData = [
            'subject' => 'Stugear xin chào',
            'content' => $notification->interact_user .' vừa bình luận trong bài viết của bạn',
            'signature' => 'Stugear'
        ];
        $this->sendEmail($notification, $mailData);
    }

    private function sendEmail(Notification $notification, $mailData){
        try {
            Mail::to($notification->user_id)->send(new ThreadStatus($mailData));
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
