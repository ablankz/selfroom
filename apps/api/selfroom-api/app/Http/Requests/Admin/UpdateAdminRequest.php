<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\ApiRequest;

class UpdateAdminRequest extends ApiRequest
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
      'profilePhoto' => ['file', 'max:10240', 'mimes:jpg,jpeg,png,gif'],
    ];
  }
}
