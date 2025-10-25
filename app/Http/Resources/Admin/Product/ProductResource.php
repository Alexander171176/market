<?php

namespace App\Http\Resources\Admin\Product;

use App\Http\Resources\Admin\Category\CategorySharedResource;
use App\Http\Resources\Admin\Comment\CommentResource;
use App\Http\Resources\Admin\ProductVariant\ProductVariantResource;
use App\Http\Resources\Admin\Property\PropertyResource;
use App\Http\Resources\Admin\Product\ProductImageResource;
use App\Http\Resources\Admin\Product\ProductSharedResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'sort'         => $this->sort,
            'activity'     => $this->activity,
            'left'         => $this->left,
            'main'         => $this->main,
            'right'        => $this->right,
            'is_new'       => $this->is_new,
            'is_hit'       => $this->is_hit,
            'is_sale'      => $this->is_sale,
            'img'          => $this->img,
            'locale'       => $this->locale,
            'sku'          => $this->sku,
            'title'        => $this->title,
            'url'          => $this->url,
            'short'        => $this->short,
            'description'  => $this->description,
            'views'        => $this->views,
            'quantity'     => $this->quantity,
            'unit'         => $this->unit,
            'weight'       => $this->weight,
            'availability' => $this->availability,
            'price'        => $this->price,
            'old_price'    => $this->old_price,
            'currency'     => $this->currency,
            'barcode'      => $this->barcode,
            'meta_title'   => $this->meta_title,
            'meta_keywords'=> $this->meta_keywords,
            'meta_desc'    => $this->meta_desc,
            'admin'        => $this->admin,

            // счётчики (будут не-null только если делал withCount)
            'comments_count' => $this->whenCounted('comments'),
            'likes_count'    => $this->whenCounted('likes'),
            'images_count'   => $this->whenCounted('images'),

            // связи (вернутся только если были загружены через ->with() / ->load())
            'comments'         => CommentResource::collection($this->whenLoaded('comments')),
            'images'           => ProductImageResource::collection($this->whenLoaded('images')),
            'variants'         => ProductVariantResource::collection($this->whenLoaded('variants')),
            'properties'       => PropertyResource::collection($this->whenLoaded('properties')),
            'categories'       => CategorySharedResource::collection($this->whenLoaded('categories')),
            'related_products' => ProductSharedResource::collection($this->whenLoaded('relatedProducts')),
        ];
    }
}
