<script setup>
import { defineEmits, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['clear']);
const isPressed = ref(false);

const handleClear = () => {
    emit('clear');
};
</script>

<template>
    <button type="button"
            class="flex items-center
                   btn px-2 py-0.5
                   bg-yellow-200 rounded-sm shadow-md
                   text-slate-600 text-sm font-semibold
                   transition-colors duration-300 ease-in-out
                   hover:text-slate-700 focus:text-slate-700
                   hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none"
            @mousedown="isPressed = true"
            @mouseup="isPressed = false"
            :class="{ 'ring-2 ring-yellow-300 ring-offset-2 ring-offset-white': isPressed }"
            @click="handleClear">
        <slot>
            <svg class="w-4 h-4 fill-current text-gray-500 shrink-0 mr-2" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5V7h6v2z"/>
            </svg>
            {{ t('clearMetaFields') }}
        </slot>
    </button>
</template>
