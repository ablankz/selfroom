<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatRoom extends Model
{
  use HasFactory, SoftDeletes, HasUuids;

  protected $table = 't_chat_rooms';
  protected $primaryKey = 'chat_room_id';

  const UPDATED_AT = null;

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
    't_chat_rooms_pkey', 'deleted_at', 'room_key'
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
    return $this->belongsToMany(ChatRoom::class, 't_visit_histories', 'chat_room_id', 'user_id')
      ->as('history')
      ->withPivot('visited_at', 'left_at');
  }

  public function categories(): BelongsToMany
  {
    return $this->belongsToMany(RoomCategory::class, 't_chat_room_tags', 'chat_room_id', 'room_category_id')
    ->as('tag');
  }
}
