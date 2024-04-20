<?php

namespace App\Repositories\Notification;

use App\Repositories\RepositoryInterface;

interface NotificationRepositoryInterface extends RepositoryInterface
{
    public function getByCurrentUser($userId, $limit);

}
