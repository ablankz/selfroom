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

  public function getFollowers(Request $request, string $userId): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create | name 
    $order = $request->order ? urldecode($request->order) : "create";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";

    return response()->success(app()->call(
      [$this->service, 'getFollowers'],
      [
        'user_id' => $userId,
        'limit' => $limit,
        'offset' => $offset,
        'order' => $order,
        'order_opt' => $order_opt
      ]
    ));
  }

  public function getFollowees(Request $request, string $userId): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // create | name 
    $order = $request->order ? urldecode($request->order) : "create";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";

    return response()->success(app()->call(
      [$this->service, 'getFollowees'],
      [
        'user_id' => $userId
      ]
    ));
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
