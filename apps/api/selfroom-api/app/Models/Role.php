<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        ->withPivot('granted_at');
    }
}
