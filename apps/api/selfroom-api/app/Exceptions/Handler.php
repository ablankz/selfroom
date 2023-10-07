<?php

namespace App\Exceptions;

use App\Enums\ApplicationCode;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Routing\Router;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Exceptions\PostTooLargeException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Routing\Exceptions\BackedEnumCaseNotFoundException;
use Illuminate\Routing\Exceptions\InvalidSignatureException;
use Illuminate\Routing\Exceptions\StreamedResponseException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpFoundation\Exception\SuspiciousOperationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Throwable;

class Handler extends ExceptionHandler
{
  protected $dontReport = [
    ApplicationException::class,
    ApplicationAttributeException::class
  ];

  /**
   * Register the exception handling callbacks for the application.
   */
  public function register(): void
  {
    //
  }

  /**
   * Prepare exception for rendering.
   *
   * @param  \Throwable  $e
   * @return \Throwable
   */
  protected function prepareException(Throwable $e)
  {
    return match (true) {
      $e instanceof BackedEnumCaseNotFoundException => new ApplicationException(ApplicationCode::NotFound),
      $e instanceof NotFoundHttpException => new ApplicationException(ApplicationCode::NotFound),
      $e instanceof SuspiciousOperationException => new ApplicationException(ApplicationCode::NotFound),
      $e instanceof AuthenticationException => new ApplicationException(ApplicationCode::Unauthorized),
      $e instanceof AuthorizationException => new ApplicationException(ApplicationCode::Unauthorized),
      $e instanceof UnauthorizedException => new ApplicationException(ApplicationCode::Unauthorized),
      $e instanceof AccessDeniedHttpException => new ApplicationException(ApplicationCode::Unauthorized),
      $e instanceof PostTooLargeException => new ApplicationException(ApplicationCode::PostTooLarge),
      $e instanceof ThrottleRequestsException => new ApplicationException(ApplicationCode::ThrottleRequests),
      $e instanceof InvalidSignatureException => new ApplicationException(ApplicationCode::InvalidSignature),
      $e instanceof StreamedResponseException => new ApplicationException(ApplicationCode::StreamedResponse),
      $e instanceof TokenMismatchException => new ApplicationException(ApplicationCode::TokenMismatch),
      $e instanceof MethodNotAllowedHttpException => new ApplicationException(ApplicationCode::MethodNotAllowed),
      $e instanceof TokenBlacklistedException => new ApplicationException(ApplicationCode::TokenBlacklisted),
      default => $e,
    };
  }

  // エラーが投げられたとき+reportしたとき
  public function report(Throwable $e)
  {
    parent::report($e);
  }

  // エラーが投げられたとき
  public function render($request, Throwable $exception)
  {
    if (!$request->is('api/*')) {
      return parent::render($request, $exception);
    } else {
      $e = $this->mapException($exception);

      $headers = $this->isApplicationException($e) ? $e->getHeaders() : [];

      if (method_exists($e, 'render') && $response = $e->render($request)) {
        return Router::toResponse($request, $response);
      }

      if ($e instanceof Responsable) {
        return $e->toResponse($request);
      }

      $e = $this->prepareException($e);

      if ($response = $this->renderViaCallbacks($request, $e)) {
        return $response;
      }

      return match (true) {
        $e instanceof ApplicationAttributeException => response()->error($e, $e->getApplicationCode(), $headers, $e->getValidationMsg()),
        $e instanceof ApplicationBaseException => response()->error($e, $e->getApplicationCode(), $headers),
        default => response()->error($e, ApplicationCode::System, $headers),
      };
    }
  }

    /**
     * Determine if the given exception is an HTTP exception.
     *
     * @param  \Throwable  $e
     * @return bool
     */
    protected function isApplicationException(Throwable $e)
    {
        return $e instanceof ApplicationBaseException;
    }
}
