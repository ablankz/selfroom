<?php

namespace App\Http\Requests\Admin;

use App\Enums\Role\AdminRole;
use App\Http\Requests\ApiRequest;
use App\Rules\SingleByteCharRule;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rules\Password;

class StoreAdminRequest extends ApiRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Gate::check(AdminRole::Create->value);
  }

  /**
   * Get data to be validated from the request.
   *
   * @return array
   */
  public function validationData()
  {
    return [
      ...$this->only(['nickname', 'profilePhoto', 'loginId', 'password']),
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
      'profilePhoto' => ['file', 'max:10240', 'mimes:jpg,jpeg,png,gif'],
      'loginId' => ['required', 'string', 'unique:App\Models\Account,login_id', new SingleByteCharRule],
      'password' => ['required', 'string', $passRule->symbols()->numbers(), 'confirmed'],
    ];
  }
}
