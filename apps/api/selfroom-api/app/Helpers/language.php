<?php

declare(strict_types=1);

if (!function_exists('get_lang')) {

  function get_lang(): string
  {
    return request()->headers->get('X-Sr-Language', 'en');
  }
}
