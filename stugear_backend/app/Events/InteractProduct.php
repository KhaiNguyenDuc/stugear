<?php

namespace App\Events;

use App\Models\Comment;
use App\Models\Product;
use App\Models\React;
use App\Models\Vote;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InteractProduct
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private Product $product;
    private Comment $comment;
    private Vote $vote;
    private string $eventType;

    /**
     * Create a new event instance.
     */
    public function __construct($product, $eventType)
    {
        $this->product = $product;
        $this->eventType = $eventType;
    }

    public function setVote(Vote $vote){
        $this->vote = $vote;
    }

    public function getVote(){
        return $this->vote;
    }

    public function setComment(Comment $comment){
        $this->comment = $comment;
    }
    
    public function getComment(){
        return $this->comment;
    }
    public function getProduct(){
        return $this->product;
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
