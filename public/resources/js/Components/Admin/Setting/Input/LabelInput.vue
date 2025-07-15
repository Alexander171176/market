<script setup>
defineProps({
    value: {
        type: String
    }
})
</script>

<template>
    <label class="block font-medium text-sm text-indigo-600 dark:text-sky-500">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot/></span>
    </label>
</template>
