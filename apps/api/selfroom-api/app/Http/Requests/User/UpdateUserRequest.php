<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;

class UpdateUserRequest extends ApiRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
   */
  public function rules(): array
  {
    return [
      'nickname' => ['required', 'string'],
      'profilePhotoUrl' => ['file', 'max:10240', 'mimes:jpg,jpeg,png,gif'],
    ];
  }
}
