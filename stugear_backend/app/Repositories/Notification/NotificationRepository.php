<?php

namespace App\Repositories\Notification;

use App\Models\Notification;
use App\Repositories\BaseRepository;
use App\Repositories\Notification\NotificationRepositoryInterface;
use App\Util\AppConstant;
use Illuminate\Support\Facades\DB;

class NotificationRepository extends BaseRepository implements NotificationRepositoryInterface
{
    public function getModel()
    {
        return Notification::class;
    }

    public function getByCurrentUser($userId, $limit) {
        $notifications = $this->model->where('user_id', '=', $userId)->paginate($limit);
        return $notifications;
    }
}
