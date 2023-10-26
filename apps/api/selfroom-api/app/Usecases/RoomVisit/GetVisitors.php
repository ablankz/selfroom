<?php

namespace App\Usecases\RoomVisit;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Usecases\Usecase;

class GetVisitors extends Usecase
{
  public const NOT_FOUND = ApplicationCode::NotFoundModel;

  public function run(
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $query = ChatRoom::find($chat_room_id);

    if (is_null($query)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    $query = $query->visitors();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'create':
        $query = $query->orderBy('t_users_pkey', $order_opt);
        break;
      case 'left':
        $query = $query->orderBy('t_visit_histories.left_at', $order_opt);
        break;
      case 'visited':
      default:
        $query = $query->orderBy('t_visit_histories.visited_at', $order_opt);
        break;
    }

    $data = [];

    if ($with_total_count) {
      $dataQuery = clone $query;
      $count = $dataQuery->count();
      $data = [
        ...$data,
        'total_count' => $count
      ];
    }

    $ret = $query->limit($limit)->offset($offset)->get();

    return [
      'data' => !count($data) ? $ret : ['data' => $ret, ...$data],
      'code' => self::SUCCESS
    ];
  }
}
