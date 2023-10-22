<?php

namespace App\Usecases\ChatRoom;

use App\Models\ChatRoom;
use App\Models\User;
use App\Usecases\Usecase;
use Illuminate\Support\Carbon;
use Ramsey\Uuid\Uuid;

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
    array $categories,
    string $category_select_type,
    bool $with_total_count
  ) {
    $authFavorites = request()->user()?->user_id ? User::find(request()->user()->user_id)->favoriteRooms->pluck('chat_room_id')->toArray() : [];

    $query = ChatRoom::query()->with('categories');

    $order_opt = $order_opt === 'desc' ? 'desc' : 'asc';
    switch ($order) {
      case 'active':
        $currentDateTime = Carbon::now();
        $thirtyMinutesAgo = $currentDateTime->subMinutes(30);
        $query = $query->withCount(['chats as latest_chats_count' => function ($query) use ($thirtyMinutesAgo) {
          $query->where('created_at', '>=', $thirtyMinutesAgo);
        }])->orderBy('latest_chats_count', $order_opt)->orderBy('name', 'asc');
        break;
      case 'chat':
        $query = $query->withCount('chats', $order_opt)->orderBy('chats_count', $order_opt)->orderBy('name', 'asc');
        break;
      case 'favorite':
        $query = $query->orderBy('favor_num', $order_opt)->orderBy('name', 'asc');
        break;
      case 'name':
        $query = $query->orderBy('name', $order_opt);
        break;
      case 'in':
        $query = $query->orderBy('user_num', $order_opt)->orderBy('name', 'asc');
        break;
      case 'create':
        $query = $query->orderBy('t_chat_rooms_pkey', $order_opt);
        break;
      case 'update':
      default:
        $query = $query->orderBy('updated_at', $order_opt)->orderBy('name', 'asc');
        break;
    }

    if ($search_type === "id") {
      if(Uuid::isValid($search)){
        $query = $query->where('chat_room_id', $search);
      }else{
        $query = $query->whereNull('chat_room_id');
      }
    } else {
      $searchQuery = addcslashes($search, '%_\\');
      $query = $query->where('name', 'like', '%' . $searchQuery . '%');
    }

    if ($is_lock === "true") {
      $query = $query->whereNotNull('room_key');
    } else if ($is_lock === "false") {
      $query = $query->whereNull('room_key');
    }

    if ($is_favorite === "true") {
      $authFavorites = request()->user()?->user_id ? User::find(request()->user()->user_id)->favoriteRooms->pluck('chat_room_id')->toArray() : [];
      $query = $query->whereIn('chat_room_id', $authFavorites);
    }

    if (!empty($categories)) {
      $selectCount = $category_select_type === 'all' ? count($categories) : 1;
      $query->whereHas('categories', function ($query) use ($categories) {
        $query->whereIn('t_chat_room_tags.room_category_id', $categories);
      }, '>=', $selectCount);
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

    $ret = $query->limit($limit)->offset($offset)->get()->map(function ($room) use ($authFavorites) {
      $room->is_favorite = in_array($room->chat_room_id, $authFavorites);
      return $room;
    });

    return [
      'data' => !count($data) ? $ret : ['data' => $ret, ...$data],
      'code' => self::SUCCESS
    ];
  }
}
