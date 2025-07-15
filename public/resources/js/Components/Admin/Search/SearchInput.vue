<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Поиск...'
    }
});

const emits = defineEmits(['update:modelValue']);

const searchQuery = ref(props.modelValue);

watch(searchQuery, (newValue) => {
    emits('update:modelValue', newValue);
});

const onInput = () => {
    emits('update:modelValue', searchQuery.value);
};
</script>

<template>
    <div class="px-3 py-3 mb-2 border border-gray-300 dark:border-gray-700">
        <div class="relative w-full">
            <input
                v-model="searchQuery"
                type="text"
                :placeholder="placeholder"
                @input="onInput"
                class="w-full px-2 py-1
                        border border-slate-300
                        rounded-xs
                        bg-white dark:bg-gray-800
                        text-sm font-semibold
                        text-gray-700 dark:text-gray-300"
            />
            <svg class="absolute right-2 top-2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="currentColor"
                 viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M12.9 14.32a8 8 0 111.42-1.42l4.58 4.58a1 1 0 01-1.42 1.42l-4.58-4.58zm-4.9 0a6 6 0 100-12 6 6 0 000 12z"
                      clip-rule="evenodd"/>
            </svg>
        </div>
    </div>
</template>
