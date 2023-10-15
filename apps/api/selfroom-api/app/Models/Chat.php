<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Chat
 *
 * @property int $t_chats_pkey
 * @property string $chat_id
 * @property string|null $user_id
 * @property string $content コメント内容
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $chat_room_id
 * @property-read \App\Models\ChatRoom $room
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\ChatFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat query()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereChatRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereTChatsPkey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUserId($value)
 * @mixin \Eloquent
 */
class Chat extends Model
{
    use HasFactory, HasUlids;

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
        't_chats_pkey'
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
