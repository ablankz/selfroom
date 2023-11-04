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

  protected function prepareForValidation()
  {
    parent::prepareForValidation();

    $categories = $this->get('categories');
    $categoriesValue = $categories;

    if (is_string($categories)) {
      $categoriesArray = explode(",", $categories);

      $isNumeric = true;
      foreach ($categoriesArray as $category) {
        if (!is_numeric($category)) {
          $isNumeric = false;
          break;
        }
      }

      if ($isNumeric) {
        $categoriesValue = array_map('intval', $categoriesArray);
      }
    }else if(is_null($categoriesValue)){
      $categoriesValue = [];
    }

    $this->merge(['categories' => array_unique($categoriesValue)]);
  }

  public function validationData()
  {
    return [
      'chatRoomName' => $this->get('name'),
      'chatRoomCategories' => $this->get('categories'),
    ];
  }


  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
   */
  public function rules(): array
  {
    return [
      'chatRoomName' => ['required', 'string'],
      'chatRoomCategories' => ['required', 'array', 'min:' . RoomTags::ROOM_MIN_TAGS, 'max:' . RoomTags::ROOM_MAX_TAGS],
      'chatRoomCategories.*' => ['numeric', 'integer', 'exists:m_room_categories,room_category_id'],
      'coverPhoto' => ['file', 'max:10240', 'mimes:jpg,jpeg,png,gif'],
      'roomKey' => ['string']
    ];
  }
}
