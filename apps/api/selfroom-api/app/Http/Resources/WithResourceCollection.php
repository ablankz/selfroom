<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class WithResourceCollection extends ResourceCollection
{
  protected $resourceClass;

  public function __construct($resource, $resourceClass)
  {
    parent::__construct($resource);

    $this->resourceClass = $resourceClass;
  }

  /**
   * Transform the resource collection into an array.
   *
   * @return array<int|string, mixed>
   */
  public function toArray(Request $request): array
  {
    $data = $this->createResourceCollection();
    unset($this->resource['data']);
    return [
      'data' => $data,
      ...convert_array_key_camel_case($this->resource)
    ];
  }

  public function boot(): void
  {
    JsonResource::withoutWrapping();
  }

  public function createResourceCollection(): ResourceCollection
  {
    $class = '\\' . ltrim($this->resourceClass, '\\');
    return new $class($this->resource['data']);
  }
}
