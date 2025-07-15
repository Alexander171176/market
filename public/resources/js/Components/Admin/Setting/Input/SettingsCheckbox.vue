<template>
    <input
        type="checkbox"
        :id="id"
        :checked="modelValue === 'true'"
        @change="$emit('update:modelValue', $event.target.checked ? 'true' : 'false')"
        class="mt-1 block
               w-6 h-6
               bg-slate-100 dark:bg-cyan-800
               border border-gray-500 dark:border-gray-100 rounded-md
               shadow-sm
               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        default: 'false',
    }
});

const emit = defineEmits(['update:modelValue']);
</script>
