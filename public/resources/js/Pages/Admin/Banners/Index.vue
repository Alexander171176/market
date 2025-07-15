<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps, ref, computed, watch} from 'vue';
import {useToast} from 'vue-toastification';
import {useI18n} from 'vue-i18n';
import {router, useForm} from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from "@/Components/Admin/Buttons/DefaultButton.vue";
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import ItemsPerPageSelect from '@/Components/Admin/Select/ItemsPerPageSelect.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import SortSelect from '@/Components/Admin/Banner/Sort/SortSelect.vue';
import BannerTable from '@/Components/Admin/Banner/Table/BannerTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from '@/Components/Admin/Banner/Select/BulkActionSelect.vue';
import axios from 'axios';

// --- Инициализация экземпляр i18n, toast ---
const toast = useToast();
const {t} = useI18n();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['banners', 'bannersCount', 'adminCountBanners', 'adminSortBanners']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountBanners); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountBanners'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortBanners); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortBanners'), {value: newVal}, {
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
const bannerToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const bannerToDeleteTitle = ref(''); // Сохраняем название для сообщения

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, title) => {
    bannerToDeleteId.value = id;
    bannerToDeleteTitle.value = title;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    bannerToDeleteId.value = null;
    bannerToDeleteTitle.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteBanner = () => {
    if (bannerToDeleteId.value === null) return;

    const idToDelete = bannerToDeleteId.value; // Сохраняем ID во временную переменную
    const titleToDelete = bannerToDeleteTitle.value; // Сохраняем title во временную переменную

    router.delete(route('admin.banners.destroy', {banner: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Баннер "${titleToDelete || 'ID: ' + idToDelete}" удален.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Баннер: ${titleToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            bannerToDeleteId.value = null;
            bannerToDeleteTitle.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности в левой колонке.
 */
const toggleLeft = (banner) => {
    const newLeft = !banner.left;
    const actionText = newLeft ? 'активирован в левой колонке' : 'деактивирован в левой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.banners.updateLeft', {banner: banner.id}),
        {left: newLeft},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // banner.left = newLeft; // Уже не нужно, если preserveState: false
                toast.success(`Баннер "${banner.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.left || errors.general || `Ошибка изменения активности для "${banner.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // banner.left = !newLeft;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности в правой колонке.
 */
const toggleRight = (banner) => {
    const newRight = !banner.right;
    const actionText = newRight ? 'активирован в правой колонке' : 'деактивирован в правой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.banners.updateRight', {banner: banner.id}),
        {right: newRight},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // banner.right = newLeft; // Уже не нужно, если preserveState: false
                toast.success(`Баннер "${banner.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.right || errors.general || `Ошибка изменения активности для "${banner.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // banner.right = !newRight;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (banner) => {
    const newActivity = !banner.activity;
    const actionText = newActivity ? 'активирован' : 'деактивирован';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.banners.updateActivity', {banner: banner.id}),
        {activity: newActivity},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // banner.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Баннер "${banner.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${banner.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // banner.activity = !newActivity;
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
const sortBanners = (banners) => {
    // Добавляем сортировку по id в двух направлениях:
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return banners.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return banners.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return banners.filter(banner => banner.activity)
    }
    if (sortParam.value === 'inactive') {
        return banners.filter(banner => !banner.activity)
    }
    if (sortParam.value === 'left') {
        return banners.filter(banner => banner.left);
    }
    if (sortParam.value === 'noLeft') {
        return banners.filter(banner => !banner.left);
    }
    if (sortParam.value === 'right') {
        return banners.filter(banner => banner.right);
    }
    if (sortParam.value === 'noRight') {
        return banners.filter(banner => !banner.right);
    }
    return banners.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    })
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredBanners = computed(() => {
    let filtered = props.banners;

    if (searchQuery.value) {
        filtered = filtered.filter(banner =>
            banner.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortBanners(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedBanners = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredBanners.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredBanners.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.banners.updateSortBulk'),
        {banners: sortData}, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок баннеров успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.banners || "Не удалось обновить порядок баннеров.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['banners'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedBanners = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedBanners.value = [...new Set([...selectedBanners.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedBanners.value = selectedBanners.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectBanner = (bannerId) => {
    const index = selectedBanners.value.indexOf(bannerId);
    if (index > -1) {
        selectedBanners.value.splice(index, 1);
    } else {
        selectedBanners.value.push(bannerId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedBanners.value.length) {
        toast.warning('Выберите баннер для активации/деактивации баннеров');
        return;
    }
    axios
        .put(route('admin.actions.banners.bulkUpdateActivity'), {
            ids: selectedBanners.value,
            activity: newActivity,
        })
        .then(() => {
            toast.success('Активность массово обновлена')
            // сразу очистим выбор
            const updatedIds = [...selectedBanners.value]
            selectedBanners.value = []
            // и оптимистично поправим флаг в таблице
            paginatedBanners.value.forEach((a) => {
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
    if (selectedBanners.value.length === 0) {
        toast.warning(`Выберите баннера для ${newLeft
            ? 'активации в левой колонки'
            : 'деактивации в левой колонки'}.`);
        return;
    }
    axios
        .put(route('admin.actions.banners.bulkUpdateLeft'), {
            ids: selectedBanners.value,
            left: newLeft,
        })
        .then(() => {
            toast.success('Статус в левой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedBanners.value]
            selectedBanners.value = []
            // и оптимистично поправим флаг в таблице
            paginatedBanners.value.forEach((a) => {
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
 * Выполняет массовое включение/выключение активности в правой колонке.
 */
const bulkToggleRight = (newRight) => {
    if (selectedBanners.value.length === 0) {
        toast.warning(`Выберите баннера для ${newRight ? 'активации' : 'деактивации'}.`);
        return;
    }
    axios
        .put(route('admin.actions.banners.bulkUpdateRight'), {
            ids: selectedBanners.value,
            right: newRight,
        })
        .then(() => {
            toast.success('Статус в правой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedBanners.value]
            selectedBanners.value = []
            // и оптимистично поправим флаг в таблице
            paginatedBanners.value.forEach((a) => {
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
    if (selectedBanners.value.length === 0) {
        toast.warning('Выберите хотя бы один баннер для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.banners.bulkDestroy'), {
        data: {ids: selectedBanners.value},
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedBanners.value = []; // Очищаем выбор
            toast.success('Массовое удаление баннеров успешно завершено.');
            // console.log('Массовое удаление баннеров успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении баннеров.';
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
        selectedBanners.value = paginatedBanners.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedBanners.value = [];
    } else if (action === 'activate') {
        bulkToggleActivity(true);
    } else if (action === 'deactivate') {
        bulkToggleActivity(false);
    } else if (action === 'left') {
        bulkToggleLeft(true);
    } else if (action === 'noLeft') {
        bulkToggleLeft(false);
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
    <AdminLayout :title="t('banners')">
        <template #header>
            <TitlePage>
                {{ t('banners') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.banners.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addBanner') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="bannersCount" @change="handleBulkAction" />
                </div>
                <SearchInput v-if="bannersCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="bannersCount"> {{ bannersCount }}</CountTable>
                <BannerTable
                    :banners="paginatedBanners"
                    :selected-banners="selectedBanners"
                    @toggle-left="toggleLeft"
                    @toggle-right="toggleRight"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @update-sort-order="handleSortOrderUpdate"
                    @toggle-select="toggleSelectBanner"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1" v-if="bannersCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredBanners.length"
                                @update:currentPage="currentPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val"/>
                </div>
            </div>
        </div>

        <DangerModal
            :show="showConfirmDeleteModal"
            @close="closeModal"
            :onCancel="closeModal"
            :onConfirm="deleteBanner"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
