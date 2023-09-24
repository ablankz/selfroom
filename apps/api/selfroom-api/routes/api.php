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
  Route::post('login', \App\Http\Controllers\Account\LoginAction::class);
  Route::post('user', \App\Http\Controllers\Account\RetrieveAction::class)->middleware('auth:jwt');
  Route::post('logout', \App\Http\Controllers\Account\LogoutAction::class)->middleware('auth:jwt');
  Route::post('refresh', \App\Http\Controllers\Account\RefreshTokenAction::class);
  // ソーシャルログイン
  Route::get('{provider}', \App\Http\Controllers\Account\OAuthRedirectAction::class)
    ->where('provider', '(google)|(line)');
  Route::get('/{provider}/callback', App\Http\Controllers\Account\OAuthHandleCallbackAction::class)
    ->where('provider', '(google)|(line)');
});

Route::prefix('clients')->group(function () {
  Route::get('{id}', [\App\Http\Controllers\ClientController::class, 'find']);
  Route::get('', [\App\Http\Controllers\ClientController::class, 'findAll']);
  Route::post('', [\App\Http\Controllers\ClientController::class, 'create']);
  Route::put('{id}', [\App\Http\Controllers\ClientController::class, 'update']);
  Route::delete('{id}', [\App\Http\Controllers\ClientController::class, 'delete']);
});

Route::prefix('shops')->group(function () {
  Route::get('{id}', [\App\Http\Controllers\ShopController::class, 'find']);
  Route::get('', [\App\Http\Controllers\ShopController::class, 'findAll']);
  Route::post('', [\App\Http\Controllers\ShopController::class, 'create']);
  Route::put('{id}', [\App\Http\Controllers\ShopController::class, 'update']);
  Route::delete('{id}', [\App\Http\Controllers\ShopController::class, 'delete']);
});

Route::prefix('partners')->group(function () {
  Route::get('{id}', [\App\Http\Controllers\PartnerController::class, 'find']);
  Route::get('', [\App\Http\Controllers\PartnerController::class, 'findAll']);
  Route::post('', [\App\Http\Controllers\PartnerController::class, 'create']);
  Route::put('{id}', [\App\Http\Controllers\PartnerController::class, 'update']);
  Route::delete('{id}', [\App\Http\Controllers\PartnerController::class, 'delete']);
});

Route::get('error', function () {
  throw new \App\Exceptions\ApplicationException(\App\Enums\ApplicationCode::TokenMismatch);
});
