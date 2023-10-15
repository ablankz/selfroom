<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Role
 *
 * @property int $m_roles_pkey
 * @property int $role_id
 * @property string $name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Admin> $admins
 * @property-read int|null $admins_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereMRolesPkey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereRoleId($value)
 * @mixin \Eloquent
 */
class Role extends Model
{
  use HasFactory;

  protected $table = 'm_roles';
  protected $primaryKey = 'role_id';

  const CREATED_AT = null;
  const UPDATED_AT = null;

  /**
   * The attributes that are mass assignable.
   *
   * @var string[]
   */
  protected $fillable = [
    'name',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    'm_roles_pkey',
  ];

  public function admins(): BelongsToMany
  {
    return $this->belongsToMany(Admin::class, 't_admin_role', 'role_id', 'admin_id')
      ->as('permission')
      ->withPivot(['granted_at', 'granted_by']);
  }
}
