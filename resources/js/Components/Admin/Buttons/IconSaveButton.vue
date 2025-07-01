<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    href: {
        type: String,
        default: 'submit'
    }
});

const isPressed = ref(false);
</script>

<template>
    <button
        class="flex items-center
                 btn mt-1 px-1 py-1 bg-teal-500
                 text-white text-md font-semibold
                 rounded-md shadow-md
                 transition-colors duration-300 ease-in-out
                 hover:bg-teal-600 focus:bg-teal-600 focus:outline-none"
        @mousedown="isPressed = true"
        @mouseup="isPressed = false"
        :class="{ 'ring-2 ring-teal-500 ring-offset-2 ring-offset-white': isPressed }">
        <svg class="w-6 h-6 fill-current text-slate-100" viewBox="0 0 24 24">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
        </svg>
    </button>
</template>
