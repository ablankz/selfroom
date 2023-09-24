<?php

namespace App\Models;

use App\Foundation\Model\SoftDelete\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_clients';
    protected $primaryKey = 'client_id';


    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'address',
        'mailaddress',
        'site_url',
        'tel',
        'fax',
        'charge',
        'plan',
        'design',
        'is_open'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        't_clients_pkey', 'is_deleted'
    ];
}
