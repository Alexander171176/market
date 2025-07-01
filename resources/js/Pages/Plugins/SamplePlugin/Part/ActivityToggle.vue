<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    isActive: Boolean,
    title: String
});

const buttonClass = computed(() => [
    'flex items-center py-1 px-1 rounded',
    'border border-slate-300',
    'hover:border-yellow-500',
    'dark:border-yellow-300 dark:hover:border-yellow-100'
]);
</script>

<template>
    <button :class="buttonClass" :title="title" @click="$emit('toggle-activity')">
        <svg v-if="isActive"
             class="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13 2L3 14h7v8l10-12h-7z"/>
        </svg>
        <svg v-else
             class="w-6 h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13 2L3 14h7v8l10-12h-7z"/>
        </svg>
    </button>
</template>
