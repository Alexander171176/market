<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
use Illuminate\Validation\Rule;
use App\Models\Admin\Category\Category; // Импортируем модель

class CategoryRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        $categoryId = $this->route('category')?->id ?? null;
        $locale = $this->input('locale');

        return [
            'sort'               => 'nullable|integer|min:0',
            'activity'           => 'required|boolean',

            'locale'             => ['required', 'string', 'size:2'],

            'title'              => [
                'required', 'string', 'max:255',
                Rule::unique('categories', 'title')
                    ->where(fn($q) => $q->where('locale', $locale))
                    ->ignore($categoryId),
            ],

            'url'                => [
                'required', 'string', 'max:500',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('categories', 'url')
                    ->where(fn($q) => $q->where('locale', $locale))
                    ->ignore($categoryId),
            ],

            'short'              => 'nullable|string|max:255',
            'description'        => 'nullable|string',

            'meta_title'         => 'nullable|string|max:255',
            'meta_keywords'      => 'nullable|string|max:255',
            'meta_desc'          => 'nullable|string',

            'parent_id' => [
                'nullable',
                'integer',
                Rule::notIn([$categoryId]), // запрет на parent_id == id
                Rule::exists('categories', 'id')
                    ->where(fn($q) => $q->where('locale', $locale)),
            ],

            'images'             => ['nullable', 'array'],
            'images.*.id'        => [
                'nullable', 'integer',
                Rule::exists('category_images', 'id'),
                Rule::prohibitedIf(fn() => $this->isMethod('POST')),
            ],
            'images.*.order'     => ['nullable', 'integer', 'min:0'],
            'images.*.alt'       => ['nullable', 'string', 'max:255'],
            'images.*.caption'   => ['nullable', 'string', 'max:255'],
            'images.*.file'      => [
                'nullable',
                'required_without:images.*.id',
                'file',
                'image',
                'mimes:jpeg,jpg,png,gif,svg,webp',
                'max:10240',
            ],

            'deletedImages'      => ['sometimes', 'array'],
            'deletedImages.*'    => ['integer', 'exists:category_images,id'],

            // Характеристики — массив объектов вида [{ id: <property_id> }, ...]
            'properties'        => ['nullable', 'array'],
            'properties.*.id'   => ['required_with:properties', 'integer', 'exists:properties,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return Lang::get('admin/requests');
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    // protected function prepareForValidation(): void
    // {
    // Например, убедиться, что parent_id это null, а не пустая строка, если он не выбран
    // if ($this->input('parent_id') === '') {
    //     $this->merge(['parent_id' => null]);
    // }

    // Автогенерация URL, если он пуст (если это нужно)
    // if (!$this->input('url') && $this->input('title')) {
    //     $this->merge([
    //         'url' => \Illuminate\Support\Str::slug($this->input('title'))
    //     ]);
    // }
    // }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'activity'   => filter_var($this->input('activity'), FILTER_VALIDATE_BOOLEAN),
            'parent_id'  => $this->input('parent_id') === '' ? null : $this->input('parent_id'),
            'locale'     => $this->input('locale'),
            'title'      => $this->input('title'),
            'url'        => $this->input('url'),
            'sort'       => $this->input('sort') ?? 0,
        ]);
    }

}
