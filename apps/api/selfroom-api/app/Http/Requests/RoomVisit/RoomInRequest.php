<?php

namespace App\Http\Requests\RoomVisit;

use App\Http\Requests\ApiRequest;

class RoomInRequest extends ApiRequest
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
      'keyword' => ['string'],
    ];
  }
}
