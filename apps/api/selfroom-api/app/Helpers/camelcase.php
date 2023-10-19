<?php

declare(strict_types=1);

if (!function_exists('convert_string_camel_case')) {

  function convert_string_camel_case(string $string): string
  {
    return lcfirst(strtr(ucwords(strtr($string, ['_' => ' '])), [' ' => '']));
  }
}

if (!function_exists('convert_array_key_camel_case')) {

  function convert_array_key_camel_case($array): array
  {
      $camelized_array = [];
      foreach ($array as $key => $value) {
          if (
              is_array($value) === true ||
              is_object($value) === true
          ) {
              if (is_numeric($value) === true) {
                  $camelized_array[] = convert_array_key_camel_case($value);
              } else {
                  $camelized_key_name = convert_string_camel_case($key);
                  $camelized_array[$camelized_key_name] = convert_array_key_camel_case($value);
              }
          } else {
              $camelized_key_name = convert_string_camel_case($key);
              $camelized_array[$camelized_key_name] = $value;
          }
      }
      return $camelized_array;
  }
}
