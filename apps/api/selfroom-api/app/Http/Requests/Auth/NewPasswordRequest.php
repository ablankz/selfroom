<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiRequest;

class NewPasswordRequest extends ApiRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    public function validationData()
    {
        return [
            ...$this->only(['token', 'email', 'password']),
            'password_confirmation' => $this->get('confirmPassword')
        ];
    }

    // /**
    //  * Get the validation rules that apply to the request.
    //  *
    //  * @return array<string, mixed>
    //  */
    // public function rules()
    // {
    //     return [
    //         'token' => ['required'],
    //         'email' => ['required', 'email'],
    //         'password' => $this->passwordRules()
    //     ];
    // }

    // public function messages()
    // {
    //     return [
    //         'email.required' => 'メールアドレスが入力されていません',
    //         'email.email' => 'メールアドレスの形式で入力してください',
    //     ];
    // }
}
