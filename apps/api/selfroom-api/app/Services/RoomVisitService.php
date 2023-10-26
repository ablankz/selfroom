<?php

namespace App\Services;

use App\Http\Resources\ChatRoom\VisitedChatRoomResourceCollection;
use App\Http\Resources\User\SimplifiedUserResourceCollection;
use App\Http\Resources\User\VisitorResourceCollection;
use App\Http\Resources\WithResourceCollection;
use App\Usecases\RoomVisit\GetInUsers;
use App\Usecases\RoomVisit\GetVisitors;
use App\Usecases\RoomVisit\GetVisitRooms;
use App\Usecases\RoomVisit\RoomIn;
use App\Usecases\RoomVisit\RoomOut;

class RoomVisitService
{
  public function getVisitRooms(
    GetVisitRooms $usecase,
    string $user_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $data = $usecase->handle($user_id, $limit, $offset, $order, $order_opt, $with_total_count);
    if($with_total_count){
      return new WithResourceCollection($data, VisitedChatRoomResourceCollection::class);
    }
    return new VisitedChatRoomResourceCollection($data);
  }

  public function getVisitors(
    GetVisitors $usecase,
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $data = $usecase->handle($chat_room_id, $limit, $offset, $order, $order_opt, $with_total_count);
    if($with_total_count){
      return new WithResourceCollection($data, VisitorResourceCollection::class);
    }
    return new VisitorResourceCollection($data);
  }

  public function getInUsers(
    GetInUsers $usecase,
    string $chat_room_id,
    int $limit,
    int $offset,
    string $order,
    string $order_opt,
    bool $with_total_count
  ) {
    $data = $usecase->handle($chat_room_id, $limit, $offset, $order, $order_opt, $with_total_count);
    if($with_total_count){
      return new WithResourceCollection($data, SimplifiedUserResourceCollection::class);
    }
    return new SimplifiedUserResourceCollection($data);
  }

  public function in(RoomIn $usecase, string $user_id, string $chat_room_id, string $keyword = null)
  {
    return $usecase->handle($user_id, $chat_room_id, $keyword);
  }

  public function out(RoomOut $usecase, string $user_id)
  {
    return $usecase->handle($user_id);
  }
}
