<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { router } from '@inertiajs/vue3'

import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue'
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue'
import Pagination from '@/Components/Admin/Pagination/Pagination.vue'
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue'
import SearchInput from '@/Components/Admin/Search/SearchInput.vue'
import SortSelect from '@/Components/Admin/Article/Sort/SortSelect.vue'
import ArticleTable from '@/Components/Admin/Article/Table/ArticleTable.vue'
import CountTable from '@/Components/Admin/Count/CountTable.vue'
import BulkActionSelect from '@/Components/Admin/Article/Select/BulkActionSelect.vue'

const { t } = useI18n()
const toast = useToast()

// теперь articles — это пагинированный объект (data/meta/links)
const props = defineProps([
    'articles',              // paginator
    'articlesCount',         // total (можно и из meta.total брать)
    'adminCountArticles',
    'adminSortArticles'
])

// ——— серверное перелистывание
const currentPage = ref(props.articles?.meta?.current_page || 1)
const goToPage = (page) => {
    if (!page || page === currentPage.value) return
    router.get(route('admin.articles.index'), { page }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            currentPage.value = page
        }
    })
}

// ——— размер страницы из настроек (меняем setting-роут)
const itemsPerPage = ref(props.adminCountArticles)
watch(itemsPerPage, (val) => {
    router.put(route('admin.settings.updateAdminCountArticles'), { value: val }, {
        preserveScroll: true,
        preserveState: false, // перезагрузим список с сервера
        onSuccess: () => toast.info(`Показ ${val} элементов на странице.`),
        onError: (e) => toast.error(e.value || 'Ошибка обновления кол-ва элементов.')
    })
})

// ——— сортировка (тоже через setting-роут, сервер сам отсортирует)
const sortParam = ref(props.adminSortArticles)
watch(sortParam, (val) => {
    router.put(route('admin.settings.updateAdminSortArticles'), { value: val }, {
        preserveScroll: true,
        preserveState: false, // получить новые данные
        onSuccess: () => toast.info('Сортировка успешно изменена'),
        onError: (e) => toast.error(e.value || 'Ошибка обновления сортировки.')
    })
})

// ——— удаление / массовые действия остались как были
const showConfirmDeleteModal = ref(false)
const articleToDeleteId = ref(null)
const articleToDeleteTitle = ref('')

const confirmDelete = (id, title) => {
    articleToDeleteId.value = id
    articleToDeleteTitle.value = title
    showConfirmDeleteModal.value = true
}
const closeModal = () => {
    showConfirmDeleteModal.value = false
    articleToDeleteId.value = null
    articleToDeleteTitle.value = ''
}
const deleteArticle = () => {
    if (articleToDeleteId.value == null) return
    const id = articleToDeleteId.value
    const title = articleToDeleteTitle.value
    router.delete(route('admin.articles.destroy', { article: id }), {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
            closeModal();
            toast.success(`Статья "${title || 'ID: ' + id}" удалена.`)
        },
        onError: (errors) => {
            closeModal()
            const msg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.'
            toast.error(`${msg} (Статья: ${title || 'ID: ' + id})`)
        }
    })
}

// Тогглы / клон / bulk — без изменений (они и так дергают сервер и перезагружают страницу)
const toggleActivity = (article) => {
    const activity = !article.activity
    router.put(route('admin.actions.articles.updateActivity', { article: article.id }), { activity }, {
        preserveScroll: true, preserveState: true,
        onSuccess: () => toast.success(`Статья "${article.title}" ${activity ? t('activated') : t('deactivated')}.`),
        onError: (e) => toast.error(e.activity || e.general || `Ошибка изменения активности для "${article.title}".`)
    })
}
const toggleLeft = (a) => router.put(route('admin.actions.articles.updateLeft', { article: a.id }), { left: !a.left }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => toast.success(`Статья "${a.title}" ${!a.left ? 'активирована в левой колонке' : 'деактивирована в левой колонке'}.`)
})
const toggleMain = (a) => router.put(route('admin.actions.articles.updateMain', { article: a.id }), { main: !a.main }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => toast.success(`Статья "${a.title}" ${!a.main ? 'активирована в главном' : 'деактивирована в главном'}.`)
})
const toggleRight = (a) => router.put(route('admin.actions.articles.updateRight', { article: a.id }), { right: !a.right }, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => toast.success(`Статья "${a.title}" ${!a.right ? 'активирована в правой колонке' : 'деактивирована в правой колонке'}.`)
})

