<script setup>
import { Link } from '@inertiajs/vue3'
import { defineProps } from 'vue'

const props = defineProps({
    href: {
        required: true
    },
    tooltipText: {
        type: String,
        default: 'Default tooltip text'
    }
})
</script>

<template>
    <div class="text-center mr-1">
        <Link :href="href"
              class="btn
                      flex
                      items-center
                      py-2 px-2
                      border-solid
                      rounded
                      border
                      border-slate-300
                      hover:border-sky-500
                      dark:border-violet-200
                      dark:hover:border-slate-100" :title="tooltipText">
            <slot name="svg">
                <!-- По умолчанию ваш SVG будет тут -->
                <svg class="w-4 h-4
                            fill-current
                            text-teal-500
                            hover:text-sky-500
                            dark:text-violet-200
                            dark:hover:text-slate-100
                            shrink-0"
                     viewBox="0 0 16 16">
                    <path
                        d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/>
                </svg>
            </slot>
        </Link>
    </div>
</template>
