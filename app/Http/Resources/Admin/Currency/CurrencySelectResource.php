<?php

namespace App\Http\Resources\Admin\Currency;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrencySelectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'     => (int) $this->id,
            'code'   => (string) $this->code,
            'name'   => (string) $this->name,
            'label'  => trim($this->code.' — '.$this->name),
        ];
    }
}
