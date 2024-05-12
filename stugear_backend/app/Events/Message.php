<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $sender_id;
    public $receiver_id;
    public $message;
    public $time;

    /**
     * Create a new event instance.
     */
    public function __construct($sender_id, $receiver_id, $message, $time)
    {
        $this->sender_id = $sender_id;
        $this->receiver_id = $receiver_id;
        $this->message = $message;
        // Định dạng lại thời gian theo định dạng mong muốn
        $formattedTime = $time->format("H:i, d/m/Y");
        $this->time = $formattedTime;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        if ($this->sender_id < $this->receiver_id) {
            $room = strval($this->sender_id) . strval($this->receiver_id);
        } else {
            $room = strval($this->receiver_id) . strval($this->sender_id);
        }

        return [
            // new PrivateChannel(strval($this->sender_id) . strval($this->receiver_id)),
            // new PrivateChannel('room')
            // 'room'
            // strval($this->sender_id) . strval($this->receiver_id)
            $room
        ];
    }

    public function broadcastAs()
    {
        return 'message';
    }
}
