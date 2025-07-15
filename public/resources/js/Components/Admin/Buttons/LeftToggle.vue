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
    <button :class="buttonClass" :title="title" @click="$emit('toggle-left')">
        <svg v-if="isActive"
             class="w-6 h-6 fill-current text-amber-500" stroke="currentColor" viewBox="0 0 24 24">
            <path class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <svg v-else
             class="w-6 h-6 fill-current text-gray-500" stroke="currentColor" viewBox="0 0 24 24">
            <path class="inline-flex" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
</template>
