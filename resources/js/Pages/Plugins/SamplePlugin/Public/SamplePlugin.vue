<script setup>
import { computed, defineProps } from 'vue';

// Определяем пропсы
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    blocks: {
        type: Array,
        required: true
    },
});

// Вычисляемый блок для выбора блока по id и активности
const selectedBlock = computed(() => {
    // Находим все блоки с activity: true
    const activeBlocks = props.blocks.filter(block => block.activity);

    // Находим блок с соответствующим id
    const block = activeBlocks.find(block => block.id === props.id);

    return block || null;
});
</script>

<template>
    <!-- Если selectedBlock существует, рендерим блок -->
    <a v-if="selectedBlock" :href="selectedBlock.links"
       class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
        <div>
            <div
                class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"
                v-html="selectedBlock.svg_blocks">
            </div>
            <h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                {{ selectedBlock.title }}
            </h2>
            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {{ selectedBlock.paragraph }}
            </p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
        </svg>
    </a>
</template>

