<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Config;

if (!function_exists('get_lang')) {

  function get_lang(): string
  {
    $lang = request()->headers->get('X-Sr-Language', 'en');
    if (array_key_exists($lang, Config::get('languages'))) {
      return $lang;
    }
    return 'en';
  }
}
