<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\RoomCategory
 *
 * @property int $m_room_categories_pkey
 * @property int $room_category_id
 * @property string $name カテゴリー名
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ChatRoom> $hasRooms
 * @property-read int|null $has_rooms_count
 * @method static \Illuminate\Database\Eloquent\Builder|RoomCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoomCategory whereMRoomCategoriesPkey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoomCategory whereRoomCategoryId($value)
 * @mixin \Eloquent
 */
class RoomCategory extends Model
{
  use HasFactory;

  protected $table = 'm_room_categories';
  protected $primaryKey = 'room_category_id';

  const CREATED_AT = null;
  const UPDATED_AT = null;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'name'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    'm_room_categories_pkey'
  ];

  public function hasRooms(): BelongsToMany
  {
    return $this->belongsToMany(ChatRoom::class, 't_chat_room_tags', 'room_category_id', 'chat_room_id')
      ->as('tag');
  }
}
