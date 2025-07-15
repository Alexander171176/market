<script setup>
import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
    modalReadme: {
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
        <div class="fixed inset-0 bg-slate-900 opacity-50 z-40" @click="toggleModal"></div>
        <div class="bg-white rounded shadow-lg overflow-auto max-w-7xl w-full max-h-full dark:bg-gray-800 z-50">
            <!-- Modal header -->
            <div class="px-5 py-3 border-b border-slate-200 dark:border-gray-700">
                <div class="flex justify-between items-center">
                    <svg class="w-5 h-5 shrink-0 fill-current text-indigo-400 mr-2" viewBox="0 0 16 16">
                        <path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z"></path>
                    </svg>
                    <div class="text-xl font-semibold text-sky-800 dark:text-sky-400">{{ t('readme') }}</div>
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
                        <div v-html="modalReadme"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
