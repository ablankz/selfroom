<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\Chat;
use App\Models\ChatRoom;

class ChatPolicy
{
  /**
   * Determine whether the user can view any models.
   */
  public function viewAny(Account $account, ChatRoom $chatRoom): bool
  {
    return $this->isCurrentChatRoom($account, $chatRoom);
  }

  /**
   * Determine whether the user can view the model.
   */
  public function view(Account $account, Chat $chat, ChatRoom $chatRoom): bool
  {
    return $this->isCurrentChatRoom($account, $chatRoom);
  }

  /**
   * Determine whether the user can create models.
   */
  public function create(Account $account, ChatRoom $chatRoom): bool
  {
    return $this->isCurrentChatRoom($account, $chatRoom);
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(Account $account, Chat $chat, ChatRoom $chatRoom): bool
  {
    return $this->isCurrentChatRoom($account, $chatRoom)
      && $this->isChatOwner($account, $chat);
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(Account $account, Chat $chat, ChatRoom $chatRoom): bool
  {
    return $this->isCurrentChatRoom($account, $chatRoom)
      && $this->isChatOwner($account, $chat);
  }

  private function isCurrentChatRoom(Account $account, ChatRoom $chatRoom): bool
  {
    return $account->user->current_chat_room_id
      && $account->user->current_chat_room_id === $chatRoom->chat_room_id;
  }

  private function isChatOwner(Account $account, Chat $chat): bool
  {
    return $account->user_id === $chat->user_id;
  }
}
