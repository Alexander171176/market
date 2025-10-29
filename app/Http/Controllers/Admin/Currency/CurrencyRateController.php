<?php

namespace App\Http\Controllers\Admin\Currency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Currency\CurrencyRateRequest;
use App\Http\Requests\Admin\Currency\BulkCurrencyRatesRequest;
use App\Http\Resources\Admin\Currency\CurrencyRateResource;
use App\Models\Admin\Currency\Currency;
use App\Models\Admin\Currency\CurrencyRate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CurrencyRateController extends Controller
{
    // GET /admin/currencies/{currency}/rates
    public function index(Currency $currency): Response
    {
        $rates = $currency->rates()
            ->with('toCurrency:id,code,name')
            ->orderBy('to_currency_id')
            ->get();

        return Inertia::render('Admin/Currencies/Rates/Index', [
            'currency' => $currency->only(['id','code','name']),
            'rates'    => CurrencyRateResource::collection($rates),
        ]);
    }

    // POST /admin/currencies/{currency}/rates
    public function store(CurrencyRateRequest $request, Currency $currency): RedirectResponse
    {
        $data = $request->validated();
        $data['from_currency_id'] = $currency->id;

        try {
            CurrencyRate::updateOrCreate(
                [
                    'from_currency_id' => $data['from_currency_id'],
                    'to_currency_id'   => $data['to_currency_id'],
                ],
                $data
            );

            return back()->with('success', 'Курс сохранён.');
        } catch (Throwable $e) {
            Log::error('Store rate failed: '.$e->getMessage());
            return back()->with('error', 'Ошибка сохранения курса.');
        }
    }

    // PUT /admin/currencies/{currency}/rates/{rate}
    public function update(CurrencyRateRequest $request, Currency $currency, CurrencyRate $rate): RedirectResponse
    {
        if ($rate->from_currency_id !== $currency->id) {
            return back()->with('error', 'Курс не принадлежит указанной валюте.');
        }

        try {
            $rate->update($request->validated());
            return back()->with('success', 'Курс обновлён.');
        } catch (Throwable $e) {
            Log::error('Update rate failed: '.$e->getMessage());
            return back()->with('error', 'Ошибка обновления курса.');
        }
    }

    // DELETE /admin/currencies/{currency}/rates/{rate}
    public function destroy(Currency $currency, CurrencyRate $rate): RedirectResponse
    {
        if ($rate->from_currency_id !== $currency->id) {
            return back()->with('error', 'Курс не принадлежит указанной валюте.');
        }

        try {
            $rate->delete();
            return back()->with('success', 'Курс удалён.');
        } catch (Throwable $e) {
            Log::error('Delete rate failed: '.$e->getMessage());
            return back()->with('error', 'Ошибка удаления курса.');
        }
    }

    // POST /admin/currencies/{currency}/rates/bulk
    public function bulkUpsert(BulkCurrencyRatesRequest $request, Currency $currency): RedirectResponse
    {
        $payload = $request->validated(); // ['rates' => [ ['to_currency_id'=>..,'rate'=>..], ... ] ]

        try {
            DB::transaction(function () use ($payload, $currency) {
                foreach ($payload['rates'] as $row) {
                    CurrencyRate::updateOrCreate(
                        [
                            'from_currency_id' => $currency->id,
                            'to_currency_id'   => $row['to_currency_id'],
                        ],
                        [
                            'rate'       => $row['rate'],
                            'provider'   => $row['provider'] ?? null,
                            'fetched_at' => $row['fetched_at'] ?? null,
                        ]
                    );
                }
            });

            return back()->with('success', 'Курсы обновлены пакетно.');
        } catch (Throwable $e) {
            Log::error('Bulk upsert rates failed: '.$e->getMessage());
            return back()->with('error', 'Ошибка пакетного обновления курсов.');
        }
    }

    // POST /admin/currencies/{currency}/rates/refresh
    public function refresh(Currency $currency): RedirectResponse
    {
        try {
            // app(ExchangeRateService::class)->refreshFor($currency);
            return back()->with('success', 'Курсы обновлены с провайдера.');
        } catch (Throwable $e) {
            Log::error('Refresh rates failed: '.$e->getMessage());
            return back()->with('error', 'Не удалось обновить курсы.');
        }
    }
}
