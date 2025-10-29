<?php

namespace App\Http\Resources\Admin\Currency;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CurrencyResource extends JsonResource
{
    /**
     * @property int         $id
     * @property string      $code
     * @property string      $name
     * @property string|null $symbol
     * @property int         $precision
     * @property bool        $symbol_first
     * @property string      $thousands_sep
     * @property string      $decimal_sep
     * @property bool        $activity
     * @property bool        $is_default
     * @property Carbon|null $set_default_at
     * @property Carbon|null $created_at
     * @property Carbon|null $updated_at
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => (int) $this->id,
            'sort'          => (int) $this->sort,
            'code'          => (string) $this->code,
            'name'          => (string) $this->name,
            'symbol'        => (string) ($this->symbol ?? ''),
            'precision'     => (int) $this->precision,
            'symbol_first'  => (bool) $this->symbol_first,
            'thousands_sep' => (string) $this->thousands_sep,
            'decimal_sep'   => (string) $this->decimal_sep,
            'activity'     => (bool) $this->activity,
            'is_default'    => (bool) $this->is_default,
            'set_default_at'=> optional($this->set_default_at)?->toISOString(),
            'created_at'    => optional($this->created_at)?->toISOString(),
            'updated_at'    => optional($this->updated_at)?->toISOString(),
        ];
    }
}
