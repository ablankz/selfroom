<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SingleByteAllCharRule implements ValidationRule
{
  /**
   * Run the validation rule.
   *
   * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
   */
  public function validate(string $attribute, mixed $value, Closure $fail): void
  {
    if (!preg_match('/^[a-zA-Z0-9!-\/:-@¥[-`{-~\s]+$/', $value)) {
      $fail(__('validation.single-char'));
    }
  }
}
