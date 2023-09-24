<?php

namespace App\Http\Requests;

use App\Enums\ApplicationCode;
use App\Exceptions\ApplicationException;
use App\Exceptions\ApplicationValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Foundation\Precognition;

class ApiRequest extends FormRequest
{
  protected $presetErrors = [];
  /**
   * @var array キャストルール
   */
  protected $casts = [];

  /**
   * パラメータ前後の空白等を削除
   * @param mixed $target
   * @return array|string|null
   */
  private function trim($target)
  {
    if (is_null($target)) {
      return null;
    }
    if (!is_array($target)) {
      return trim($target);
    }
    $trimmed = [];
    foreach ($target as $value) {
      $trimmed[] = trim($value);
    }
    return $trimmed;
  }

  /**
   * パターンに応じてキャストする
   * @param string $key
   * @param mixed $target
   * @return bool|int|array|string|mixed
   */
  private function cast(string $key, $target)
  {
    switch ($this->casts[$key]) {
      case 'integer':
        return (int)$target;
        break;

      case 'bool':
        if ($target === 'true') {
          return true;
        }
        if ($target === 'false') {
          return false;
        }
        $this->presetErrors[$key] = "{$key}はbool型である必要があります";
        return false;

      case 'json_decode':
        return json_decode($target, true);
        break;

      case 'string':
      default:
        return $target;
    }
  }

  protected function prepareForValidation()
  {
    foreach ($this->casts as $key => $_val) {
      $target = $this->trim($this->get($key, null));
      if (!isset($this->casts[$key])) {
        return $target;
      }
      $this->merge([$key => $this->cast($key, $target)]);
    }
  }

  public function after(): array
  {
    return [
      function (Validator $validator) {
        foreach ($this->presetErrors as $key => $message) {
          $validator->errors()->add(
            $key,
            $message
          );
        }
      }
    ];
  }

  public function failedValidation(Validator $validator)
  {
    $errors = $validator->errors()->toArray();
    throw new ApplicationValidationException(ApplicationCode::Validation, $errors);
  }

  /**
   * Handle a failed authorization attempt.
   *
   * @return void
   *
   * @throws \Illuminate\Auth\Access\AuthorizationException
   */
  protected function failedAuthorization()
  {
    throw new ApplicationException(ApplicationCode::Permission);
  }
}
