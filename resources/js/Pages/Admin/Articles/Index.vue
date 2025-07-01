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
import SortSelect from '@/Components/Admin/Article/Sort/SortSelect.vue';
import ArticleTable from '@/Components/Admin/Article/Table/ArticleTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from '@/Components/Admin/Article/Select/BulkActionSelect.vue';
import axios from 'axios';

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['articles', 'articlesCount', 'adminCountArticles', 'adminSortArticles']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountArticles); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountArticles'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortArticles); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortArticles'), {value: newVal}, {
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
const articleToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const articleToDeleteTitle = ref('');

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, title) => {
    articleToDeleteId.value = id;
    articleToDeleteTitle.value = title;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    articleToDeleteId.value = null;
    articleToDeleteTitle.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteArticle = () => {
    if (articleToDeleteId.value === null) return;

    const idToDelete = articleToDeleteId.value; // Сохраняем ID во временную переменную
    const titleToDelete = articleToDeleteTitle.value; // Сохраняем title во временную переменную

    router.delete(route('admin.articles.destroy', {article: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Статья "${titleToDelete || 'ID: ' + idToDelete}" удалена.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Статья: ${titleToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            articleToDeleteId.value = null;
            articleToDeleteTitle.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности в левой колонке.
 */
const toggleLeft = (article) => {
    const newLeft = !article.left;
    const actionText = newLeft ? 'активирована в левой колонке' : 'деактивирована в левой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.articles.updateLeft', {article: article.id}),
        {left: newLeft},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // article.left = newLeft; // Уже не нужно, если preserveState: false
                toast.success(`Статья "${article.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.left || errors.general || `Ошибка изменения активности для "${article.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // article.left = !newLeft;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности в главном.
 */
const toggleMain = (article) => {
    const newMain = !article.main;
    const actionText = newMain ? 'активирована в главном' : 'деактивирована в главном';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.articles.updateMain', {article: article.id}),
        {main: newMain},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // article.main = newMain; // Уже не нужно, если preserveState: false
                toast.success(`Статья "${article.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.main || errors.general || `Ошибка изменения активности для "${article.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // article.main = !newMain;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности в правой колонке.
 */
const toggleRight = (article) => {
    const newRight = !article.right;
    const actionText = newRight ? 'активирована в правой колонке' : 'деактивирована в правой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.articles.updateRight', {article: article.id}),
        {right: newRight},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // article.right = newRight; // Уже не нужно, если preserveState: false
                toast.success(`Статья "${article.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.right || errors.general || `Ошибка изменения активности для "${article.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // article.right = !newRight;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (article) => {
    const newActivity = !article.activity;
    const actionText = newActivity ? t('activated') : t('deactivated');

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.articles.updateActivity', {article: article.id}),
        {activity: newActivity},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // article.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Статья "${article.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${article.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // article.activity = !newActivity;
            },
        }
    );
};

/**
 * Отправляет запрос для клонирования.
 */
const cloneArticle = (articleObject) => { // Переименовываем параметр для ясности
    // Извлекаем ID из объекта
    const articleId = articleObject?.id; // Используем опциональную цепочку на случай undefined/null
    const articleTitle = articleObject?.title || `ID: ${articleId}`; // Пытаемся получить title или используем ID

    // Проверяем, что ID получен
    if (typeof articleId === 'undefined' || articleId === null) {
        console.error("Не удалось получить ID статьи для клонирования", articleObject);
        toast.error("Не удалось определить статью для клонирования.");
        return;
    }

    // Используем confirm с извлеченным ID (или title)
    if (!confirm(`Вы уверены, что хотите клонировать статью "${articleTitle}"?`)) {
        return;
    }

    // В route() передаем именно articleId
    router.post(route('admin.actions.articles.clone', {article: articleId}), {}, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            // Используем articleTitle или articleId в сообщении
            toast.success(`Статья "${articleTitle}" успешно клонирована.`);
        },
        onError: (errors) => {
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || `Ошибка клонирования статьи "${articleTitle}".`;
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
const sortArticles = (articles) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return articles.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return articles.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'published_at') {
        return articles.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'activity') {
        return articles.filter(article => article.activity);
    }
    if (sortParam.value === 'inactive') {
        return articles.filter(article => !article.activity);
    }
    if (sortParam.value === 'left') {
        return articles.filter(article => article.left);
    }
    if (sortParam.value === 'noLeft') {
        return articles.filter(article => !article.left);
    }
    if (sortParam.value === 'main') {
        return articles.filter(article => article.main);
    }
    if (sortParam.value === 'noMain') {
        return articles.filter(article => !article.main);
    }
    if (sortParam.value === 'right') {
        return articles.filter(article => article.right);
    }
    if (sortParam.value === 'noRight') {
        return articles.filter(article => !article.right);
    }
    if (sortParam.value === 'locale') {
        // Сортировка по locale в обратном порядке
        return articles.slice().sort((a, b) => {
            if (a.locale < b.locale) return 1;
            if (a.locale > b.locale) return -1;
            return 0;
        });
    }
    // Для просмотров и лайков сортировка по убыванию:
    if (sortParam.value === 'views' || sortParam.value === 'likes') {
        return articles.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
    }
    // Для остальных полей — стандартное сравнение:
    return articles.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    })
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredArticles = computed(() => {
    let filtered = props.articles;

    if (searchQuery.value) {
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortArticles(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredArticles.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredArticles.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.articles.updateSortBulk'),
        {articles: sortData}, // Отправляем массив объектов
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
                toast.error(errors.general || errors.articles || "Не удалось обновить порядок статей.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['articles'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedArticles = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedArticles.value = [...new Set([...selectedArticles.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedArticles.value = selectedArticles.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectArticle = (articleId) => {
    const index = selectedArticles.value.indexOf(articleId);
    if (index > -1) {
        selectedArticles.value.splice(index, 1);
    } else {
        selectedArticles.value.push(articleId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedArticles.value.length) {
        toast.warning('Выберите статьи для активации/деактивации статьи');
        return;
    }
    axios
        .put(route('admin.actions.articles.bulkUpdateActivity'), {
            ids: selectedArticles.value,
            activity: newActivity,
        })
        .then(() => {
            toast.success('Активность массово обновлена')
            // сразу очистим выбор
            const updatedIds = [...selectedArticles.value]
            selectedArticles.value = []
            // и оптимистично поправим флаг в таблице
            paginatedArticles.value.forEach((a) => {
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
    if (selectedArticles.value.length === 0) {
        toast.warning(`Выберите статьи для ${newLeft
            ? 'активации в левой колонки'
            : 'деактивации в левой колонки'}.`);
        return;
    }
    axios
        .put(route('admin.actions.articles.bulkUpdateLeft'), {
            ids: selectedArticles.value,
            left: newLeft,
        })
        .then(() => {
            toast.success('Статус в левой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedArticles.value]
            selectedArticles.value = []
            // и оптимистично поправим флаг в таблице
            paginatedArticles.value.forEach((a) => {
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
    if (selectedArticles.value.length === 0) {
        toast.warning(`Выберите статьи для ${newMain ? 'активации' : 'деактивации'}.`);
        return;
    }
    if (selectedArticles.value.length === 0) {
        toast.warning(`Выберите статьи для ${newMain
            ? 'активации в главном'
            : 'деактивации в главном'}.`);
        return;
    }
    axios
        .put(route('admin.actions.articles.bulkUpdateMain'), {
            ids: selectedArticles.value,
            main: newMain,
        })
        .then(() => {
            toast.success('Статус в главном массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedArticles.value]
            selectedArticles.value = []
            // и оптимистично поправим флаг в таблице
            paginatedArticles.value.forEach((a) => {
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
    if (selectedArticles.value.length === 0) {
        toast.warning(`Выберите статьи для ${newRight ? 'активации' : 'деактивации'}.`);
        return;
    }
    axios
        .put(route('admin.actions.articles.bulkUpdateRight'), {
            ids: selectedArticles.value,
            right: newRight,
        })
        .then(() => {
            toast.success('Статус в правой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedArticles.value]
            selectedArticles.value = []
            // и оптимистично поправим флаг в таблице
            paginatedArticles.value.forEach((a) => {
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
    if (selectedArticles.value.length === 0) {
        toast.warning('Выберите хотя бы одну статью для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.articles.bulkDestroy'), {
        data: {ids: selectedArticles.value},
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedArticles.value = []; // Очищаем выбор
            toast.success('Массовое удаление статей успешно завершено.');
            // console.log('Массовое удаление статей успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении статей.';
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
        selectedArticles.value = paginatedArticles.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedArticles.value = [];
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
    <AdminLayout :title="t('posts')">
        <template #header>
            <TitlePage>
                {{ t('posts') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.articles.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addPost') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="articlesCount" @change="handleBulkAction"/>
                </div>
                <SearchInput v-if="articlesCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="articlesCount"> {{ articlesCount }}</CountTable>
                <ArticleTable
                    :articles="paginatedArticles"
                    :selected-articles="selectedArticles"
                    @toggle-left="toggleLeft"
                    @toggle-main="toggleMain"
                    @toggle-right="toggleRight"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @clone="cloneArticle"
                    @update-sort-order="handleSortOrderUpdate"
                    @toggle-select="toggleSelectArticle"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1" v-if="articlesCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event"/>
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredArticles.length"
                                @update:currentPage="currentPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val"/>
                </div>
            </div>
        </div>

        <DangerModal
            :show="showConfirmDeleteModal"
            @close="closeModal"
            :onCancel="closeModal"
            :onConfirm="deleteArticle"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
