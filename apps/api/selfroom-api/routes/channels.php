<?php

use App\Http\Resources\User\SimplifiedUserResource;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('chat-rooms.{roomId}', function ($user, $roomId) {
  return $user->user?->current_chat_room_id === $roomId;
});

Broadcast::channel('chat-rooms-online.{roomId}', function ($user, $roomId) {
  if ($user->user?->current_chat_room_id === $roomId) {
    return new SimplifiedUserResource($user->user);
  }
  return false;
});
