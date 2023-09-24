<?php

namespace App\Usecases\Client;

use App\Enums\ApplicationCode;
use App\Models\Client;
use App\Usecases\Usecase;

class UpdateClient extends Usecase
{
    public const NOT_FOUND = ApplicationCode::NotFoundModel;

    public function run(
        int $id,
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
    )
    {
        $ret = Client::where('client_id', $id)->update([
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

        if (!$ret) {
          return [
            'code' => self::NOT_FOUND
          ];
        }
        return [
          'data' => [],
          'code' => self::SUCCESS
        ];
    }
}
