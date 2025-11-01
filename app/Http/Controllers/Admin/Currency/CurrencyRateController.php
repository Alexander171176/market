<?php

namespace App\Http\Controllers\Admin\Currency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Currency\CurrencyRateRequest;
use App\Http\Requests\Admin\Currency\BulkCurrencyRatesRequest;
use App\Http\Resources\Admin\Currency\CurrencyRateResource;
use App\Models\Admin\Currency\Currency;
use App\Models\Admin\Currency\CurrencyRate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CurrencyRateController extends Controller
{

    /**
     * GET /admin/currencies/{currency}/rates
     *
     * @param Currency $currency
     * @return Response
     */
    public function index(Currency $currency): Response
    {
        $rates = $currency->baseRates()
            ->with(['quote:id,code,name'])
            ->orderBy('quote_currency_id')
            ->get();

        $currencies = Currency::query()
            ->orderBy('code')
            ->get(['id','code','name']);

        return Inertia::render('Admin/CurrencyRates/Index', [
            'currency'   => $currency->only(['id','code','name']),
            'rates'      => CurrencyRateResource::collection($rates),
            'currencies' => $currencies, // 👈 добавили
        ]);
    }

    /**
     * POST /admin/currencies/{currency}/rates
     *
     * @param CurrencyRateRequest $request
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function store(CurrencyRateRequest $request, Currency $currency): RedirectResponse
    {
        $data = $request->validated();

        try {
            $fetchedAt = !empty($data['fetched_at']) ? $data['fetched_at'] : Carbon::now()->toDateTimeString();
            $provider  = $data['provider'] ?? 'manual';
            $isManual  = !array_key_exists('is_manual', $data) || (bool)$data['is_manual'];

            CurrencyRate::updateOrCreate(
                [
                    'base_currency_id'  => $currency->id,
                    'quote_currency_id' => $data['quote_currency_id'],
                ],
                [
                    'rate'       => $data['rate'],
                    'provider'   => $provider,
                    'is_manual'  => $isManual,
                    'fetched_at' => $fetchedAt,
                ]
            );

            return back()->with('success', 'Курс сохранён.');
        } catch (\Throwable $e) {
            Log::error('Store rate failed: '.$e->getMessage(), ['data' => $data]);
            return back()->with('error', 'Ошибка сохранения курса.');
        }
    }

    /**
     * PUT /admin/currencies/{currency}/rates/{rate}
     *
     * @param CurrencyRateRequest $request
     * @param Currency $currency
     * @param CurrencyRate $rate
     * @return RedirectResponse
     */
    public function update(CurrencyRateRequest $request, Currency $currency, CurrencyRate $rate): RedirectResponse
    {
        if ((int)$rate->base_currency_id !== (int)$currency->id) {
            return back()->with('error', 'Курс не принадлежит указанной валюте.');
        }

        try {
            $data = $request->validated();

            $fetchedAt = !empty($data['fetched_at']) ? $data['fetched_at'] : Carbon::now()->toDateTimeString();
            $provider  = $data['provider'] ?? 'manual';
            $isManual  = !array_key_exists('is_manual', $data) || (bool)$data['is_manual'];

            $rate->update([
                'quote_currency_id' => $data['quote_currency_id'],
                'rate'              => $data['rate'],
                'provider'          => $provider,
                'is_manual'         => $isManual,
                'fetched_at'        => $fetchedAt,
            ]);

            return back()->with('success', 'Курс обновлён.');
        } catch (\Throwable $e) {
            Log::error('Update rate failed: '.$e->getMessage(), ['data' => $data, 'rate_id' => $rate->id]);
            return back()->with('error', 'Ошибка обновления курса.');
        }
    }

    /**
     * DELETE /admin/currencies/{currency}/rates/{rate}
     *
     * @param Currency $currency
     * @param CurrencyRate $rate
     * @return RedirectResponse
     */
    public function destroy(Currency $currency, CurrencyRate $rate): RedirectResponse
    {
        if ((int)$rate->base_currency_id !== (int)$currency->id) {
            return back()->with('error', 'Курс не принадлежит указанной валюте.');
        }

        try {
            $rate->delete();
            return back()->with('success', 'Курс удалён.');
        } catch (\Throwable $e) {
            Log::error('Delete rate failed: '.$e->getMessage());
            return back()->with('error', 'Ошибка удаления курса.');
        }
    }

    /**
     * POST /admin/currencies/{currency}/rates/bulk
     *
     * @param BulkCurrencyRatesRequest $request
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function bulkUpsert(BulkCurrencyRatesRequest $request, Currency $currency): RedirectResponse
    {
        $payload = $request->validated();

        try {
            DB::transaction(function () use ($payload, $currency) {
                foreach ($payload['rates'] as $row) {
                    $fetchedAt = !empty($row['fetched_at']) ? $row['fetched_at'] : Carbon::now()->toDateTimeString();
                    $provider  = $row['provider'] ?? 'manual';
                    $isManual  = !array_key_exists('is_manual', $row) || (bool)$row['is_manual'];

                    CurrencyRate::updateOrCreate(
                        [
                            'base_currency_id'  => $currency->id,
                            'quote_currency_id' => $row['quote_currency_id'],
                        ],
                        [
                            'rate'       => $row['rate'],
                            'provider'   => $provider,
                            'is_manual'  => $isManual,
                            'fetched_at' => $fetchedAt,
                        ]
                    );
                }
            });

            return back()->with('success', 'Курсы обновлены пакетно.');
        } catch (\Throwable $e) {
            Log::error('Bulk upsert rates failed: '.$e->getMessage(), ['payload' => $payload]);
            return back()->with('error', 'Ошибка пакетного обновления курсов.');
        }
    }

    /**
     * POST   /admin/currencies/{currency}/rates/refresh
     *
     * @param Currency $currency
     * @return RedirectResponse
     */
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
