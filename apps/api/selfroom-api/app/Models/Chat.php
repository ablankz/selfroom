<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory, SoftDeletes, HasUlids;

    protected $table = 't_chats';
    protected $primaryKey = 'chat_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'chat_room_id',
        'user_id',
        'content'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        't_chats_pkey', 'deleted_at'
    ];

    public function room(): BelongsTo
    {
      return $this->belongsTo(ChatRoom::class, 'chat_room_id', 'chat_room_id');
    }

    public function user(): BelongsTo
    {
      return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
