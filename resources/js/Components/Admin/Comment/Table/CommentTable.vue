<script setup>
import {defineProps, defineEmits} from 'vue';
import ActivityToggle from "@/Components/Admin/Buttons/ActivityToggle.vue";
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const props = defineProps({
    comments: Array,
    selectedComments: Array
});

const emits = defineEmits(['toggle-activity', 'edit', 'delete', 'toggle-select', 'view-details', 'approve-comment']);

const toggleAll = (event) => {
    const isChecked = event.target.checked;
    props.comments.forEach(comment => {
        if (isChecked && !props.selectedComments.includes(comment.id)) {
            emits('toggle-select', comment.id);
        } else if (!isChecked && props.selectedComments.includes(comment.id)) {
            emits('toggle-select', comment.id);
        }
    });
};
</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table v-if="comments.length > 0" class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead class="text-sm uppercase
                               bg-slate-200 dark:bg-cyan-900
                               border border-solid
                               border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="font-medium text-center">{{ t('id') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('userName') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('comment') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-end">{{ t('actions') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-semibold text-center">
                            <input type="checkbox" @change="toggleAll" />
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="comment in comments" :key="comment.id"
                    class="text-sm font-semibold
                            border-b-2
                            hover:bg-slate-100 dark:hover:bg-cyan-800">
                    <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                        <div class="text-center">{{ comment.id }}</div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                        <div class="text-left text-yellow-500 dark:text-rose-200">{{ comment.user.name  }}</div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                        <div class="text-left text-blue-600 dark:text-violet-200">{{ comment.content }}</div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                        <div class="flex justify-end space-x-2">
                            <!-- Кнопка «Пройти модерацию» отображается только если status === false -->
                            <button v-if="!comment.status"
                                    @click="$emit('approve-comment', comment.id)"
                                    :title="t('approve')"
                                    class="flex items-center py-1 px-1 rounded
                                           border border-slate-300 hover:border-teal-500
                                           dark:border-teal-300 dark:hover:border-teal-100">
                                <svg class="w-4 h-4 shrink-0 fill-current text-teal-500 mx-1" viewBox="0 0 16 16">
                                    <path d="M14.14 9.585h-.002a2.5 2.5 0 0 1-2 4.547 6.91 6.91 0 0 1-6.9 1.165 4.436 4.436 0 0 0 1.343-1.682c.365.087.738.132 1.113.135a4.906 4.906 0 0 0 2.924-.971 2.5 2.5 0 0 1 3.522-3.194Zm-4.015-7.397a7.023 7.023 0 0 1 4.47 5.396 4.5 4.5 0 0 0-1.7-.334c-.15.002-.299.012-.447.03a5.027 5.027 0 0 0-2.723-3.078 2.5 2.5 0 1 1 .4-2.014ZM4.663 10.5a2.5 2.5 0 1 1-3.859-.584 6.888 6.888 0 0 1-.11-1.166c0-2.095.94-4.08 2.56-5.407.093.727.364 1.419.788 2.016A4.97 4.97 0 0 0 2.694 8.75c.003.173.015.345.037.516A2.49 2.49 0 0 1 4.663 10.5Z"></path>
                                </svg>
                            </button>
                            <!-- Кнопка просмотра комментария -->
                            <button @click="$emit('view-details', comment)"
                                    :title="t('view')"
                                    class="flex items-center py-1 px-1 rounded
                                           border border-slate-300 hover:border-blue-500
                                           dark:border-blue-300 dark:hover:border-blue-100">
                                <svg class="w-4 h-4 shrink-0 fill-current text-blue-500 mx-1" viewBox="0 0 16 16">
                                    <path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z"></path>
                                </svg>
                            </button>
                            <ActivityToggle :isActive="comment.activity"
                                            @toggle-activity="$emit('toggle-activity', comment)"
                                            :title="comment.activity ? t('enabled') : t('disabled')" />
                            <DeleteIconButton @click="$emit('delete', comment.id)"/>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                        <div class="text-center">
                            <input type="checkbox" :checked="selectedComments.includes(comment.id)" @change="$emit('toggle-select', comment.id)" />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-else class="p-5 text-center text-slate-700 dark:text-slate-100">
                {{ t('noData') }}
            </div>
        </div>
    </div>
</template>
