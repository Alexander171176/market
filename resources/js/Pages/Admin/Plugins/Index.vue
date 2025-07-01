<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps, ref, computed, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import {useToast} from 'vue-toastification';
import {router} from '@inertiajs/vue3';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from "@/Components/Admin/Buttons/DefaultButton.vue";
import BulkActionSelect from "@/Components/Admin/Plugins/Select/BulkActionSelect.vue";
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import SortSelect from '@/Components/Admin/Plugins/Sort/SortSelect.vue';
import PluginTable from '@/Components/Admin/Plugins/Table/PluginTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';

// --- Инициализация экземпляр i18n, toast ---
const { t } = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['plugins', 'pluginsCount', 'adminCountPlugins', 'adminSortPlugins']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountPlugins); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountPlugins'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortPlugins); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortPlugins'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
        onSuccess: () => toast.info('Сортировка успешно изменена'),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления сортировки.'),
    });
})

/**
 * Флаг отображения модального окна подтверждения удаления.
 */
const showConfirmDeleteModal = ref(false);

/**
 * ID для удаления.
 */
const pluginToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const pluginToDeleteName = ref(''); // Сохраняем название для сообщения

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, name) => {
    pluginToDeleteId.value = id;
    pluginToDeleteName.value = name;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    pluginToDeleteId.value = null;
    pluginToDeleteName.value = '';
};

// --- Логика удаления ---
/**
 * Отправляет запрос на удаление модуля на сервер.
 */
const deletePlugin = () => {
    if (pluginToDeleteId.value === null) return;

    const idToDelete = pluginToDeleteId.value; // Сохраняем ID во временную переменную
    const nameToDelete = pluginToDeleteName.value; // Сохраняем name во временную переменную

    router.delete(route('admin.plugins.destroy', {plugin: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Модуль "${nameToDelete || 'ID: ' + idToDelete}" удален.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Тег: ${nameToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            pluginToDeleteId.value = null;
            pluginToDeleteName.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (plugin) => {
    const newActivity = !plugin.activity;
    const actionText = newActivity ? 'активирован' : 'деактивирован';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.plugins.updateActivity', {plugin: plugin.id}),
        {activity: newActivity},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // plugin.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Модуль "${plugin.name}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${plugin.name}".`);
                // Можно откатить изменение на фронте, если нужно
                // plugin.activity = !newActivity;
            },
        }
    );
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
const sortPlugins = (plugins) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return plugins.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return plugins.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return plugins.filter(plugin => plugin.activity);
    }
    if (sortParam.value === 'inactive') {
        return plugins.filter(plugin => !plugin.activity);
    }
    return plugins.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    });
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredPlugins = computed(() => {
    let filtered = props.plugins;

    if (searchQuery.value) {
        filtered = filtered.filter(plugin =>
            plugin.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortPlugins(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedPlugins = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredPlugins.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredPlugins.value.length / itemsPerPage.value));

/**
 * Обрабатывает событие обновления порядка сортировки от компонента таблицы (Drag and drop).
 */
const handleSortOrderUpdate = (orderedIds) => {
    // console.log('Обработка обновления порядка сортировки:', orderedIds);

    // Вычисляем начальное значение sort для этой страницы
    const startSort = (currentPage.value - 1) * itemsPerPage.value;

    // Подготавливаем данные для отправки: массив объектов { id: X, sort: Y }
    const sortData = orderedIds.map((id, index) => ({
        id: id,
        sort: startSort + index + 1 // Глобальный порядок на основе позиции на странице
    }));

    // console.log('Отправка данных для сортировки:', sortData);

    // Отправляем ОДИН запрос на сервер для обновления всего порядка
    router.put(route('admin.actions.plugins.updateSortBulk'),
        {plugins: sortData}, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок модулей успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.plugins || "Не удалось обновить порядок модулей.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['plugins'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedPlugins = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedPlugins.value = [...new Set([...selectedPlugins.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedPlugins.value = selectedPlugins.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectPlugin = (pluginId) => {
    const index = selectedPlugins.value.indexOf(pluginId);
    if (index > -1) {
        selectedPlugins.value.splice(index, 1);
    } else {
        selectedPlugins.value.push(pluginId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedPlugins.value.length) {
        toast.warning('Выберите модули для активации/деактивации модулей');
        return;
    }
    axios
        .put(route('admin.actions.plugins.bulkUpdateActivity'), {
            ids: selectedPlugins.value,
            activity: newActivity,
        })
        .then(() => {
            toast.success('Активность массово обновлена')
            // сразу очистим выбор
            const updatedIds = [...selectedPlugins.value]
            selectedPlugins.value = []
            // и оптимистично поправим флаг в таблице
            paginatedPlugins.value.forEach((a) => {
                if (updatedIds.includes(a.id)) {
                    a.activity = newActivity
                }
            })
        })
        .catch(() => {
            toast.error('Не удалось обновить активность')
        })
};

/**
 * Обрабатывает выбор действия в селекте массовых действий.
 */
const handleBulkAction = (event) => {
    const action = event.target.value;
    if (action === 'selectAll') {
        // Вызываем toggleAll с имитацией события checked: true
        selectedPlugins.value = paginatedPlugins.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedPlugins.value = [];
    } else if (action === 'activate') {
        bulkToggleActivity(true);
    } else if (action === 'deactivate') {
        bulkToggleActivity(false);
    }
    event.target.value = ''; // Сбросить выбранное значение после выполнения действия
};

</script>

<template>
    <AdminLayout :title="t('plugins')">
        <template #header>
            <TitlePage>
                {{ t('plugins') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.plugins.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('registerModule') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="pluginsCount" @change="handleBulkAction" />
                </div>
                <SearchInput v-if="pluginsCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <span class="mb-4 py-1 px-3
                        w-full
                        flex items-center justify-center
                        text-md italic font-semibold text-rose-400
                        bg-amber-50 opacity-80 border border-rose-200">
                    {{ t('componentParametersWarning') }}
                </span>
                <CountTable v-if="pluginsCount"> {{ pluginsCount }}</CountTable>
                <PluginTable
                    :plugins="paginatedPlugins"
                    :selected-plugins="selectedPlugins"
                    @toggle-activity="toggleActivity"
                    @update-sort-order="handleSortOrderUpdate"
                    @delete="confirmDelete"
                    @toggle-select="toggleSelectPlugin"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1" v-if="pluginsCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event"/>
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredPlugins.length"
                                @update:currentPage="currentPage = $event"
                                @update:itemsPerPage="itemsPerPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val"/>
                </div>
            </div>
        </div>

        <DangerModal
            :show="showConfirmDeleteModal"
            @close="closeModal"
            :onCancel="closeModal"
            :onConfirm="deletePlugin"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
