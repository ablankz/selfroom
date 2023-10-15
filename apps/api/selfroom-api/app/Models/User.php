<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
  use HasFactory, HasUuids;

  protected $table = 't_users';
  protected $primaryKey = 'user_id';

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'nickname',
    'profile_photo_url',
    'country',
    'description',
    'email',
    'company',
    'role',
    'school'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    't_users_pkey'
  ];

  public function account(): HasOne
  {
    return $this->hasOne(Account::class, 'user_id', 'user_id');
  }

  public function chats(): HasMany
  {
    return $this->hasMany(Chat::class, 'user_id', 'suer_id');
  }

  public function currentRoom(): BelongsTo
  {
    return $this->belongsTo(ChatRoom::class, 'current_chat_room_id', 'chat_room_id');
  }

  public function favoriteRooms(): BelongsToMany
  {
    return $this->belongsToMany(ChatRoom::class, 't_favorite_chat_rooms', 'user_id', 'chat_room_id')
      ->as('favorite')
      ->withPivot('added_at');
  }

  public function visitedRooms(): BelongsToMany
  {
    return $this->belongsToMany(ChatRoom::class, 't_visit_histories', 'user_id', 'chat_room_id')
      ->as('history')
      ->withPivot(['visited_at', 'left_at']);
  }

  public function followees(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 't_follows', 'follower_id', 'followee_id')
      ->as('follow')
      ->withPivot('followed_at');
  }

  public function followers(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 't_follows', 'followee_id', 'follower_id')
      ->as('follow')
      ->withPivot('followed_at');
  }
}
