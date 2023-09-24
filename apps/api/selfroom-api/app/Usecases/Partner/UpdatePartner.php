<?php

namespace App\Usecases\Partner;

use App\Enums\ApplicationCode;
use App\Models\Partner;
use App\Usecases\Usecase;

class UpdatePartner extends Usecase
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
        bool $is_open
    )
    {
        $ret = Partner::where('partner_id', $id)->update([
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
