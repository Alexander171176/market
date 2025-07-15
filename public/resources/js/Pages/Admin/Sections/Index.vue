<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import { defineProps, ref, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import SortSelect from '@/Components/Admin/Section/Sort/SortSelect.vue';
import SectionTable from '@/Components/Admin/Section/Table/SectionTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from '@/Components/Admin/Select/BulkActionSelect.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import axios from "axios";

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['sections', 'sectionsCount', 'adminCountSections', 'adminSortSections']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountSections); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountSections'), { value: newVal }, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortSections);

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortSections'), { value: newVal }, {
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
const sectionToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const sectionToDeleteTitle = ref(''); // Сохраняем название для сообщения

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, title) => {
    sectionToDeleteId.value = id;
    sectionToDeleteTitle.value = title;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    sectionToDeleteId.value = null;
    sectionToDeleteTitle.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteSection = () => {
    if (sectionToDeleteId.value === null) return;

    const idToDelete = sectionToDeleteId.value; // Сохраняем ID во временную переменную
    const titleToDelete = sectionToDeleteTitle.value; // Сохраняем title во временную переменную

    router.delete(route('admin.sections.destroy', { section: idToDelete }), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Секция "${titleToDelete || 'ID: ' + idToDelete}" удалена.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Секция: ${titleToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            sectionToDeleteId.value = null;
            sectionToDeleteTitle.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (section) => {
    const newActivity = !section.activity;
    const actionText = newActivity ? 'активирована' : 'деактивирована';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.sections.updateActivity', { section: section.id }),
        { activity: newActivity },
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // section.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Рубрика "${section.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${section.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // section.activity = !newActivity;
            },
        }
    );
};

/**
 * Отправляет запрос для клонирования.
 */
const cloneSection = (sectionObject) => { // Переименовываем параметр для ясности
    // Извлекаем ID из объекта
    const sectionId = sectionObject?.id; // Используем опциональную цепочку на случай undefined/null
    const sectionTitle = sectionObject?.title || `ID: ${sectionId}`; // Пытаемся получить title или используем ID

    // Проверяем, что ID получен
    if (typeof sectionId === 'undefined' || sectionId === null) {
        console.error("Не удалось получить ID секции для клонирования", sectionObject);
        toast.error("Не удалось определить секцию для клонирования.");
        return;
    }

    // Используем confirm с извлеченным ID (или title)
    if (!confirm(`Вы уверены, что хотите клонировать секцию "${sectionTitle}"?`)) {
        return;
    }

    // В route() передаем именно sectionId
    router.post(route('admin.actions.sections.clone', { section: sectionId }), {}, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            // Используем sectionTitle или sectionId в сообщении
            toast.success(`Секция "${sectionTitle}" успешно клонирована.`);
        },
        onError: (errors) => {
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || `Ошибка клонирования секции "${sectionTitle}".`;
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
const sortSections = (sections) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return sections.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return sections.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return sections.filter(section => section.activity);
    }
    if (sortParam.value === 'inactive') {
        return sections.filter(section => !section.activity);
    }
    if (sortParam.value === 'locale') {
        // Сортировка по locale в обратном порядке
        return sections.slice().sort((a, b) => {
            if (a.locale < b.locale) return 1;
            if (a.locale > b.locale) return -1;
            return 0;
        });
    }
    return sections.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    });
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredSections = computed(() => {
    let filtered = props.sections;

    if (searchQuery.value) {
        filtered = filtered.filter(section =>
            section.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortSections(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedSections = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredSections.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredSections.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.sections.updateSortBulk'),
        { sections: sortData }, // Отправляем массив объектов
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
                toast.error(errors.general || errors.sections || "Не удалось обновить порядок рубрик.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({ only: ['sections'], preserveScroll: true }); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedSections = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedSections.value = [...new Set([...selectedSections.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedSections.value = selectedSections.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectSection = (sectionId) => {
    const index = selectedSections.value.indexOf(sectionId);
    if (index > -1) {
        selectedSections.value.splice(index, 1);
    } else {
        selectedSections.value.push(sectionId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedSections.value.length) {
        toast.warning('Выберите рубрики для активации/деактивации рубрик');
        return;
    }
    axios
        .put(route('admin.actions.sections.bulkUpdateActivity'), {
            ids: selectedSections.value,
            activity: newActivity,
        })
        .then(() => {
            toast.success('Активность массово обновлена')
            // сразу очистим выбор
            const updatedIds = [...selectedSections.value]
            selectedSections.value = []
            // и оптимистично поправим флаг в таблице
            paginatedSections.value.forEach((a) => {
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
    if (selectedSections.value.length === 0) {
        toast.warning('Выберите хотя бы одну секцию для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.sections.bulkDestroy'), {
        data: { ids: selectedSections.value },
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedSections.value = []; // Очищаем выбор
            toast.success('Массовое удаление секций успешно завершено.');
            // console.log('Массовое удаление секций успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении секций.';
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
        selectedSections.value = paginatedSections.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedSections.value = [];
    } else if (action === 'activate') { bulkToggleActivity(true); }
    else if (action === 'deactivate') { bulkToggleActivity(false); }
    else if (action === 'delete') { bulkDelete(); }
    event.target.value = '';
};

</script>

<template>
    <AdminLayout :title="t('sections')">
        <template #header>
            <TitlePage>
                {{ t('sections') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">

            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.sections.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addSection') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="sectionsCount" @change="handleBulkAction" />
                </div>
                <SearchInput v-if="sectionsCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="sectionsCount"> {{ sectionsCount }} </CountTable>
                <SectionTable
                    :sections="paginatedSections"
                    :selected-sections="selectedSections"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @clone="cloneSection"
                    @update-sort-order="handleSortOrderUpdate"
                    @toggle-select="toggleSelectSection"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1" v-if="sectionsCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredSections.length"
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
            :onConfirm="deleteSection"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
