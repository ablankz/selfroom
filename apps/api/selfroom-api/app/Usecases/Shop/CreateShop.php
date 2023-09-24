<?php

namespace App\Usecases\Shop;

use App\Models\Shop;
use App\Usecases\Usecase;

class CreateShop extends Usecase
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
    bool $is_open
  ) {
    $data = Shop::create([
      'name' => $name,
      'address' => $address,
      'mailaddress' => $mailaddress,
      'site_url' => $site_url,
      'tel' => $tel,
      'fax' => $fax,
      'charge' => $charge,
      'plan' => $plan,
      'is_open' => $is_open
    ]);

    return [
      'data' => $data,
      'code' => self::SUCCESS,
    ];
  }
}
