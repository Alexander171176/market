<?php

namespace App\Http\Requests\Admin\Setting;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class UpdateLocaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Разрешаем ЛЮБОМУ АУТЕНТИФИЦИРОВАННОМУ пользователю выполнять этот запрос.
     */
    public function authorize(): bool
    {
        // Метод auth()->check() проверяет, аутентифицирован ли пользователь.
        // Если да, возвращаем true, если нет (гость), возвращаем false.
        // Middleware 'auth:sanctum' на самом маршруте уже не пропустит гостя.
        // return auth()->check();

        // Или можно просто оставить return true;, т.к. middleware 'auth:sanctum'
        // уже гарантирует, что пользователь аутентифицирован, если запрос дошел сюда.
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
            // TODO: Убедитесь, что список локалей актуален
            'locale' => ['required', 'string', 'size:2', Rule::in(['ru', 'en', 'kz'])],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests/UpdateLocaleRequest');
    }
}
