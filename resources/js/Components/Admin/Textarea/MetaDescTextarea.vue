<script setup>
defineProps({
    modelValue: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: 'meta_desc'
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <textarea
        :id="id"
        class="block w-full h-24 p-3 py-0.5
               font-semibold text-sm dark:text-slate-100
               bg-white dark:bg-cyan-800
               border border-gray-400 rounded-sm shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
               resize-none"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        maxlength="255"
        autocomplete="meta_desc"
    ></textarea>
</template>
