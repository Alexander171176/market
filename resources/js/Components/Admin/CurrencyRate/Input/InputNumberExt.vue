<script setup>
/**
 * Безопасный числовой инпут:
 * - modelValue: string | number | ''  (null/undefined => '')
 * - НЕ приводит к числу сам, отдает исходную строку как есть
 * - поддерживает запятую, но ничего не парсит
 * - min/step/max просто пробрасываются, браузер сам решит, но пустое значение не трогаем
 */
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'number',
    },
    inputmode: {
        type: String,
        default: 'decimal',
    },
    step: {
        type: [String, Number],
        default: 'any',
    },
    min: {
        type: [String, Number],
        default: undefined,
    },
    max: {
        type: [String, Number],
        default: undefined,
    }
})

const emit = defineEmits(['update:modelValue', 'input', 'blur'])

/** Отображаемая строка: null/undefined → '' */
const valueStr = computed({
    get: () => (props.modelValue ?? '') === null ? '' : String(props.modelValue ?? ''),
    set: v => {
        // Отдаём РОВНО то, что ввёл пользователь (строку)
        emit('update:modelValue', v)
    }
})

function onInput(e) {
    const v = e?.target?.value ?? ''
    emit('update:modelValue', v)   // строка
    emit('input', e)
}

function onBlur(e) {
    emit('blur', e)
}
</script>

<template>
    <input
        :type="type"
        class="form-input py-0.5 font-semibold text-sm rounded-sm shadow-sm
               border-slate-500 focus:border-indigo-500 focus:ring-indigo-300
               dark:bg-cyan-800 dark:text-slate-100"
        :inputmode="inputmode"
        :step="step"
        :min="min"
        :max="max"
        :value="valueStr"
        @input="onInput"
        @blur="onBlur"
    />
</template>
