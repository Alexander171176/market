<script setup>
import { Link } from '@inertiajs/vue3'
import { defineProps, ref } from 'vue'

const props = defineProps({
    href: {
        type: String,
        required: true
    }
})

const isPressed = ref(false)
</script>

<template>
    <Link :href="href"
          class="flex items-center btn px-2 py-0.5
                 bg-sky-600 text-white text-sm font-semibold
                 rounded-sm shadow-md
                 transition-colors duration-300 ease-in-out
                 hover:bg-sky-700 focus:bg-sky-700 focus:outline-none"
          @mousedown="isPressed = true"
          @mouseup="isPressed = false"
          :class="{ 'ring-2 ring-sky-600 ring-offset-2 ring-offset-white': isPressed }">
    <span>
      <slot name="icon">
        <!-- По умолчанию ваш SVG будет тут -->
        <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
        </svg>
      </slot>
    </span>
        <span class="ml-2">
      <slot />
    </span>
    </Link>
</template>
