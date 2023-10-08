<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends ApiRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get data to be validated from the request.
   *
   * @return array
   */
  public function validationData()
  {
    return [
      ...$this->only(['name', 'profilePhotoUrl', 'loginId', 'password']),
      'password_confirmation' => $this->get('confirmPassword')
    ];
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
   */
  public function rules(): array
  {
    return [
      'name' => ['required', 'string'],
      'profilePhotoUrl' => ['file', 'max:10240', 'mimes:jpg,jpeg,png,gif'],
      'loginId' => ['required', 'string', 'unique:App\Models\Account,login_id'],
      'password' => ['required', 'string', new Password(6), 'confirmed'],
    ];
  }
}
