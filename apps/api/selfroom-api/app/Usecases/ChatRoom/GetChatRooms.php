<?php

namespace App\Usecases\ChatRoom;

use App\Models\ChatRoom;
use App\Usecases\Usecase;

// TODO 条件の絞り込みとページネーション対応
class GetChatRooms extends Usecase
{
  public function run(
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    string $search_type,
    string $search,
    string $is_lock,
    string $is_favorite,
    array $categories
  ) {
    $ret = ChatRoom::with('categories')->get();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
