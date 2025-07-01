<?php

namespace App\Http\Requests\Admin\Plugin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class PluginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку прав доступа
        // if ($this->isMethod('POST')) return $this->user()->can('create plugins');
        // if ($this->isMethod('PUT') || $this->isMethod('PATCH')) return $this->user()->can('update', $this->route('plugin'));
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Получаем ID плагина из маршрута (предполагаем имя параметра 'plugin')
        $pluginId = $this->route('plugin')?->id ?? null;

        return [
            'sort' => 'nullable|integer|min:0', // Добавлено min:0
            'activity' => 'required|boolean',
            'icon' => 'nullable|string|max:65535', // Увеличено max для TEXT
            'name' => [
                'required',
                'string',
                'max:255',
                // Уникальность name глобальная
                Rule::unique('plugins', 'name')->ignore($pluginId),
            ],
            'version' => 'nullable|string|max:255',
            'code' => [
                'nullable', // Или 'required', если код обязателен
                'string',
                'max:255',
                'regex:/^[a-z0-9_]+$/i', // Пример: буквы, цифры, подчеркивание (регистронезависимо)
                // TODO: Раскомментировать, если 'code' должен быть уникальным
                // Rule::unique('plugins', 'code')->ignore($pluginId),
            ],
            // Используем правило 'json' для валидации JSON строки
            'options' => 'nullable|json', // <--- ИСПРАВЛЕНО
            'description' => 'nullable|string|max:65535', // Увеличено max для TEXT
            'readme' => 'nullable|string', // Убрано max
            'templates' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests/PluginRequest');
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'activity' => filter_var($this->input('activity'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
        ]);

        // Если options приходят не как JSON строка, а как массив/объект из Vue,
        // Laravel FormRequest обычно сам преобразует их для валидации 'json'.
        // Если же приходит строка, но не JSON, правило 'json' выдаст ошибку.
        // Дополнительная подготовка здесь обычно не нужна для 'options'.
    }
}
