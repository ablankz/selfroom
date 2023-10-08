<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomCategory\DeleteRoomCategoryRequest;
use App\Http\Requests\RoomCategory\StoreRoomCategoryRequest;
use App\Http\Requests\RoomCategory\UpdateRoomCategoryRequest;
use App\Services\RoomCategoryService;
use Illuminate\Http\JsonResponse;

class RoomCategoryController extends Controller
{
  protected $service;

  public function __construct(RoomCategoryService $service)
  {
    $this->service = $service;
  }

  public function find(int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['room_category_id' => $id]
    ));
  }

  public function get(): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'get']
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

  public function update(UpdateRoomCategoryRequest $request, int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [
        'room_category_id' => $id,
        'name' => $request->get('name'),
      ]
    ));
  }

  public function delete(DeleteRoomCategoryRequest $request, int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      [
        'room_category_id' => $id,
      ]
    ));
  }
}
