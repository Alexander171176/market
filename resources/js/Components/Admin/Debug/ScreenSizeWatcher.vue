<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const screenSize = ref('xs'); // Изначальный breakpoint экрана
const screenWidth = ref(window.innerWidth); // Изначальная ширина экрана

// Функция для определения текущего breakpoint и ширины экрана
const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;

    if (window.matchMedia("(min-width: 1536px)").matches) {
        screenSize.value = '2xl';
    } else if (window.matchMedia("(min-width: 1280px)").matches) {
        screenSize.value = 'xl';
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
        screenSize.value = 'lg';
    } else if (window.matchMedia("(min-width: 768px)").matches) {
        screenSize.value = 'md';
    } else if (window.matchMedia("(min-width: 640px)").matches) {
        screenSize.value = 'sm';
    } else {
        screenSize.value = 'xs';
    }
    console.log(`Размер экрана класс Tailwind CSS: ${screenSize.value}, Ширина экрана в пикселях: ${screenWidth.value}px`);
};

// Добавляем и удаляем слушатель при монтировании и размонтировании
onMounted(() => {
    updateScreenSize(); // Проверка при первой загрузке
    window.addEventListener("resize", updateScreenSize);
});

onUnmounted(() => {
    window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
    <div>
        <!-- Можно отобразить ширину и breakpoint экрана, если это нужно -->
        <span class="hidden">{{ screenSize }} ({{ screenWidth }}px)</span>
    </div>
</template>
