<script setup>
import {defineProps, defineEmits, watch, ref} from 'vue';
import draggable from 'vuedraggable';
import ActivityToggle from '@/Components/Admin/Buttons/ActivityToggle.vue';
import IconEdit from "@/Components/Admin/Buttons/IconEdit.vue";
import CloneIconButton from '@/Components/Admin/Buttons/CloneIconButton.vue';
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    sections: Array,
    selectedSections: Array
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
const localSections = ref([]);

// --- Следим за изменением props.rubrics и обновляем локальную копию ---
watch(() => props.sections, (newVal) => {
    // Создаем глубокую копию, чтобы избежать мутации props
    localSections.value = JSON.parse(JSON.stringify(newVal || []));
}, { immediate: true, deep: true }); // immediate: true для инициализации

// --- Функция, вызываемая vuedraggable после завершения перетаскивания ---
const handleDragEnd = () => {
    // Отправляем НОВЫЙ ПОРЯДОК ID из локального массива
    const newOrderIds = localSections.value.map(section => section.id);
    emits('update-sort-order', newOrderIds); // Отправляем массив ID
};

// --- Логика массовых действий ---
const toggleAll = (event) => {
    const checked = event.target.checked;
    const ids = localSections.value.map(r => r.id);
    emits('toggle-all', { ids, checked });
};

</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table v-if="sections.length > 0" class="table-auto w-full text-slate-700 dark:text-slate-100">
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
                        <div class="text-center font-medium">{{ t('actions') }}</div>
                    </th>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap">
                        <div class="text-center font-medium">
                            <input type="checkbox" @change="toggleAll" />
                        </div>
                    </th>
                </tr>
                </thead>
                <draggable tag="tbody" v-model="localSections" @end="handleDragEnd" itemKey="id">
                    <template #item="{ element: section }">
                        <tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-center text-blue-600 dark:text-blue-200">{{ section.id }}</div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="flex justify-center" v-html="section.icon" />
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-center uppercase text-orange-500 dark:text-orange-200">
                                    {{ section.locale }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-left text-pink-500 dark:text-pink-200">{{ section.title }}</div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="flex justify-center space-x-2">
                                    <ActivityToggle :isActive="section.activity"
                                                    @toggle-activity="$emit('toggle-activity', section)"
                                                    :title="section.activity ? t('enabled') : t('disabled')" />
                                    <CloneIconButton @clone="$emit('clone', section)" />
                                    <IconEdit :href="route('admin.sections.edit', section.id)" />
                                    <DeleteIconButton @delete="$emit('delete', section.id)" />
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-center">
                                    <input type="checkbox" :checked="selectedSections.includes(section.id)"
                                           @change="$emit('toggle-select', section.id)"/>
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
