<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class fileRequest extends FormRequest
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
            'file' => 'mimes:pdf,docx,jpeg,png,jpg,gif,zip,rar,exe,jfif,txt,pptx|max:10240'
        ];
    }
    public function messages()
    {
        return [
            'file.mimes' => 'Le type du fichier n\est pas supporté !',
            'file.max' => 'La taille du fichier ne peut pas dépasser 10Mo'
        ];
    }
}
