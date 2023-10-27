<?php

namespace App\Events\RoomVisit;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatRoomVisited implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  private $chatRoomId;

  /**
   * Create a new event instance.
   */
  public function __construct(string $chatRoomId)
  {
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
    return 'chat-room.visited';
  }
}
