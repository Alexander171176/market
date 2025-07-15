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
import SortSelect from '@/Components/Admin/Rubric/Sort/SortSelect.vue';
import RubricTable from '@/Components/Admin/Rubric/Table/RubricTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from '@/Components/Admin/Select/BulkActionSelect.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import axios from "axios";

// --- Инициализация экземпляр i18n, toast ---
const { t } = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['rubrics', 'rubricsCount', 'adminCountRubrics', 'adminSortRubrics'])

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountRubrics); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountRubrics'), { value: newVal }, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortRubrics); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortRubrics'), { value: newVal }, {
        preserveScroll: true,
        preserveState: true,
        // onSuccess: () => toast.info(`Сортировка изменена на ${newVal}.`), // TODO: добавить перевод для newVal
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
const rubricToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const rubricToDeleteTitle = ref(''); // Сохраняем название для сообщения

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, title) => {
    rubricToDeleteId.value = id;
    rubricToDeleteTitle.value = title;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    rubricToDeleteId.value = null;
    rubricToDeleteTitle.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteRubric = () => {
    if (rubricToDeleteId.value === null) return;

    const idToDelete = rubricToDeleteId.value; // Сохраняем ID во временную переменную
    const titleToDelete = rubricToDeleteTitle.value; // Сохраняем title во временную переменную

    router.delete(route('admin.rubrics.destroy', { rubric: idToDelete }), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Рубрика "${titleToDelete || 'ID: ' + idToDelete}" удалена.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Рубрика: ${titleToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            rubricToDeleteId.value = null;
            rubricToDeleteTitle.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (rubric) => {
    const newActivity = !rubric.activity;
    const actionText = newActivity ? 'активирована' : 'деактивирована';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.rubrics.updateActivity', { rubric: rubric.id }),
        { activity: newActivity },
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // rubric.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Рубрика "${rubric.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${rubric.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // rubric.activity = !newActivity;
            },
        }
    );
};

/**
 * Отправляет запрос для клонирования.
 */
const cloneRubric = (rubricObject) => { // Переименовываем параметр для ясности
    // Извлекаем ID из объекта
    const rubricId = rubricObject?.id; // Используем опциональную цепочку на случай undefined/null
    const rubricTitle = rubricObject?.title || `ID: ${rubricId}`; // Пытаемся получить title или используем ID

    // Проверяем, что ID получен
    if (typeof rubricId === 'undefined' || rubricId === null) {
        console.error("Не удалось получить ID рубрики для клонирования", rubricObject);
        toast.error("Не удалось определить рубрику для клонирования.");
        return;
    }

    // Используем confirm с извлеченным ID (или title)
    if (!confirm(`Вы уверены, что хотите клонировать рубрику "${rubricTitle}"?`)) {
        return;
    }

    // В route() передаем именно rubricId
    router.post(route('admin.actions.rubrics.clone', { rubric: rubricId }), {}, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            // Используем rubricTitle или rubricId в сообщении
            toast.success(`Рубрика "${rubricTitle}" успешно клонирована.`);
        },
        onError: (errors) => {
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || `Ошибка клонирования рубрики "${rubricTitle}".`;
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
const sortRubrics = (rubrics) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return rubrics.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return rubrics.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return rubrics.filter(rubric => rubric.activity)
    }
    if (sortParam.value === 'inactive') {
        return rubrics.filter(rubric => !rubric.activity)
    }
    if (sortParam.value === 'locale') {
        // Сортировка по locale в обратном порядке
        return rubrics.slice().sort((a, b) => {
            if (a.locale < b.locale) return 1;
            if (a.locale > b.locale) return -1;
            return 0;
        });
    }
    // Для просмотров и лайков сортировка по убыванию:
    if (sortParam.value === 'views') {
        return rubrics.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
    }
    return rubrics.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    })
}

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredRubrics = computed(() => {
    let filtered = props.rubrics;

    if (searchQuery.value) {
        filtered = filtered.filter(rubric =>
            rubric.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortRubrics(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedRubrics = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredRubrics.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredRubrics.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.rubrics.updateSortBulk'),
        { rubrics: sortData }, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок рубрик успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.rubrics || "Не удалось обновить порядок рубрик.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({ only: ['rubrics'], preserveScroll: true }); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedRubrics = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedRubrics.value = [...new Set([...selectedRubrics.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedRubrics.value = selectedRubrics.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectRubric = (rubricId) => {
    const index = selectedRubrics.value.indexOf(rubricId);
    if (index > -1) {
        selectedRubrics.value.splice(index, 1);
    } else {
        selectedRubrics.value.push(rubricId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedRubrics.value.length) {
        toast.warning('Выберите рубрики для активации/деактивации рубрик');
        return;
    }
    axios
        .put(route('admin.actions.rubrics.bulkUpdateActivity'), {
            ids: selectedRubrics.value,
            activity: newActivity,
        })
        .then(() => {
            toast.success('Активность массово обновлена')
            // сразу очистим выбор
            const updatedIds = [...selectedRubrics.value]
            selectedRubrics.value = []
            // и оптимистично поправим флаг в таблице
            paginatedRubrics.value.forEach((a) => {
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
 * Выполняет массовое удаление выбранных.
 */
const bulkDelete = () => {
    if (selectedRubrics.value.length === 0) {
        toast.warning('Выберите хотя бы одну рубрику для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.rubrics.bulkDestroy'), {
        data: { ids: selectedRubrics.value },
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedRubrics.value = []; // Очищаем выбор
            toast.success('Массовое удаление рубрик успешно завершено.');
            // console.log('Массовое удаление рубрик успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении рубрик.';
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
        selectedRubrics.value = paginatedRubrics.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedRubrics.value = [];
    } else if (action === 'activate') { bulkToggleActivity(true); }
    else if (action === 'deactivate') { bulkToggleActivity(false); }
    else if (action === 'delete') { bulkDelete(); }
    event.target.value = '';
};

</script>

<template>
    <AdminLayout :title="t('rubrics')">
        <template #header>
            <TitlePage>
                {{ t('rubrics') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">

            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.rubrics.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addRubric') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="rubricsCount" @change="handleBulkAction" />
                </div>
                <SearchInput v-if="rubricsCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="rubricsCount"> {{ rubricsCount }} </CountTable>
                <RubricTable
                    :rubrics="paginatedRubrics"
                    :selected-rubrics="selectedRubrics"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @clone="cloneRubric"
                    @update-sort-order="handleSortOrderUpdate"
                    @toggle-select="toggleSelectRubric"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1" v-if="rubricsCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredRubrics.length"
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
            :onConfirm="deleteRubric"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
