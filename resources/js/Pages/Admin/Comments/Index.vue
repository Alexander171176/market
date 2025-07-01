<script setup>
import {defineProps, ref, computed, watch} from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
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

const { t } = useI18n();
const props = defineProps(['comments', 'commentsCount', 'adminCountComments', 'adminSortComments']);
const form = useForm({});

// Используем значение из props для начального количества элементов на странице
const itemsPerPage = ref(props.adminCountComments)

// чтобы при изменении itemsPerPage автоматически обновлялся параметр в базе,
watch(itemsPerPage, (newVal) => {
    axios.put(route('settings.updateAdminCountComments'), { value: newVal.toString() })
        .then(response => {
            // console.log('Количество элементов на странице обновлено:', response.data.value)
        })
        .catch(error => {
            console.error('Ошибка обновления настройки:', error.response.data)
        })
})

// параметр сортировки по умолчанию, устанавливаем из props
const sortParam = ref(props.adminSortComments)
watch(sortParam, (newVal) => {
    axios.put(route('settings.updateAdminSortComments'), { value: newVal })
        .then(response => {
            // console.log('Сортировка обновлена:', response.data.value)
        })
        .catch(error => {
            console.error('Ошибка обновления сортировки:', error.response.data)
        })
})

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

// Удаление комментария
const deleteComment = () => {
    if (commentToDeleteId.value !== null) {
        form.delete(route('comments.destroy', commentToDeleteId.value), {
            onSuccess: () => closeModal()
        });
    }
};

// Кнопка активности
const toggleActivity = (comment) => {
    const newActivity = !comment.activity;
    axios.put(route('comments.updateActivity', comment.id), { activity: newActivity })
        .then(response => {
            comment.activity = newActivity;
            if (response.data.reload) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error(error.response?.data || error.message);
        });
};

// Пагинация
const currentPage = ref(1);

// Строка поиска
const searchQuery = ref('');

// Функция сортировки
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
    // Новое условие: сортировка по пользователю (по имени)
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

// Фильтр поиска
const filteredComments = computed(() => {
    let filtered = props.comments;

    if (searchQuery.value) {
        filtered = filtered.filter(comment =>
            comment.content.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortComments(filtered);
});

// Пагинация
const paginatedComments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredComments.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => Math.ceil(filteredComments.value.length / itemsPerPage.value));

// Выбранные комментарии для массовых действий
const selectedComments = ref([]);

// Функции для выбора и отмены выбора всех элементов select
const toggleAll = (event) => {
    const isChecked = event.target.checked;
    selectedComments.value = isChecked ? paginatedComments.value.map(comment => comment.id) : [];
};

const toggleSelectComment = (commentId) => {
    const index = selectedComments.value.indexOf(commentId);
    if (index > -1) {
        selectedComments.value.splice(index, 1);
    } else {
        selectedComments.value.push(commentId);
    }
};

// Функции для выбора и отмены выбора всех элементов checkbox
const bulkToggleActivity = (newActivity) => {
    selectedComments.value.forEach((commentId) => {
        axios.put(route('comments.updateActivity', commentId), { activity: newActivity })
            .then(response => {
                if (response.data.reload) {
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error(error.response?.data || error.message);
            });
    });
};

// Функция для массового удаления комментариев
const bulkDelete = () => {
    axios.delete(route('comments.bulkDestroy'), { data: { ids: selectedComments.value } })
        .then(response => {
            selectedComments.value = [];
            if (response.data.reload) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error(error.response.data);
        });
};

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

// Функция для обновления статуса комментария
const approveComment = (commentId) => {
    axios.put(route('comments.approve', commentId))
        .then(response => {
            // Обновляем комментарий в локальном списке
            const comment = props.comments.find(c => c.id === commentId);
            if (comment) {
                comment.status = true;
            }
            // Можно добавить уведомление об успешном обновлении
        })
        .catch(error => {
            // Обработка ошибок
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
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
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
