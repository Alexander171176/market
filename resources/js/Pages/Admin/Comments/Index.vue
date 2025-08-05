<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps, ref, computed, watch} from 'vue';
import { useForm } from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';
import {useToast} from 'vue-toastification';
import {router} from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue';
import BulkActionSelect from "@/Components/Admin/Select/BulkActionSelect.vue";
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import SortSelect from '@/Components/Admin/Comment/Sort/SortSelect.vue';
import CommentTable from '@/Components/Admin/Comment/Table/CommentTable.vue';
import CommentDetailsModal from '@/Components/Admin/Comment/Modal/CommentDetailsModal.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import axios from 'axios';

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

const props = defineProps(['comments', 'commentsCount', 'adminCountComments', 'adminSortComments']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountComments); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountComments'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortComments); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortComments'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => toast.info('Сортировка успешно изменена'),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления сортировки.'),
    });
});

const form = useForm({});

// Модальное окно просмотра
const showCommentDetailsModal = ref(false);
const commentDetails = ref(null);

const viewCommentDetails = (comment) => {
    commentDetails.value = comment;
    showCommentDetailsModal.value = true;
};

const closeCommentDetailsModal = () => {
    showCommentDetailsModal.value = false;
};

// Модальное окно удаления
const showConfirmDeleteModal = ref(false);
const commentToDeleteId = ref(null);

const confirmDelete = (id) => {
    commentToDeleteId.value = id;
    showConfirmDeleteModal.value = true;
};
const closeModal = () => {
    showConfirmDeleteModal.value = false;
};

/**
 * Отправляет запрос на удаление.
 */
const deleteComment = () => {
    if (commentToDeleteId.value === null) return;

    const idToDelete = commentToDeleteId.value; // Сохраняем ID во временную переменную

    router.delete(route('admin.comments.destroy', {comment: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Комментарий "${'ID: ' + idToDelete}" удалена.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Комментарий: ${'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            commentToDeleteId.value = null;
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (comment) => {
    const newActivity = !comment.activity;

    axios.put(route('admin.actions.comments.updateActivity', { comment: comment.id }), {
        activity: newActivity,
    })
        .then((response) => {
            comment.activity = response.data.activity;
            toast.success(response.data.message);
        })
        .catch((error) => {
            toast.error('Ошибка при изменении активности комментария.');
            console.error(error);
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
const sortComments = (comments) => {
    // Сортировка по id
    if (sortParam.value === 'idAsc') {
        return comments.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return comments.slice().sort((a, b) => b.id - a.id);
    }
    // Фильтрация по активности
    if (sortParam.value === 'activity') {
        return comments.filter(comment => comment.activity);
    }
    if (sortParam.value === 'inactive') {
        return comments.filter(comment => !comment.activity);
    }
    // Фильтрация по статусу (модерация)
    if (sortParam.value === 'status') {
        return comments.filter(comment => comment.status);
    }
    if (sortParam.value === 'instatus') {
        return comments.filter(comment => !comment.status);
    }
    // Условие: сортировка по типу модели
    if (sortParam.value === 'type') {
        return comments.slice().sort((a, b) => {
            const typeA = a.commentable_type?.toLowerCase() || '';
            const typeB = b.commentable_type?.toLowerCase() || '';
            return typeA.localeCompare(typeB);
        });
    }
    // Условие: сортировка по пользователю (по имени)
    if (sortParam.value === 'user') {
        return comments.slice().sort((a, b) => {
            return a.user.name.localeCompare(b.user.name);
        });
    }
    // Если сортировка по другим полям
    return comments.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1;
        if (a[sortParam.value] > b[sortParam.value]) return 1;
        return 0;
    });
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredComments = computed(() => {
    let filtered = props.comments.data || []; // <-- исправлено

    if (searchQuery.value) {
        filtered = filtered.filter(comment =>
            comment.content.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortComments(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedComments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredComments.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredComments.value.length / itemsPerPage.value));

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedComments = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = (event) => {
    const isChecked = event.target.checked;
    selectedComments.value = isChecked ? paginatedComments.value.map(comment => comment.id) : [];
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectComment = (commentId) => {
    const index = selectedComments.value.indexOf(commentId);
    if (index > -1) {
        selectedComments.value.splice(index, 1);
    } else {
        selectedComments.value.push(commentId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedComments.value.length) {
        toast.warning('Выберите комментарии для активации/деактивации');
        return;
    }

    // Заменяем axios.put на router.put
    router.put(
        route('admin.actions.comments.bulkUpdateActivity'),
        {
            ids: selectedComments.value,
            activity: newActivity,
        },
        {
            preserveScroll: true,
            // Заставляем Inertia обновить данные с сервера, это обновит таблицу
            preserveState: false,
            onSuccess: () => {
                toast.success('Активность комментариев массово обновлена');
                // Очищаем массив выделенных элементов
                selectedComments.value = [];
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
    if (selectedComments.value.length === 0) {
        toast.warning('Выберите хотя бы один комментарий для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.comments.bulkDestroy'), {
        data: {ids: selectedComments.value},
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedComments.value = []; // Очищаем выбор
            toast.success('Массовое удаление комментариев успешно завершено.');
            // console.log('Массовое удаление комментариев успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении комментариев.';
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
        paginatedComments.value.forEach(comment => {
            if (!selectedComments.value.includes(comment.id)) {
                selectedComments.value.push(comment.id);
            }
        });
    } else if (action === 'deselectAll') {
        selectedComments.value = [];
    } else if (action === 'activate') {
        bulkToggleActivity(true);
    } else if (action === 'deactivate') {
        bulkToggleActivity(false);
    } else if (action === 'delete') {
        bulkDelete();
    }
    event.target.value = ''; // Сбросить выбранное значение после выполнения действия
};

/**
 * Отправляет запрос на одобрение комментария (модерация).
 */
const approveComment = (comment) => {
    axios.put(route('admin.actions.comments.approve', { comment: comment.id }))
        .then((response) => {
            comment.approved = response.data.approved; // обновляем локально
            toast.success(response.data.message);
        })
        .catch((error) => {
            toast.error('Ошибка при обновлении одобрения комментария.');
            console.error(error);
        });
};

</script>

<template>
    <AdminLayout :title="t('comments')">
        <template #header>
            <TitlePage>
                {{ t('comments') }}
            </TitlePage>
        </template>
        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-end sm:items-center mb-2">
                    <BulkActionSelect v-if="commentsCount" @change="handleBulkAction" />
                </div>
                <SearchInput v-if="commentsCount" v-model="searchQuery" :placeholder="t('search')"/>
                <CountTable v-if="commentsCount"> {{ commentsCount }} </CountTable>
                <CommentTable
                    :comments="paginatedComments"
                    :selected-comments="selectedComments"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @toggle-select="toggleSelectComment"
                    @toggle-all="toggleAll"
                    @view-details="viewCommentDetails"
                    @approve-comment="approveComment"
                />
                <CommentDetailsModal
                    :show="showCommentDetailsModal"
                    :comment="commentDetails"
                    @close="closeCommentDetailsModal"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1" v-if="commentsCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredComments.length"
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
            :onConfirm="deleteComment"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
