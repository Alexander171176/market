<?php

namespace App\Http\Requests\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
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
            'locale'       => ['required', 'string', 'size:2'],
            'sku'          => ['nullable', 'string', 'max:255'],
            'title'        => [
                'required', 'string', 'max:255',
                Rule::unique('products')->where(fn ($q) => $q
                    ->where('locale', $this->input('locale')))->ignore($productId),
            ],
            'url'          => [
                'required', 'string', 'max:500',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('products')->where(fn ($q) => $q
                    ->where('locale', $this->input('locale')))->ignore($productId),
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

            'category_ids'     => ['nullable', 'array'],
            'categories.*.id'  => ['required_with:categories','integer','exists:categories,id'],

            'related_products' => ['nullable', 'array'],
            'related_products.*.id' => ['required_with:related_products', 'integer', 'exists:products,id'],

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

            // Характеристики
            'property_values'    => ['nullable', 'array'],
            'property_values.*'  => ['integer', 'exists:property_values,id'],
        ];
    }

    public function messages(): array
    {
        return Lang::get('admin/requests');
    }

}
