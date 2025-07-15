<script setup>
import {ref, onMounted, computed} from 'vue';
import draggable from 'vuedraggable';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from './Part/TitlePage.vue';
import SearchInput from './Part/SearchInput.vue';
import CountTable from './Part/CountTable.vue';
import EditBlockModal from './Part/EditBlockModal.vue';
import ActionButton from './Part/ActionButton.vue';
import ActivityToggle from './Part/ActivityToggle.vue';
import PrimaryButton from './Part/PrimaryButton.vue';
import Pagination from './Part/Pagination.vue';
import ItemsPerPageSelect from './Part/ItemsPerPageSelect.vue';
import SortSelect from './Part/SortSelect.vue';
import SamplePlugin from './Public/SamplePlugin.vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const props = defineProps({
    pluginName: {type: String, required: true},
    id: {type: Number, default: 0},
});

const isAdmin = ref(window.location.pathname.includes('/admin'));
const isActive = ref(false);
const showEditModal = ref(false);
const isEdit = ref(false);
const selectedBlock = ref(null);
const blocks = ref([]);
const searchQuery = ref('');
const sortParam = ref('id');
const currentPage = ref(1);
const itemsPerPage = ref(10);

const fetchBlocks = async () => {
    try {
        const response = await axios.get(`/api/admin/plugins/${props.pluginName}/blocks`);
        blocks.value = response.data;
    } catch (error) {
        console.error('Ошибка при получении блоков:', error.response?.data || error.message);
    }
};

const createPluginTable = async () => {
    try {
        const response = await axios.post('/api/admin/plugins/create-table', {
            pluginName: props.pluginName,
            fields: [
                {name: 'links', type: 'text'},
                {name: 'svg_blocks', type: 'text'},
                {name: 'title', type: 'text'},
                {name: 'paragraph', type: 'text'},
                {name: 'sort', type: 'integer'},
                {name: 'activity', type: 'boolean'}
            ],
            initialData: [],
        });
        console.log(response.data.message);
    } catch (error) {
        console.error('Ошибка при создании таблицы:', error.response?.data || error.message);
    }
};

const checkPluginActivity = async () => {
    try {
        await createPluginTable();
        await fetchBlocks();
        const response = await axios.get(`/api/admin/plugins/active`);
        const activePlugins = response.data;
        isActive.value = activePlugins.some(plugin => plugin.name === props.pluginName);
    } catch (error) {
        console.error('Ошибка при проверке активности плагина:', error.response?.data || error.message);
    }
};

const openCreateModal = () => {
    selectedBlock.value = {links: '', svg_blocks: '', title: '', paragraph: ''};
    isEdit.value = false;
    showEditModal.value = true;
};

const editBlock = (block) => {
    selectedBlock.value = {...block};
    isEdit.value = true;
    showEditModal.value = true;
};

const deleteBlock = async (id) => {
    try {
        await axios.delete(`/api/admin/plugins/${props.pluginName}/blocks/${id}`);
        await fetchBlocks();
    } catch (error) {
        console.error('Ошибка при удалении блока:', error.response?.data || error.message);
    }
};

const recalculateSort = () => {
    paginatedBlocks.value.forEach((block, index) => {
        axios.put(`/api/admin/plugins/${props.pluginName}/blocks/${block.id}/sort`, {sort: index + 1})
            .catch(error => console.error('Ошибка сортировки блока:', error.response?.data || error.message));
    });
};

const toggleActivity = async (block) => {
    try {
        await axios.put(`/api/admin/plugins/${props.pluginName}/blocks/${block.id}/activity`, {activity: !block.activity});
        block.activity = !block.activity;
    } catch (error) {
        console.error('Ошибка обновления активности:', error.response?.data || error.message);
    }
};

const sortBlocks = (blocks) => {
    if (sortParam.value === 'activity') return blocks.filter(b => b.activity);
    if (sortParam.value === 'inactive') return blocks.filter(b => !b.activity);
    return blocks.slice().sort((a, b) => (a[sortParam.value] > b[sortParam.value]) ? 1 : -1);
};

