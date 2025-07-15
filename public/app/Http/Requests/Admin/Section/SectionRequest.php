<?php

namespace App\Http\Requests\Admin\Section;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class SectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку прав доступа
        // Например:
        // if ($this->isMethod('POST')) {
        //     return $this->user()->can('create sections');
        // }
        // if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
        //     return $this->user()->can('update', $this->route('section'));
        // }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Получаем ID секции из маршрута, если это обновление
        $sectionId = $this->route('section')?->id ?? null;

        return [
            'sort' => 'nullable|integer|min:0',
            'activity' => 'required|boolean',
            'icon' => 'nullable|string|max:65535', // Изменено на max:65535, если может быть SVG кодом (text в миграции)
            // 'icon_file' => ['nullable', 'image', 'mimes:svg,png,jpg', 'max:512'], // <--- ЕСЛИ иконка - загружаемый ФАЙЛ, добавить правила для него
            'locale' => [
                'required',
                'string',
                'size:2',
                Rule::in(['ru', 'en', 'kk']), // TODO: Актуализировать список локалей
            ],
            'title' => [
                'required',
                'string',
                'max:255',
                // Исправлена проверка уникальности: таблица 'sections', учитываем 'locale', игнорируем текущий ID
                Rule::unique('sections')->where(function ($query) {
                    return $query->where('locale', $this->input('locale'));
                })->ignore($sectionId),
            ],
            // Раскомментируйте, если добавили поле 'url' в миграцию
            /*
            'url' => [
                'required',
                'string',
                'max:255', // Или 500, как в миграции, если она там есть
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('sections')->where(function ($query) {
                    return $query->where('locale', $this->input('locale'));
                })->ignore($sectionId),
            ],
            */
            'short' => 'nullable|string|max:255',
            'description' => 'nullable|string', // <--- Добавлено правило для description

        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests/SectionRequest');
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

        // Автоматическая генерация URL, если он есть и пуст
        /*
        if ($this->has('url') && empty($this->input('url')) && !empty($this->input('title'))) {
            // TODO: Убедиться, что функция transliterate или Str::slug доступна
            // $this->merge(['url' => Str::slug($this->input('title'))]);
        } else if ($this->has('url') && !empty($this->input('url'))) {
             // $this->merge(['url' => Str::slug($this->input('url'))]);
        }
        */
    }
}
