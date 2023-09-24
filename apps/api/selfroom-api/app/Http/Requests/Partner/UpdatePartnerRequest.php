<?php

namespace App\Http\Requests\Partner;

use App\Http\Requests\ApiRequest;

class UpdatePartnerRequest extends ApiRequest
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
            'is_open' => ['required', 'boolean']
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '企業名が入力されていません',
            'name.string' => '企業名は文字列である必要があります',
            'name.max' => '企業名は最大15文字です',
        ];
    }
}
