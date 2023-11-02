<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Storage;

if (!function_exists('get_file_full_path')) {

  function get_file_full_path(string $file): string
  {
    return config('filesystems.default') === 'local' ? config('app.url') . Storage::url($file) : Storage::url($file);
  }
}
