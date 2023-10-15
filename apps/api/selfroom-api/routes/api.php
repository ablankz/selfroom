<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
  Route::post('login', \App\Http\Controllers\Account\LoginAction::class)->middleware('guest:jwt');
  Route::post('me', \App\Http\Controllers\Account\RetrieveAction::class)->middleware('auth:jwt');
  Route::post('logout', \App\Http\Controllers\Account\LogoutAction::class)->middleware('auth:jwt');
  Route::post('refresh', \App\Http\Controllers\Account\RefreshTokenAction::class);
  Route::get('{provider}', \App\Http\Controllers\Account\OAuthRedirectAction::class)
    ->where('provider', '(google)|(line)')->middleware('guest:jwt');
  Route::get('/{provider}/callback', \App\Http\Controllers\Account\OAuthHandleCallbackAction::class)
    ->where('provider', '(google)|(line)');
});

Route::prefix('users')->group(function () {
  Route::get('{userId}', [\App\Http\Controllers\UserController::class, 'find']);
  Route::get('', [\App\Http\Controllers\UserController::class, 'get']);
  Route::post('', [\App\Http\Controllers\UserController::class, 'create'])->middleware(['guest:jwt']);
  Route::put('', [\App\Http\Controllers\UserController::class, 'update'])->middleware(['auth:jwt', 'user:jwt']);
  Route::delete('', [\App\Http\Controllers\UserController::class, 'delete'])->middleware(['auth:jwt', 'user:jwt']);
  Route::prefix('{userId}')->group(function () {
    Route::get('followees', [\App\Http\Controllers\FollowController::class, 'getFollowees']);
    Route::get('followers', [\App\Http\Controllers\FollowController::class, 'getFollowers']);
    Route::post('follows', [\App\Http\Controllers\FollowController::class, 'add'])->middleware(['auth:jwt', 'user:jwt']);
    Route::delete('follows', [\App\Http\Controllers\FollowController::class, 'cancel'])->middleware(['auth:jwt', 'user:jwt']);
  });
});

Route::prefix('admins')->group(function () {
  Route::get('{adminId}', [\App\Http\Controllers\AdminController::class, 'find'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::get('', [\App\Http\Controllers\AdminController::class, 'get'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::post('', [\App\Http\Controllers\AdminController::class, 'create'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::put('', [\App\Http\Controllers\AdminController::class, 'update'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::delete('', [\App\Http\Controllers\AdminController::class, 'delete'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::prefix('{adminId}/permissions')->group(function () {
    Route::post('', [\App\Http\Controllers\AdminRoleController::class, 'grant'])->middleware(['auth:jwt', 'admin:jwt']);
    Route::delete('', [\App\Http\Controllers\AdminRoleController::class, 'revoke'])->middleware(['auth:jwt', 'admin:jwt']);
    Route::delete('all', [\App\Http\Controllers\AdminRoleController::class, 'revokeAll'])->middleware(['auth:jwt', 'admin:jwt']);
  });
});

Route::prefix('room-categories')->group(function () {
  Route::get('{roomCategoryId}', [\App\Http\Controllers\RoomCategoryController::class, 'find']);
  Route::get('', [\App\Http\Controllers\RoomCategoryController::class, 'get']);
  Route::post('', [\App\Http\Controllers\RoomCategoryController::class, 'create'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::put('{roomCategoryId}', [\App\Http\Controllers\RoomCategoryController::class, 'update'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::delete('{roomCategoryId}', [\App\Http\Controllers\RoomCategoryController::class, 'delete'])->middleware(['auth:jwt', 'admin:jwt']);
});

Route::prefix('roles')->group(function () {
  Route::get('{roleId}', [\App\Http\Controllers\RoleController::class, 'find'])->middleware(['auth:jwt', 'admin:jwt']);
  Route::get('', [\App\Http\Controllers\RoleController::class, 'get'])->middleware(['auth:jwt', 'admin:jwt']);
});

Route::prefix('chat-rooms')->group(function () {
  Route::get('{chatRoomId}', [\App\Http\Controllers\ChatRoomController::class, 'find'])->middleware(['auth:jwt', 'user:jwt']);
  Route::get('', [\App\Http\Controllers\ChatRoomController::class, 'get'])->middleware(['auth:jwt', 'user:jwt']);
  Route::post('', [\App\Http\Controllers\ChatRoomController::class, 'create'])->middleware(['auth:jwt', 'user:jwt']);
  Route::prefix('{chatRoomId}/chats')->group(function () {
    Route::get('', [\App\Http\Controllers\ChatController::class, 'get'])->middleware(['auth:jwt', 'user:jwt', 'can:viewAny,App\Models\Chat,chatRoomId']);
    Route::get('{chatId}', [\App\Http\Controllers\ChatController::class, 'find'])->middleware(['auth:jwt', 'user:jwt', 'can:view,chatId,chatRoomId']);
    Route::post('', [\App\Http\Controllers\ChatController::class, 'create'])->middleware(['auth:jwt', 'user:jwt', 'can:create,App\Models\Chat,chatRoomId']);
    Route::put('{chatId}', [\App\Http\Controllers\ChatController::class, 'update'])->middleware(['auth:jwt', 'user:jwt', 'can:update,chatId,chatRoomId']);
    Route::delete('{chatId}', [\App\Http\Controllers\ChatController::class, 'delete'])->middleware(['auth:jwt', 'user:jwt', 'can:delete,chatId,chatRoomId']);
  });
  Route::post('in/{chatRoomId}', [\App\Http\Controllers\RoomVisitController::class, 'in'])->middleware(['auth:jwt', 'user:jwt']);
  Route::post('out', [\App\Http\Controllers\RoomVisitController::class, 'out'])->middleware(['auth:jwt', 'user:jwt']);
  Route::prefix('{chatRoomId}')->group(function () {
    Route::post('favorites', [\App\Http\Controllers\FavoriteController::class, 'add'])->middleware(['auth:jwt', 'user:jwt']);
    Route::delete('favorites', [\App\Http\Controllers\FavoriteController::class, 'cancel'])->middleware(['auth:jwt', 'user:jwt']);
  });
});

// リスト関連の絞り込みやオーダーなど

// リスト関連のページネーション、カーソルページネーション

// websocket