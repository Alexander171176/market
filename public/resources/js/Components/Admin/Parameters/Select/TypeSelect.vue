<script setup>
import {useI18n} from 'vue-i18n';
import InputError from "@/Components/Admin/Input/InputError.vue";

const { t } = useI18n();

defineProps({
    modelValue: String,
    error: String
});

const emit = defineEmits(['update:modelValue']);

// Жёстко закодированные значения
const typeOptions = [
    { value: 'string', label: 'string' },
    { value: 'text', label: 'text' },
    { value: 'number', label: 'number' },
    { value: 'integer', label: 'integer' },
    { value: 'float', label: 'float' },
    { value: 'boolean', label: 'boolean' },
    { value: 'checkbox', label: 'checkbox' },
    { value: 'json', label: 'json' },
    { value: 'array', label: 'array' },
    { value: 'select', label: 'select' }
];
</script>

<template>
    <div class="flex flex-col">
        <select
            id="type"
            class="form-select dark:bg-slate-800 dark:text-slate-100 py-0.5"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
        >
            <option disabled value="">{{ t('selectType') }}</option>
            <option v-for="opt in typeOptions" :key="opt.value" :value="opt.value" :title="t(opt.label)">
                {{ opt.label }}
            </option>
        </select>
        <InputError class="mt-2" :message="error" />
    </div>
</template>
