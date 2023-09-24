<?php

namespace App\Services;

use App\Usecases\Shop\CreateShop;
use App\Usecases\Shop\DeleteShop;
use App\Usecases\Shop\GetAllShops;
use App\Usecases\Shop\GetShop;
use App\Usecases\Shop\UpdateShop;

class ShopService
{
    public function find(GetShop $usecase, int $shopId)
    {
        return $usecase->handle($shopId);
    }

    public function findAll(GetAllShops $usecase)
    {
        return $usecase->handle();
    }

    public function create(
        CreateShop $usecase,
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
        UpdateShop $usecase,
        int $shopId,
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
            $shopId,
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

    public function delete(DeleteShop $usecase, int $shopId)
    {
        return $usecase->handle($shopId);
    }
}
