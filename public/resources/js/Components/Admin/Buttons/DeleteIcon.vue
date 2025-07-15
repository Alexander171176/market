<script setup>
import {ref, computed} from 'vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const isPressed = ref(false);

const buttonClass = computed(() => [
    'flex items-center py-2 px-2 rounded',
    'border border-slate-300',
    'hover:border-rose-500',
    'dark:border-rose-300 dark:hover:border-rose-100',
    {'ring-2 ring-sky-600 ring-offset-2 ring-offset-white': isPressed.value}
]);
</script>

<template>
    <button :class="buttonClass" @click="$emit('click')"
            @mousedown="isPressed = true"
            @mouseup="isPressed = false"
            :title="t('delete')">
        <svg class="w-4 h-4 fill-current
                    text-rose-400
                    hover:text-rose-500
                    dark:text-red-300
                    dark:hover:text-red-100
                    shrink-0"
             viewBox="0 0 16 16">
            <path
                d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
        </svg>
    </button>
</template>
