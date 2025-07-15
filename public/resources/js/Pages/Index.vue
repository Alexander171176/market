<template>
    <component :is="currentComponent" v-bind="props"></component>
</template>

<script setup>
import { defineProps, defineAsyncComponent, shallowRef, watch, onMounted } from 'vue';
import axios from 'axios';
import Maintenance from './Maintenance.vue';

const props = defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    template: String,
    laravelVersion: String,
    phpVersion: String,
});

// Функция для динамического импорта компонентов
const importTemplates = () => {
    const context = import.meta.glob('/resources/js/Pages/Templates/*/Index.vue');
    const components = {};

    for (const path in context) {
        const templateName = path.split('/')[5];
        components[templateName] = defineAsyncComponent(context[path]);
    }

    return components;
};

// Динамический импорт компонентов
const components = importTemplates();

const downtimeSite = shallowRef(false);
const currentComponent = shallowRef(null);

const fetchSettings = async () => {
    try {
        const response = await axios.get('/api/settings/downtimeSite');
        //console.log('Ответ API о состоянии заглушки:', response.data);
        downtimeSite.value = response.data.value === 'true';
        //console.log('Настройка downtimeSite после обработки:', downtimeSite.value);
    } catch (error) {
        console.error('Ошибка при получении настроек:', error);
    } finally {
        updateComponent();
    }
};

const updateComponent = () => {
    if (downtimeSite.value) {
        //console.log('Сайт на техническом обслуживании. Переключение на Maintenance.vue');
        currentComponent.value = Maintenance;
    } else {
        const template = props.template || 'Default';
        //console.log('Использование шаблона:', template);
        currentComponent.value = components[template] || components['Default'];
    }
};

onMounted(() => {
    fetchSettings();
});

watch(downtimeSite, (newValue) => {
    // console.log('Изменение настройки downtimeSite:', newValue);
    updateComponent();
});
</script>
