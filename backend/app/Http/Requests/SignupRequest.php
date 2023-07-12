<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
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
        $rules = [
        'name' => 'required',
        'account' => 'required|unique:users',
        'password' => 'required|min:8',
        'repassword' => 'required|same:password',
        ];
        return $rules;
    }

    public function messages(): array
    {
        $messages = [
            'name.required' => 'Vui lòng nhập họ và tên',
            'account.required' => 'Vui lòng nhập tài khoản',
            'account.unique' => 'Tài khoản đã tồn tại',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu cần có ít nhât :min ký tự',
            'repassword.required' => 'Vui lòng nhập lại mật khẩu',
            'repassword.same' => 'Vui lòng nhập lại đúng mật khẩu',
        ];
        return $messages;
    }
}
