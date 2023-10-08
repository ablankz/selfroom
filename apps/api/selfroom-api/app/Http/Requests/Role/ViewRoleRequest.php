<?php

namespace App\Http\Requests\Role;

use App\Enums\Role\PermissionRole;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Facades\Gate;

class ViewRoleRequest extends ApiRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Gate::check(PermissionRole::View->value);
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
