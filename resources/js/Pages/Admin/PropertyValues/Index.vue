<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps, ref, computed, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useToast} from 'vue-toastification';
import {router} from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from "@/Components/Admin/Buttons/DefaultButton.vue";
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import SortSelect from '@/Components/Admin/PropertyValue/Sort/SortSelect.vue';
import PropertyValueTable from '@/Components/Admin/PropertyValue/Table/PropertyValueTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from '@/Components/Admin/PropertyValue/Select/BulkActionSelect.vue';

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['values', 'valuesCount', 'adminCountValues', 'adminSortValues']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountValues); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountPropertyValues'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortValues); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortPropertyValues'), {value: newVal}, {
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
const valueToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const valueToDeleteTitle = ref('');

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, title) => {
    valueToDeleteId.value = id;
    valueToDeleteTitle.value = title;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    valueToDeleteId.value = null;
    valueToDeleteTitle.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteValue = () => {
    if (valueToDeleteId.value === null) return;

    const idToDelete = valueToDeleteId.value;
    const titleToDelete = valueToDeleteTitle.value;

    router.delete(route('admin.property-values.destroy', {product: idToDelete}), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal();
            toast.success(`Значение "${titleToDelete || 'ID: ' + idToDelete}" удалено.`);
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Значение: ${titleToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            valueToDeleteId.value = null;
            valueToDeleteTitle.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (value) => {
    const newActivity = !value.activity;
    const actionText = newActivity ? t('activated') : t('deactivated');

    // Ключевое исправление здесь: {propertyValue: value.id}
    router.put(route('admin.actions.property-values.updateActivity', {propertyValue: value.id}),
        {activity: newActivity},
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // Это нужно, чтобы переключатель сразу обновился в таблице
                value.activity = newActivity;
                toast.success(`Значение "${value.name}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${value.name}".`);
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
const sortValues = (values) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return values.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return values.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return values.filter(value => value.activity);
    }
    if (sortParam.value === 'inactive') {
        return values.filter(value => !value.activity);
    }
    if (sortParam.value === 'locale') {
        // Сортировка по locale в обратном порядке
        return values.slice().sort((a, b) => {
            if (a.locale < b.locale) return 1;
            if (a.locale > b.locale) return -1;
            return 0;
        });
    }
    // Для остальных полей — стандартное сравнение:
    return values.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    })
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredValues = computed(() => {
    let filtered = props.values;

    if (searchQuery.value) {
        filtered = filtered.filter(value =>
            value.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortValues(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedValues = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredValues.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredValues.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.property-values.updateSortBulk'),
        {propertyValues: sortData}, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок Значений успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.values || "Не удалось обновить порядок значений.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['values'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedValues = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedValues.value = [...new Set([...selectedValues.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedValues.value = selectedValues.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectValue = (valueId) => {
    const index = selectedValues.value.indexOf(valueId);
    if (index > -1) {
        selectedValues.value.splice(index, 1);
    } else {
        selectedValues.value.push(valueId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedValues.value.length) {
        toast.warning('Выберите группы для активации/деактивации');
        return;
    }

    router.put(route('admin.actions.property-values.bulkUpdateActivity'),
        { // Данные запроса
            ids: selectedValues.value,
            activity: newActivity,
        },
        { // Опции Inertia
            preserveScroll: true,
            preserveState: false, // <-- КЛЮЧЕВОЙ МОМЕНТ!
            onSuccess: () => {
                toast.success('Активность массово обновлена');
                selectedValues.value = []; // Очищаем выбор
            },
            onError: (errors) => {
                toast.error(errors[Object.keys(errors)[0]] || 'Не удалось обновить активность');
            }
        }
    );
};

/**
 * Выполняет массовое удаление выбранных.
 */
const bulkDelete = () => {
    if (selectedValues.value.length === 0) {
        toast.warning('Выберите хотя бы одно значение для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.property-values.bulkDestroy'), {
        data: {ids: selectedValues.value},
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedValues.value = []; // Очищаем выбор
            toast.success('Массовое удаление значений успешно завершено.');
            // console.log('Массовое удаление начений успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении начений.';
            toast.error(errorMessage);
        },
    });
};

/**
 * Обрабатывает выбор действия в селекте массовых действий.
 */
const handleBulkAction = (event) => {
    const action = event.target.value;
    if (action === 'selectAll') {
        // Вызываем toggleAll с имитацией события checked: true
        selectedValues.value = paginatedValues.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedValues.value = [];
    } else if (action === 'activate') {
        bulkToggleActivity(true);
    } else if (action === 'deactivate') {
        bulkToggleActivity(false);
    } else if (action === 'delete') {
        bulkDelete();
    }
    event.target.value = ''; // Сбросить выбранное значение после выполнения действия
};

</script>

<template>
    <AdminLayout :title="t('propertyValues')">
        <template #header>
            <TitlePage>{{ t('propertyValues') }}</TitlePage>
        </template>

        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-md">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.property-values.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addPropertiesValue') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="valuesCount" @change="handleBulkAction" />
                </div>

                <SearchInput v-model="searchQuery" :placeholder="t('searchByName')" class="mb-2" />
                <CountTable v-if="valuesCount">{{ valuesCount }}</CountTable>

                <PropertyValueTable
                    :values="paginatedValues"
                    :selected-values="selectedValues"
                    @toggle-activity="toggleActivity"
                    @update-sort-order="handleSortOrderUpdate"
                    @delete="confirmDelete"
                    @toggle-select="toggleSelectValue"
                    @toggle-all="toggleAll"
                />

                <div class="flex justify-between items-center flex-col md:flex-row my-1"
                     v-if="valuesCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage"
                                        @update:itemsPerPage="itemsPerPage = $event"/>
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredValues.length"
                                @update:currentPage="currentPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val"/>
                </div>
            </div>
        </div>

        <DangerModal
            :show="showConfirmDeleteModal"
            @close="closeModal"
            :onCancel="closeModal"
            :onConfirm="deleteValue"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
