<?php

namespace App\Services;

use App\Http\Resources\RoomCategory\RoomCategoryResource;
use App\Http\Resources\RoomCategory\SimplifiedRoomCategoryResourceCollection;
use App\Http\Resources\WithResourceCollection;
use App\Usecases\RoomCategory\CreateRoomCategory;
use App\Usecases\RoomCategory\DeleteRoomCategory;
use App\Usecases\RoomCategory\FindRoomCategory;
use App\Usecases\RoomCategory\GetRoomCategories;
use App\Usecases\RoomCategory\UpdateRoomCategory;

class RoomCategoryService
{
  public function find(FindRoomCategory $usecase, int $room_category_id)
  {
    return new RoomCategoryResource($usecase->handle($room_category_id));
  }

  public function get(
    GetRoomCategories $usecase,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $data = $usecase->handle($limit, $offset, $order, $order_opt, $with_total_count);
    if($with_total_count){
      return new WithResourceCollection($data, SimplifiedRoomCategoryResourceCollection::class);
    }
    return new SimplifiedRoomCategoryResourceCollection($data);
  }

  public function create(
    CreateRoomCategory $usecase,
    string $name,
  ) {
    return new RoomCategoryResource($usecase->handle(
      $name
    ));
  }

  public function update(
    UpdateRoomCategory $usecase,
    int $room_category_id,
    string $name
  ) {
    return $usecase->handle(
      $room_category_id,
      $name
    );
  }


  public function delete(DeleteRoomCategory $usecase, int $room_category_id)
  {
    return $usecase->handle($room_category_id);
  }
}
