<?php

namespace App\Usecases\Favorite;

use App\Enums\ApplicationCode;
use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;

class GetFavors extends Usecase
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
    $authFollowers = request()->user()?->user_id ? User::find(request()->user()->user_id)->followees->pluck('user_id')->toArray() : [];

    $query = ChatRoom::find($chat_room_id);

    if (is_null($query)) {
      return [
        'code' => self::NOT_FOUND
      ];
    }

    $query = $query->likedUsers();

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'name':
        $query = $query->orderBy('name', $order_opt);
        break;
      case 'create':
      default:
        $query = $query->orderBy('t_users_pkey', $order_opt);
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

    $ret = $query->limit($limit)->offset($offset)->get()->map(function ($user) use ($authFollowers) {
      $user->is_favorite = in_array($user->user_id, $authFollowers);
      return $user;
    });

    return [
      'data' => !count($data) ? $ret : ['data' => $ret, ...$data],
      'code' => self::SUCCESS
    ];
  }
}
