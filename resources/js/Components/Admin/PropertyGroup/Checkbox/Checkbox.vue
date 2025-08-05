<script setup>
import { computed, defineEmits, defineProps } from 'vue';

// Определяем props, которые компонент принимает
const props = defineProps({
    checked: {
        type: [Boolean, Array], // Может быть булевым значением или массивом (для группы чекбоксов)
        default: false,
    },
    value: {
        type: [String, Number, Boolean], // Значение, ассоциированное с чекбоксом
        default: null,
    },
});

// Определяем события, которые компонент может генерировать
const emit = defineEmits(['update:checked']);

// Используем computed свойство для двусторонней привязки (v-model)
// Это стандартный и правильный способ работы с v-model в Vue 3
const proxyChecked = computed({
    get() {
        return props.checked;
    },
    set(val) {
        // Когда состояние меняется, мы генерируем событие 'update:checked'
        // Это позволяет родительскому компоненту обновить свое состояние
        emit('update:checked', val);
    },
});
</script>

<template>
    <input
        type="checkbox"
        :value="value"
        v-model="proxyChecked"
        class="rounded dark:bg-slate-900 border-gray-300 dark:border-slate-500 text-blue-600 shadow-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
    />
</template>
