<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Admin
 *
 * @property int $t_admins_pkey
 * @property string $admin_id
 * @property string $nickname 表示名
 * @property string|null $profile_photo_url プロフィール画像パス
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $created_by
 * @property-read \App\Models\Account|null $account
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Admin> $createAdmins
 * @property-read int|null $create_admins_count
 * @property-read Admin|null $myAdmin
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @method static \Database\Factories\AdminFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Admin newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin query()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereAdminId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereNickname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereProfilePhotoUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereTAdminsPkey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin withoutTrashed()
 * @mixin \Eloquent
 */
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
    'profile_photo_url',
    'created_by'
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

  public function myAdmin(): BelongsTo
  {
    return $this->belongsTo(Admin::class, 'created_by', 'admin_id');
  }

  public function createAdmins(): HasMany
  {
    return $this->hasMany(Admin::class, 'created_by', 'admin_id');
  }

  public function roles(): BelongsToMany
  {
    return $this->belongsToMany(Role::class, 't_admin_role', 'admin_id', 'role_id')
      ->as('permission')
      ->withPivot(['granted_at', 'granted_by']);
  }
}
