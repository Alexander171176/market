<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:checked'])

const props = defineProps({
    checked: {
        type: [Array, Boolean],
        default: false
    },
    value: {
        type: String,
        default: null
    }
})

const proxyChecked = computed({
    get() {
        return props.checked
    },

    set(val) {
        emit('update:checked', val)
    }
})
</script>

<template>
    <input
        v-model="proxyChecked"
        type="checkbox"
        :value="value"
        class="rounded
           border-orange-300
           text-orange-500
           dark:border-blue-300
           dark:text-blue-500
           dark:ring-blue-400
           shadow-sm
           focus:ring-orange-400"
    />
</template>
