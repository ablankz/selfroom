<?php

namespace App\Usecases\Client;

use App\Models\Client;
use App\Usecases\Usecase;

class GetAllClients extends Usecase
{
  public function run()
  {
    $ret = Client::all();

    return [
      'data' => $ret,
      'code' => self::SUCCESS
    ];
  }
}
