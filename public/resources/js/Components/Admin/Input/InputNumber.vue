<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Number, String],
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const input = ref(null);

const handleInput = (event) => {
    let value = event.target.value;
    let numberValue = parseInt(value, 10);

    // If the value is negative, set it to zero
    if (numberValue < 0) {
        numberValue = 0;
    }

    emit('update:modelValue', isNaN(numberValue) ? '' : numberValue);
};

const handleBlur = () => {
    if (props.modelValue < 0) {
        emit('update:modelValue', 0);
    }
};

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
</script>

<template>
    <input
        class="w-20 py-0.5 border-slate-500
               font-semibold text-sm
               focus:border-indigo-500 focus:ring-indigo-300
               rounded-sm shadow-sm
               dark:bg-cyan-800 dark:text-slate-100"
        :value="modelValue.toString()"
        @input="handleInput"
        @blur="handleBlur"
        ref="input"
        type="number"
        min="0"
    />
</template>
