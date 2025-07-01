<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
    href: {
        type: String,
        default: 'submit'
    }
})

const isPressed = ref(false)
</script>

<template>
    <button
        class="flex items-center
               btn mb-3 px-2 py-0.5
               bg-teal-500 shadow-md
               text-white text-sm font-semibold
               transition-colors duration-300 ease-in-out
               hover:bg-teal-600 focus:bg-teal-600 focus:outline-none"
        @mousedown="isPressed = true"
        @mouseup="isPressed = false"
        :class="{ 'ring-2 ring-teal-500 ring-offset-2 ring-offset-white': isPressed }">
    <span>
      <slot name="icon">
        <!-- По умолчанию ваш SVG будет тут -->
        <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
            <path
                d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
        </svg>
      </slot>
    </span>
        <span class="hidden xs:block ml-2">
      <slot/>
    </span>
    </button>
</template>
