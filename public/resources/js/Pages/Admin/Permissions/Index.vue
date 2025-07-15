<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps, ref, computed, watch} from 'vue';
import {useToast} from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import {router} from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from "@/Components/Admin/Buttons/DefaultButton.vue";
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import PermissionTable from '@/Components/Admin/Permission/Table/PermissionTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import ItemsPerPageSelect from "@/Components/Admin/Select/ItemsPerPageSelect.vue";
import SortSelect from "@/Components/Admin/Permission/Sort/SortSelect.vue";

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps([
    'permissions',
    'permissionsCount',
    'adminCountPermissions',
    'adminSortPermissions'
]);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountPermissions); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountPermissions'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortPermissions); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortPermissions'), {value: newVal}, {
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
const permissionToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const permissionToDeleteName = ref('');

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, name) => {
    permissionToDeleteId.value = id;
    permissionToDeleteName.value = name;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    permissionToDeleteId.value = null;
    permissionToDeleteName.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deletePermission = () => {
    if (permissionToDeleteId.value === null) return;

    const idToDelete = permissionToDeleteId.value; // Сохраняем ID во временную переменную
    const nameToDelete = permissionToDeleteName.value; // Сохраняем name во временную переменную

    router.delete(route('admin.permissions.destroy', {permission: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Разрешение "${nameToDelete || 'ID: ' + idToDelete}" удалено.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Разрешение: ${nameToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            permissionToDeleteId.value = null;
            permissionToDeleteName.value = '';
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
const sortPermissions = (permissions) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return permissions.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return permissions.slice().sort((a, b) => b.id - a.id);
    }
    // Для остальных полей — стандартное сравнение:
    return permissions.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    });
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredPermissions = computed(() => {
    let filtered = props.permissions;

    if (searchQuery.value) {
        filtered = filtered.filter(permission =>
            permission.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortPermissions(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedPermissions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredPermissions.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredPermissions.value.length / itemsPerPage.value));

</script>

<template>
    <AdminLayout :title="t('permissions')">
        <template #header>
            <TitlePage>
                {{ t('permissions') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.permissions.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addPermission') }}
                    </DefaultButton>
                </div>
                <SearchInput v-if="permissionsCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="permissionsCount"> {{ permissionsCount }} </CountTable>
                <PermissionTable
                    :permissions="paginatedPermissions"
                    @delete="confirmDelete"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1"  v-if="permissionsCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredPermissions.length"
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
            :onConfirm="deletePermission"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
