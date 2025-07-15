<?php

namespace App\Http\Requests\Admin\Rubric;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;
// use Illuminate\Support\Str; // Если будете использовать Str::slug в prepareForValidation

class RubricRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Заменить на реальную проверку прав доступа
        // if ($this->isMethod('POST')) return $this->user()->can('create rubrics');
        // if ($this->isMethod('PUT') || $this->isMethod('PATCH')) return $this->user()->can('update', $this->route('rubric'));
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Получаем ID рубрики из маршрута, если это обновление
        $rubricId = $this->route('rubric')?->id ?? null;

        return [
            'sort' => 'nullable|integer|min:0', // Добавлено min:0
            'activity' => 'required|boolean',
            'icon' => 'nullable|string|max:65535', // Увеличено max для TEXT
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
                // Исправлена проверка уникальности: учитываем 'locale', игнорируем текущий ID
                Rule::unique('rubrics')->where(function ($query) {
                    return $query->where('locale', $this->input('locale'));
                })->ignore($rubricId),
            ],
            'url' => [
                'required',
                'string',
                'max:500', // Увеличено max
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', // Добавлено regex
                // Исправлена проверка уникальности: учитываем 'locale', игнорируем текущий ID
                Rule::unique('rubrics')->where(function ($query) {
                    return $query->where('locale', $this->input('locale'));
                })->ignore($rubricId),
            ],
            'short' => 'nullable|string|max:255',
            'description' => 'nullable|string', // <--- Добавлено правило
            'views' => 'nullable|integer|min:0', // <--- Добавлено правило

            'meta_title' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_desc' => 'nullable|string', // Убрано max:255

            // Если секции передаются в ЭТОМ запросе
            'sections' => ['nullable', 'array'],
            'sections.*.id' => ['required_with:sections', 'integer', 'exists:sections,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests/RubricRequest');
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

        // Автоматическая генерация URL, если он пуст
        if (empty($this->input('url')) && !empty($this->input('title'))) {
            // TODO: Убедиться, что функция transliterate или Str::slug доступна
            // $this->merge(['url' => Str::slug($this->input('title'))]);
        } else if (!empty($this->input('url'))) {
            // Очищаем URL
            // $this->merge(['url' => Str::slug($this->input('url'))]);
        }
    }
}
