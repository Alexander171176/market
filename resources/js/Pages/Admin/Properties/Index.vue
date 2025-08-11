<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import { defineProps, ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import SortSelect from '@/Components/Admin/Property/Sort/SortSelect.vue';
import PropertyTable from '@/Components/Admin/Property/Table/PropertyTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from '@/Components/Admin/Select/BulkActionSelect.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';

// --- Инициализация экземпляр i18n, toast ---
const { t } = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['properties', 'propertiesCount', 'adminCountProperties', 'adminSortProperties'])

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountProperties); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountProperties'), { value: newVal }, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortProperties); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortProperties'), { value: newVal }, {
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
const propertyToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const propertyToDeleteName = ref(''); // Сохраняем название для сообщения

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, name) => {
    propertyToDeleteId.value = id;
    propertyToDeleteName.value = name;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    propertyToDeleteId.value = null;
    propertyToDeleteName.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteProperty = () => {
    if (propertyToDeleteId.value === null) return;

    const idToDelete = propertyToDeleteId.value; // Сохраняем ID во временную переменную
    const nameToDelete = propertyToDeleteName.value; // Сохраняем title во временную переменную

    router.delete(route('admin.properties.destroy', { property: idToDelete }), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
            closeModal()
            toast.success(`Характеристика "${nameToDelete || 'ID: ' + idToDelete}" удалена.`)
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Характеристика: ${nameToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            propertyToDeleteId.value = null;
            propertyToDeleteName.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (property) => {
    const newActivity = !property.activity;
    const actionText = newActivity ? 'активирована' : 'деактивирована';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.properties.updateActivity', { property: property.id }),
        { activity: newActivity },
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // property.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Характеристика "${property.name}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${property.name}".`);
                // Можно откатить изменение на фронте, если нужно
                // property.activity = !newActivity;
            },
        }
    );
};

/**
 * Отправляет запрос для клонирования.
 */
const cloneProperty = (propertyObject) => { // Переименовываем параметр для ясности
    // Извлекаем ID из объекта
    const propertyId = propertyObject?.id; // Используем опциональную цепочку на случай undefined/null
    const propertyName = propertyObject?.name || `ID: ${propertyId}`; // Пытаемся получить name или используем ID

    // Проверяем, что ID получен
    if (typeof propertyId === 'undefined' || propertyId === null) {
        console.error("Не удалось получить ID характеристики для клонирования", propertyObject);
        toast.error("Не удалось определить характеристику для клонирования.");
        return;
    }

    // Используем confirm с извлеченным ID (или name)
    if (!confirm(`Вы уверены, что хотите клонировать характеристику "${propertyName}"?`)) {
        return;
    }

    // В route() передаем именно propertyId
    router.post(route('admin.actions.properties.clone', { property: propertyId }), {}, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            // Используем rubricName или propertyId в сообщении
            toast.success(`Характеристика "${propertyName}" успешно клонирована.`);
        },
        onError: (errors) => {
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || `Ошибка клонирования рубрики "${propertyName}".`;
            toast.error(errorMessage);
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
const sortProperties = (properties) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return properties.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return properties.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return properties.filter(property => property.activity)
    }
    if (sortParam.value === 'inactive') {
        return properties.filter(property => !property.activity)
    }
    if (sortParam.value === 'locale') {
        // Сортировка по locale в обратном порядке
        return properties.slice().sort((a, b) => {
            if (a.locale < b.locale) return 1;
            if (a.locale > b.locale) return -1;
            return 0;
        });
    }
    return properties.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    })
}

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredProperties = computed(() => {
    let filtered = props.properties;

    if (searchQuery.value) {
        filtered = filtered.filter(property =>
            property.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortProperties(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedProperties = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredProperties.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredProperties.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.properties.updateSortBulk'),
        { properties: sortData }, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Порядок характеристик успешно обновлен.");
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.properties || "Не удалось обновить порядок характеристик.");
                router.reload({ only: ['properties'], preserveScroll: true });
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedProperties = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedProperties.value = [...new Set([...selectedProperties.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedProperties.value = selectedProperties.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectProperty = (propertyId) => {
    const index = selectedProperties.value.indexOf(propertyId);
    if (index > -1) {
        selectedProperties.value.splice(index, 1);
    } else {
        selectedProperties.value.push(propertyId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedProperties.value.length) {
        toast.warning('Выберите характеристики для активации/деактивации');
        return;
    }

    router.put(
        route('admin.actions.properties.bulkUpdateActivity'),
        {
            ids: selectedProperties.value,
            activity: newActivity,
        },
        {
            preserveScroll: true,
            // Заставляем Inertia обновить props с сервера, это перезагрузит таблицу
            preserveState: false,
            onSuccess: () => {
                toast.success('Активность характеристик массово обновлена');
                // Очищаем массив выделенных элементов
                selectedProperties.value = [];
            },
            onError: (errors) => {
                const errorMessage = errors[Object.keys(errors)[0]] || 'Не удалось обновить активность';
                toast.error(errorMessage);
            }
        }
    );
};

/**
 * Выполняет массовое удаление выбранных.
 */
const bulkDelete = () => {
    if (selectedProperties.value.length === 0) {
        toast.warning('Выберите хотя бы одну характеристику для удаления.');
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.properties.bulkDestroy'), {
        data: { ids: selectedProperties.value },
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedProperties.value = []; // Очищаем выбор
            toast.success('Массовое удаление характеристик успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении характеристик.';
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
        selectedProperties.value = paginatedProperties.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedProperties.value = [];
    } else if (action === 'activate') { bulkToggleActivity(true); }
    else if (action === 'deactivate') { bulkToggleActivity(false); }
    else if (action === 'delete') { bulkDelete(); }
    event.target.value = '';
};

</script>

<template>
    <AdminLayout :title="t('properties')">
        <template #header>
            <TitlePage>
                {{ t('properties') }}
            </TitlePage>
        </template>
        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.properties.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addProperty') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="propertiesCount" @change="handleBulkAction" />
                </div>
                <SearchInput v-if="propertiesCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="propertiesCount"> {{ propertiesCount }} </CountTable>
                <PropertyTable
                    :properties="paginatedProperties"
                    :selected-properties="selectedProperties"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @clone="cloneProperty"
                    @update-sort-order="handleSortOrderUpdate"
                    @toggle-select="toggleSelectProperty"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1"
                     v-if="propertiesCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage"
                                        @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredProperties.length"
                                @update:currentPage="currentPage = $event"
                                @update:itemsPerPage="itemsPerPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val" />
                </div>
            </div>
        </div>

        <DangerModal
            :show="showConfirmDeleteModal"
            @close="closeModal"
            :onCancel="closeModal"
            :onConfirm="deleteProperty"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
