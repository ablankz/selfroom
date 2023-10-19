<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\User
 *
 * @property int $t_users_pkey
 * @property string $user_id
 * @property string $nickname 表示名
 * @property string|null $profile_photo_url プロフィール画像パス
 * @property int $follower_num このユーザーをフォローをしている人数
 * @property int $follow_num このユーザーがフォローしている人数
 * @property int $favorite_room_num お気に入りのチャットルーム数
 * @property string|null $country 国
 * @property string|null $description 紹介文
 * @property string|null $email メールアドレス
 * @property string|null $company 会社
 * @property string|null $role 役職
 * @property string|null $school 学校
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $current_chat_room_id
 * @property-read \App\Models\Account|null $account
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Chat> $chats
 * @property-read int|null $chats_count
 * @property-read \App\Models\ChatRoom|null $currentRoom
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ChatRoom> $favoriteRooms
 * @property-read int|null $favorite_rooms_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $followees
 * @property-read int|null $followees_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $followers
 * @property-read int|null $followers_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ChatRoom> $visitedRooms
 * @property-read int|null $visited_rooms_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCurrentChatRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFavoriteRoomNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFollowNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFollowerNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereNickname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProfilePhotoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereSchool($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTUsersPkey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserId($value)
 * @mixin \Eloquent
 */
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
