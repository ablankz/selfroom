<?php

namespace App\Usecases;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use App\Exceptions\ApplicationLoggerException;

abstract class Usecase
{
  public const SUCCESS = ApplicationCode::Success;

  public function handle(...$args)
  {
    if (method_exists($this, 'run')) {
      $ret = $this->run(...$args);
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
