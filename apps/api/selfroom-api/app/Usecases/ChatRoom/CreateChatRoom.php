<?php

namespace App\Usecases\ChatRoom;

use App\Models\ChatRoom;
use App\Usecases\Usecase;
use Illuminate\Support\Facades\DB;

class CreateChatRoom extends Usecase
{
  /**
   * @param string $name
   * @param int[] $categories
   * @param string|null $cover_photo_url
   * @param string|null $room_key
   */
  public function run(
    string $name,
    array $categories = [],
    string $cover_photo_url = null,
    string $room_key = null
  ) {
    $data = DB::transaction(function() use($name, $categories, $cover_photo_url, $room_key){
      try{
        $data = ChatRoom::create(
          [
            'name' => $name,
            'cover_photo_url' => $cover_photo_url,
            'room_key' => $room_key ? app('hash')->make($room_key) : null,
          ]
        );
        foreach($categories as $category){
          $data->categories()->sync($category);
        }
        return $data;
      }catch(\Throwable $e){
        DB::rollBack();
        throw $e;
      }
    });
    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
