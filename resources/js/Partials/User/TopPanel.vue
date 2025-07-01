<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

const isPanelOpen = ref(false);

const togglePanel = () => {
    if (isPanelOpen.value) {
        if (isValidColor()) {
            saveWidgetPanelColor();
        }
    }
    isPanelOpen.value = !isPanelOpen.value;
    if (isPanelOpen.value) {
        loadWidgetPanelValues();
    }
};

const hexInput = ref('');
const rgbInput = ref('');
const rangeInput = ref(99);

const validateHex = (event) => {
    const nosymbol = /[^A-Fa-f0-9]/;
    if (nosymbol.test(event.target.value)) {
        alert('Разрешён ввод латинских символов A-F и чисел 0-9');
        event.target.value = '';
    }
};

const validateRgb = (event) => {
    const nosymbol = /[^0-9,]/;
    if (nosymbol.test(event.target.value)) {
        alert('Разрешён ввод цифр и запятых');
        event.target.value = '';
    }
};

const hexToRgb = (hex) => {
    if (hex.length !== 6) return '';
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
};

const rgbToHex = (rgb) => {
    const rgbArray = rgb.split(',').map(Number);
    if (rgbArray.length !== 3 || rgbArray.some(isNaN)) return '';
    return rgbArray.map((num) => num.toString(16).padStart(2, '0')).join('');
};

const isValidColor = () => {
    return hexInput.value.length === 6 || (rgbInput.value.split(',').length === 3 && rgbInput.value.split(',').every(num => !isNaN(num) && num >= 0 && num <= 255));
};

const updateWidgetPanelColor = () => {
    const opacity = rangeInput.value / 100;
    let color;
    if (hexInput.value) {
        color = `#${hexInput.value}`;
    } else if (rgbInput.value) {
        color = `rgb(${rgbInput.value})`;
    } else {
        color = 'rgba(21,94,117,1)';
    }

    const widgetPanel = document.getElementById('widgetPanel');
    if (widgetPanel) {
        widgetPanel.style.backgroundColor = color;
        widgetPanel.style.opacity = opacity;
    }
};

const saveWidgetPanelColor = async () => {
    const color = hexInput.value ? `#${hexInput.value}` : `rgb(${rgbInput.value})`;
    const opacity = rangeInput.value / 100;
    try {
        await axios.post('/api/settings/widget-panel', {color, opacity});
    } catch (error) {
        console.error('Error saving widget panel color:', error);
    }
};

const loadWidgetPanelValues = async () => {
    try {
        const response = await axios.get('/api/settings/widget-panel');
        const {color, opacity} = response.data;
        if (color && opacity !== undefined) {
            hexInput.value = color.startsWith('#') ? color.substring(1) : rgbToHex(color);
            rgbInput.value = hexToRgb(hexInput.value);
            rangeInput.value = opacity * 100;
        }
    } catch (error) {
        console.error('Error loading widget panel values:', error);
    }
};

watch(hexInput, (newHex) => {
    rgbInput.value = hexToRgb(newHex);
    updateWidgetPanelColor();
});

watch(rgbInput, (newRgb) => {
    hexInput.value = rgbToHex(newRgb);
    updateWidgetPanelColor();
});

watch(rangeInput, () => {
    updateWidgetPanelColor();
});

onMounted(() => {
    loadWidgetPanelValues();
});
</script>

<template>
    <div>
        <button
            class="fixed top-0 right-4 z-50 hidden md:inline-block
                    px-3 py-3
                    cursor-pointer"
            @click="togglePanel">
            <svg class="w-8 h-8" viewBox="0 0 20 20">
                <circle fill="none" class="stroke-red-300 dark:stroke-violet-500" cx="9.997" cy="10" r="3.31"></circle>
                <path fill="none" class="stroke-red-300 dark:stroke-violet-500"
                      d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"></path>
            </svg>
        </button>
        <transition name="top-panel">
            <div v-if="isPanelOpen"
                 class="fixed top-0 left-0 right-0
                        bg-slate-700 dark:bg-slate-100 bg-opacity-90 dark:bg-opacity-90
                        shadow-md font-semibold
                        text-center text-lg
                        z-40 h-16 py-4
                        overflow-y-auto
                        flex items-center justify-center
                        space-x-4">
                <form class="flex items-center space-x-2">
                    <span class="text-teal-200 dark:text-teal-600">HEX:#</span>
                    <input maxlength="6" size="6" id="out" name="out" v-model="hexInput"
                           @keyup="validateHex" @input="changeColor"
                           class="border rounded px-2 py-1 w-20 text-lg"/>
                    <span class="text-red-200 dark:text-red-400">RGB:</span>
                    <input maxlength="12" size="12" name="out2" v-model="rgbInput"
                           @keyup="validateRgb" @input="changeColor"
                           class="border rounded px-2 py-1 w-32 text-lg"/>
                    <input type="range"
                           class="input-range ml-2"
                           id="inputr"
                           name="inputr"
                           min="0" max="99"
                           v-model="rangeInput"
                           @input="resizeInput"/>
                </form>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.top-panel-enter-active,
.top-panel-leave-active {
    transition: transform 0.3s ease;
}

.top-panel-enter-from,
.top-panel-leave-to {
    transform: translateY(-100%);
}

.top-panel-enter-to,
.top-panel-leave-from {
    transform: translateY(0);
}
</style>
