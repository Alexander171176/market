<script setup>
const props = defineProps({
    customClass: {
        type: String,
        required: false,
        default: ''
    },
    text: {
        type: String,
        required: true
    }
});
</script>

<template>
    <label class="ml-2 font-medium text-sm text-indigo-600 dark:text-sky-500">{{ text }}</label>
</template>

