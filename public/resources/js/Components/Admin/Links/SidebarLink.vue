<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    href: String,
    active: Boolean,
    expanded: Boolean
})

const classes = computed(() => {
    return props.active
        ? 'flex items-center px-1 pt-1 text-sm font-medium leading-5 text-yellow-100 focus:outline-none transition duration-150 ease-in-out'
        : 'flex items-center px-1 pt-1 text-sm font-medium leading-5 text-slate-300 hover:text-yellow-100 focus:outline-none focus:text-yellow-100 transition duration-150 ease-in-out'
})

const containerClasses = computed(() => {
    return props.expanded ? 'mb-2' : 'mb-4'
})

const textClasses = computed(() => {
    return props.expanded ? 'ml-3 opacity-100' : 'ml-3 opacity-0 whitespace-nowrap overflow-hidden'
})
</script>

<template>
    <li :class="containerClasses">
        <Link :href="href" :class="classes">
            <slot/>
            <span class="text-lg font-medium transition-opacity duration-200 max-w-full" :class="textClasses">
                <slot name="text"/>
            </span>
        </Link>
    </li>
</template>
