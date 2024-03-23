<?php

namespace App\Events;

use App\Models\Thread;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ThreadCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private Thread $thread;

    /**
     * Create a new event instance.
     */
    public function __construct($thread)
    {
        $this->thread = $thread;
    }

    public function getThread(){
        return $this->thread;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
