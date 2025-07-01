<script setup>
defineProps({
    value: {
        type: String
    }
})
</script>

<template>
    <label class="mb-1 block font-medium text-sm text-indigo-600 dark:text-sky-500">
        <template v-if="$slots.default">
            <slot />
        </template>
        <template v-else>
            <span>{{ value }}</span>
        </template>
    </label>
</template>
