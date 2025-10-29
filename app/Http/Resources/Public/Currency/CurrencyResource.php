<?php

namespace App\Http\Resources\Public\Currency;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'code'         => (string) $this->code,
            'symbol'       => (string) ($this->symbol ?? ''),
            'precision'    => (int) $this->precision,
            'symbol_first' => (bool) $this->symbol_first,
            'decimal_sep'  => (string) $this->decimal_sep,
            'thousands_sep'=> (string) $this->thousands_sep,
            'is_default'   => (bool) $this->is_default,
        ];
    }
}
