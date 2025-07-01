<script setup>
defineProps({
    modelValue: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: 'description'
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <textarea
        :id="id"
        class="mt-1 block w-full h-32 p-3
               text-sm bg-white dark:bg-cyan-800
               border border-teal-400 dark:text-slate-100
               rounded-lg shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        autocomplete="description"></textarea>
</template>
