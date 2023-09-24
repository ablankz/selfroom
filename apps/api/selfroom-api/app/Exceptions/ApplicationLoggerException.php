<?php

namespace App\Exceptions;

use App\Enums\ApplicationCode;
use Exception;
use Psr\Log\LogLevel;
use Illuminate\Support\Facades\Auth;
use Psr\Log\LoggerInterface;
use Throwable;

class ApplicationLoggerException extends ApplicationBaseException
{
  private string $level;
  private string $logMessage;

  /**
   * @param ApplicationCode $applicationCode アプリケーション用エラーコード
   * @param string $level ログレベル
   * @param string $message ログメッセージ
   * @param \Throwable|null $previous 
   * @param array $headers
   * @param int $code
   */
  public function __construct(
    ApplicationCode $applicationCode,
    string $level = LogLevel::ERROR,
    string $message = null,
    \Throwable $previous = null,
    array $headers = [],
    int $code = 0
  ) {
    $this->level = $level;
    $this->logMessage = $message ?? $applicationCode->getText();

    parent::__construct($applicationCode, $previous, $headers, $code);
  }

  public function getLogLevel(): string
  {
    return $this->level;
  }

  public function getLogMessage(): string
  {
    return $this->logMessage;
  }

  public function report()
  {
    try {
      $logger = app()->make(LoggerInterface::class);
    } catch (Exception $e) {
      throw $e;
    }

    try {
      $userContext = array_filter([
        'userId' => Auth::id(),
      ]);
    } catch (Throwable) {
      $userContext = [];
    }

    $context = array_merge(
      $userContext,
      ['exception' => $this]
    );

    method_exists($logger, $this->getLogLevel())
      ? $logger->{$this->getLogLevel()}($this->getLogMessage(), $context)
      : $logger->log($this->getLogLevel(), $this->getLogMessage(), $context);
  }
}
