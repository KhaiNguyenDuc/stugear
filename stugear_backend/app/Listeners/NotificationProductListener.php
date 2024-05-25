<?php

namespace App\Listeners;

use App\Events\InteractProduct;
use App\Jobs\NotificationJob;
use App\Repositories\Notification\NotificationRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Util\AppConstant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class NotificationProductListener
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
    public function handle(InteractProduct $event): void
    {
        $type = $event->getEventType();
        if($type == "COMMENT"){
            $notificationId = $this->createCommentProductNotification($event->getComment(), $event->getProduct());
        }
        dispatch(new NotificationJob($notificationId, $this->userRepository, $this->notificationRepository));
    }

    private function createCommentProductNotification($comment, $product){
        $user = $this->userRepository->getById($comment->owner_id);
        DB::table('users')
        ->where('id', $user->id)
        ->update([
            'has_unread_notification' => true,
        ]);
        return DB::table('notifications')->insertGetId([
            'user_id' => $product->user_id,
            'title' => $user->name .' vừa bình luận trong sản phẩm của bạn',
            'content' => $comment->content,
            'image' => AppConstant::$DOMAIN . 'api/products/' . $product->id . '/images',
            'target_id' => $product->id,
            'type' => 'home-page/product-detail',
            'interact_user' => $comment->owner_id,
            'created_by' => 3,
            'updated_by' => 3,
            'created_at' => Carbon::now(),
            'updated_at'=> Carbon::now()
        ]);
    }
}
