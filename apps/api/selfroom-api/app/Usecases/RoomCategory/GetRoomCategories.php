<?php

namespace App\Usecases\RoomCategory;

use App\Models\RoomCategory;
use App\Usecases\Usecase;

class GetRoomCategories extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
  ) {
    $query = RoomCategory::query();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'room':
        $query = $query->withCount('hasRooms')->orderBy('has_rooms_count', $order_opt);
      case 'name':
      default:
        $query = $query->orderBy('name', $order_opt);
        break;
    }

    $ret = $query->limit($limit)->offset($offset)->get();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
