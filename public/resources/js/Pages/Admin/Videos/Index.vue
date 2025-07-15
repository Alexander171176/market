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
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import VideoTable from '@/Components/Admin/Video/Table/VideoTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import ItemsPerPageSelect from "@/Components/Admin/Select/ItemsPerPageSelect.vue";
import SortSelect from "@/Components/Admin/Video/Sort/SortSelect.vue";
import BulkActionSelect from '@/Components/Admin/Video/Select/BulkActionSelect.vue';
import axios from 'axios';

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['videos', 'videosCount', 'adminCountVideos', 'adminSortVideos']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountVideos); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountVideos'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
})

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortVideos); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortVideos'), {value: newVal}, {
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
const videoToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const videoToDeleteTitle = ref('');

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, title) => {
    videoToDeleteId.value = id;
    videoToDeleteTitle.value = title;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    videoToDeleteId.value = null;
    videoToDeleteTitle.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteVideo = () => {
    if (videoToDeleteId.value === null) return;

    const idToDelete = videoToDeleteId.value; // Сохраняем ID во временную переменную
    const titleToDelete = videoToDeleteTitle.value; // Сохраняем title во временную переменную

    router.delete(route('admin.videos.destroy', {video: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Видео "${titleToDelete || 'ID: ' + idToDelete}" удалено.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Видео: ${titleToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            videoToDeleteId.value = null;
            videoToDeleteTitle.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности в левой колонке.
 */
const toggleLeft = (video) => {
    const newLeft = !video.left;
    const actionText = newLeft ? 'активировано в левой колонке' : 'деактивировано в левой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.videos.updateLeft', {video: video.id}),
        {left: newLeft},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // video.left = newLeft; // Уже не нужно, если preserveState: false
                toast.success(`Видео "${video.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.left || errors.general || `Ошибка изменения активности для "${video.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // video.left = !newLeft;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности в главном.
 */
const toggleMain = (video) => {
    const newMain = !video.main;
    const actionText = newMain ? 'активировано в главном' : 'деактивировано в главном';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.videos.updateMain', {video: video.id}),
        {main: newMain},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // video.main = newMain; // Уже не нужно, если preserveState: false
                toast.success(`Видео "${video.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.main || errors.general || `Ошибка изменения активности для "${video.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // video.main = !newMain;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности в правой колонке.
 */
const toggleRight = (video) => {
    const newRight = !video.right;
    const actionText = newRight ? 'активировано в правой колонке' : 'деактивировано в правой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.videos.updateRight', {video: video.id}),
        {right: newRight},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // video.right = newRight; // Уже не нужно, если preserveState: false
                toast.success(`Видео "${video.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.right || errors.general || `Ошибка изменения активности для "${video.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // video.right = !newRight;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (video) => {
    const newActivity = !video.activity;
    const actionText = newActivity ? 'активировано' : 'деактивировано';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.videos.updateActivity', {video: video.id}),
        {activity: newActivity},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // video.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Видео "${video.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${video.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // video.activity = !newActivity;
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
const sortVideos = (videos) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return videos.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return videos.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'published_at') {
        return videos.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return videos.filter(video => video.activity);
    }
    if (sortParam.value === 'inactive') {
        return videos.filter(video => !video.activity);
    }
    if (sortParam.value === 'left') {
        return videos.filter(video => video.left);
    }
    if (sortParam.value === 'noLeft') {
        return videos.filter(video => !video.left);
    }
    if (sortParam.value === 'main') {
        return videos.filter(video => video.main);
    }
    if (sortParam.value === 'noMain') {
        return videos.filter(video => !video.main);
    }
    if (sortParam.value === 'right') {
        return videos.filter(video => video.right);
    }
    if (sortParam.value === 'noRight') {
        return videos.filter(video => !video.right);
    }
    if (sortParam.value === 'locale') {
        // Сортировка по locale в обратном порядке
        return videos.slice().sort((a, b) => {
            if (a.locale < b.locale) return 1;
            if (a.locale > b.locale) return -1;
            return 0;
        });
    }
    // Для просмотров и лайков сортировка по убыванию:
    if (sortParam.value === 'views' || sortParam.value === 'likes') {
        return videos.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
    }
    // Для остальных полей — стандартное сравнение:
    return videos.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    })
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredVideos = computed(() => {
    let filtered = props.videos;

    if (searchQuery.value) {
        filtered = filtered.filter(video =>
            video.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortVideos(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedVideos = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredVideos.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredVideos.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.videos.updateSortBulk'),
        {videos: sortData}, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок видео успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.videos || "Не удалось обновить порядок видео.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['videos'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedVideos = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedVideos.value = [...new Set([...selectedVideos.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedVideos.value = selectedVideos.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectVideo = (videoId) => {
    const index = selectedVideos.value.indexOf(videoId);
    if (index > -1) {
        selectedVideos.value.splice(index, 1);
    } else {
        selectedVideos.value.push(videoId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedVideos.value.length) {
        toast.warning('Выберите видео для активации/деактивации видео');
        return;
    }
    axios
        .put(route('admin.actions.videos.bulkUpdateActivity'), {
            ids: selectedVideos.value,
            activity: newActivity,
        })
        .then(() => {
            toast.success('Активность массово обновлена')
            // сразу очистим выбор
            const updatedIds = [...selectedVideos.value]
            selectedVideos.value = []
            // и оптимистично поправим флаг в таблице
            paginatedVideos.value.forEach((a) => {
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
 * Выполняет массовое включение/выключение активности в левой колонке.
 */
const bulkToggleLeft = (newLeft) => {
    if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newLeft
            ? 'активации в левой колонки'
            : 'деактивации в левой колонки'}.`);
        return;
    }
    axios
        .put(route('admin.actions.videos.bulkUpdateLeft'), {
            ids: selectedVideos.value,
            left: newLeft,
        })
        .then(() => {
            toast.success('Статус в левой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedVideos.value]
            selectedVideos.value = []
            // и оптимистично поправим флаг в таблице
            paginatedVideos.value.forEach((a) => {
                if (updatedIds.includes(a.id)) {
                    a.left = newLeft
                }
            })
        })
        .catch(() => {
            toast.error('Не удалось обновить статус в левой колонке')
        });
};

/**
 * Выполняет массовое включение/выключение активности в главном.
 */
const bulkToggleMain = (newMain) => {
    if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newMain ? 'активации' : 'деактивации'}.`);
        return;
    }
    if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newMain
            ? 'активации в главном'
            : 'деактивации в главном'}.`);
        return;
    }
    axios
        .put(route('admin.actions.videos.bulkUpdateMain'), {
            ids: selectedVideos.value,
            main: newMain,
        })
        .then(() => {
            toast.success('Статус в главном массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedVideos.value]
            selectedVideos.value = []
            // и оптимистично поправим флаг в таблице
            paginatedVideos.value.forEach((a) => {
                if (updatedIds.includes(a.id)) {
                    a.main = newMain
                }
            })
        })
        .catch(() => {
            toast.error('Не удалось обновить статус в главном')
        });
};

/**
 * Выполняет массовое включение/выключение активности в правой колонке.
 */
const bulkToggleRight = (newRight) => {
    if (selectedVideos.value.length === 0) {
        toast.warning(`Выберите видео для ${newRight ? 'активации' : 'деактивации'}.`);
        return;
    }
    axios
        .put(route('admin.actions.videos.bulkUpdateRight'), {
            ids: selectedVideos.value,
            right: newRight,
        })
        .then(() => {
            toast.success('Статус в правой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedVideos.value]
            selectedVideos.value = []
            // и оптимистично поправим флаг в таблице
            paginatedVideos.value.forEach((a) => {
                if (updatedIds.includes(a.id)) {
                    a.right = newRight
                }
            })
        })
        .catch(() => {
            toast.error('Не удалось обновить статус в правой колонке')
        });
};

/**
 * Выполняет массовое удаление выбранных.
 */
const bulkDelete = () => {
    if (selectedVideos.value.length === 0) {
        toast.warning('Выберите хотя бы одно видео для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.videos.bulkDestroy'), {
        data: {ids: selectedVideos.value},
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedVideos.value = []; // Очищаем выбор
            toast.success('Массовое удаление видео успешно завершено.');
            // console.log('Массовое удаление статей успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении видео.';
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
        selectedVideos.value = paginatedVideos.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedVideos.value = [];
    } else if (action === 'activate') {
        bulkToggleActivity(true);
    } else if (action === 'deactivate') {
        bulkToggleActivity(false);
    } else if (action === 'left') {
        bulkToggleLeft(true);
    } else if (action === 'noLeft') {
        bulkToggleLeft(false);
    } else if (action === 'main') {
        bulkToggleMain(true);
    } else if (action === 'noMain') {
        bulkToggleMain(false);
    } else if (action === 'right') {
        bulkToggleRight(true);
    } else if (action === 'noRight') {
        bulkToggleRight(false);
    } else if (action === 'delete') {
        bulkDelete();
    }
    event.target.value = ''; // Сбросить выбранное значение после выполнения действия
};

</script>

<template>
    <AdminLayout :title="t('videos')">
        <template #header>
            <TitlePage>
                {{ t('videos') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.videos.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addVideo') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="videosCount" @change="handleBulkAction" />
                </div>
                <SearchInput v-if="videosCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="videosCount"> {{ videosCount }} </CountTable>
                <VideoTable
                    :videos="paginatedVideos"
                    :selected-videos="selectedVideos"
                    @toggle-left="toggleLeft"
                    @toggle-main="toggleMain"
                    @toggle-right="toggleRight"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @update-sort-order="handleSortOrderUpdate"
                    @toggle-select="toggleSelectVideo"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1"  v-if="videosCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredVideos.length"
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
            :onConfirm="deleteVideo"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
