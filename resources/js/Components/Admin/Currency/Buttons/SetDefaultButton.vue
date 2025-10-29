<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    disabled: { type: Boolean, default: false },
    title: { type: String, default: '' },
});

</script>

<template>
    <button
        :title="title"
        :disabled="disabled"
        class="inline-flex items-center py-0.5 px-2 rounded
               border border-slate-300 hover:border-yellow-500 dark:border-yellow-300
               text-gray-500 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300
               disabled:text-red-500 disabled:dark:text-red-300 disabled:border-slate-300">
        <span class="text-lg">★</span>
    </button>
</template>
