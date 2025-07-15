<script setup>
import {ref, computed, onMounted} from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const { t } = useI18n();

// Цвета панели виджетов
const widgetHexColor = ref('155e75');
const widgetOpacity = ref(0.99);
const widgetRgbColor = ref('');

// Функция для получения значений панели виджетов из базы данных
const fetchWidgetPanelValues = async () => {
    try {
        const response = await axios.get('/api/settings/widget-panel');
        widgetHexColor.value = response.data.color;
        widgetOpacity.value = response.data.opacity;
        widgetRgbColor.value = hexToRgb(response.data.color);
    } catch (error) {
        console.error('Error fetching widget panel settings:', error);
    }
};

// Функция для обновления цвета и прозрачности панели виджетов в базе данных
const updateWidgetPanelColor = async (hex, opacity) => {
    widgetHexColor.value = hex;
    widgetOpacity.value = opacity;
    widgetRgbColor.value = hexToRgb(hex);

    try {
        await axios.post('/api/settings/widget-panel', {
            color: hex,
            opacity: opacity
        });
    } catch (error) {
        console.error('Error updating widget panel settings:', error);
    }
};

// Вычисление стилей панели виджетов
const widgetPanelStyle = computed(() => {
    const hexColor = `#${widgetHexColor.value}`;
    const opacity = widgetOpacity.value;
    return {
        backgroundColor: hexColor,
        opacity: opacity,
    };
});

// Функция для преобразования HEX в RGB
const hexToRgb = (hex) => {
    if (hex.length !== 6) return '';
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
};

// Вызов функции получения значений при монтировании компонента
onMounted(() => {
    fetchWidgetPanelValues();
});
</script>

<template>
    <div class="row-span-full">
        <div id="widgetPanel"
             :style="widgetPanelStyle"
             class="flex-col items-center
                h-full w-4 z-20
                bg-cyan-800 dark:bg-gray-700
                dark:border-l dark:border-gray-600
                overflow-y-scroll
                hidden md:flex md:z-auto
                no-scrollbar
                transition-all duration-200 ease-in-out">
            <a href="/" target="_blank" class="mt-20 ml-1" :title="t('website')">
                <svg class="w-6 h-6 shrink-0 fill-current text-indigo-500 mr-2" viewBox="0 0 16 16">
                    <path d="M10 16h4c.6 0 1-.4 1-.998V6.016c0-.3-.1-.6-.4-.8L8.6.226c-.4-.3-.9-.3-1.3 0l-6 4.992c-.2.2-.3.5-.3.799v8.986C1 15.6 1.4 16 2 16h4c.6 0 1-.4 1-.998v-2.996h2v2.996c0 .599.4.998 1 .998Zm-4-5.99c-.6 0-1 .399-1 .998v2.995H3V6.515L8 2.32l5 4.194v7.488h-2v-2.995c0-.6-.4-.999-1-.999H6Z"></path>
                </svg>
            </a>
            <a href="/dashboard" target="_blank" class="mt-4 ml-1" :title="t('dashboard')">
                <svg class="w-6 h-6 shrink-0 fill-current text-indigo-500 mr-2" viewBox="0 0 16 16">
                    <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z"></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<style scoped>
/* Панель виджетов имеет фиксированную ширину */
#widgetPanel {
    width: 4rem; /* ширина свернутого сайдбара */
    height: 100%; /* занимать всю высоту */
}
</style>
