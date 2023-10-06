<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class RoomCategory extends Model
{
    use HasFactory, SoftDeletes;

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
      return $this->belongsToMany(ChatRoom::class, 't_chat_room_tags', 'room_category_id', 'chat_room_id');
    }
}
