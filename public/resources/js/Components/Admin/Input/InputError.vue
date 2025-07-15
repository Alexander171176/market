<script setup>
defineProps({
    message: {
        type: String
    }
})
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-red-600 dark:text-orange-200">
            {{ message }}
        </p>
    </div>
</template>
