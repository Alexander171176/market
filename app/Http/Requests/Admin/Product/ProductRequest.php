<?php

namespace App\Http\Requests\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id ?? null;

        return [
            'sort'         => ['nullable', 'integer', 'min:0'],
            'activity'     => ['required', 'boolean'],
            'left'         => ['required', 'boolean'],
            'main'         => ['required', 'boolean'],
            'right'        => ['required', 'boolean'],
            'is_new'       => ['required', 'boolean'],
            'is_hit'       => ['required', 'boolean'],
            'is_sale'      => ['required', 'boolean'],
            'locale'       => ['required', 'string', 'size:2', Rule::in(['ru', 'en', 'kk'])],
            'sku'          => ['nullable', 'string', 'max:255'],
            'title'        => [
                'required', 'string', 'max:255',
                Rule::unique('products')->where(fn ($q) => $q->where('locale', $this->input('locale')))->ignore($productId),
            ],
            'url'          => [
                'required', 'string', 'max:500',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('products')->where(fn ($q) => $q->where('locale', $this->input('locale')))->ignore($productId),
            ],
            'short'        => ['nullable', 'string', 'max:255'],
            'description'  => ['nullable', 'string'],
            'views'        => ['nullable', 'integer', 'min:0'],
            'quantity'     => ['nullable', 'integer', 'min:0'],
            'unit'         => ['nullable', 'string', 'max:50'],
            'weight'       => ['nullable', 'numeric'],
            'availability' => ['nullable', 'string', 'max:255'],
            'price'        => ['nullable', 'numeric'],
            'old_price'    => ['nullable', 'numeric'],
            'currency'     => ['nullable', 'string', 'max:3'],
            'barcode'      => ['nullable', 'string', 'max:255'],
            'meta_title'   => ['nullable', 'string', 'max:255'],
            'meta_keywords'=> ['nullable', 'string', 'max:255'],
            'meta_desc'    => ['nullable', 'string', 'max:1000'],
            'admin'        => ['nullable', 'string', 'max:255'],

            'images'             => ['nullable', 'array'],
            'images.*.id'        => [
                'nullable', 'integer',
                Rule::exists('product_images', 'id'),
                Rule::prohibitedIf(fn () => $this->isMethod('POST')),
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
            'deletedImages.*'    => ['integer', Rule::exists('product_images', 'id')],
        ];
    }

    public function messages(): array
    {
        return [
            'activity.required'       => 'Поле активности обязательно для заполнения.',
            'activity.boolean'        => 'Поле активности должно быть логическим значением.',
            'left.required'           => 'Поле "left" обязательно.',
            'main.required'           => 'Поле "main" обязательно.',
            'right.required'          => 'Поле "right" обязательно.',
            'is_new.required'         => 'Поле "is_new" обязательно.',
            'is_hit.required'         => 'Поле "is_hit" обязательно.',
            'is_sale.required'        => 'Поле "is_sale" обязательно.',
            'locale.required'         => 'Поле языка обязательно.',
            'locale.in'               => 'Допустимые значения языка: ru, en, kk.',
            'title.required'          => 'Пожалуйста, укажите название товара.',
            'title.unique'            => 'Товар с таким названием уже существует в этой локали.',
            'url.required'            => 'Пожалуйста, укажите URL товара.',
            'url.unique'              => 'Такой URL уже используется в данной локали.',
            'url.regex'               => 'URL должен содержать только строчные латинские буквы, цифры и дефисы.',
            'price.numeric'           => 'Цена должна быть числом.',
            'old_price.numeric'       => 'Старая цена должна быть числом.',
            'quantity.integer'        => 'Количество должно быть целым числом.',
            'weight.numeric'          => 'Вес должен быть числом.',
            'currency.string'         => 'Валюта должна быть строкой.',
            'meta_title.max'          => 'Мета-заголовок не должен превышать 255 символов.',
            'meta_keywords.max'       => 'Мета-ключевые слова не должны превышать 255 символов.',
            'meta_desc.max'           => 'Мета-описание не должно превышать 1000 символов.',

            'images.*.file.image'     => 'Файл должен быть изображением.',
            'images.*.file.mimes'     => 'Допустимые форматы: jpeg, jpg, png, gif, svg, webp.',
            'images.*.file.max'       => 'Изображение не должно превышать 10 МБ.',
            'images.*.id.prohibited'  => 'ID изображения нельзя указывать при создании.',
            'deletedImages.*.exists'  => 'Некоторые изображения для удаления не найдены.',
        ];
    }
}
