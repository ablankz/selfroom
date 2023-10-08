<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;

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
  // ソーシャルログイン
  Route::get('{provider}', \App\Http\Controllers\Account\OAuthRedirectAction::class)
    ->where('provider', '(google)|(line)')->middleware('guest:jwt');
  Route::get('/{provider}/callback', \App\Http\Controllers\Account\OAuthHandleCallbackAction::class)
    ->where('provider', '(google)|(line)');
});

Route::prefix('users')->group(function () {
  Route::get('{uuid}', [\App\Http\Controllers\UserController::class, 'find']);
  Route::get('', [\App\Http\Controllers\UserController::class, 'get']);
  Route::post('', [\App\Http\Controllers\UserController::class, 'create'])->middleware('guest:jwt');
  Route::put('', [\App\Http\Controllers\UserController::class, 'update'])->middleware('auth:jwt');
  Route::delete('', [\App\Http\Controllers\UserController::class, 'delete'])->middleware('auth:jwt');
});

Route::prefix('admins')->group(function () {
  Route::get('{uuid}', [\App\Http\Controllers\AdminController::class, 'find']);
  Route::get('', [\App\Http\Controllers\AdminController::class, 'get']);
  Route::post('', [\App\Http\Controllers\AdminController::class, 'create'])->middleware(['auth:jwt']);
  Route::put('', [\App\Http\Controllers\AdminController::class, 'update'])->middleware('auth:jwt');
  Route::delete('', [\App\Http\Controllers\AdminController::class, 'delete'])->middleware('auth:jwt');
});