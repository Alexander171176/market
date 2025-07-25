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

            'locale'             => [
                'required', 'string', 'size:2',
                Rule::in(['ru', 'en', 'kk']),
            ],

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
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'sort.integer' => 'Поле сортировки должно быть числом.',
            'sort.min' => 'Поле сортировки не может быть меньше :min.',

            'activity.required' => 'Поле активности обязательно для заполнения.',
            'activity.boolean' => 'Поле активности должно быть логическим значением.',

            'locale.required' => 'Поле локали обязательно для заполнения.',
            'locale.string' => 'Поле локали должно быть строкой.',
            'locale.size' => 'Поле локали должно содержать ровно :size символа.',
            'locale.in' => 'Выбранное значение локали недопустимо.',

            'title.required' => 'Поле заголовка обязательно для заполнения.',
            'title.string' => 'Поле заголовка должно быть строкой.',
            'title.max' => 'Поле заголовка не может превышать :max символов.',
            'title.unique' => 'Категория с таким заголовком уже существует для выбранной локали.',

            'url.required' => 'Поле URL обязательно для заполнения.',
            'url.string' => 'Поле URL должно быть строкой.',
            'url.max' => 'Поле URL не может превышать :max символов.',
            'url.regex' => 'Поле URL должно содержать только строчные латинские буквы, цифры и дефисы.',
            'url.unique' => 'Категория с таким URL уже существует для выбранной локали.',

            'short.string' => 'Поле краткого описания должно быть строкой.',
            'short.max' => 'Поле краткого описания не может превышать :max символов.',

            'description.string' => 'Поле описания должно быть строкой.',

            'meta_title.string' => 'Поле meta заголовка должно быть строкой.',
            'meta_title.max' => 'Поле meta заголовка не может превышать :max символов.',

            'meta_keywords.string' => 'Поле meta ключевых слов должно быть строкой.',
            'meta_keywords.max' => 'Поле meta ключевых слов не может превышать :max символов.',

            'meta_desc.string' => 'Поле meta описания должно быть строкой.',

            'parent_id.exists' => 'Выбранная родительская категория не существует или принадлежит другой локали.',
            'parent_id.not_in' => 'Категория не может быть дочерней для самой себя.',
            'parent_id.integer' => 'Идентификатор родительской категории должен быть числом.',

            'images.array' => 'Изображения должны быть массивом.',
            'images.*.id.integer' => 'ID изображения должен быть числом.',
            'images.*.id.exists' => 'Указанного изображения не существует.',
            'images.*.id.prohibited' => 'ID изображения нельзя передавать при создании.',
            'images.*.order.integer' => 'Порядок изображения должен быть числом.',
            'images.*.order.min' => 'Порядок изображения не может быть отрицательным.',
            'images.*.alt.string' => 'Alt текст изображения должен быть строкой.',
            'images.*.alt.max' => 'Alt текст не должен превышать 255 символов.',
            'images.*.caption.string' => 'Подпись изображения должна быть строкой.',
            'images.*.caption.max' => 'Подпись не должна превышать 255 символов.',
            'images.*.file.required' => 'Файл изображения обязателен для новых изображений.',
            'images.*.file.required_without' => 'Файл изображения обязателен, если не передан ID.',
            'images.*.file.file' => 'Проблема с загрузкой файла изображения.',
            'images.*.file.image' => 'Файл должен быть изображением.',
            'images.*.file.mimes' => 'Файл должен быть формата jpeg, jpg, png, gif, svg или webp.',
            'images.*.file.max' => 'Размер файла изображения не должен превышать 10 Мб.',

            'deletedImages.array' => 'Список удаляемых изображений должен быть массивом.',
            'deletedImages.*.integer' => 'ID удаляемого изображения должен быть числом.',
            'deletedImages.*.exists' => 'Попытка удалить несуществующее изображение.',
        ];
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
