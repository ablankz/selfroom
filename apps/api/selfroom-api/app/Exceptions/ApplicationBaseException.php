<?php

namespace App\Exceptions;

use App\Enums\ApplicationCode;
use Exception;

abstract class ApplicationBaseException extends Exception
{
  private int $statusCode;
  private ApplicationCode $applicationCode;
  private array $headers;

  /**
   * @param ApplicationCode $applicationCode アプリケーション用エラーコード
   * @param \Throwable|null $previous
   * @param array $headers
   * @param int $code
   */
  public function __construct(ApplicationCode $applicationCode, \Throwable $previous = null, array $headers = [], int $code = 0)
  {
    $this->statusCode = $applicationCode->getStatus();
    $this->headers = $headers;
    $this->applicationCode = $applicationCode;

    parent::__construct($applicationCode->getText(), $code, $previous);
  }

  public function getStatusCode(): int
  {
    return $this->statusCode;
  }

  public function getApplicationCode(): ApplicationCode
  {
    return $this->applicationCode;
  }

  public function getHeaders(): array
  {
    return $this->headers;
  }

  /**
   * @return void
   */
  public function setHeaders(array $headers)
  {
    $this->headers = $headers;
  }
}
