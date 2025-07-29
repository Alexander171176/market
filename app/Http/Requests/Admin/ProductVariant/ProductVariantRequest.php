<?php

namespace App\Http\Requests\Admin\ProductVariant;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Lang;
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
        return Lang::get('admin/requests');
    }
}
