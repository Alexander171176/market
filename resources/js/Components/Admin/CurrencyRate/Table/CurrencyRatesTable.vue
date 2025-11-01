<script setup>
/**
 * Карточка с таблицей и кнопками для работы курсов
 * Здесь устранены:
 * - падения из-за null → InputNumber теперь всегда получает '' | number
 * - ввод курса — только number-инпут, но пустое значение допускается (''), сохранение не пускает
 * - создание по коду валюты (маппинг code → id перед отправкой), иначе validation.exists
 * - пакетное сохранение и одиночное обновление с одинаковой валидацией на фронте
 */
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm, router } from '@inertiajs/vue3'
import { useToast } from 'vue-toastification'

import InputText from '@/Components/Admin/Input/InputText.vue'
import InputError from '@/Components/Admin/Input/InputError.vue'
import PrimaryButtonExt from '@/Components/Admin/Buttons/PrimaryButtonExt.vue'
import PrimaryButtonAdd from '@/Components/Admin/Buttons/PrimaryButtonAdd.vue'
import DeleteIcon from '@/Components/Admin/Buttons/DeleteIcon.vue'
import RefreshRatesButton from '@/Components/Admin/Currency/Buttons/RefreshRatesButton.vue'
import InputNumberExt from '@/Components/Admin/CurrencyRate/Input/InputNumberExt.vue'

const { t } = useI18n()
const toast = useToast()

const props = defineProps({
    currency: { type: Object, required: true },    // {id, code, name}
    rates: { type: Array, required: true },        // CurrencyRateResource[]
    currencies: { type: Array, required: true },   // [{id, code, name}]
})

/** Быстрый мап кода валюты → объект валюты */
const currenciesByCode = computed(() => {
    const map = Object.create(null)
    for (const c of props.currencies) map[(c.code || '').toUpperCase()] = c
    return map
})

/** Преобразование ресурса в строку таблицы (в т.ч. editable-буферы) */
function toRow(r) {
    return {
        id: r?.id ?? null,

        quote_currency_id: r?.quote_currency?.id ?? '',
        quote: r?.quote_currency ?? { id: '', code: '', name: '' },

        rate: r?.rate !== undefined && r?.rate !== null && r?.rate !== '' ? Number(r.rate) : null,
        provider: r?.provider ?? '',
        fetched_at: r?.fetched_at ?? null,

        _rate: r?.rate !== undefined && r?.rate !== null && r?.rate !== '' ? String(r.rate) : '', // ← строка
        _provider: String(r?.provider ?? ''),

        _dirty: false,
        _saving: false,
        _error: null,
    }
}

/** Пустая строка (добавить) */
function emptyRow() {
    return toRow({
        id: null,
        quote_currency: { id: '', code: '', name: '' },
        rate: '',       // исходно пусто
        provider: '',
        fetched_at: null,
    })
}

/** Строки */
const rows = reactive((props.rates || []).map(toRow))

/** Изменённые строки */
const dirtyRows = computed(() => rows.filter(r => r._dirty))

/** Строгое преобразование к числу (поддержка запятой); пустое/мусор → NaN */
function toNumber(val) {
    if (val === '' || val === undefined) return NaN
    return Number(String(val).replace(',', '.'))
}

/** Когда меняется код валюты (в новой строке) — мапим на id, иначе блокируем сохранение */
function onQuoteCodeChanged(row) {
    const code = (row.quote?.code || '').trim().toUpperCase()
    const found = code ? currenciesByCode.value[code] : null
    if (found) {
        row.quote_currency_id = found.id
        row.quote = { id: found.id, code: found.code, name: found.name }
    } else {
        row.quote_currency_id = ''
        row.quote = { id: '', code, name: '' }
    }
    row._dirty = true
}

/** Кнопки */
function addRow() {
    rows.push(emptyRow())
}

function removeLocalRow(idx) {
    rows.splice(idx, 1)
}

/** Общая клиентская валидация строки перед POST/PUT */
function validateRowForSubmit(row) {
    const n = toNumber(row._rate)
    return !!row.quote_currency_id && Number.isFinite(n) && n > 0
}

/** Одиночное сохранение */
function saveRow(row) {
    row._saving = true
    row._error = null

    if (!validateRowForSubmit(row)) {
        row._saving = false
        row._error = t('validationInvalidData')
        toast.error(row._error)
        return
    }

    const payload = {
        quote_currency_id: row.quote_currency_id,
        rate: toNumber(row._rate),      // число считаем ТОЛЬКО здесь
        provider: row._provider || null,
        fetched_at: null,
    }

    const form = useForm(payload)

    if (row.id) {
        form.put(route('admin.currencies.rates.update', { currency: props.currency.id, rate: row.id }), {
            preserveScroll: true,
            onSuccess: () => {
                row.rate = payload.rate
                row._dirty = false
                row._error = null
                toast.success(t('saved'))
            },
            onError: (errors) => {
                row._error = Object.values(errors)[0] || (t('saveError'))
                toast.error(row._error)
            },
            onFinish: () => { row._saving = false }
        })
    } else {
        form.post(route('admin.currencies.rates.store', { currency: props.currency.id }), {
            preserveScroll: true,
            onSuccess: () => {
                row.rate = payload.rate
                row._dirty = false
                row._error = null
                toast.success(t('created'))
            },
            onError: (errors) => {
                row._error = Object.values(errors)[0] || (t('saveError'))
                toast.error(row._error)
            },
            onFinish: () => { row._saving = false }
        })
    }
}

