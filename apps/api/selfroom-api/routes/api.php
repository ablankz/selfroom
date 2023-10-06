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
  Route::post('user', \App\Http\Controllers\Account\RetrieveAction::class)->middleware('auth:jwt');
  Route::post('logout', \App\Http\Controllers\Account\LogoutAction::class)->middleware('auth:jwt');
  Route::post('refresh', \App\Http\Controllers\Account\RefreshTokenAction::class);
  // ソーシャルログイン
  Route::get('{provider}', \App\Http\Controllers\Account\OAuthRedirectAction::class)
    ->where('provider', '(google)|(line)')->middleware('guest:jwt');
  Route::get('/{provider}/callback', App\Http\Controllers\Account\OAuthHandleCallbackAction::class)
    ->where('provider', '(google)|(line)');
});

// Route::prefix('clients')->group(function () {
//   Route::get('{id}', [\App\Http\Controllers\ClientController::class, 'find']);
//   Route::get('', [\App\Http\Controllers\ClientController::class, 'findAll']);
//   Route::post('', [\App\Http\Controllers\ClientController::class, 'create']);
//   Route::put('{id}', [\App\Http\Controllers\ClientController::class, 'update']);
//   Route::delete('{id}', [\App\Http\Controllers\ClientController::class, 'delete']);
// });