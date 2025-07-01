<script setup>
import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
    modalDescription: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['toggleModal']);

const toggleModal = () => {
    emit('toggleModal');
};
</script>

<template>
    <div v-if="showModal"
         class="fixed inset-0 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6 z-50"
         role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-slate-900 opacity-50 z-50" @click="toggleModal"></div>
        <div class="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full dark:bg-gray-800 z-60">
            <!-- Modal header -->
            <div class="px-5 py-3 border-b border-slate-200 dark:border-gray-700">
                <div class="flex justify-between items-center">
                    <svg class="w-6 h-6 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path>
                    </svg>
                    <div class="text-xl font-semibold text-sky-800 dark:text-sky-400">{{ t('description') }}</div>
                    <button class="text-slate-700 hover:text-rose-400 dark:text-slate-400 dark:hover:text-red-400"
                            @click="toggleModal">
                        <svg class="w-4 h-4 fill-current">
                            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <!-- Modal content -->
            <div class="px-5 pt-4 pb-5">
                <div class="text-xl text-center font-semibold text-slate-800 dark:text-gray-200">
                    <div class="space-y-2">
                        <p>{{ modalDescription }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
