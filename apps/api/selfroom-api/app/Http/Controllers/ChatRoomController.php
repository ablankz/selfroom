<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatRoom\StoreChatRoomRequest;
use App\Services\ChatRoomService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
  protected $service;

  public function __construct(ChatRoomService $service)
  {
    $this->service = $service;
  }

  public function find(string $chatRoomId): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'find'],
      ['chat_room_id' => $chatRoomId]
    ));
  }

  public function get(Request $request): JsonResponse
  {
    $limit = $request->limit ? max((int)urldecode($request->limit), 0) : 100;
    $offset = $request->offset ? max((int)urldecode($request->offset), 0) : 0;
    // update | create | in | favorite | name | active(30分以内のコメント数) | chat
    $order = $request->order ? urldecode($request->order) : "update";
    $order_opt = $request->order_opt ? urldecode($request->order_opt) : "asc";
    // 検索タイプ(name(name部分一致) | id(id完全一致))
    $search_type = $request->search_type ? urldecode($request->search_type) : "name";
    // 検索
    $search = $request->search ? urldecode($request->search) : "";
    // ルームキーありか(true | false | all)
    $is_lock = $request->is_lock ? urldecode($request->is_lock) : "all";
    // お気に入りか(all | true)
    $is_favorite = $request->is_favorite ? urldecode($request->is_favorite) : "all";
    // カテゴリー(aaa+bbb+・・・)
    $categories = $request->categories ? array_unique(explode("+", urldecode(str_replace(" ", "%2B", $request->categories)))) : [];

    return response()->success(app()->call(
      [$this->service, 'get']
    ));
  }

  public function create(StoreChatRoomRequest $request): JsonResponse
  {
    return response()->success(app()->call(
      [$this->service, 'create'],
      [
        'name' => $request->get('name'),
        'categories' => $request->get('categories'),
        'cover_photo_url' => $request->file('coverPhoto'),
        'room_key' => $request->get('roomKey')
      ]
    ));
  }
}
