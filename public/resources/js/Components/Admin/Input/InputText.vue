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

defineExpose({focus: () => input.value.focus()})
</script>

<template>
    <input
        class="block w-full py-0.5
               border-slate-500
               font-semibold text-sm
               focus:border-indigo-500 focus:ring-indigo-300
               rounded-sm shadow-sm
               dark:bg-cyan-800 dark:text-slate-100"
        v-model="model"
        ref="input"
    />
</template>
