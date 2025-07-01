<script setup>
import {defineProps, defineEmits, watch, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import draggable from 'vuedraggable';
import ActivityToggle from '@/Components/Admin/Buttons/ActivityToggle.vue';
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue';
import ViewIconButton from '@/Components/Admin/Plugins/Buttons/ViewIconButton.vue';
import InfoIconButton from '@/Components/Admin/Plugins/Buttons/InfoIconButton.vue';
import DescriptionModal from '@/Components/Admin/Plugins/Modal/DescriptionModal.vue';
import ReadmeModal from '@/Components/Admin/Plugins/Modal/ReadmeModal.vue';
import IconEdit from "@/Components/Admin/Buttons/IconEdit.vue";

const {t} = useI18n();

const props = defineProps({
    plugins: Array,
    selectedPlugins: Array
});

const emits = defineEmits([
    'toggle-activity',
    'edit',
    'delete',
    'update-sort-order',
    'toggle-select',
    'toggle-all'
]);

// --- Локальная копия для vuedraggable ---
const localPlugins = ref([]);

// --- Следим за изменением props.plugins и обновляем локальную копию ---
watch(() => props.plugins, (newVal) => {
    // Создаем глубокую копию, чтобы избежать мутации props
    localPlugins.value = JSON.parse(JSON.stringify(newVal || []));
}, {immediate: true, deep: true}); // immediate: true для инициализации

// --- Функция, вызываемая vuedraggable после завершения перетаскивания ---
const handleDragEnd = () => {
    // Отправляем НОВЫЙ ПОРЯДОК ID из локального массива
    const newOrderIds = localPlugins.value.map(plugin => plugin.id);
    emits('update-sort-order', newOrderIds); // Отправляем массив ID
};

// --- Логика массовых действий ---
const toggleAll = (event) => {
    const checked = event.target.checked;
    const ids = localPlugins.value.map(r => r.id);
    emits('toggle-all', {ids, checked});
};

const showDescriptionModal = ref(false);
const currentDescription = ref('');

const showReadmeModal = ref(false);
const currentReadme = ref('');

const openDescriptionModal = (description) => {
    currentDescription.value = description;
    showDescriptionModal.value = true;
};

const closeDescriptionModal = () => {
    showDescriptionModal.value = false;
    currentDescription.value = '';
};

const openReadmeModal = (readme) => {
    currentReadme.value = readme;
    showReadmeModal.value = true;
};

const closeReadmeModal = () => {
    showReadmeModal.value = false;
    currentReadme.value = '';
};
</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table v-if="plugins.length > 0" class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead
                    class="text-sm uppercase
                           bg-slate-200 dark:bg-cyan-900
                           border border-solid border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="font-medium text-center">{{ t('id') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="font-medium text-center">{{ t('icon') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('nameModule') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('version') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('description') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-center">{{ t('actions') }}</div>
                    </th>
                    <th class="px-2 first:pl-7 last:pr-7 py-3 whitespace-nowrap">
                        <div class="text-center font-medium">
                            <input type="checkbox" @change="toggleAll"/>
                        </div>
                    </th>
                </tr>
                </thead>
                <draggable tag="tbody" v-model="localPlugins" @end="handleDragEnd" itemKey="id">
                    <template #item="{ element: plugin }">
                        <tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center">{{ plugin.id }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <!-- Отображаем SVG иконку, используя v-html -->
                                <span v-html="plugin.icon" class="icon-class"></span>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left text-teal-600 dark:text-violet-200">
                                    {{ plugin.name }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left text-orange-400 dark:text-orange-200">
                                    {{ plugin.version }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left text-blue-600 dark:text-blue-200">
                                    {{ plugin.description }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="flex justify-center space-x-2">
                                    <ViewIconButton :href="`/admin/plugins/${plugin.id}`"
                                                    :title="t('goToModule')"/>
                                    <ActivityToggle :isActive="plugin.activity"
                                                    @toggle-activity="$emit('toggle-activity', plugin)"
                                                    :title="plugin.activity ? t('enabled') : t('disabled')"/>
                                    <IconEdit :href="route('admin.plugins.edit', plugin.id)"/>
                                    <DeleteIconButton @delete="$emit('delete', plugin.id)"/>
                                    <InfoIconButton @click="openReadmeModal(plugin.readme)" :title="t('readme')"/>
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-center">
                                    <input type="checkbox" :checked="selectedPlugins.includes(plugin.id)"
                                           @change="$emit('toggle-select', plugin.id)"/>
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

    <!-- Модальные окна -->
    <DescriptionModal :showModal="showDescriptionModal"
                      :modalDescription="currentDescription"
                      @toggleModal="closeDescriptionModal"/>

    <ReadmeModal :showModal="showReadmeModal"
                 :modalReadme="currentReadme"
                 @toggleModal="closeReadmeModal"/>
</template>
