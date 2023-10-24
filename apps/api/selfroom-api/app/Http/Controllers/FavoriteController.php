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

  public function getFavorites(Request $request, string $userId): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create | name 
    $order = $request->order ? urldecode($request->order) : "create";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";
    //with
    $with_total_count = $request->total_count === 'with' ? true : false;

    return response()->success(app()->call(
      [$this->service, 'getFavorites'],
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

  public function getFavors(Request $request, string $chatRoomId): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create | name 
    $order = $request->order ? urldecode($request->order) : "create";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";
    //with
    $with_total_count = $request->total_count === 'with' ? true : false;

    return response()->success(app()->call(
      [$this->service, 'getFavors'],
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
