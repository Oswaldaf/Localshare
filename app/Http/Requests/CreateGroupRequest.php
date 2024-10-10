<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateGroupRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'group_name' => 'required|string|min:4',
        ];
    }
    public function messages()
    {
        return [
            'group_name.required' => 'Le nom du groupe est requis',
            'group_name.min' => 'Le nom du groupe doit avoir minimum (4) caractères'
        ];
    }
}
