<script setup>
defineEmits(['close']);
</script>

<template>
    <button @click="$emit('close')"
            class="absolute top-3 right-3
                   text-gray-600 hover:text-gray-900
                   dark:text-red-400 dark:hover:text-red-100
                   focus:outline-none rounded-lg p-1
                   border border-gray-300 dark:border-gray-600
                   hover:bg-violet-200 dark:hover:bg-gray-700">
        <svg class="w-6 h-6"
             fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
</template>