const filteredBlocks = computed(() => {
    let result = blocks.value;
    if (searchQuery.value) {
        result = result.filter(b => b.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
    return sortBlocks(result);
});

const paginatedBlocks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredBlocks.value.slice(start, start + itemsPerPage.value);
});

const totalBlocks = computed(() => blocks.value.length);

onMounted(() => {
    checkPluginActivity();
});
</script>

<template>
    <AdminLayout v-if="isAdmin" :title="props.pluginName">
        <template #header>
            <TitlePage>{{ props.pluginName }}</TitlePage>
        </template>

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg">

                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <PrimaryButton @click="openCreateModal">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('add') }}
                    </PrimaryButton>
                </div>

                <EditBlockModal :block="selectedBlock" :show="showEditModal" :isEdit="isEdit"
                                :pluginName="props.pluginName" @close="showEditModal = false" @update="fetchBlocks"/>
                <SearchInput v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable>{{ totalBlocks }}</CountTable>

                <template v-if="paginatedBlocks.length">
                    <table class="table-auto w-full text-slate-700 dark:text-slate-100">
                        <thead class="text-md font-semibold uppercase bg-slate-200 dark:bg-cyan-900">
                        <tr>
                            <th class="px-2 py-3">ID</th>
                            <th class="px-2 py-3">Ссылка</th>
                            <th class="px-2 py-3">SVG</th>
                            <th class="px-2 py-3">Заголовок</th>
                            <th class="px-2 py-3">Действия</th>
                        </tr>
                        </thead>
                        <draggable tag="tbody" :list="paginatedBlocks" @end="recalculateSort" itemKey="id">
                            <template #item="{ element: block }">
                                <tr class="border-b hover:bg-slate-100 dark:hover:bg-cyan-800">
                                    <td class="px-2 py-1 text-center">{{ block.id }}</td>
                                    <td class="px-2 py-1 text-left text-blue-600 dark:text-violet-200">{{
                                            block.links
                                        }}
                                    </td>
                                    <td class="px-2 py-1 text-left" v-html="block.svg_blocks"></td>
                                    <td class="px-2 py-1 text-left">{{ block.title }}</td>
                                    <td class="px-2 py-1 flex justify-center space-x-2">
                                        <ActivityToggle :isActive="block.activity"
                                                        @toggle-activity="toggleActivity(block)"
                                                        :title="block.activity ? t('enabled') : t('disabled')"/>
                                        <ActionButton
                                            action="edit"
                                            title="Редактировать"
                                            @click="editBlock(block)"
                                        >
                                            <template #icon>
                                                <svg class="w-4 h-4 fill-current
                                                            text-sky-500
                                                            hover:text-sky-700
                                                            dark:text-sky-300
                                                            dark:hover:text-sky-100
                                                            shrink-0"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/>
                                                </svg>
                                            </template>
                                        </ActionButton>
                                        <ActionButton
                                            action="delete"
                                            title="Удалить"
                                            @click="deleteBlock(block.id)"
                                        >
                                            <template #icon>
                                                <svg class="w-4 h-4 fill-current
                                                            text-rose-400
                                                            hover:text-rose-500
                                                            dark:text-red-300
                                                            dark:hover:text-red-100
                                                            shrink-0"
                                                     viewBox="0 0 16 16">
                                                    <path
                                                        d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
                                                </svg>
                                            </template>
                                        </ActionButton>
                                    </td>
                                </tr>
                            </template>
                        </draggable>
                    </table>
                </template>

                <template v-else>
                    <div class="p-5 text-center text-slate-700 dark:text-slate-100">{{ t('noData') }}</div>
                </template>

                <div class="flex justify-between items-center flex-col md:flex-row">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event"/>
                    <Pagination :current-page="currentPage" :items-per-page="itemsPerPage"
                                :total-items="filteredBlocks.length" @update:currentPage="currentPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val"/>
                </div>

            </div>
        </div>
    </AdminLayout>

    <SamplePlugin v-else-if="isActive" :pluginName="props.pluginName" :isActive="isActive" :id="id" :blocks="blocks"/>
</template>
