<!-- LocaleSelectOption.vue -->
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Динамически загружаем файлы локалей. Убедитесь, что путь указан правильно!
const localeModules = import.meta.glob('../../../locales/*.js', { eager: true });
// console.log('localeModules:', localeModules);

// Формируем коллекцию доступных языков, извлекая двухсимвольный код из имени файла
const availableLocales = Object.keys(localeModules)
    .map(file => {
        // Ожидается, что файл имеет формат ../../../locales/en.js, ../../../locales/ru.js и т.д.
        const match = file.match(/\/([a-z]{2})\.js$/i);
        if (match) {
            // Приводим код к нижнему регистру, чтобы ключи перевода совпадали
            const code = match[1].toLowerCase();
            return { code };
        }
        return null;
    })
    .filter(item => item !== null);

const localesList = ref(availableLocales);
// console.log('availableLocales:', localesList.value);

// Определяем входные параметры компонента для поддержки v-model
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    }
});

// Определяем событие для двустороннего связывания
const emit = defineEmits(['update:modelValue']);

// Обработчик изменения значения
const updateLocale = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <select :value="modelValue" @change="updateLocale"
            class="uppercase font-semibold appearance-none bg-slate-100 dark:bg-slate-300
                   text-xs text-gray-900 dark:text-gray-700 px-1 py-0 w-7"
            style="background-image: none;">
        <option disabled value="">{{ t('selectLocale') }}</option>
        <option v-for="loc in localesList" :key="loc.code" :value="loc.code">
            {{ t(loc.code) }}
        </option>
    </select>
</template>
