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
             class="w-6 h-6 fill-current text-yellow-300
                    hover:text-gray-500 dark:hover:text-white"
             viewBox="0 0 352 512">
            <path d="M96.1 454.4c0 6.3 1.9 12.5 5.4 17.7l17.1 25.7a32 32 0 0 0 26.6 14.3h61.7a32 32 0 0 0 26.6-14.3l17.1-25.7a32 32 0 0 0 5.4-17.7l0-38.4H96l.1 38.4zM0 176c0 44.4 16.5 84.9 43.6 115.8 16.5 18.9 42.4 58.2 52.2 91.5 0 .3 .1 .5 .1 .8h160.2c0-.3 .1-.5 .1-.8 9.9-33.2 35.7-72.6 52.2-91.5C335.6 260.9 352 220.4 352 176 352 78.6 272.9-.3 175.5 0 73.4 .3 0 83 0 176zm176-80c-44.1 0-80 35.9-80 80 0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.8 50.2-112 112-112 8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
        </svg>
        <svg v-else
             class="w-6 h-6 fill-current text-gray-300
                    hover:text-orange-300 dark:hover:text-orange-400"
             viewBox="0 0 352 512">
            <path d="M96.1 454.4c0 6.3 1.9 12.5 5.4 17.7l17.1 25.7a32 32 0 0 0 26.6 14.3h61.7a32 32 0 0 0 26.6-14.3l17.1-25.7a32 32 0 0 0 5.4-17.7l0-38.4H96l.1 38.4zM0 176c0 44.4 16.5 84.9 43.6 115.8 16.5 18.9 42.4 58.2 52.2 91.5 0 .3 .1 .5 .1 .8h160.2c0-.3 .1-.5 .1-.8 9.9-33.2 35.7-72.6 52.2-91.5C335.6 260.9 352 220.4 352 176 352 78.6 272.9-.3 175.5 0 73.4 .3 0 83 0 176zm176-80c-44.1 0-80 35.9-80 80 0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.8 50.2-112 112-112 8.8 0 16 7.2 16 16s-7.2 16-16 16z"/>
        </svg>
    </button>
</template>
