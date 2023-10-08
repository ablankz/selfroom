<?php

namespace App\Http\Requests\User;

use App\Http\Requests\ApiRequest;

class StoreUserRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @var array キャストルール
     */
    protected $casts = [
        'is_open' => 'bool',
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:15'],
            'address' => ['required', 'string'],
            'mailaddress' => ['required', 'string', 'email'],
            'site_url' => ['required', 'string', 'url'],
            'tel' => ['required', 'string'],
            'fax' => ['required', 'string'],
            'charge' => ['required', 'string'],
            'plan' => ['required', 'string'],
            'design' => ['required', 'string'],
            'is_open' => ['required', 'boolean']
        ];
    }
}
