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
               btn px-2 py-0.5
               bg-emerald-500 shadow-md
               text-white text-sm font-semibold
               transition-colors duration-300 ease-in-out
               hover:bg-emerald-600 focus:bg-emerald-600 focus:outline-none"
        @mousedown="isPressed = true"
        @mouseup="isPressed = false"
        :class="{ 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white': isPressed }">
    <span>
      <slot name="icon">
        <!-- По умолчанию ваш SVG будет тут -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"
             viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.707,6.707,17.293,1.293A1,1,0,0,0,16.586,1H4A3,3,0,0,0,1,4V20a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V7.414A1,1,0,0,0,22.707,6.707ZM14.5,4h1a.5.5,0,0,1,.5.5v4a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5v-4A.5.5,0,0,1,14.5,4ZM19,12.5v6a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-6a.5.5,0,0,1,.5-.5h13A.5.5,0,0,1,19,12.5Z"></path>
        </svg>
      </slot>
    </span>
        <span class="hidden xs:block ml-2">
      <slot/>
    </span>
    </button>
</template>
