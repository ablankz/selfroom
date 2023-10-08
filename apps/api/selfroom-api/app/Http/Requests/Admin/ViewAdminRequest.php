<?php

namespace App\Http\Requests\Admin;

use App\Enums\Role\AdminRole;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Facades\Gate;

class ViewAdminRequest extends ApiRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Gate::check(AdminRole::View->value);
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
   */
  public function rules(): array
  {
    return [];
  }
}
