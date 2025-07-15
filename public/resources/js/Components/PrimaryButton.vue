<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit'
    }
})
</script>

<template>
    <button
        :type="type"
        class="inline-flex
           items-center
           px-2 py-1
           bg-cyan-700
           border
           border-transparent
           rounded-sm
           text-white
           font-bold
           text-xs
           tracking-widest
           hover:bg-cyan-700
           focus:bg-cyan-700
           active:bg-cyan-900
           focus:outline-none
           focus:ring-2
           focus:ring-indigo-500
           focus:ring-offset-2
           dark:bg-sky-600
           dark:text-slate-100
           transition ease-in-out duration-150">
        <slot/>
    </button>
</template>
