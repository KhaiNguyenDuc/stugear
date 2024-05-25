<?php

namespace App\Repositories\Message;

use App\Models\Message;
use App\Repositories\BaseRepository;

class MessageRepository extends BaseRepository implements MessageRepositoryInterface
{
    public function getModel()
    {
        return Message::class;
    }

    public function getByRoomId($roomId)
    {
        $message = $this->model->where('room', '=', $roomId)->first();
        return $message;
    }

    public function getFullMessagesByRoomId($roomId)
    {
        $messages = $this->model->where('room', '=', $roomId)->get();
        return $messages;
    }

    public function getListChat($userId)
    {
        $people = $this->model->where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->orderByDesc('created_at')
            ->get()
            ->unique('room');
        return $people;
    }
}
