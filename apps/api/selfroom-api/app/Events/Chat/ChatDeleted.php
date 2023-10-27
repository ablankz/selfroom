<?php

namespace App\Events\Chat;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatDeleted implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  private $chatRoomId;
  public $chatId;

  /**
   * Create a new event instance.
   */
  public function __construct(string $chatRoomId, string $chatId)
  {
    $this->chatId = $chatId;
    $this->chatRoomId = $chatRoomId;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return array<int, \Illuminate\Broadcasting\Channel>
   */
  public function broadcastOn()
  {
    return new PrivateChannel("chat-rooms.{$this->chatRoomId}");
  }

  public function broadcastAs()
  {
    return 'chat.deleted';
  }
}
