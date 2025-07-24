<?php

namespace App\Http\Requests\Admin\ProductVariant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductVariantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $variantId = $this->route('product_variant')?->id ?? null;

        return [
            'product_id'    => ['required', 'exists:products,id'],
            'sort'          => ['nullable', 'integer', 'min:0'],
            'activity'      => ['required', 'boolean'],
            'img'           => ['nullable', 'string', 'max:1000'],
            'sku'           => ['nullable', 'string', 'max:255'],
            'title'         => [
                'required', 'string', 'max:255',
                Rule::unique('product_variants')
                    ->where(fn($q) => $q->where('sku', $this->input('sku')))
                    ->ignore($variantId),
            ],
            'short'         => ['nullable', 'string', 'max:255'],
            'description'   => ['nullable', 'string'],
            'quantity'      => ['nullable', 'integer', 'min:0'],
            'weight'        => ['nullable', 'integer', 'min:0'],
            'availability'  => ['nullable', 'string', 'max:255'],
            'price'         => ['nullable', 'numeric', 'min:0'],
            'old_price'     => ['nullable', 'numeric', 'min:0'],
            'currency'      => ['required', 'string', 'size:3'],
            'barcode'       => ['nullable', 'string', 'max:255'],
            'options'       => ['nullable', 'array'],
            'admin'         => ['nullable', 'string', 'max:255'],

            'images'             => ['nullable', 'array'],
            'images.*.id'        => [
                'nullable', 'integer',
                Rule::exists('product_variant_images', 'id'),
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
            'deletedImages.*'    => ['integer', Rule::exists('product_variant_images', 'id')],
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required'    => 'Товар обязателен для выбора.',
            'product_id.exists'      => 'Выбранный товар не существует.',
            'sort.integer'           => 'Сортировка должна быть целым числом.',
            'activity.required'      => 'Поле активности обязательно.',
            'activity.boolean'       => 'Поле активности должно быть логическим значением.',
            'title.required'         => 'Название варианта обязательно.',
            'title.string'           => 'Название должно быть строкой.',
            'title.max'              => 'Название не должно превышать 255 символов.',
            'title.unique'           => 'Такой вариант с этим артикулом уже существует.',
            'sku.max'                => 'Артикул не должен превышать 255 символов.',
            'short.max'              => 'Краткое описание не должно превышать 255 символов.',
            'quantity.integer'       => 'Количество должно быть целым числом.',
            'weight.integer'         => 'Вес должен быть целым числом.',
            'price.numeric'          => 'Цена должна быть числом.',
            'old_price.numeric'      => 'Старая цена должна быть числом.',
            'currency.required'      => 'Поле валюты обязательно.',
            'currency.size'          => 'Валюта должна состоять из 3 символов.',
            'barcode.max'            => 'Штрих-код не должен превышать 255 символов.',
            'options.array'          => 'Опции должны быть массивом.',
            'admin.max'              => 'Заметка не должна превышать 255 символов.',

            'images.*.file.image'     => 'Файл должен быть изображением.',
            'images.*.file.mimes'     => 'Допустимые форматы: jpeg, jpg, png, gif, svg, webp.',
            'images.*.file.max'       => 'Изображение не должно превышать 10 МБ.',
            'images.*.id.prohibited'  => 'ID изображения нельзя указывать при создании.',
            'deletedImages.*.exists'  => 'Некоторые изображения для удаления не найдены.',
        ];
    }
}
