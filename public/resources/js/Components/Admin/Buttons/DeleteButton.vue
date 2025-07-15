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
          method="DELETE"
          as="button"
          class="btn flex items-center
                 py-2 px-0.5 rounded-sm
                 border border-solid border-slate-300
                 hover:border-rose-500 dark:border-yellow-200 dark:hover:border-white"
          @mousedown="isPressed = true"
          @mouseup="isPressed = false"
          :class="{ 'ring-1 ring-orange-500 ring-offset-1 ring-offset-white dark:ring-orange-300': isPressed }">
    <span class="ml-2">
      <slot name="icon">
        <!-- По умолчанию ваш SVG будет тут -->
        <svg class="w-4 h-4 fill-current text-orange-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-500 shrink-0" viewBox="0 0 16 16">
            <path
                d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
        </svg>
      </slot>
    </span>
        <span class="ml-2">
      <slot />
    </span>
    </Link>
</template>
