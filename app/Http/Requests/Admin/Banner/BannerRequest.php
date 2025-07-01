<?php

namespace App\Http\Requests\Admin\Banner;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;

class BannerRequest extends FormRequest
{
    public function authorize(): bool
    {
        // TODO: Добавить проверку прав
        return true;
    }

    public function rules(): array
    {
        // Получаем ID баннера из маршрута для ignore()
        $bannerId = $this->route('banner')?->id ?? null;

        return [
            'sort' => 'nullable|integer|min:0', // Добавим min:0
            'activity' => 'required|boolean',
            'left' => 'required|boolean',
            'right' => 'required|boolean',
            'title' => [
                'required',
                'string',
                'max:255',
                // Уникальность title глобальная (не зависит от locale, т.к. его нет в модели/миграции)
                Rule::unique('banners', 'title')->ignore($bannerId), // <--- КОРРЕКТНО (если нет locale)
            ],
            // 'link' => 'nullable|string', // В миграции тип text, уберем max если нужно
            'link' => 'nullable|string|max:65535', // <--- Увеличено max для TEXT
            'short' => 'nullable|string|max:255',
            'comment' => 'nullable|string|max:255',

            // Валидация связи с секциями
            'sections' => ['nullable', 'array'], // <--- Изменено на nullable
            'sections.*.id' => ['required_with:sections', 'integer', 'exists:sections,id'], // <--- Добавлено

            // Валидация массива изображений
            'images' => ['nullable', 'array'], // <--- Изменено на nullable
            'images.*.id' => [
                'nullable',
                'integer',
                Rule::exists('banner_images', 'id'), // Проверяем в banner_images
                Rule::prohibitedIf(fn() => $this->isMethod('POST')), // Запрещаем ID при создании
            ],
            'images.*.order' => ['nullable', 'integer', 'min:0'], // Добавлено min:0
            'images.*.alt' => ['nullable', 'string', 'max:255'],
            'images.*.caption' => ['nullable', 'string', 'max:255'],
            'images.*.file'      => [
                'nullable',
                'required_without:images.*.id',
                'file',
                'image',
                'mimes:jpeg,jpg,png,gif,svg,webp',
                'max:10240',
            ],

            // Удаляем кастомную проверку, она больше не нужна
            // 'images.*' => ['array', function ($attr, $value, $fail) { ... }],

            // Валидация удаляемых изображений
            'deletedImages' => ['sometimes', 'array'], // <--- Добавлено
            'deletedImages.*' => ['integer', 'exists:banner_images,id'] // <--- Добавлено
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests/BannerRequest');
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
            'left' => filter_var($this->input('left'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
            'right' => filter_var($this->input('right'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
        ]);
    }
}
