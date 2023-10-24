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

  public function getVisitRooms(Request $request, string $userId): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create |  visited | left
    $order = $request->order ? urldecode($request->order) : "create";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";
    // with
    $with_total_count = $request->total_count === 'with' ? true : false;

    return response()->success(app()->call(
      [$this->service, 'getVisitRooms'],
      [
        'user_id' => $userId,
        'limit' => $limit,
        'offset' => $offset,
        'order' => $order,
        'order_opt' => $order_opt,
        'with_total_count' => $with_total_count
      ]
    ));
  }

  public function getVisitors(Request $request, string $chatRoomId): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create |  visited | left
    $order = $request->order ? urldecode($request->order) : "create";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";
    // with
    $with_total_count = $request->total_count === 'with' ? true : false;

    return response()->success(app()->call(
      [$this->service, 'getVisitors'],
      [
        'chat_room_id' => $chatRoomId,
        'limit' => $limit,
        'offset' => $offset,
        'order' => $order,
        'order_opt' => $order_opt,
        'with_total_count' => $with_total_count
      ]
    ));
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
