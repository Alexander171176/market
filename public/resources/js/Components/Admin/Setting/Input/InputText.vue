<script setup>
import { defineModel, defineExpose, ref, onMounted } from 'vue'

const model = defineModel({
    type: String,
    required: true
})

const input = ref(null)

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus()
    }
})

defineExpose({ focus: () => input.value.focus() })
</script>

<template>
    <input
        class="mt-1 block w-fit flex-grow px-2 py-1
               bg-slate-100 dark:bg-cyan-800
               border border-slate-500 dark:border-slate-100
               rounded-md shadow-sm
               font-semibold text-sm
               focus:outline-none focus:border-indigo-500 focus:ring-indigo-300 dark:text-slate-100"
        v-model="model"
        ref="input"
    />
</template>
