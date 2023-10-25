<?php

namespace App\Usecases\Chat;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationAttributeException;
use App\Exceptions\ApplicationException;
use App\Models\Chat;
use App\Usecases\Usecase;
use Ramsey\Uuid\Uuid;

class GetChats extends Usecase
{
  public function run(
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count,
    bool $cursor_pagination,
  ) {
    $query = Chat::query()->with(['user', 'room'])->where('t_chats.chat_room_id', $chat_room_id);

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

    if($cursor_pagination) {
      $ret = $query->cursorPaginate($limit);

      $cursors = json_decode(json_encode($ret), true);
      
      $ret = [
        ...$data,
        'next_cursor' => $cursors['next_cursor'],
        'prev_cursor' => $cursors['prev_cursor'],
        'data' => $ret->items()
      ];

      return [
        'data' => $ret,
        'code' => self::SUCCESS
      ];
    }else{
      $ret = $query->limit($limit)->offset($offset)->get();

      return [
        'data' => !count($data) ? $ret : ['data' => $ret, ...$data],
        'code' => self::SUCCESS
      ];
    }
  }
}
