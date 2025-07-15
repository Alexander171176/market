<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    title: String,
    href: String
});

const buttonClass = computed(() => [
    'flex items-center py-1 px-2 rounded',
    'border border-slate-300',
    'hover:border-indigo-400',
    'dark:border-indigo-300 dark:hover:border-indigo-100'
]);
</script>

<template>
    <button :class="buttonClass" @click="$emit('click')" :title="title">
        <svg class="w-4 h-4 fill-current text-indigo-400" viewBox="0 0 16 16">
            <path d="M7.001 3h2v4h-2V3zm1 7a1 1 0 110-2 1 1 0 010 2zM15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z"></path>
        </svg>
    </button>
</template>
