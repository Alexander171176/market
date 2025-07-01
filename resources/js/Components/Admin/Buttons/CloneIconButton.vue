<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    title: String
});

const buttonClass = computed(() => [
    'flex items-center p-1 rounded',
    'border border-slate-300',
    'hover:border-green-500',
    'dark:border-green-300 dark:hover:border-green-100'
]);
</script>

<template>
    <button :class="buttonClass" @click="$emit('clone')" :title="title || t('clone')">
        <svg
            class="w-6 h-6 fill-current text-green-500 hover:text-green-700 dark:text-green-300 dark:hover:text-green-100 shrink-0"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path
                d="M15 3H4c-1.1 0-2 .9-2 2v14h2V5h11V3zm4 4H8c-1.1 0-2 .9-2 2v14h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 14H8V9h11v12z"/>
        </svg>
    </button>
</template>
