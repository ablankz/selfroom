<?php

namespace App\Http\Controllers;

use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Services\ClientService;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
  protected $service;

  public function __construct(ClientService $service)
  {
    $this->service = $service;
  }

  public function find(int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['clientId' => $id]
    ));
  }

  public function findAll(): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'findAll']
    ));
  }

  public function create(StoreClientRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [...$request->all()]
    ));
  }

  public function update(UpdateClientRequest $request, int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [...$request->all(), 'clientId' => $id]
    ));
  }

  public function delete(int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      ['clientId' => $id]
    ));
  }
}