const cloneArticle = (obj) => {
    const id = obj?.id
    const title = obj?.title || `ID: ${id}`
    if (!id) return toast.error('Не удалось определить статью для клонирования.')
    if (!confirm(`Вы уверены, что хотите клонировать статью "${title}"?`)) return
    router.post(route('admin.actions.articles.clone', { article: id }), {}, {
        preserveScroll: true, preserveState: false,
        onSuccess: () => toast.success(`Статья "${title}" успешно клонирована.`),
    })
}

const selectedArticles = ref([])
const toggleAll = ({ ids, checked }) => {
    selectedArticles.value = checked
        ? [...new Set([...selectedArticles.value, ...ids])]
        : selectedArticles.value.filter(id => !ids.includes(id))
}
const toggleSelectArticle = (id) => {
    const i = selectedArticles.value.indexOf(id)
    i > -1 ? selectedArticles.value.splice(i, 1) : selectedArticles.value.push(id)
}
const bulkDelete = () => {
    if (!selectedArticles.value.length) return toast.warning('Выберите хотя бы одну статью для удаления.')
    if (!confirm('Вы уверены, что хотите их удалить ?')) return
    router.delete(route('admin.actions.articles.bulkDestroy'), {
        data: { ids: selectedArticles.value },
        preserveScroll: true, preserveState: false,
        onSuccess: () => {
            selectedArticles.value = [];
            toast.success('Массовое удаление статей успешно завершено.')
        }
    })
}
const bulkToggleActivity = (activity) => {
    if (!selectedArticles.value.length) return toast.warning('Выберите статьи для активации/деактивации')
    router.put(route('admin.actions.articles.bulkUpdateActivity'), { ids: selectedArticles.value, activity }, {
        preserveScroll: true, preserveState: false,
        onSuccess: () => {
            selectedArticles.value = [];
            toast.success('Активность массово обновлена')
        }
    })
}
const handleBulkAction = (e) => {
    const a = e.target.value
    if (a === 'selectAll') selectedArticles.value = (props.articles?.data || []).map(r => r.id)
    else if (a === 'deselectAll') selectedArticles.value = []
    else if (a === 'activate') bulkToggleActivity(true)
    else if (a === 'deactivate') bulkToggleActivity(false)
    else if (a === 'delete') bulkDelete()
    e.target.value = ''
}

// поиск пока оставил как локальный (по текущей странице).
// Если решите делать серверный — отправляйте query ?search=... и фильтруйте на сервере.
const searchQuery = ref('')
const pageData = () => (props.articles?.data || [])
const visibleArticles = () =>
    searchQuery.value
        ? pageData().filter(a => (a.title || '').toLowerCase().includes(searchQuery.value.toLowerCase()))
        : pageData()
</script>

<template>
    <AdminLayout :title="t('posts')">
        <template #header>
            <TitlePage>{{ t('posts') }}</TitlePage>
        </template>

        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                  overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                  bg-opacity-95 dark:bg-opacity-95">

                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.articles.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                            </svg>
                        </template>
                        {{ t('addPost') }}
                    </DefaultButton>

                    <BulkActionSelect v-if="props.articles?.meta?.total" @change="handleBulkAction" />
                </div>

                <SearchInput v-if="props.articles?.meta?.total" v-model="searchQuery"
                             :placeholder="t('searchByName')" />
                <CountTable v-if="props.articles?.meta?.total">{{ props.articles.meta.total }}</CountTable>

                <ArticleTable
                    :articles="visibleArticles()"
                    :selected-articles="selectedArticles"
                    @toggle-left="toggleLeft"
                    @toggle-main="toggleMain"
                    @toggle-right="toggleRight"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @clone="cloneArticle"
                    @update-sort-order="() => {}"
                    @toggle-select="toggleSelectArticle"
                    @toggle-all="toggleAll"
                />

                <div class="flex justify-between items-center flex-col md:flex-row my-1"
                     v-if="props.articles?.meta?.total">
                    <!-- кол-во на странице — сохраняем в настройку -->
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />

                    <!-- серверная пагинация -->
                    <Pagination
                        :current-page="props.articles.meta.current_page"
                        :items-per-page="props.articles.meta.per_page"
                        :total-items="props.articles.meta.total"
                        @update:currentPage="goToPage"
                    />

                    <!-- сортировка — уходит в setting-роут, сервер сам отсортирует -->
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val" />
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
