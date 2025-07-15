<script setup>
import {ref, onMounted, onUnmounted} from 'vue';

const scrollContainer = ref(null);
const showScrollToTop = ref(false);
const showScrollToBottom = ref(true);
let scrollInterval = null;

const findScrollContainer = () => {
    // Найдем родительский элемент с overflow-y-auto
    let parent = document.querySelector('main');
    while (parent && getComputedStyle(parent).overflowY !== 'auto') {
        parent = parent.parentElement;
    }
    return parent;
};

const startScroll = (direction) => {
    const scrollStep = direction === 'down' ? 20 : -20;
    scrollInterval = setInterval(() => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollTop += scrollStep;
        }
    }, 16); // примерно 60 кадров в секунду
};

const stopScroll = () => {
    clearInterval(scrollInterval);
};

const handleScroll = () => {
    if (scrollContainer.value) {
        const scrollTop = scrollContainer.value.scrollTop;
        const scrollHeight = scrollContainer.value.scrollHeight;
        const clientHeight = scrollContainer.value.clientHeight;

        showScrollToTop.value = scrollTop > 0;
        showScrollToBottom.value = scrollTop + clientHeight < scrollHeight;
    }
};

onMounted(() => {
    scrollContainer.value = findScrollContainer();
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', handleScroll);
        handleScroll(); // Обновляем состояние при монтировании
    }
});

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', handleScroll);
    }
    clearInterval(scrollInterval);
});
</script>

<template>
    <div class="fixed right-5 bottom-16 flex flex-col space-y-2 z-50">
        <button
            v-show="showScrollToTop"
            @mousedown="startScroll('up')"
            @mouseup="stopScroll"
            @mouseleave="stopScroll"
            @touchstart="startScroll('up')"
            @touchend="stopScroll"
            class="scroll-button"
        >
            ↑
        </button>
        <button
            v-show="showScrollToBottom"
            @mousedown="startScroll('down')"
            @mouseup="stopScroll"
            @mouseleave="stopScroll"
            @touchstart="startScroll('down')"
            @touchend="stopScroll"
            class="scroll-button"
        >
            ↓
        </button>
    </div>
</template>

<style scoped>
.scroll-button {
    background-color: #09f; /* Tailwind bg-blue-700 */
    color: white;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
    opacity: 0.5;
    cursor: pointer;
}

.scroll-button:hover {
    opacity: 1;
}
</style>
