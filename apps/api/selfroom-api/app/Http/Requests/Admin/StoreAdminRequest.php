<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\ApiRequest;
use App\Rules\SingleByteCharRule;
use Illuminate\Validation\Rules\Password;

class StoreAdminRequest extends ApiRequest
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
      ...$this->only(['nickname', 'profilePhotoUrl', 'loginId', 'password']),
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
    $passRule = new Password(8);
    return [
      'nickname' => ['required', 'string'],
      'profilePhotoUrl' => ['file', 'max:10240', 'mimes:jpg,jpeg,png,gif'],
      'loginId' => ['required', 'string', 'unique:App\Models\Account,login_id', new SingleByteCharRule],
      'password' => ['required', 'string', $passRule->symbols()->numbers(), 'confirmed'],
    ];
  }
}
