<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    modelValue: { type: String, default: 'dot' }, // Токен
    forbidden:  { type: String, default: '' },    // Токен
    id:         { type: String, default: 'decimal_sep' },
    label:      { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

// ✅ Локализованные варианты
const OPTIONS = computed(() => [
    { label: t('currencyComma'), value: 'comma' },
    { label: t('currencyDot'),   value: 'dot' },
])

// Исключаем запрещённый вариант
const options = computed(() =>
    OPTIONS.value.filter(o => o.value !== props.forbidden)
)

// Заголовок селекта
const labelText = computed(() =>
    props.label || t('currencyDecimalSeparator')
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
