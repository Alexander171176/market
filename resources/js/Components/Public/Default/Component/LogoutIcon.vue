<script setup>

import {Link} from "@inertiajs/vue3";

defineProps({
    href: String,
    as: String
})
</script>

<template>
    <button type="submit"
            class="flex justify-center items-center p-0">
        <svg class="transition duration-300 text-white hover:text-blue-600"
             xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 8.082c0-.183-.19-.302-.348-.212a4.75 4.75 0 1 0 4.696 0c-.159-.09-.348.03-.348.212v1.234c0 .077.036.15.095.199a3.25 3.25 0 1 1-4.19 0A.261.261 0 0 0 10 9.316z"/>
            <path fill="currentColor" d="M12.75 7a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0z"/>
        </svg>
    </button>
</template>
