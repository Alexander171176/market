<?php

namespace App\Http\Resources\Admin\Setting;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sort' => $this->sort,
            'activity' => $this->activity,
            'type' => $this->type,
            'option' => $this->option,
            'value' => $this->value,
            'constant' => $this->constant,
            'category' => $this->category,
            'description' => $this->description,
        ];
    }
}
