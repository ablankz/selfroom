<?php

namespace App\Http\Controllers;

use App\Services\FollowService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FollowController extends Controller
{
  protected $service;

  public function __construct(FollowService $service)
  {
    $this->service = $service;
  }

  public function add(Request $request, string $userId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'add'],
      [
        'follower_id' => $request->user()->user_id,
        'followee_id' => $userId
      ]
    ));
  }

  public function cancel(Request $request, string $userId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'cancel'],
      [
        'follower_id' => $request->user()->user_id,
        'followee_id' => $userId
      ]
    ));
  }
}
