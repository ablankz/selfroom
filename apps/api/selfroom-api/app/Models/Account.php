<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * App\Models\Account
 *
 * @property int $m_accounts_pkey
 * @property int $account_id
 * @property string|null $login_id ログインのための識別子
 * @property mixed|null $password 認証時のパスワード
 * @property string|null $provider_id ソーシャルログイン用ID
 * @property string|null $provider_name ソーシャルプロバイダ
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $user_id
 * @property string|null $admin_id
 * @property-read \App\Models\Admin|null $admin
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\AccountFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Account newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Account newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Account query()
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereAccountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereAdminId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereLoginId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereMAccountsPkey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereProviderName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Account whereUserId($value)
 * @mixin \Eloquent
 */
class Account extends Authenticatable implements JWTSubject
{
  use HasFactory, Notifiable;

  protected $table = 'm_accounts';
  protected $primaryKey = 'account_id';

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'login_id',
    'password',
    'provider_id',
    'provider_name',
    'user_id',
    'admin_id'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'm_accounts_pkey', 'password', 'login_id', 'provider_id', 'provider_name',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'password' => 'hashed',
  ];

  public function getJWTIdentifier(): int
  {
    return $this->getKey();
  }

  public function getJWTCustomClaims(): array
  {
    return [];
  }

  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class, 'user_id', 'user_id');
  }

  public function admin(): BelongsTo
  {
    return $this->belongsTo(Admin::class, 'admin_id', 'admin_id');
  }
}
