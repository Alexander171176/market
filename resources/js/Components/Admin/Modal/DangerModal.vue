<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    maxWidth: {
        type: String,
        default: '2xl'
    },
    closeable: {
        type: Boolean,
        default: true
    },
    cancelText: {
        type: String,
    },
    confirmText: {
        type: String,
    },
    onCancel: {
        type: Function,
        required: true
    },
    onConfirm: {
        type: Function,
        required: true
    }
});

const emit = defineEmits(['close']);

watch(
    () => props.show,
    () => {
        if (props.show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = null;
        }
    }
);

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        close();
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl'
    }[props.maxWidth];
});
</script>

<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-200">
            <div v-show="show"
                 class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
                 scroll-region>
                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-slate-800 opacity-25"/>
                    </div>
                </Transition>

                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-show="show"
                        class="mb-6 bg-white dark:bg-slate-300
                               rounded overflow-hidden shadow
                               transform transition-all
                               max-w-lg w-full max-h-full sm:w-full sm:mx-auto"
                        :class="maxWidthClass"
                    >
                        <div class="p-5 flex justify-center space-x-4">
                            <!-- Icon -->
                            <div
                                class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
                                <svg class="w-4 h-4 shrink-0 fill-current text-rose-500"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"/>
                                </svg>
                            </div>
                            <!-- Content -->
                            <div>
                                <!-- Modal header -->
                                <div class="mb-2 mt-2">
                                    <div class="text-md font-semibold text-slate-800">
                                        {{ t('confirmDeleteMessage') }}
                                    </div>
                                </div>
                                <!-- Modal content -->
                                <div class="mb-10">
                                    <div class="space-y-2">
                                        <p class="font-semibold text-sm text-rose-400">
                                            {{ t('confirmDeleteWarning') }}
                                        </p>
                                    </div>
                                </div>
                                <!-- Modal footer -->
                                <div class="flex flex-wrap justify-end space-x-2">
                                    <button class="flex items-center
                                                    px-2 py-0.5 bg-sky-600
                                                    text-white rounded-sm shadow-md
                                                    transition-colors duration-300 ease-in-out
                                                    hover:bg-sky-700 focus:bg-sky-700 focus:outline-none"
                                            @click="props.onCancel">
                                        <svg class="w-4 h-4 fill-current">
                                            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                                        </svg>
                                        <span class="ml-1">{{ t('cancel') }}</span>
                                    </button>
                                    <button class="flex items-center
                                                    px-2 py-0.5 bg-rose-500
                                                    text-white rounded-sm shadow-md
                                                    transition-colors duration-300 ease-in-out
                                                    hover:bg-rose-700 focus:bg-rose-700 focus:outline-none"
                                            @click="props.onConfirm">
                                        <svg class="w-4 h-4 fill-current">
                                            <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"></path></svg>
                                        <span class="ml-1">{{ t('yesDelete') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
