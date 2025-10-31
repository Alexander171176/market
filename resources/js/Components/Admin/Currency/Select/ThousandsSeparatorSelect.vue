<script setup>
/**
 * Универсальный селект для разделителя тысяч.
 * Локализован и блокирует вариант, равный forbidden (например, decimal_sep).
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    modelValue: { type: String, default: 'space' }, // токен
    forbidden:  { type: String, default: '' },      // токен
    id:         { type: String, default: 'thousands_sep' },
    label:      { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

// ✅ Локализованные варианты
const OPTIONS = computed(() => [
    { label: t('currencySpace'),      value: 'space' },
    { label: t('currencyNbsp'),       value: 'nbsp' },
    { label: t('currencyThinSpace'),  value: 'currency' },
    { label: t('currencyComma'),      value: 'comma' },
    { label: t('currencyDot'),        value: 'dot' },
    { label: t('currencyApostrophe'), value: 'apostrophe' },
])

// Исключаем запрещённый токен
const options = computed(() =>
    OPTIONS.value.filter(o => o.value !== props.forbidden)
)

// Локализованный label
const labelText = computed(() =>
    props.label || t('thousandsSeparator')
)
</script>

<template>
    <div class="flex flex-col items-start w-full">
        <label :for="id" class="mb-1 block font-medium text-sm text-indigo-600 dark:text-sky-500">
            {{ labelText }}
        </label>

        <select
            :id="id"
            :value="modelValue"
            @change="e => emit('update:modelValue', e.target.value)"
            class="w-full px-3 py-0.5 form-select rounded-sm shadow-sm
             bg-white dark:bg-cyan-800
             dark:text-slate-100 font-semibold
             border border-slate-500"
        >
            <option v-for="o in options" :key="o.value" :value="o.value">
                {{ o.label }}
            </option>
        </select>
    </div>
</template>
