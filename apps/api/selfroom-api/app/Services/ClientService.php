<?php

namespace App\Services;

use App\Usecases\Client\CreateClient;
use App\Usecases\Client\DeleteClient;
use App\Usecases\Client\GetAllClients;
use App\Usecases\Client\GetClient;
use App\Usecases\Client\UpdateClient;

class ClientService
{
    public function find(GetClient $usecase, int $clientId)
    {
        return $usecase->handle($clientId);
    }

    public function findAll(GetAllClients $usecase)
    {
        return $usecase->handle();
    }

    public function create(
        CreateClient $usecase,
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
        return $usecase->handle(
            $name,
            $address,
            $mailaddress,
            $site_url,
            $tel,
            $fax,
            $charge,
            $plan,
            $design,
            $is_open
        );
    }

    public function update(
        UpdateClient $usecase,
        int $clientId,
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
        return $usecase->handle(
            $clientId,
            $name,
            $address,
            $mailaddress,
            $site_url,
            $tel,
            $fax,
            $charge,
            $plan,
            $design,
            $is_open
        );
    }

    public function delete(DeleteClient $usecase, int $clientId)
    {
        return $usecase->handle($clientId);
    }
}
