<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';

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
        </div>
    </div>
</template>

<style scoped>
/* Панель виджетов имеет фиксированную ширину */
#widgetPanel {
    width: 5rem; /* ширина свернутого сайдбара */
    height: 100%; /* занимать всю высоту */
}
</style>
