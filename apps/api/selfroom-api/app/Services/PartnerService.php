<?php

namespace App\Services;

use App\Usecases\Partner\CreatePartner;
use App\Usecases\Partner\DeletePartner;
use App\Usecases\Partner\GetAllPartners;
use App\Usecases\Partner\GetPartner;
use App\Usecases\Partner\UpdatePartner;

class PartnerService
{
    public function find(GetPartner $usecase, int $partnerId)
    {
        return $usecase->handle($partnerId);
    }

    public function findAll(GetAllPartners $usecase)
    {
        return $usecase->handle();
    }

    public function create(
        CreatePartner $usecase,
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
        return $usecase->handle(
            $name,
            $address,
            $mailaddress,
            $site_url,
            $tel,
            $fax,
            $charge,
            $plan,
            $is_open
        );
    }

    public function update(
        UpdatePartner $usecase,
        int $partnerId,
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
        return $usecase->handle(
            $partnerId,
            $name,
            $address,
            $mailaddress,
            $site_url,
            $tel,
            $fax,
            $charge,
            $plan,
            $is_open
        );
    }

    public function delete(DeletePartner $usecase, int $partnerId)
    {
        return $usecase->handle($partnerId);
    }
}
