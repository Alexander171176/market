<script setup>
import {onMounted, ref} from 'vue'

defineProps({
    modelValue: String
})

defineEmits(['update:modelValue'])

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
        ref="input"
        class="py-1 text-sm
               dark:bg-gray-700
               border-gray-400
               dark:text-white
               dark:focus:border-blue-500
               dark:focus:ring-blue-500
               focus:border-indigo-500
               focus:ring-indigo-500
               rounded-sm shadow-sm"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
