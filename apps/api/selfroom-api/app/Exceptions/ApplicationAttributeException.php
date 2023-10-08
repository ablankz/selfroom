<?php

namespace App\Exceptions;

use App\Enums\ApplicationCode;

class ApplicationAttributeException extends ApplicationBaseException
{
  private array $errorAttributes;

  /**
   * @param ApplicationCode $applicationCode アプリケーション用エラーコード
   * @param array $errorAttributes エラー用属性
   * @param \Throwable|null $previous
   * @param array $headers
   * @param int $code
   */
  public function __construct(ApplicationCode $applicationCode, array $errorAttributes, \Throwable $previous = null, array $headers = [], int $code = 0)
  {
    $this->errorAttributes = $errorAttributes;

    parent::__construct($applicationCode, $previous, $headers, $code);
  }

  public function getErrorAttributes(): array
  {
    return $this->errorAttributes;
  }
}
