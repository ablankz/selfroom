<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DummyChatRoomSeeder extends Seeder
{
  protected $faker;

  public function __construct()
  {
    $this->faker = Faker::create('ja_JP');
  }

  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    \App\Models\ChatRoom::create(
      [
        'name' => 'ダミーチャット部屋',
        'cover_photo_url' => null,
        'room_key' => app('hash')->make('dummy'),
      ]
    );
  }
}
