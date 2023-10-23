<?php

namespace App\Http\Requests\AdminRole;

use App\Enums\Role\AdminRole;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Facades\Gate;

class RevokeAdminRoleRequest extends ApiRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Gate::check(AdminRole::ManageRole->value);
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
   */
  public function rules(): array
  {
    return [
      'roles' => ['required', 'array', 'min:1'],
      'roles.*' => ['numeric', 'integer', 'exists:m_room_categories,role_id'],
    ];
  }
}
