<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import ActivityToggle from '@/Components/Admin/Buttons/ActivityToggle.vue';
import IconEdit from "@/Components/Admin/Buttons/IconEdit.vue";
import CloneIconButton from '@/Components/Admin/Buttons/CloneIconButton.vue';
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    rubrics: Array,
    selectedRubrics: Array
});

const emits = defineEmits([
    'toggle-activity',
    'edit',
    'delete',
    'update-sort-order',
    'clone',
    'toggle-select',
    'toggle-all'
]);

// --- Локальная копия для vuedraggable ---
const localRubrics = ref([]);

// --- Следим за изменением props.rubrics и обновляем локальную копию ---
watch(() => props.rubrics, (newVal) => {
    // Создаем глубокую копию, чтобы избежать мутации props
    localRubrics.value = JSON.parse(JSON.stringify(newVal || []));
}, { immediate: true, deep: true }); // immediate: true для инициализации

// --- Функция, вызываемая vuedraggable после завершения перетаскивания ---
const handleDragEnd = () => {
    // Отправляем НОВЫЙ ПОРЯДОК ID из локального массива
    const newOrderIds = localRubrics.value.map(rubric => rubric.id);
    emits('update-sort-order', newOrderIds); // Отправляем массив ID
};

// --- Логика массовых действий ---
const toggleAll = (event) => {
    const checked = event.target.checked;
    const ids = localRubrics.value.map(r => r.id);
    emits('toggle-all', { ids, checked });
};
</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table v-if="rubrics.length > 0" class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead class="text-sm uppercase
                              bg-slate-200 dark:bg-cyan-900
                              border border-solid border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap w-px">
                        <div class="text-center font-medium">{{ t('id') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="flex justify-center" :title="t('icon')">
                            <svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 512 512">
                                <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                            </svg>
                        </div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="flex justify-center" :title="t('localization')">
                            <svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 640 512">
                                <path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z"/>
                            </svg>
                        </div>
                    </th>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap">
                        <div class="text-left font-medium">{{ t('title') }}</div>
                    </th>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap">
                        <div class="text-left font-medium">{{ t('url') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="flex justify-center" :title="t('views')">
                            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                                <path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                            </svg>
                        </div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('sections') }}</div>
                    </th>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap">
                        <div class="text-center font-medium">{{ t('actions') }}</div>
                    </th>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap">
                        <div class="text-center font-medium">
                            <input type="checkbox" @change="toggleAll"/>
                        </div>
                    </th>
                </tr>
                </thead>
                <draggable tag="tbody" v-model="localRubrics" @end="handleDragEnd" itemKey="id">
                    <template #item="{ element: rubric }">
                        <tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-center text-blue-600 dark:text-blue-200">{{ rubric.id }}</div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap w-10"> <!-- Добавим w-10 для фикс. ширины -->
                                <div v-if="rubric.icon" class="flex justify-center items-center h-full" v-html="rubric.icon"></div>
                                <div v-else class="flex justify-center items-center h-full text-slate-400">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                    </svg>
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap w-10">
                                <div class="text-center uppercase text-orange-500 dark:text-orange-200">
                                    {{ rubric.locale }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-left text-yellow-500 dark:text-yellow-200">{{ rubric.title }}</div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-left">
                                    <a :href="`/rubrics/${encodeURIComponent(rubric.url)}`"
                                       class="text-violet-600 dark:text-violet-200 hover:underline
                                              hover:text-violet-800 dark:hover:text-violet-50"
                                       target="_blank" rel="noopener noreferrer">
                                        {{ rubric.url }}
                                    </a>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center">{{ rubric.views }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left">
                                    <span v-for="section in rubric.sections" :key="section.id">
                                        <span :title="section.title"
                                              class="py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200
                                                     rounded-sm text-xs text-slate-100 dark:text-slate-900">
                                            {{ section.id }}
                                        </span>
                                    </span>
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="flex justify-center space-x-2">
                                    <ActivityToggle :isActive="rubric.activity"
                                                    @toggle-activity="$emit('toggle-activity', rubric)"
                                                    :title="rubric.activity ? t('enabled') : t('disabled')" />
                                    <CloneIconButton @clone="$emit('clone', rubric)" />
                                    <IconEdit :href="route('admin.rubrics.edit', rubric.id)" />
                                    <DeleteIconButton @delete="$emit('delete', rubric.id)" />
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-center">
                                    <input type="checkbox" :checked="selectedRubrics.includes(rubric.id)"
                                           @change="$emit('toggle-select', rubric.id)"/>
                                </div>
                            </td>
                        </tr>
                    </template>
                </draggable>
            </table>
            <div v-else class="p-5 text-center text-slate-700 dark:text-slate-100">
                {{ t('noData') }}
            </div>
        </div>
    </div>
</template>
