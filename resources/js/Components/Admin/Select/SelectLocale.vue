<script setup>
import {ref, defineProps, defineEmits, onMounted} from 'vue';
import {useI18n} from 'vue-i18n';
import LabelInput from "@/Components/Admin/Input/LabelInput.vue";
import InputError from "@/Components/Admin/Input/InputError.vue";

const {t} = useI18n();

// Путь указан относительно местоположения этого файла
const localeModules = import.meta.glob('../../../locales/*.js', {eager: true});
//console.log('localeModules:', localeModules);

// Формируем коллекцию locales, извлекая двухсимвольный код из имени файла
const locales = ref(
    Object.keys(localeModules)
        .map(file => {
            // Пример file: ../../locales/en.js
            const match = file.match(/\/([a-z]{2})\.js$/i);
            if (match) {
                const code = match[1];
                return {label: code.toUpperCase(), value: code};
            }
            return null;
        })
        .filter(locale => locale !== null)
);
// console.log('locales:', locales.value);

const props = defineProps({
    modelValue: String, // Двустороннее связывание данных
    errorMessage: String // Сообщение об ошибке
});

const emit = defineEmits(['update:modelValue']);

onMounted(() => {
    // console.log('Component mounted, locales:', locales.value);
});
</script>

<template>
    <div class="flex flex-row items-center gap-2 w-auto">
        <div class="h-8 flex items-center justify-between w-full">
            <LabelInput for="locale">
                <span class="text-sm text-red-500 dark:text-red-300 font-semibold">*</span> {{ t('localization') }}
            </LabelInput>
        </div>
        <select
            id="locale"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            class="block w-full py-0.5 border-slate-500 font-semibold text-sm focus:border-indigo-500
             focus:ring-indigo-300 rounded-sm shadow-sm dark:bg-cyan-800 dark:text-slate-100">
            <option value="" disabled>{{ t('selectLocale') }}</option>
            <option v-for="locale in locales" :key="locale.value" :value="locale.value">
                {{ locale.label }}
            </option>
        </select>
        <InputError class="mt-2 lg:mt-0" :message="errorMessage"/>
    </div>
</template>
