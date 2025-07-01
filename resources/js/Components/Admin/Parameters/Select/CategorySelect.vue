<script setup>
import { useI18n } from 'vue-i18n';
import InputError from "@/Components/Admin/Input/InputError.vue";

const { t } = useI18n();

defineProps({
    modelValue: String,
    error: String
});

const emit = defineEmits(['update:modelValue']);

const categoryOptions = [
    { value: 'system', label: 'system' },
    { value: 'display', label: 'display' },
    { value: 'admin', label: 'admin' },
    { value: 'public', label: 'public' },
    { value: 'integration', label: 'integration' },
    { value: 'seo', label: 'seo' },
    { value: 'contacts', label: 'contacts' },
    { value: 'general', label: 'general' },
];
</script>

<template>
    <div class="flex flex-col w-full lg:w-64">
        <select
            id="category"
            class="form-select dark:bg-slate-800 dark:text-slate-100 py-0.5"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
        >
            <option disabled value="">{{ t('selectCategoryParameter') }}</option>
            <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
            </option>
        </select>
        <InputError class="mt-2" :message="error" />
    </div>
</template>
