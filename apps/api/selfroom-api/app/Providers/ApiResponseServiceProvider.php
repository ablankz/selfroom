<?php

namespace App\Providers;

use App\Enums\ApplicationCode;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Arr;
use Throwable;

class ApiResponseServiceProvider extends ServiceProvider
{
  /**
   * Register services.
   *
   * @return void
   */
  public function register()
  {
    //
  }

  /**
   * Bootstrap services.
   *
   * @return void
   */
  public function boot()
  {
    // success
    Response::macro('success', function ($data = [], $statusCode = HttpResponse::HTTP_OK) {
      return response()->json([
        'success'  => true,
        'data' => $data,
        'code' => ApplicationCode::Success,
        'message' => __("response.". ApplicationCode::Success->getText()),
        'errorAttributes' => [], // エラー用
      ], $statusCode);
    });

    Response::macro('error', function (Throwable $e, ApplicationCode $errorCode, $headers = [], array $errors = []) {
      $data = config('app.debug') ? [
        'success'  => false,
        'data' => null,
        'code' => $errorCode->value,
        'message' => __("response.{$errorCode->getText()}"),
        'errorAttributes' => $errors, // エラー用
        '_debugMessage' => $e->getMessage(),
        '_exception' => get_class($e),
        '_file' => $e->getFile(),
        '_line' => $e->getLine(),
        '_trace' => collect($e->getTrace())->map(fn ($trace) => Arr::except($trace, ['args']))->all(),
      ] :  [
        'success'  => false,
        'data' => null,
        'code' => $errorCode->value,
        'message' => $errorCode->getText(),
        'errorAttributes' => $errors // エラー用
      ];
      return response()->json(
        $data,
        $errorCode->getStatus(),
        $headers,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES
      );
    });
  }
}
