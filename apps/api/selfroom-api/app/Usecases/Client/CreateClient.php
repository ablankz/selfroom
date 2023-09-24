<?php

namespace App\Usecases\Client;

use App\Models\Client;
use App\Usecases\Usecase;

class CreateClient extends Usecase
{
  public function run(
    string $name,
    string $address,
    string $mailaddress,
    string $site_url,
    string $tel,
    string $fax,
    string $charge,
    string $plan,
    string $design,
    bool $is_open
  ) {
    $data = Client::create([
      'name' => $name,
      'address' => $address,
      'mailaddress' => $mailaddress,
      'site_url' => $site_url,
      'tel' => $tel,
      'fax' => $fax,
      'charge' => $charge,
      'plan' => $plan,
      'design' => $design,
      'is_open' => $is_open
    ]);

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
