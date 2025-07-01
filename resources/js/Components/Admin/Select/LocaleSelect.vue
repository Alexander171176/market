<script setup>
import { useI18n } from 'vue-i18n';
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import InputError from '@/Components/Admin/Input/InputError.vue';

const { t } = useI18n();

const props = defineProps({
    modelValue: String,
    error: String
});

const emit = defineEmits(['update:modelValue']);

const updateLocale = (event) => {
    emit('update:modelValue', event.target.value);
};

// Динамически загружаем файлы локалей
const localeModules = import.meta.glob('../../../locales/*.js', {eager: true});
// console.log('localeModules:', localeModules);

// Формируем коллекцию locales
const locales = ref(
    Object.keys(localeModules)
        .map(file => {
            // Предполагается, что файл имеет формат ../../../locales/en.js
            const match = file.match(/\/([a-z]{2})\.js$/i);
            if (match) {
                const code = match[1];
                return {label: code.toUpperCase(), value: code};
            }
            return null;
        })
        .filter(locale => locale !== null)
);

onMounted(() => {
    // console.log('Доступные языки:', locales.value);
});
</script>

<template>
    <div class="flex items-center justify-center w-full mb-3">
        <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
        <select id="locale" :value="modelValue" @change="updateLocale"
                class="w-44 sm:ml-4 px-2 py-0.5 form-select bg-slate-100 dark:bg-slate-300
                       text-orange-500 dark:text-orange-700 font-semibold
                       border border-slate-500 dark:border-slate-200
                       rounded-sm shadow-sm" required>
            <option disabled value="">{{ t('selectLocale') }}</option>
            <option v-for="locale in locales" :key="locale.value" :value="locale.value">
                {{ locale.label }}
            </option>
        </select>
        <InputError v-if="error" class="mt-2" :message="error"/>
    </div>
</template>
