<?php

namespace App\Http\Controllers;

use App\Http\Requests\Partner\StorePartnerRequest;
use App\Http\Requests\Partner\UpdatePartnerRequest;
use App\Services\PartnerService;
use Illuminate\Http\JsonResponse;

class PartnerController extends Controller
{
  protected $service;

  public function __construct(PartnerService $service)
  {
    $this->service = $service;
  }

  public function find(int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['partnerId' => $id]
    ));
  }

  public function findAll(): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'findAll']
    ));
  }

  public function create(StorePartnerRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [...$request->all()]
    ));
  }

  public function update(UpdatePartnerRequest $request, int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [...$request->all(), 'partnerId' => $id]
    ));
  }

  public function delete(int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      ['partnerId' => $id]
    ));
  }
}
