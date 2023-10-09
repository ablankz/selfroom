<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatRoom\StoreChatRoomRequest;
use App\Services\ChatRoomService;
use Illuminate\Http\JsonResponse;

class ChatRoomController extends Controller
{
  protected $service;

  public function __construct(ChatRoomService $service)
  {
    $this->service = $service;
  }

  public function find(string $chatRoomId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['chat_room_id' => $chatRoomId]
    ));
  }

  public function get(): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'get']
    ));
  }

  public function create(StoreChatRoomRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [
        'name' => $request->get('name'),
        'categories' => $request->get('categories'),
        'cover_photo_url' => $request->file('coverPhoto'),
        'room_key' => $request->get('roomKey')
      ]
    ));
  }
}
