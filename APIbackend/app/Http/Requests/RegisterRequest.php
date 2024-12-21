<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|min:4',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'password_confirm' => 'required|same:password',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Le champ nom est requis',
            'email.email' => 'Veuillez entrer un E-mail valide',
            'name.min' => 'Le nom doit contenir au moins 4 caractères',
            'email.required' => 'Le champ E-mail est requis',
            'email.max'=> 'L\Email peut contenir au plus 255 caractères',
            'email.unique' => 'Cet E-mail existe déjà',
            'password.required' => 'Le champ mot de passe est requis',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            'password_confirm.required' => 'Le champ mot de passe de confirmation est requis',
            'password_confirm.same' => 'Les deux mots de passes ne sont pas identiques',
            'avatar.mimes' => 'Le format de la photo n/est pas valide',
            'avatar.max' => 'Veuillez une photo de taille inférieur ou égal à 2048mpx'
            

        ];
    }
}
