<?php

namespace App\Exceptions;

use App\Enums\ApplicationCode;

class ApplicationValidationException extends ApplicationBaseException
{
  private array $validationMessages;

  /**
   * @param ApplicationCode $applicationCode アプリケーション用エラーコード
   * @param array $validationMessages バリデーション用メッセージ配列
   * @param \Throwable|null $previous
   * @param array $headers
   * @param int $code
   */
  public function __construct(ApplicationCode $applicationCode, array $validationMessages, \Throwable $previous = null, array $headers = [], int $code = 0)
  {
    $this->validationMessages = $validationMessages;

    parent::__construct($applicationCode, $previous, $headers, $code);
  }

  public function getValidationMsg(): array
  {
    return $this->validationMessages;
  }
}
