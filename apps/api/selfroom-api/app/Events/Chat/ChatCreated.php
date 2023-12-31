<?php

namespace App\Events\Chat;

use App\Http\Resources\Chat\ChatResource;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatCreated implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $chat;

  /**
   * Create a new event instance.
   */
  public function __construct(ChatResource $chat)
  {
    $this->chat = $chat;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn()
  {
    return new PrivateChannel("chat-rooms.{$this->chat->chat_room_id}");
  }

  public function broadcastAs()
  {
    return 'chat.created';
  }
}
