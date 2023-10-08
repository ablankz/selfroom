<?php

namespace App\Http\Controllers;

use App\Http\Requests\Chat\StoreChatRequest;
use App\Http\Requests\Chat\UpdateChatRequest;
use App\Services\ChatService;
use Illuminate\Http\JsonResponse;

class ChatController extends Controller
{
  protected $service;

  public function __construct(ChatService $service)
  {
    $this->service = $service;
  }

  public function find(string $chatRoomId, string $chatId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['chat_id' => $chatId]
    ));
  }

  public function get(string $chatRoomId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'get']
    ));
  }

  public function create(StoreChatRequest $request, string $chatRoomId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [
        'user_id' => $request->user()->user_id,
        'chat_room_id' => $chatRoomId,
        'content' => $request->get('content'),
      ]
    ));
  }

  public function update(UpdateChatRequest $request, string $chatRoomId, string $chatId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [
        'chat_id' => $chatId,
        'content' => $request->get('content'),
      ]
    ));
  }

  public function delete(string $chatRoomId, string $chatId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      [
        'chat_id' => $chatId,
      ]
    ));
  }
}
