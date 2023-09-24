<?php

namespace App\Models;

use App\Foundation\Model\SoftDelete\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Account extends Authenticatable implements JWTSubject
{
  use HasFactory, Notifiable, SoftDeletes;

  protected $table = 't_accounts';
  protected $primaryKey = 'user_id';

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
    'is_active',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    't_accounts_pkey', 'password', 'is_deleted', 'provider_id', 'provider_name',
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
}
