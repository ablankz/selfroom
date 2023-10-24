<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ChatRoom
 *
 * @property int $t_chat_rooms_pkey
 * @property string $chat_room_id
 * @property string $name チャットルーム名
 * @property string|null $cover_photo_url 写真のパス
 * @property int $user_num 現在ユーザーが何人いるか
 * @property int $favor_num お気に入りユーザー数
 * @property mixed|null $room_key ルームキー
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RoomCategory> $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Chat> $chats
 * @property-read int|null $chats_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $inUsers
 * @property-read int|null $in_users_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ChatRoom> $likedUsers
 * @property-read int|null $liked_users_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ChatRoom> $visitors
 * @property-read int|null $visitors_count
 * @method static \Database\Factories\ChatRoomFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom query()
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereChatRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereCoverPhotoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereFavorNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereRoomKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereTChatRoomsPkey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ChatRoom whereUserNum($value)
 * @mixin \Eloquent
 */
class ChatRoom extends Model
{
  use HasFactory, HasUuids;

  protected $table = 't_chat_rooms';
  protected $primaryKey = 'chat_room_id';

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'name',
    'cover_photo_url',
    'room_key'
  ];

  protected $casts = [
    'room_key' => 'hashed',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    't_chat_rooms_pkey', 'room_key'
  ];

  public function chats(): HasMany
  {
    return $this->hasMany(Chat::class, 'chat_room_id', 'chat_room_id');
  }

  public function inUsers(): HasMany
  {
    return $this->hasMany(User::class, 'current_chat_room_id', 'chat_room_id');
  }

  public function likedUsers(): BelongsToMany
  {
    return $this->belongsToMany(ChatRoom::class, 't_favorite_chat_rooms', 'chat_room_id', 'user_id')
      ->as('favorite')
      ->withPivot('added_at');
  }

  public function visitors(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 't_visit_histories', 'chat_room_id', 'user_id')
      ->as('history')
      ->withPivot(['visited_at', 'left_at']);
  }

  public function categories(): BelongsToMany
  {
    return $this->belongsToMany(RoomCategory::class, 't_chat_room_tags', 'chat_room_id', 'room_category_id')
    ->as('tag');
  }
}
