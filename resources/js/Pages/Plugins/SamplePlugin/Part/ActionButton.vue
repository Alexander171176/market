<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    action: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    }
});

const buttonClass = computed(() => [
    'flex items-center py-2 px-2 rounded',
    'border border-slate-300',
    'hover:border-sky-500',
    'dark:border-sky-300 dark:hover:border-sky-100'
]);
</script>

<template>
    <button :class="buttonClass" @click="$emit('click')" :title="title">
        <slot name="icon"></slot>
    </button>
</template>