/** Удаление одной строки */
function deleteRow(idx, row) {
    if (!row.id) {
        removeLocalRow(idx)
        return
    }
    row._saving = true
    row._error = null

    router.delete(
        route('admin.currencies.rates.destroy', { currency: props.currency.id, rate: row.id }),
        {
            preserveScroll: true,
            onSuccess: () => {
                rows.splice(idx, 1)
                toast.success(t('deleted'))
            },
            onError: (errors) => {
                row._error = Object.values(errors)[0] || (t('commentDeleteError'))
                toast.error(row._error)
            },
            onFinish: () => { row._saving = false }
        }
    )
}

/** Пакетное сохранение */
function saveBulk() {
    if (!dirtyRows.value.length) {
        toast.info(t('nothingToSave'))
        return
    }

    const prepared = dirtyRows.value.map(r => ({
        quote_currency_id: r.quote_currency_id,
        rate: toNumber(r._rate),
        provider: r._provider || null,
        fetched_at: null,
    }))

    if (prepared.some(p => !p.quote_currency_id || !Number.isFinite(p.rate) || p.rate <= 0)) {
        toast.error(t('validationInvalidData'))
        return
    }

    const form = useForm({ rates: prepared })
    form.post(route('admin.currencies.rates.bulk', { currency: props.currency.id }), {
        preserveScroll: true,
        onSuccess: () => {
            rows.forEach(r => {
                if (r._dirty) {
                    r.rate = toNumber(r._rate)
                    r._dirty = false
                    r._error = null
                }
            })
            toast.success(t('saved'))
        },
        onError: (errors) => {
            const first = Object.values(errors)[0] || (t('saveError'))
            toast.error(first)
        }
    })
}

/** Обновление курсов с провайдера */
function refreshFromProvider() {
    const form = useForm({})
    form.post(route('admin.currencies.rates.refresh', { currency: props.currency.id }), {
        preserveScroll: true,
        onSuccess: () => toast.success(t('ratesRefreshed')),
        onError: (errors) => toast.error(Object.values(errors)[0] || (t('refreshError'))),
    })
}

/** Маркировка «грязности»: сравниваем по числам, но `_rate` не трогаем */
function markDirty(row) {
    const oldRateNum = Number.isFinite(Number(row.rate)) ? Number(row.rate) : NaN
    const newRateNum = toNumber(row._rate) // NaN, если пусто или мусор
    const providerChanged = String(row._provider ?? '').trim() !== String(row.provider ?? '').trim()

    let rateChanged = false
    if (Number.isFinite(oldRateNum) && Number.isFinite(newRateNum)) {
        rateChanged = oldRateNum !== newRateNum
    } else if (Number.isFinite(oldRateNum) && !Number.isFinite(newRateNum)) {
        rateChanged = true               // было число → стало пусто/некорректно
    } else if (!Number.isFinite(oldRateNum) && Number.isFinite(newRateNum)) {
        rateChanged = true               // было пусто → стало число
    } else {
        rateChanged = false              // оба нечисла
    }

    row._dirty = rateChanged || providerChanged
}

</script>

