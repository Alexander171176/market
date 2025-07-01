<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps, ref, computed, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useToast} from 'vue-toastification';
import {router} from "@inertiajs/vue3";
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import SortSelect from '@/Components/Admin/Parameters/Sort/SortSelect.vue';
import BulkActionSelect from "@/Components/Admin/Parameters/Select/BulkActionSelect.vue";
import ParameterTable from '@/Components/Admin/Parameters/Table/ParameterTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import axios from 'axios';

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps({
    settings: Array,
    settingsCount: Number,
    adminCountSettings: Number,
    adminSortSettings: String,
});

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountSettings); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountSettings'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortSettings); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortSettings'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => toast.info('Сортировка успешно изменена'),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления сортировки.'),
    });
});

/**
 * Флаг отображения модального окна подтверждения удаления.
 */
const showConfirmDeleteModal = ref(false);

/**
 * ID для удаления.
 */
const settingToDeleteId = ref(null);

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id) => {
    settingToDeleteId.value = id;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
};

// --- Логика удаления ---
/**
 * Отправляет запрос на удаление тега на сервер.
 */
const deleteSetting = () => {
    if (settingToDeleteId.value === null) return;

    const idToDelete = settingToDeleteId.value;

    router.delete(route('admin.settings.destroy', {setting: idToDelete}), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
            closeModal();
            toast.success(`Параметр ID ${idToDelete} успешно удалён.`);
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || 'Ошибка удаления параметра.';
            toast.error(`${errorMsg} (ID: ${idToDelete})`);
        },
        onFinish: () => {
            settingToDeleteId.value = null;
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (setting) => {
    const newActivity = !setting.activity;

    router.put(route('admin.actions.settings.updateActivity', {setting: setting.id}), {activity: newActivity}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
            // Проверяем, какие flash-сообщения пришли
            if (page.props.flash.success) {
                toast.success(page.props.flash.success);
            } else if (page.props.flash.warning) {
                toast.warning(page.props.flash.warning);
            } else if (page.props.flash.error || page.props.flash.general) {
                toast.error(page.props.flash.error || page.props.flash.general);
            } else {
                toast.info(`Изменение активности параметра "${setting.option}" (ID: ${setting.id}) выполнено.`);
            }
        },
        onError: (errors) => {
            toast.error(errors.activity || errors.general || `Ошибка изменения активности параметра "${setting.option}" (ID: ${setting.id}).`);
        }
    });
};

/**
 * Текущая страница пагинации.
 */
const currentPage = ref(1);

/**
 * Строка поискового запроса.
 */
const searchQuery = ref('');

/**
 * Сортирует массив на основе текущего параметра сортировки.
 */
const sortSettings = (settings) => {
    if (sortParam.value === 'idAsc') return settings.slice().sort((a, b) => a.id - b.id);
    if (sortParam.value === 'idDesc') return settings.slice().sort((a, b) => b.id - a.id);
    if (sortParam.value === 'activity') return settings.filter(p => p.activity);
    if (sortParam.value === 'inactive') return settings.filter(p => !p.activity);

    return settings.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1;
        if (a[sortParam.value] > b[sortParam.value]) return 1;
        return 0;
    });
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredSettings = computed(() => {
    let filtered = props.settings;

    if (searchQuery.value) {
        filtered = filtered.filter(param => param.option.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }

    return sortSettings(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedSettings = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredSettings.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredSettings.value.length / itemsPerPage.value));

/**
 * Обрабатывает событие обновления порядка сортировки от компонента таблицы (Drag and drop).
 */
const handleSortOrderUpdate = (orderedIds) => {
    const startSort = (currentPage.value - 1) * itemsPerPage.value;
    const sortData = orderedIds.map((id, index) => ({
        id: id,
        sort: startSort + index + 1,
    }));

    router.put(route('admin.actions.settings.updateSortBulk'),
        {settings: sortData}, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок статей успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.settings || "Не удалось обновить порядок статей.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['settings'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedSettings = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        selectedSettings.value = [...new Set([...selectedSettings.value, ...ids])];
    } else {
        selectedSettings.value = selectedSettings.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectSetting = (settingId) => {
    const index = selectedSettings.value.indexOf(settingId);
    if (index > -1) {
        selectedSettings.value.splice(index, 1);
    } else {
        selectedSettings.value.push(settingId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedSettings.value.length) {
        toast.warning('Выберите параметры для активации/деактивации');
        return;
    }
    axios
        .put(route('admin.actions.settings.bulkUpdateActivity'), {
            ids: selectedSettings.value,
            activity: newActivity,
        })
        .then(() => {
            toast.success('Активность парметров массово обновлена')
            // сразу очистим выбор
            const updatedIds = [...selectedSettings.value]
            selectedSettings.value = []
            // и оптимистично поправим флаг в таблице
            paginatedSettings.value.forEach((a) => {
                if (updatedIds.includes(a.id)) {
                    a.activity = newActivity
                }
            })
        })
        .catch(() => {
            toast.error('Не удалось обновить активность параметров')
        })
};

/**
 * Обрабатывает выбор действия в селекте массовых действий.
 */
const handleBulkAction = (event) => {
    const action = event.target.value;
    if (action === 'selectAll') {
        selectedSettings.value = paginatedSettings.value.map(p => p.id);
    } else if (action === 'deselectAll') {
        selectedSettings.value = [];
    } else if (action === 'activate') {
        bulkToggleActivity(true);
    } else if (action === 'deactivate') {
        bulkToggleActivity(false);
    }
    event.target.value = '';
};

</script>

<template>
    <AdminLayout :title="t('parametersHeader')">
        <template #header>
            <TitlePage>{{ t('parametersHeader') }}</TitlePage>
        </template>

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg">

                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.parameters.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                            </svg>
                        </template>
                        {{ t('addParameter') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="settingsCount" @change="handleBulkAction" />
                </div>

                <SearchInput v-model="searchQuery" :placeholder="t('searchByParameter')"/>
                <CountTable>{{ settingsCount }}</CountTable>

                <ParameterTable
                    :settings="paginatedSettings"
                    :selected-settings="selectedSettings"
                    @toggle-activity="toggleActivity"
                    @update-sort-order="handleSortOrderUpdate"
                    @delete="confirmDelete"
                    @toggle-select="toggleSelectSetting"
                    @toggle-all="toggleAll"
                />

                <div class="flex justify-between items-center flex-col md:flex-row mt-4">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event"/>
                    <Pagination :current-page="currentPage" :items-per-page="itemsPerPage"
                                :total-items="filteredSettings.length"
                                @update:currentPage="currentPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val"/>
                </div>
            </div>
        </div>

        <DangerModal
            :show="showConfirmDeleteModal"
            @close="closeModal"
            :onCancel="closeModal"
            :onConfirm="deleteSetting"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
