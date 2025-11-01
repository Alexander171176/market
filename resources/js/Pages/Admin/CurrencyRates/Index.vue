<script setup>
/**
 * Курсы валют для конкретной валюты
 * @route names (см. web.php):
 * - admin.currencies.rates.index
 * - admin.currencies.rates.store
 * - admin.currencies.rates.update
 * - admin.currencies.rates.destroy
 * - admin.currencies.rates.bulk
 * - admin.currencies.rates.refresh
 */
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue'
import CurrencyRatesTable from '@/Components/Admin/CurrencyRate/Table/CurrencyRatesTable.vue'

const { t } = useI18n()

const props = defineProps({
    currency: { type: Object, required: true },    // {id, code, name}
    rates: { type: Array, required: true },        // CurrencyRateResource[]
    currencies: { type: Array, required: true }   // [{id, code, name}]
})
</script>

<template>
    <AdminLayout :title="`${t('currencyRates')} — ${currency.code}`">
        <template #header>
            <TitlePage>
                {{ t('currencyRates') + ': ' }}
                <span class="font-semibold">{{ currency.name }} ({{ currency.code }})</span>
            </TitlePage>
        </template>

        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">

                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Кнопка назад оставил в родителе -->
                    <DefaultButton :href="route('admin.currencies.index')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
                            </svg>
                        </template>
                        {{ t('back') }}
                    </DefaultButton>
                </div>

                <!-- Вся карточка с кнопками/таблицей вынесена в отдельный компонент -->
                <CurrencyRatesTable
                    :currency="currency"
                    :rates="rates"
                    :currencies="currencies"
                />
            </div>
        </div>
    </AdminLayout>
</template>
