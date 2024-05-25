<?php

namespace App\Repositories\Message;

use App\Repositories\RepositoryInterface;

interface MessageRepositoryInterface extends RepositoryInterface
{
    public function getByRoomId($roomId);
    public function getFullMessagesByRoomId($roomId);

    public function getListChat($userId);
}
