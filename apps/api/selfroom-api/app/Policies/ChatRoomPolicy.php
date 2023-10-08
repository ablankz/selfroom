<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\ChatRoom;

class ChatRoomPolicy
{
  /**
   * Determine whether the user can view the model.
   */
  public function viewChat(Account $account, ChatRoom $chatRoom): bool
  {
    return $account->user->current_chat_room_id && $account->user->current_chat_room_id === $chatRoom->chat_room_id;
  }
}
