<script setup>
defineProps({
    type: {
        type: String,
        default: 'button'
    }
})
</script>

<template>
    <button
        :type="type"
        class="inline-flex
           items-center
           px-2 py-1
           bg-white
           border
           border-gray-400
           rounded-sm
           font-semibold
           text-xs
           text-gray-900
           lowercase
           tracking-widest
           shadow-sm
           hover:bg-gray-50
           focus:outline-none
           focus:ring-2
           focus:ring-indigo-500
           focus:ring-offset-2
           disabled:opacity-25
           transition ease-in-out duration-150">
        <slot/>
    </button>
</template>
