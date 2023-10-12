<?php

namespace App\Http\Requests\ChatRoom;

use App\Constants\RoomTags;
use App\Http\Requests\ApiRequest;

class StoreChatRoomRequest extends ApiRequest
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
      'name' => ['required', 'string'],
      'categories' => ['required', 'array', 'min:'. RoomTags::ROOM_MIN_TAGS, 'max:' . RoomTags::ROOM_MAX_TAGS ],
      'categories.*' => ['numeric', 'integer', 'exists:App\Models\RoomCategories,room_category_id'],
      'coverPhoto' => ['file', 'max:10240', 'mimes:jpg,jpeg,png,gif'],
      'roomKey' => ['string']
    ];
  }
}
