<?php

namespace App\Http\Resources\Admin\Plugin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PluginSharedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * (Облегченная версия для списков)
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'sort'      => $this->sort,
            'icon'      => $this->icon, // Или аксессор icon_url
            'name'      => $this->name,
            'version'   => $this->version,
            'code'      => $this->code,
            'activity'  => $this->activity, // boolean
            // 'description' => $this->when($request->routeIs('plugins.show'), $this->description), // Пример: описание только на странице деталей
        ];
    }
}
