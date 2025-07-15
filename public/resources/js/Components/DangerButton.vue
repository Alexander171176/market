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
           justify-center
           px-2 py-0.5
           bg-rose-600
           border
           border-transparent
           rounded-sm
           font-semibold
           text-sm
           text-white
           lowercase
           tracking-widest
           hover:bg-orange-500
           active:bg-orange-700
           focus:outline-none
           focus:ring-2
           focus:ring-orange-500
           focus:ring-offset-2
           transition ease-in-out duration-150">
        <slot/>
    </button>
</template>
