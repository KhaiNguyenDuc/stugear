<?php

namespace App\Listeners;

use App\Events\InteractThread;
use App\Jobs\NotificationJob;
use App\Repositories\Notification\NotificationRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class NotificationThreadListener
{
    /**
     * Create the event listener.
     */
    protected UserRepositoryInterface $userRepository;
    protected NotificationRepositoryInterface $notificationRepository;
    public function __construct(
        UserRepositoryInterface $userRepository, 
        NotificationRepositoryInterface $notificationRepository)
    {
        $this->userRepository = $userRepository;
        $this->notificationRepository = $notificationRepository;
    }

    /**
     * Handle the event.
     */
    public function handle(InteractThread $event): void
    {
        $type = $event->getEventType();
        if($type == "REPLY"){
            $notificationId = $this->createReplyThreadNotification($event->getReply(), $event->getThread());
        }else if($type == "REACT"){
            $notificationId = $this->createReactThreadNotification($event->getReact(), $event->getThread());
        }
        dispatch(new NotificationJob($notificationId, $this->userRepository, $this->notificationRepository));
    }

    private function createReactThreadNotification($react, $thread){
        $user = $this->userRepository->getById($react->user_id);
        DB::table('users')
        ->where('id', $user->id)
        ->update([
            'has_unread_notification' => true,
        ]);

        return DB::table('notifications')->insertGetId([
            'user_id' => $thread->user_id,
            'title' => $user->name .' vừa react trong bài viết của bạn',
            'content' => $thread->title,
            'target_id' => $thread->id,
            'type' => 'thread',
            'interact_user' => $react->user_id,
            'created_by' => 3,
            'updated_by' => 3,
            'created_at' => Carbon::now(),
            'updated_at'=> Carbon::now()
        ]);
    }

    private function createReplyThreadNotification($reply, $thread){
        $user = $this->userRepository->getById($reply->user_id);
        DB::table('users')
        ->where('id', $user->id)
        ->update([
            'has_unread_notification' => true,
        ]);

        return DB::table('notifications')->insertGetId([
            'user_id' => $thread->user_id,
            'title' => $user->name .' vừa bình luận trong bài viết của bạn',
            'content' => $thread->title,
            'target_id' => $thread->id,
            'type' => 'thread',
            'interact_user' => $reply->user_id,
            'created_by' => 3,
            'updated_by' => 3,
            'created_at' => Carbon::now(),
            'updated_at'=> Carbon::now()
        ]);
    }
}
