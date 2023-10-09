<?php

namespace App\Usecases;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationBaseException;
use App\Exceptions\ApplicationException;
use App\Exceptions\ApplicationLoggerException;
use Psr\Log\LogLevel;

abstract class Usecase
{
  public const SUCCESS = ApplicationCode::Success;
  public const DB_ERROR = ApplicationCode::SqlQueryError;

  public function handle(...$args)
  {
    if (method_exists($this, 'run')) {
      try {
        $ret = $this->run(...$args);
      } catch (\Throwable $e) {
        if ($e instanceof ApplicationBaseException) throw $e;
        else throw new ApplicationLoggerException(self::DB_ERROR, LogLevel::CRITICAL, 'Sqlクエリエラー発生');
      }
      switch ($ret['code']) {
        case ApplicationCode::Success:
          return $ret['data'];
        default:
          if (array_key_exists('log', $ret)) throw new ApplicationLoggerException($ret['code'], $ret['log']['level'], $ret['log']['message']);
          throw new ApplicationException($ret['code']);
      }
    }
  }
}
