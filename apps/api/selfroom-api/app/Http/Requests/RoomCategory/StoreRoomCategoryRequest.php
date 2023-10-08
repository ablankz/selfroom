<?php

namespace App\Http\Requests\RoomCategory;

use App\Enums\Role\CategoryRole;
use App\Http\Requests\ApiRequest;
use Illuminate\Support\Facades\Gate;

class StoreRoomCategoryRequest extends ApiRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return Gate::check(CategoryRole::Create->value);
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
    ];
  }
}
