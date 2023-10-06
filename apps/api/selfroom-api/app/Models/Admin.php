<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Admin extends Model
{
  use HasFactory, SoftDeletes, HasUuids;

  protected $table = 't_admins';
  protected $primaryKey = 'admin_id';

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'nickname',
    'profile_photo_url'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    't_admins_pkey', 'deleted_at'
  ];

  public function account(): HasOne
  {
    return $this->hasOne(Account::class, 'admin_id', 'admin_id');
  }

  public function roles(): BelongsToMany
  {
    return $this->belongsToMany(Role::class, 't_admin_role', 'admin_id', 'role_id')
      ->withPivot('granted_at');
  }
}