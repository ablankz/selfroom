<?php

namespace App\Usecases\Chat;

use App\Models\Chat;
use App\Usecases\Usecase;

class GetChats extends Usecase
{
  public function run(
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $query = Chat::query()->with(['user', 'room'])->where('chats.chat_room_id', $chat_room_id);

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'create':
      default:
        $query = $query->orderBy('t_chats_pkey', $order_opt);
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
