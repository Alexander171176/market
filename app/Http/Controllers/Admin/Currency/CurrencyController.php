<?php

namespace App\Http\Controllers\Admin\Currency;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Currency\CurrencyActivityRequest;
use App\Http\Requests\Admin\Currency\CurrencyInlineRateRequest;
use App\Http\Requests\Admin\Currency\CurrencyRequest;
use App\Http\Resources\Admin\Currency\CurrencyResource;
use App\Models\Admin\Currency\Currency;
use App\Models\Admin\Currency\CurrencyRate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CurrencyController extends Controller
{

    /**
     * @param string|null $token
     * @return string
     */
    private function decodeSepToken(?string $token): string
    {
        return match ($token) {
            'space'      => ' ',
            'nbsp'       => "\u{00A0}",   // неразрывный пробел
            'thinspace'  => "\u{2009}",   // тонкий пробел
            'comma'      => ',',
            'dot'        => '.',
            'apostrophe' => "'",
            default      => (string) $token, // на всякий случай пропускаем как есть
        };
    }

    /**
     * @return Response
     */
    public function index(): Response
    {
        $adminCountCurrencies = (int) config('site_settings.AdminCountCurrencies', 15);
        $adminSortCurrencies  = (string) config('site_settings.AdminSortCurrencies', 'idAsc');

        try {
            // 1) Тянем валюты
            $currencies = Currency::query()->orderBy('sort')->get();
            $currenciesCount = $currencies->count();

            // 2) Определяем базовую (основную) валюту
            $base = Currency::query()->where('is_default', true)->first();

            // 3) Готовим карту последних курсов: quote_id => CurrencyRate
            $ratesMap = [];
            if ($base) {
                // Берём курсы для base -> любые quote, сортируем по свежести,
                // затем оставляем по одному на каждую quote (первое в коллекции — самое свежее).
                $latest = CurrencyRate::query()
                    ->where('base_currency_id', $base->id)
                    ->orderByDesc('fetched_at')
                    ->orderByDesc('id')
                    ->get()
                    ->unique('quote_currency_id');

                foreach ($latest as $rate) {
                    $ratesMap[$rate->quote_currency_id] = $rate;
                }
            }

            // 4) Превращаем ресурсы в плоский массив…
            $currenciesArray = CurrencyResource::collection($currencies)->resolve();

            // …и встраиваем в каждую строку «витринные» поля курса
            $currenciesArray = array_map(function (array $row) use ($ratesMap, $base) {
                $row['rate_vs_default'] = null;
                $row['rate_provider']   = null;
                $row['rate_at']         = null;

                if ($base && (int)$row['id'] === (int)$base->id) {
                    // Базовая валюта к самой себе = 1.0
                    $row['rate_vs_default'] = 1.0;
                } elseif ($base && isset($ratesMap[$row['id']])) {
                    $rate = $ratesMap[$row['id']];
                    $row['rate_vs_default'] = (float) $rate->rate;
                    $row['rate_provider']   = $rate->provider;
                    $row['rate_at']         = optional($rate->fetched_at)?->toISOString();
                }

                return $row;
            }, $currenciesArray);

        } catch (\Throwable $e) {
            Log::error("Ошибка загрузки валют: " . $e->getMessage());
            $currenciesArray = [];
            $currenciesCount = 0;
            session()->flash('error', __('admin/controllers.index_error'));
        }

        return Inertia::render('Admin/Currencies/Index', [
            'currencies'           => $currenciesArray,
            'currenciesCount'      => $currenciesCount,
            'adminCountCurrencies' => $adminCountCurrencies,
            'adminSortCurrencies'  => $adminSortCurrencies,
        ]);
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Currencies/Create');
    }

    /**
     * @param CurrencyRequest $request
     * @return RedirectResponse
     */
    public function store(CurrencyRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();

            // Конвертация токенов -> символы (ОБЯЗАТЕЛЬНО!)
            $data['thousands_sep'] = $this->decodeSepToken($data['thousands_sep'] ?? 'space');
            $data['decimal_sep']   = $this->decodeSepToken($data['decimal_sep'] ?? 'dot');

            // sort по умолчанию — в конец
            $data['sort'] = $data['sort'] ?? (int) (Currency::max('sort') + 1);

            Currency::create($data);

            session()->flash('success', __('admin/controllers.created_successfully'));
            return redirect()->route('admin.currencies.index');
        } catch (\Throwable $e) {
            Log::error("Ошибка создания валюты [store]: {$e->getMessage()}", [
                'trace' => $e->getTraceAsString(),
            ]);
            return back()->withErrors(['general' => __('admin/controllers.store_error')])->withInput();
        }
    }

    /**
     * @param Currency $currency
     * @return Response
     */
    public function edit(Currency $currency): Response
    {
        return Inertia::render('Admin/Currencies/Edit', [
            'currency' => new CurrencyResource($currency),
        ]);
    }

    /**
     * @param CurrencyRequest $request
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function update(CurrencyRequest $request, Currency $currency): RedirectResponse
    {
        try {
            $data = $request->validated();

            // Конвертация токенов -> символы (ОБЯЗАТЕЛЬНО!)
            $data['thousands_sep'] = $this->decodeSepToken($data['thousands_sep'] ?? 'space');
            $data['decimal_sep']   = $this->decodeSepToken($data['decimal_sep'] ?? 'dot');

            $currency->update($data);

            session()->flash('success', __('admin/controllers.updated_successfully'));
            return redirect()->route('admin.currencies.index');
        } catch (\Throwable $e) {
            Log::error("Ошибка обновления валюты [update]: {$e->getMessage()}");
            return back()->withErrors(['general' => __('admin/controllers.update_error')])->withInput();
        }
    }

    /**
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function destroy(Currency $currency): RedirectResponse
    {
        try {
            $currency->delete();
            session()->flash('success', __('admin/controllers.deleted_successfully'));
            return back();
        } catch (Throwable $e) {
            Log::error("Ошибка удаления валюты [destroy]: {$e->getMessage()}");
            return back()->withErrors(['general' => __('admin/controllers.delete_error')]);
        }
    }

    /**
     * Toggle активности одной валюты
     *
     * @param CurrencyActivityRequest $request
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function updateActivity(CurrencyActivityRequest $request, Currency $currency): RedirectResponse
    {
        try {
            $currency->activity = (bool) $request->boolean('activity');
            $currency->save();

            return back()->with('success', __('admin/controllers.updated_successfully'));
        } catch (Throwable $e) {
            Log::error("Ошибка обновления активности [updateActivity]: {$e->getMessage()}");
            return back()->withErrors(['activity' => __('admin/controllers.update_error')]);
        }
    }

    /**
     * Массовое обновление активности
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function bulkUpdateActivity(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'ids'      => ['required','array','min:1'],
            'ids.*'    => ['integer','exists:currencies,id'],
            'activity' => ['required','boolean'],
        ]);

        try {
            Currency::whereIn('id', $data['ids'])->update(['activity' => $data['activity']]);
            return back()->with('success', __('admin/controllers.updated_successfully'));
        } catch (Throwable $e) {
            Log::error("Ошибка массового обновления активности [bulkUpdateActivity]: {$e->getMessage()}");
            return back()->withErrors(['general' => __('admin/controllers.update_error')]);
        }
    }

    /**
     * DnD: обновление порядка на странице (bulk)
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function updateSortBulk(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'currencies'           => ['required','array','min:1'],
            'currencies.*.id'      => ['required','integer','exists:currencies,id'],
            'currencies.*.sort'    => ['required','integer'],
        ]);

        try {
            DB::transaction(function () use ($payload) {
                foreach ($payload['currencies'] as $row) {
                    Currency::whereKey($row['id'])->update(['sort' => (int) $row['sort']]);
                }
            });

            return back()->with('success', __('admin/controllers.updated_successfully'));
        } catch (Throwable $e) {
            Log::error("Ошибка bulk-сортировки валют [updateSortBulk]: {$e->getMessage()}");
            return back()->withErrors(['currencies' => __('admin/controllers.update_error')]);
        }
    }

    /**
     * Обновление sort одной записи (если где-то используешь одиночный вызов)
     *
     * @param Request $request
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function updateSort(Request $request, Currency $currency): RedirectResponse
    {
        $data = $request->validate([
            'sort' => ['required','integer'],
        ]);

        try {
            $currency->update(['sort' => (int) $data['sort']]);
            return back()->with('success', __('admin/controllers.updated_successfully'));
        } catch (Throwable $e) {
            Log::error("Ошибка обновления сортировки [updateSort]: {$e->getMessage()}");
            return back()->withErrors(['sort' => __('admin/controllers.update_error')]);
        }
    }

    /**
     * Массовое удаление
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'ids'   => ['required','array','min:1'],
            'ids.*' => ['integer','exists:currencies,id'],
        ]);

        try {
            Currency::whereIn('id', $data['ids'])->delete();
            return back()->with('success', __('admin/controllers.deleted_successfully'));
        } catch (Throwable $e) {
            Log::error("Ошибка массового удаления валют [bulkDestroy]: {$e->getMessage()}");
            return back()->withErrors(['general' => __('admin/controllers.delete_error')]);
        }
    }

    /**
     * Назначить валюту основной (ровно одна is_default = true)
     *
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function setDefault(Currency $currency): RedirectResponse
    {
        try {
            DB::transaction(function () use ($currency) {
                // 1) Определяем старую базу ДО переключения
                /** @var Currency|null $oldBase */
                $oldBase = Currency::query()->where('is_default', true)->first();

                // 2) Сбрасываем флаг у всех и ставим новую базу
                Currency::where('is_default', true)->update(['is_default' => false]);
                $currency->update([
                    'is_default'     => true,
                    'set_default_at' => Carbon::now(),
                    'activity'       => true,
                ]);

                // 3) Если была старая база и она отличается — пересчитываем кросс-курсы
                if ($oldBase && $oldBase->id !== $currency->id) {
                    $this->rebuildCrossRates($oldBase->id, $currency->id);
                }

                // 4) Гарантируем запись base->base = 1
                CurrencyRate::updateOrCreate(
                    [
                        'base_currency_id'  => $currency->id,
                        'quote_currency_id' => $currency->id,
                    ],
                    [
                        'rate'       => 1.0,
                        'provider'   => 'system',
                        'fetched_at' => Carbon::now(),
                    ]
                );
            });

            return back()->with('success', __('admin/controllers.updated_successfully'));
        } catch (\Throwable $e) {
            Log::error("Ошибка назначения основной валюты [setDefault]: {$e->getMessage()}");
            return back()->withErrors(['general' => __('admin/controllers.update_error')]);
        }
    }

    /**
     * Пересобирает кросс-курсы для НОВОЙ базы из курсов СТАРОЙ базы.
     *
     * @param int $oldBaseId  A
     * @param int $newBaseId  B
     */
    private function rebuildCrossRates(int $oldBaseId, int $newBaseId): void
    {
        // 1) Берём последние курсы A->X (по одному на каждый quote)
        /** @var Collection|CurrencyRate[] $latest */
        $latest = CurrencyRate::query()
            ->where('base_currency_id', $oldBaseId)
            ->orderByDesc('fetched_at')
            ->orderByDesc('id')
            ->get()
            ->unique('quote_currency_id');

        // Должен существовать курс A->B, иначе кросс не посчитать
        $a2b = $latest->firstWhere('quote_currency_id', $newBaseId);
        if (!$a2b || (float)$a2b->rate <= 0) {
            Log::warning("Кросс-курсы не пересчитаны: нет валидного курса A({$oldBaseId})->B({$newBaseId}).");
            return;
        }

        $now = Carbon::now();

        foreach ($latest as $row) {
            $quoteId = (int)$row->quote_currency_id;

            // B->B запишем отдельно (1.0); пропустим здесь
            if ($quoteId === $newBaseId) {
                continue;
            }

            // rate(B->X) = rate(A->X) / rate(A->B)
            $newRate = (float)$row->rate / (float)$a2b->rate;

            // Защита от мусора
            if (!is_finite($newRate) || $newRate <= 0) {
                continue;
            }

            CurrencyRate::updateOrCreate(
                [
                    'base_currency_id'  => $newBaseId,
                    'quote_currency_id' => $quoteId,
                ],
                [
                    'rate'       => $newRate,
                    'provider'   => 'cross',          // помечаем что это кросс
                    'fetched_at' => $now,
                ]
            );
        }
    }

    /**
     * Создать «снимок» курса base→quote (manual)
     * — базовую валюту берём из is_default = true.
     * — не апдейтим прошлую запись, а создаём новую (у тебя выборка «последнего» уже есть).
     *
     * @param CurrencyInlineRateRequest $request
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function updateRate(CurrencyInlineRateRequest $request, Currency $currency): RedirectResponse
    {
        try {
            $base = Currency::query()->where('is_default', true)->first();
            if (!$base)      return back()->withErrors(['general' => 'Не задана базовая валюта.']);
            if ($base->id === $currency->id)
                return back()->withErrors(['general' => 'Для базовой валюты курс всегда 1.']);
            if (!$currency->activity)
                return back()->withErrors(['general' => 'Нельзя обновлять курс неактивной валюты.']);

            DB::transaction(function () use ($request, $base, $currency) {
                CurrencyRate::create([
                    'base_currency_id'  => $base->id,
                    'quote_currency_id' => $currency->id,
                    'rate'              => (float)$request->input('rate'),
                    'provider'          => (string)($request->input('provider') ?: 'manual'),
                    'is_manual'         => true,
                    'fetched_at'        => Carbon::now(),
                ]);
            });

            return back()->with('success', 'Курс обновлён.');
        } catch (\Throwable $e) {
            Log::error('updateRate error: '.$e->getMessage());
            return back()->withErrors(['general' => 'Ошибка обновления курса.']);
        }
    }

    /**
     * Провайдер ЦБ РФ: https://www.cbr-xml-daily.ru/daily_json.js
     * Возвращает нормализованные rates (QUOTE per 1 BASE).
     *
     * @param string $baseCode
     * @param array $allowedUpper
     * @return array
     */
    private function fetchFromCBR(string $baseCode, array $allowedUpper): array
    {
        try {
            $resp = Http::withHeaders([
                'User-Agent' => 'PulsarCMS/1.0 (CurrencyUpdater)',
                'Accept'     => 'application/json',
            ])
                ->timeout(12)
                ->retry(2, 300)
                ->get('https://www.cbr-xml-daily.ru/daily_json.js');

            if (!$resp->ok()) {
                return ['ok' => false, 'rates' => [], 'error' => 'HTTP '.$resp->status()];
            }

            $json = $resp->json();
            if (!is_array($json)) {
                return ['ok' => false, 'rates' => [], 'error' => 'invalid_payload'];
            }

            // rub_per[CODE] = сколько RUB за 1 единицу этой валюты
            $rub_per = ['RUB' => 1.0];
            if (isset($json['Valute']) && is_array($json['Valute'])) {
                foreach ($json['Valute'] as $code => $row) {
                    if (!isset($row['Value'])) continue;
                    $value   = (float) $row['Value'];               // RUB за Nominal единиц
                    $nominal = max(1.0, (float) ($row['Nominal'] ?? 1));
                    $rub_per[strtoupper($code)] = $value / $nominal; // RUB за 1 единицу
                }
            }

            $base = strtoupper($baseCode);
            if (!isset($rub_per[$base])) {
                return ['ok' => false, 'rates' => [], 'error' => "base_not_supported: {$base}"];
            }

            // Конвертируем в BASE→QUOTE
            $out = [];
            foreach ($allowedUpper as $code) {
                $codeU = strtoupper($code);
                if ($codeU === $base) { $out[$codeU] = 1.0; continue; }
                if (!isset($rub_per[$codeU])) continue;

                // rate(base→quote) = (RUB/base) / (RUB/quote) ? нет, нужно quote per 1 base:
                // rub_per[B] / rub_per[Q] (см. пояснение)
                $rate = $rub_per[$base] / $rub_per[$codeU];

                if (is_finite($rate) && $rate > 0) {
                    $out[$codeU] = (float) $rate;
                }
            }

            return ['ok' => !empty($out), 'rates' => $out, 'error' => empty($out) ? 'empty_after_filter' : null];

        } catch (\Throwable $e) {
            return ['ok' => false, 'rates' => [], 'error' => $e->getMessage()];
        }
    }

    /**
     * Обновить курсы от ЦБ РФ для выбранной БАЗЫ
     *
     * @param Currency $currency
     * @return RedirectResponse
     */
    public function refreshRates(Currency $currency): RedirectResponse
    {
        try {
            // Только активные валюты
            $all = Currency::query()
                ->where('activity', true)
                ->orderBy('sort')
                ->get(['id','code']);

            if ($all->isEmpty()) {
                return back()->withErrors(['general' => 'Нет активных валют для обновления.']);
            }

            $baseCode     = strtoupper($currency->code);
            $allowedUpper = $all->pluck('code')->map(fn($c)=>strtoupper($c))->values()->all();

            // Тянем с ЦБ РФ
            $parsed = $this->fetchFromCBR($baseCode, $allowedUpper);
            if (!$parsed['ok']) {
                Log::warning('refreshRates CBR failed', [
                    'error' => $parsed['error'] ?? null,
                    'base'  => $baseCode,
                    'allow' => $allowedUpper,
                ]);
                return back()->withErrors(['general' => 'ЦБ РФ не вернул корректные курсы.']);
            }

            $rates    = $parsed['rates']; // нормализованные, > 0
            $now      = Carbon::now();
            $baseId   = $currency->id;
            $provider = 'cbr.ru';

            DB::transaction(function () use ($rates, $all, $baseId, $provider, $now) {
                // base->base = 1.0
                CurrencyRate::updateOrCreate(
                    ['base_currency_id' => $baseId, 'quote_currency_id' => $baseId],
                    ['rate' => 1.0, 'provider' => 'system', 'fetched_at' => $now]
                );

                foreach ($all as $quote) {
                    if ((int)$quote->id === (int)$baseId) continue;

                    $code = strtoupper($quote->code);
                    if (!array_key_exists($code, $rates)) {
                        Log::notice('refreshRates CBR: skipped (no rate)', ['code' => $code]);
                        continue;
                    }

                    CurrencyRate::updateOrCreate(
                        ['base_currency_id' => $baseId, 'quote_currency_id' => $quote->id],
                        ['rate' => (float)$rates[$code], 'provider' => $provider, 'fetched_at' => $now]
                    );
                }
            });

            return back()->with('success', __('admin/controllers.updated_successfully'));

        } catch (\Throwable $e) {
            Log::error("Ошибка refreshRates (CBR): ".$e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return back()->withErrors(['general' => 'Не удалось обновить курсы (ЦБ РФ).']);
        }
    }

}