<template>
    <div>

        <!-- верхние кнопки -->
        <div class="sm:flex sm:justify-between items-center mb-2">
            <div class="mb-1 flex items-center gap-2">
                <PrimaryButtonAdd @click="addRow">
                    <template #icon>
                        <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
                            <path d="M7 0h2v16H7zM0 7h16v2H0z"/>
                        </svg>
                    </template>
                    {{ t('addRow') }}
                </PrimaryButtonAdd>
            </div>

            <div class="mb-1 flex items-center gap-2">
                <RefreshRatesButton @click="refreshFromProvider">
                    <template #icon>
                        <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                             viewBox="0 0 24 24">
                            <path d="M12 6V3L8 7l4 4V8a4 4 0 1 1-4 4H6a6 6 0 1 0 6-6z"/>
                        </svg>
                    </template>
                    {{ t('currencyRefreshRates') }}
                </RefreshRatesButton>
            </div>
        </div>

        <!-- таблица -->
        <div class="overflow-x-auto">
            <table class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900
                              border border-solid border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="font-medium px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap">
                        {{ t('code') }}
                    </th>
                    <th class="font-medium px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap">
                        {{ t('name') }}
                    </th>
                    <th class="font-medium px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap">
                        {{ t('rate') }}
                    </th>
                    <th class="font-medium px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap">
                        {{ t('provider') }}
                    </th>
                    <th class="font-medium px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap">
                        {{ t('updatedAt') }}
                    </th>
                    <th class="font-medium px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap text-center">
                        {{ t('actions') }}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(r, idx) in rows" :key="r.id ? `row-${r.id}` : `new-${idx}`"
                    class="text-sm font-semibold border-b-2
                           hover:bg-slate-100 dark:hover:bg-cyan-800">

                    <!-- code -->
                    <td class="px-2 first:pl-6 last:pr-6 py-1 whitespace-nowrap">
                        <div class="flex items-center gap-2">
                            <InputText
                                v-if="!r.quote_currency_id"
                                v-model="r.quote.code"
                                class="w-28 uppercase"
                                :placeholder="t('currencyCodeComment')"
                                @update:modelValue="onQuoteCodeChanged(r)"
                            />
                            <span v-else class="font-semibold">{{ r.quote?.code || '—' }}</span>
                        </div>
                    </td>

                    <!-- name -->
                    <td class="px-2 first:pl-6 last:pr-6 py-1 whitespace-nowrap">
                        <span v-if="r.quote?.name" class="text-amber-600 dark:text-amber-400">
                            {{ r.quote.name }}
                        </span>
                        <span v-else class="text-slate-400 italic">
                            {{ t('selectCurrency') }}
                        </span>
                    </td>

                    <!-- rate editable -->
                    <td class="px-2 first:pl-6 last:pr-6 py-1 whitespace-nowrap">
                        <InputNumberExt v-model="r._rate"
                        type="number"
                        inputmode="decimal"
                        :step="0.00000001"
                        :min="0.00000001"
                        @input="markDirty(r)"
                        />
                        <InputError :message="r._error" class="mt-1" />
                    </td>

                    <!-- provider editable -->
                    <td class="px-2 first:pl-6 last:pr-6 py-1 whitespace-nowrap">
                        <InputText v-model="r._provider" class="w-36" @input="markDirty(r)" />
                    </td>

                    <!-- fetched_at -->
                    <td class="px-2 first:pl-6 last:pr-6 py-1 whitespace-nowrap">
                        <span class="text-violet-800 dark:text-violet-200">
                            {{ r.fetched_at ? new Date(r.fetched_at).toLocaleString() : '—' }}
                        </span>
                    </td>

                    <!-- actions -->
                    <td class="px-3 py-2">
                        <div class="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                class="inline-flex items-center gap-1 p-2 rounded text-white
                                       bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-800
                                       dark:hover:bg-emerald-600
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                                :class="{ 'opacity-50 pointer-events-none': r._saving || !r._dirty }"
                                @click="saveRow(r)"
                                :title="t('saveRate')"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"
                                     viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.707,6.707,17.293,1.293A1,1,0,0,0,16.586,1H4A3,3,0,0,0,1,4V20a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V7.414A1,1,0,0,0,22.707,6.707ZM14.5,4h1a.5.5,0,0,1,.5.5v4a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5v-4A.5.5,0,0,1,14.5,4ZM19,12.5v6a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-6a.5.5,0,0,1,.5-.5h13A.5.5,0,0,1,19,12.5Z"/>
                                </svg>
                            </button>

                            <DeleteIcon v-if="r.id"
                                        :class="{ 'opacity-50 pointer-events-none': r._saving }"
                                        @click="deleteRow(idx, r)">
                                <template #icon>
                                    <svg class="w-4 h-4 fill-current
                                                text-rose-400 hover:text-rose-500
                                                dark:text-red-300 dark:hover:text-red-100 shrink-0"
                                         viewBox="0 0 16 16">
                                        <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
                                    </svg>
                                </template>
                                {{ t('delete') }}
                            </DeleteIcon>

                            <DeleteIcon v-else @click="removeLocalRow(idx)" href="#">
                                <template #icon>
                                    <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                                         viewBox="0 0 24 24">
                                        <path d="M18 6L6 18M6 6l12 12"
                                              stroke="currentColor" stroke-width="2" fill="none"/>
                                    </svg>
                                </template>
                                {{ t('remove') }}
                            </DeleteIcon>
                        </div>
                    </td>
                </tr>

                <tr v-if="!rows.length">
                    <td colspan="6" class="px-3 py-6 text-center text-slate-500">
                        {{ t('noData') }}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- низ -->
        <div class="flex items-center justify-center gap-2 mt-4">
            <PrimaryButtonExt
                :class="['ms-4 mb-0', { 'opacity-50 pointer-events-none': !dirtyRows.length }]"
                @click="saveBulk">
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24"
                         fill="currentColor">
                        <path d="M22.707,6.707,17.293,1.293A1,1,0,0,0,16.586,1H4A3,3,0,0,0,1,4V20a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V7.414A1,1,0,0,0,22.707,6.707ZM14.5,4h1a.5.5,0,0,1,.5.5v4a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5v-4A.5.5,0,0,1,14.5,4ZM19,12.5v6a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-6a.5.5,0,0,1,.5-.5h13A.5.5,0,0,1,19,12.5Z"/>
                    </svg>
                </template>
                {{ t('saveChanges') }}
            </PrimaryButtonExt>
        </div>
    </div>
</template>
