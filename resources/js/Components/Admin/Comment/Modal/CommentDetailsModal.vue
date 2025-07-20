<script setup>
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    show: Boolean,
    comment: Object // Предполагается, что в этом объекте есть данные о пользователе, такие как user.name
})

const emits = defineEmits(['close'])

const closeModal = () => {
    emits('close')
}

// Закрытие модального окна по нажатию клавиши "Escape"
const closeOnEscape = (e) => {
    if (e.key === 'Escape' && props.show) {
        closeModal()
    }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape))

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}
</script>

<template>
    <Teleport to="body">
        <Transition leave-active-class="duration-200">
            <div v-show="show"
                 class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
                 scroll-region>
                <!-- Фон модального окна -->
                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="show" class="fixed inset-0 transform transition-all"
                         @click="closeModal">
                        <div class="absolute inset-0 bg-slate-800 opacity-25"></div>
                    </div>
                </Transition>

                <!-- Модальное окно -->
                <Transition
                    enter-active-class="ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div v-show="show"
                         class="bg-slate-100 dark:bg-slate-800
                                  rounded-lg shadow-xl
                                  transform transition-all
                                  max-w-lg w-full max-h-full
                                  sm:w-full sm:mx-auto
                                  relative overflow-y-auto">

                        <!-- Кнопка закрытия в верхнем правом углу -->
                        <button @click="closeModal"
                                class="absolute top-0 right-1 m-1">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 class="h-6 w-6
                                       text-gray-400 hover:text-red-400
                                       dark:text-gray-300 dark:hover:text-red-300"
                                 fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div class="px-3 py-1">
                            <h3 class="text-center text-md font-semibold
                                       text-blue-800 dark:text-blue-200
                                       pb-1 border-dashed border-b border-slate-400">
                                {{ t('commentDetails') }} - {{ t('id') }}: {{ comment?.id }}
                            </h3>

                            <!-- Отображение статуса модерации -->
                            <div v-if="comment" class="my-2">
                                <span class="font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('status') }}:
                                </span>
                                <p class="font-semibold text-sm
                                          text-amber-600 dark:text-amber-200
                                          decoration-dotted underline">
                                    {{ comment.approved ? t('moderationPassed') : t('underModeration') }}
                                </p>
                            </div>

                            <!-- Отображение активности -->
                            <div v-if="comment" class="my-2">
                                <span class="font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('activity') }}:
                                </span>
                                <p class="font-semibold text-sm
                                          text-amber-600 dark:text-amber-200
                                          decoration-dotted underline">
                                    {{ comment.activity ? t('active') : t('inactive') }}
                                </p>
                            </div>

                            <!-- Проверка на наличие пользователя и его имени -->
                            <div v-if="comment?.user" class="my-2">
                                <span class="font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('userCommented') }}
                                </span>
                                <p class="font-semibold text-md
                                          text-red-500 dark:text-red-300">
                                    {{ comment.user.name }}
                                </p>
                            </div>

                            <!-- Отображение комментария -->
                            <div v-if="comment" class="my-2">
                                <span class="font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('comment') }}:
                                </span>
                                <p class="font-semibold text-md
                                          text-blue-600 dark:text-blue-300">
                                    {{ comment.content }}
                                </p>
                            </div>

                            <!-- Комментируемая модель -->
                            <div v-if="comment?.commentable_type" class="my-2">
                                <span class="font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('type') }}
                                </span>
                                <p class="font-semibold text-md
                                          text-fuchsia-600 dark:text-fuchsia-300">
                                    {{ comment.commentable_type.split('\\').pop() }}
                                </p>
                            </div>

                            <div class="flex items-center justify-start flex-wrap">

                                <!-- id -->
                                <div v-if="comment?.commentable_id" class="my-2">
                                <span class="mr-2 font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('id') }}
                                </span>
                                    <p class="font-semibold text-sm
                                          text-green-600 dark:text-green-300">
                                        {{ comment.commentable_id }}
                                    </p>
                                </div>

                                <!-- название  -->
                                <div v-if="comment?.commentable_title" class="my-2">
                                <span class="mr-2 font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('title') }}
                                </span>
                                    <p class="font-semibold text-sm
                                          text-indigo-700 dark:text-indigo-300">
                                        {{ comment.commentable_title }}
                                    </p>
                                </div>

                            </div>
                            <!-- Дата создания -->
                            <div v-if="comment" class="my-2">
                                <span class="font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('createdAt') }}:
                                </span>
                                <p class="font-semibold text-sm
                                          text-yellow-600 dark:text-yellow-300">
                                    {{ formatDate(comment.created_at) }}
                                </p>
                            </div>

                            <!-- Дата обновления -->
                            <div v-if="comment" class="my-2">
                                <span class="font-semibold text-sm
                                             text-gray-900 dark:text-gray-100">
                                    {{ t('updatedAt') }}:
                                </span>
                                <p class="font-semibold text-sm
                                          text-yellow-600 dark:text-yellow-300">
                                    {{ formatDate(comment.updated_at) }}
                                </p>
                            </div>

                            <!-- Кнопка закрытия в нижней части -->
                            <div class="my-1 sm:flex sm:flex-row-reverse space-x-2">
                                <button type="button"
                                        class="flex justify-center items-center float-right
                                               rounded-md border border-transparent
                                               shadow-sm px-2 py-0.5
                                               bg-indigo-600
                                               text-base font-medium text-white
                                               hover:bg-indigo-700
                                               focus:outline-none focus:ring-2
                                               focus:ring-offset-2 focus:ring-indigo-500
                                               sm:w-auto sm:text-sm"
                                        @click="closeModal">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         class="h-4 w-4 text-gray-100"
                                         fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span class="ml-1">{{ t('close') }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
