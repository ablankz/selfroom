<?php

namespace App\Constants;

class ThrottleSettings
{
  public const LOGIN_MAX_ATTEMPTS = 5;
  public const LOGIN_DECAY_SECONDS = 180;

  public const WHOLE_MAX_ATTEMPTS = 60;
  public const WHOLE_DECAY_MINUTES = 1;
}
