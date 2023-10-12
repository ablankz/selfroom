<?php

namespace App\Http\Controllers;

use App\Services\FavoriteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
  protected $service;

  public function __construct(FavoriteService $service)
  {
    $this->service = $service;
  }

  public function add(Request $request, string $chatRoomId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'add'],
      [
        'user_id' => $request->user()->user_id,
        'chat_room_id' => $chatRoomId
      ]
    ));
  }

  public function cancel(Request $request, string $chatRoomId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'cancel'],
      [
        'user_id' => $request->user()->user_id,
        'chat_room_id' => $chatRoomId
      ]
    ));
  }
}
