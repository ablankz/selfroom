<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomCategory\DeleteRoomCategoryRequest;
use App\Http\Requests\RoomCategory\StoreRoomCategoryRequest;
use App\Http\Requests\RoomCategory\UpdateRoomCategoryRequest;
use App\Services\RoomCategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RoomCategoryController extends Controller
{
  protected $service;

  public function __construct(RoomCategoryService $service)
  {
    $this->service = $service;
  }

  public function find(int $roomCategoryId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['room_category_id' => $roomCategoryId]
    ));
  }

  public function get(Request $request): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // name | room
    $order = $request->order ? urldecode($request->order) : "name";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";
    //with
    $with_total_count = $request->total_count === 'with' ? true : false;

    return response()->success(app()->call(
      [$this->service, 'get'],
      [
        'limit' => $limit,
        'offset' => $offset,
        'order' => $order,
        'order_opt' => $order_opt,
        'with_total_count' => $with_total_count
      ]
    ));
  }

  public function create(StoreRoomCategoryRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [
        'name' => $request->get('name'),
      ]
    ));
  }

  public function update(UpdateRoomCategoryRequest $request, int $roomCategoryId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [
        'room_category_id' => $roomCategoryId,
        'name' => $request->get('name'),
      ]
    ));
  }

  public function delete(DeleteRoomCategoryRequest $request, int $roomCategoryId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      [
        'room_category_id' => $roomCategoryId,
      ]
    ));
  }
}
