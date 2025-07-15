<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    isActive: Boolean,
    title: String
});

const buttonClass = computed(() => [
    'flex items-center py-1 px-2 rounded',
    'border border-slate-300',
    'hover:border-yellow-500',
    'dark:border-yellow-300 dark:hover:border-yellow-100'
]);
</script>

<template>
    <button :class="buttonClass" :title="title" @click="$emit('toggle-main')">
        <svg v-if="isActive"
             class="w-4 h-4 fill-current text-rose-500" viewBox="0 0 12 12">
            <path d="M6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2A6 6 0 1 1 6 0a6 6 0 0 1 0 12Z"></path>
        </svg>
        <svg v-else
             class="w-4 h-4 fill-current text-gray-500" viewBox="0 0 12 12">
            <path d="M6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2A6 6 0 1 1 6 0a6 6 0 0 1 0 12Z"></path>
        </svg>
    </button>
</template>
