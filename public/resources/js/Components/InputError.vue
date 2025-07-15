<script setup>
defineProps({
    message: String
})
</script>

<template>
    <div v-show="message">
        <p class="text-lg text-red-600 dark:text-red-300">
            {{ message }}
        </p>
    </div>
</template>
