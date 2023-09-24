<?php

namespace App\Models;

use App\Foundation\Model\SoftDelete\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
  use HasFactory, SoftDeletes;

  protected $table = 't_partners';
  protected $primaryKey = 'partner_id';


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
    'is_open'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array
   */
  protected $hidden = [
    't_partners_pkey', 'is_deleted'
  ];
}
