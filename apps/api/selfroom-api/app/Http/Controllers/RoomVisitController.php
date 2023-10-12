<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomVisit\RoomInRequest;
use App\Services\RoomVisitService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoomVisitController extends Controller
{
  protected $service;

  public function __construct(RoomVisitService $service)
  {
    $this->service = $service;
  }

  public function in(RoomInRequest $request, string $chatRoomId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'in'],
      [
        'user_id' => $request->user()->user_id,
        'chat_room_id' => $chatRoomId,
        'keyword' => $request->get('keyword')
      ]
    ));
  }

  public function out(Request $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'out'],
      [
        'user_id' => $request->user()->user_id,
      ]
    ));
  }
}
