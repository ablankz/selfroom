<?php

namespace App\Http\Controllers;

use App\Http\Requests\Chat\StoreChatRequest;
use App\Http\Requests\Chat\UpdateChatRequest;
use App\Services\ChatService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
      [
        'chat_id' => $chatId,
        'chat_room_id' => $chatRoomId,
      ]
    ));
  }

  public function get(Request $request, string $chatRoomId): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create
    $order = $request->order ? urldecode($request->order) : "create";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";

    return response()->success(app()->call(
      [$this->service, 'get'],
      [
        'chat_room_id' => $chatRoomId,
      ]
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
        'chat_room_id' => $chatRoomId,
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
        'chat_room_id' => $chatRoomId,
      ]
    ));
  }
}
