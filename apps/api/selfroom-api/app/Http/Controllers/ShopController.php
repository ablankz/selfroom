<?php

namespace App\Http\Controllers;

use App\Http\Requests\Shop\StoreShopRequest;
use App\Http\Requests\Shop\UpdateShopRequest;
use App\Services\ShopService;
use Illuminate\Http\JsonResponse;

class ShopController extends Controller
{
  protected $service;

  public function __construct(ShopService $service)
  {
    $this->service = $service;
  }

  public function find(int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['shopId' => $id]
    ));
  }

  public function findAll(): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'findAll']
    ));
  }

  public function create(StoreShopRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [...$request->all()]
    ));
  }

  public function update(UpdateShopRequest $request, int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'update'],
      [...$request->all(), 'shopId' => $id]
    ));
  }

  public function delete(int $id): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'delete'],
      ['shopId' => $id]
    ));
  }
}
