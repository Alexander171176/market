<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Link } from '@inertiajs/vue3'
import draggable from 'vuedraggable'
import ActivityToggle from '@/Components/Admin/Buttons/ActivityToggle.vue'
import IconEdit from '@/Components/Admin/Buttons/IconEdit.vue'
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue'
import SetDefaultButton from '@/Components/Admin/Currency/Buttons/SetDefaultButton.vue'
import InlineRateEditor from '@/Components/Admin/Currency/Buttons/InlineRateEditor.vue'

const { t } = useI18n()

const props = defineProps({
    currencies: Array,
    selectedCurrencies: Array
})

const emits = defineEmits([
    'toggle-activity',
    'edit',
    'delete',
    'update-sort-order',
    'toggle-select',
    'toggle-all',
    'set-default',
    'save-rate'
])

// --- Локальная копия для vuedraggable ---
const localCurrencies = ref([])

// --- Следим за изменением props.currencies и обновляем локальную копию ---
watch(() => props.currencies, (newVal) => {
    // Создаем глубокую копию, чтобы избежать мутации props
    localCurrencies.value = JSON.parse(JSON.stringify(newVal || []))
}, { immediate: true, deep: true }) // immediate: true для инициализации

// --- Функция, вызываемая vuedraggable после завершения перетаскивания ---
const handleDragEnd = () => {
    // Отправляем НОВЫЙ ПОРЯДОК ID из локального массива
    const newOrderIds = localCurrencies.value.map(currency => currency.id)
    emits('update-sort-order', newOrderIds) // Отправляем массив ID
}

// --- Логика массовых действий ---
const toggleAll = (event) => {
    const checked = event.target.checked
    const ids = localCurrencies.value.map(r => r.id)
    emits('toggle-all', { ids, checked })
}

// валидация локально для кнопки
const canSave = (row) => {
    if (row.is_default) return false // базовой не нужен курс
    const oldVal = row.rate_vs_default
    const v = Number(row._editRate)
    if (!Number.isFinite(v) || v <= 0) return false
    return String(v) !== String(oldVal)
}

const onSave = async (row) => {
    if (!canSave(row)) return
    row._busy = true
    emits('save-rate', { id: row.id, value: Number(row._editRate) })
}
</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm
                border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table v-if="currencies.length > 0"
                   class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead class="text-sm font-semibold uppercase
                                bg-slate-200 dark:bg-cyan-900
                                border border-solid
                                border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="px-2 py-3 w-px">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-4 h-4 fill-current text-slate-800 dark:text-slate-200"
                             height="24" width="24" viewBox="0 0 24 24">
                            <path
                                d="M12.707,2.293a1,1,0,0,0-1.414,0l-5,5A1,1,0,0,0,7.707,8.707L12,4.414l4.293,4.293a1,1,0,0,0,1.414-1.414Z"></path>
                            <path
                                d="M16.293,15.293,12,19.586,7.707,15.293a1,1,0,0,0-1.414,1.414l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,0,0-1.414-1.414Z"></path>
                        </svg>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="font-semibold text-center">{{ t('id') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">{{ t('currency') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">{{ t('code') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold flex justify-center">{{ t('symbol') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-left">{{ t('rate') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-end">{{ t('actions') }}</div>
                    </th>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap">
                        <div class="text-center font-medium">
                            <input type="checkbox" @change="toggleAll" />
                        </div>
                    </th>
                </tr>
                </thead>
                <draggable
                    tag="tbody"
                    v-model="localCurrencies"
                    @end="handleDragEnd"
                    itemKey="id"
                    handle=".handle"
                >
                    <template #item="{ element: currency }">
                        <tr class="text-sm font-semibold border-b-2
                                   hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-2 py-1 text-center cursor-move handle">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-300"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M7 4h2v2H7V4zm4 0h2v2h-2V4zM7 8h2v2H7V8zm4 0h2v2h-2V8zM7 12h2v2H7v-2zm4 0h2v2h-2v-2z" />
                                </svg>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center"
                                     :class="currency.is_default ? 'text-dark dark:white'
                                     : 'text-blue-600 dark:text-blue-200'">
                                    {{ currency.id }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div
                                    class="text-left"
                                    :class="currency.is_default ? 'text-dark dark:white'
                                    : 'text-teal-600 dark:text-teal-400'">
                                    {{ currency.code }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div
                                    class="flex items-center space-x-1 text-left font-semibold"
                                    :title="currency.is_default ? t('mainCurrency') : ''"
                                    :class="currency.is_default
                                    ? 'text-dark dark:text-white'
                                    : 'text-amber-600 dark:text-amber-400'">
                                    <svg v-if="currency.is_default"
                                         xmlns="http://www.w3.org/2000/svg"
                                         class="w-4 h-4 fill-current text-rose-500 dark:text-rose-300"
                                         viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.462a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.387-2.462a1 1 0 00-1.176 0l-3.387 2.462c-.785.57-1.84-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                                    </svg>
                                    <span :class="currency.is_default ? 'mt-0.5' : ''">
                                        {{ currency.name }}
                                    </span>
                                    <Link
                                        :href="route('admin.currencies.rates.index', currency.id)"
                                        :title="t('currencyRates')"
                                        class="inline-flex items-center justify-center p-1 rounded
                                               text-blue-500 hover:text-blue-700 dark:text-blue-300
                                               dark:hover:text-blue-100
                                               focus:outline-none focus:ring">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"
                                             viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22,1H14a1,1,0,0,0-.707,1.707L16.586,6l-6.293,6.293a1,1,0,1,0,1.414,1.414L18,7.414l3.293,3.293A1,1,0,0,0,22,11a.987.987,0,0,0,.383-.076A1,1,0,0,0,23,10V2A1,1,0,0,0,22,1Z"></path>
                                            <path d="M4,23H18a3,3,0,0,0,3-3V15a1,1,0,0,0-2,0v5a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5H9A1,1,0,0,0,9,3H4A3,3,0,0,0,1,6V20A3,3,0,0,0,4,23Z"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div
                                    class="text-left flex justify-center"
                                    :class="currency.is_default ? 'text-dark dark:white'
                                    : 'text-rose-500 dark:text-rose-300'">
                                    {{ currency.symbol }}
                                </div>
                            </td>
                            <!-- КОЛОНКА КУРСА -->
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <InlineRateEditor :currency="currency"
                                                  @save="$emit('save-rate', $event)" />
                            </td>
                            <!-- КОЛОНКА ДЕЙСТВИЙ -->
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="flex justify-end space-x-2">
                                    <SetDefaultButton
                                        :disabled="currency.is_default"
                                        :title="currency.is_default ? t('mainCurrency') : t('makeMainCurrency')"
                                        @click="$emit('set-default', currency)"
                                    />
                                    <ActivityToggle :isActive="currency.activity"
                                                    @toggle-activity="$emit('toggle-activity', currency)"
                                                    :title="currency.activity ? t('enabled') : t('disabled')" />
                                    <IconEdit :href="route('admin.currencies.edit', currency.id)" />
                                    <DeleteIconButton @click="$emit('delete', currency.id, currency.name)" />
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-center">
                                    <input type="checkbox" :checked="selectedCurrencies.includes(currency.id)"
                                           @change="$emit('toggle-select', currency.id)" />
                                </div>
                            </td>
                        </tr>
                    </template>
                </draggable>
            </table>
            <div v-else class="p-5 text-center text-slate-700 dark:text-slate-100">
                {{ t('noData') }}
            </div>
        </div>
    </div>
</template>
