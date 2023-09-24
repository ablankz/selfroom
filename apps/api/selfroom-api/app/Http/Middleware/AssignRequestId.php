<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Constants\ApplicationHeaders;

class AssignRequestId
{
  /**
   * 受信リクエストの処理
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $requestId = (string) Str::uuid();

    Log::withContext([
      'request-id' => $requestId
    ]);

    $request->headers->set(ApplicationHeaders::REQUEST_ID_HEADER, $requestId);

    return $next($request);
  }
}
