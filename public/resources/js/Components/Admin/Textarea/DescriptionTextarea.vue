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
        class="block w-full h-32 p-3 py-0.5 text-sm
               bg-white dark:bg-cyan-800 dark:text-slate-100
               rounded-sm shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
               border border-gray-400"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        autocomplete="description"></textarea>
</template>
