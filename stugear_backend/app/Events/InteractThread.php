<?php

namespace App\Events;

use App\Models\Product;
use App\Models\React;
use App\Models\Reply;
use App\Models\Thread;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InteractThread
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private Thread $thread;
    private Reply $reply;
    private React $react;
    private string $eventType;

    /**
     * Create a new event instance.
     */
    public function __construct($thread, $eventType)
    {
        $this->thread = $thread;
        $this->eventType = $eventType;
    }

    public function setReact(React $react){
        $this->react = $react;
    }

    public function getReact(){
        return $this->react;
    }

    public function setReply(Reply $reply){
        $this->reply = $reply;
    }
    
    public function getReply(){
        return $this->reply;
    }
    public function getThread(){
        return $this->thread;
    }
    public function getEventType(){
        return $this->eventType;
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
