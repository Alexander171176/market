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
import SortSelect from '@/Components/Admin/Product/Sort/SortSelect.vue';
import ProductTable from '@/Components/Admin/Product/Table/ProductTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from '@/Components/Admin/Product/Select/BulkActionSelect.vue';
import axios from 'axios';

// --- Инициализация экземпляр i18n, toast ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(['products', 'productsCount', 'adminCountProducts', 'adminSortProducts']);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountProducts); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountProducts'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortProducts); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortProducts'), {value: newVal}, {
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
const productToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const productToDeleteTitle = ref('');

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, title) => {
    productToDeleteId.value = id;
    productToDeleteTitle.value = title;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    productToDeleteId.value = null;
    productToDeleteTitle.value = '';
};

/**
 * Отправляет запрос на удаление.
 */
const deleteProduct = () => {
    if (productToDeleteId.value === null) return;

    const idToDelete = productToDeleteId.value; // Сохраняем ID во временную переменную
    const titleToDelete = productToDeleteTitle.value; // Сохраняем title во временную переменную

    router.delete(route('admin.products.destroy', {product: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Товар "${titleToDelete || 'ID: ' + idToDelete}" удалена.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Товар: ${titleToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            productToDeleteId.value = null;
            productToDeleteTitle.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности в левой колонке.
 */
const toggleLeft = (product) => {
    const newLeft = !product.left;
    const actionText = newLeft ? 'активирована в левой колонке' : 'деактивирована в левой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.products.updateLeft', {product: product.id}),
        {left: newLeft},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // product.left = newLeft; // Уже не нужно, если preserveState: false
                toast.success(`Товар "${product.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.left || errors.general || `Ошибка изменения активности для "${product.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // product.left = !newLeft;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности в главном.
 */
const toggleMain = (product) => {
    const newMain = !product.main;
    const actionText = newMain ? 'активирована в главном' : 'деактивирована в главном';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.products.updateMain', {product: product.id}),
        {main: newMain},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // product.main = newMain; // Уже не нужно, если preserveState: false
                toast.success(`Товар "${product.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.main || errors.general || `Ошибка изменения активности для "${product.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // product.main = !newMain;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности в правой колонке.
 */
const toggleRight = (product) => {
    const newRight = !product.right;
    const actionText = newRight ? 'активирована в правой колонке' : 'деактивирована в правой колонке';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.products.updateRight', {product: product.id}),
        {right: newRight},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // product.right = newRight; // Уже не нужно, если preserveState: false
                toast.success(`Товар "${product.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.right || errors.general || `Ошибка изменения активности для "${product.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // product.right = !newRight;
            },
        }
    );
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (product) => {
    const newActivity = !product.activity;
    const actionText = newActivity ? t('activated') : t('deactivated');

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.products.updateActivity', {product: product.id}),
        {activity: newActivity},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // product.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Товар "${product.title}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${product.title}".`);
                // Можно откатить изменение на фронте, если нужно
                // product.activity = !newActivity;
            },
        }
    );
};

/**
 * Отправляет запрос для клонирования.
 */
const cloneProduct = (productObject) => { // Переименовываем параметр для ясности
    // Извлекаем ID из объекта
    const productId = productObject?.id; // Используем опциональную цепочку на случай undefined/null
    const productTitle = productObject?.title || `ID: ${productId}`; // Пытаемся получить title или используем ID

    // Проверяем, что ID получен
    if (typeof productId === 'undefined' || productId === null) {
        console.error("Не удалось получить ID статьи для клонирования", productObject);
        toast.error("Не удалось определить статью для клонирования.");
        return;
    }

    // Используем confirm с извлеченным ID (или title)
    if (!confirm(`Вы уверены, что хотите клонировать статью "${productTitle}"?`)) {
        return;
    }

    // В route() передаем именно productId
    router.post(route('admin.actions.products.clone', {product: productId}), {}, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            // Используем productTitle или productId в сообщении
            toast.success(`Товар "${productTitle}" успешно клонирована.`);
        },
        onError: (errors) => {
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || `Ошибка клонирования статьи "${productTitle}".`;
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
const sortProducts = (products) => {
    // Добавляем сортировку по id в двух направлениях:
    if (sortParam.value === 'idAsc') {
        return products.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return products.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'published_at') {
        return products.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'activity') {
        return products.filter(product => product.activity);
    }
    if (sortParam.value === 'inactive') {
        return products.filter(product => !product.activity);
    }
    if (sortParam.value === 'left') {
        return products.filter(product => product.left);
    }
    if (sortParam.value === 'noLeft') {
        return products.filter(product => !product.left);
    }
    if (sortParam.value === 'main') {
        return products.filter(product => product.main);
    }
    if (sortParam.value === 'noMain') {
        return products.filter(product => !product.main);
    }
    if (sortParam.value === 'right') {
        return products.filter(product => product.right);
    }
    if (sortParam.value === 'noRight') {
        return products.filter(product => !product.right);
    }
    if (sortParam.value === 'locale') {
        // Сортировка по locale в обратном порядке
        return products.slice().sort((a, b) => {
            if (a.locale < b.locale) return 1;
            if (a.locale > b.locale) return -1;
            return 0;
        });
    }
    // Для просмотров и лайков сортировка по убыванию:
    if (sortParam.value === 'views' || sortParam.value === 'likes') {
        return products.slice().sort((a, b) => b[sortParam.value] - a[sortParam.value]);
    }
    // Для остальных полей — стандартное сравнение:
    return products.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    })
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredProducts = computed(() => {
    let filtered = props.products;

    if (searchQuery.value) {
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortProducts(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredProducts.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.products.updateSortBulk'),
        {products: sortData}, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок товаров успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.products || "Не удалось обновить порядок товаров.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['products'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedProducts = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedProducts.value = [...new Set([...selectedProducts.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedProducts.value = selectedProducts.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectProduct = (productId) => {
    const index = selectedProducts.value.indexOf(productId);
    if (index > -1) {
        selectedProducts.value.splice(index, 1);
    } else {
        selectedProducts.value.push(productId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedProducts.value.length) {
        toast.warning('Выберите товары для активации/деактивации');
        return;
    }

    // Заменяем axios.put на router.put
    router.put(
        route('admin.actions.products.bulkUpdateActivity'),
        {
            ids: selectedProducts.value,
            activity: newActivity,
        },
        {
            preserveScroll: true,
            // Заставляем Inertia обновить props с сервера, это перезагрузит таблицу
            preserveState: false,
            onSuccess: () => {
                toast.success('Активность товаров массово обновлена');
                // Очищаем массив выделенных элементов
                selectedProducts.value = [];
            },
            onError: (errors) => {
                const errorMessage = errors[Object.keys(errors)[0]] || 'Не удалось обновить активность';
                toast.error(errorMessage);
            }
        }
    );
};

/**
 * Выполняет массовое включение/выключение активности в левой колонке.
 */
const bulkToggleLeft = (newLeft) => {
    if (selectedProducts.value.length === 0) {
        toast.warning(`Выберите товары для ${newLeft
            ? 'активации в левой колонки'
            : 'деактивации в левой колонки'}.`);
        return;
    }
    axios
        .put(route('admin.actions.products.bulkUpdateLeft'), {
            ids: selectedProducts.value,
            left: newLeft,
        })
        .then(() => {
            toast.success('Статус в левой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedProducts.value]
            selectedProducts.value = []
            // и оптимистично поправим флаг в таблице
            paginatedProducts.value.forEach((a) => {
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
    if (selectedProducts.value.length === 0) {
        toast.warning(`Выберите товары для ${newMain ? 'активации' : 'деактивации'}.`);
        return;
    }
    if (selectedProducts.value.length === 0) {
        toast.warning(`Выберите товары для ${newMain
            ? 'активации в главном'
            : 'деактивации в главном'}.`);
        return;
    }
    axios
        .put(route('admin.actions.products.bulkUpdateMain'), {
            ids: selectedProducts.value,
            main: newMain,
        })
        .then(() => {
            toast.success('Статус в главном массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedProducts.value]
            selectedProducts.value = []
            // и оптимистично поправим флаг в таблице
            paginatedProducts.value.forEach((a) => {
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
    if (selectedProducts.value.length === 0) {
        toast.warning(`Выберите товары для ${newRight ? 'активации' : 'деактивации'}.`);
        return;
    }
    axios
        .put(route('admin.actions.products.bulkUpdateRight'), {
            ids: selectedProducts.value,
            right: newRight,
        })
        .then(() => {
            toast.success('Статус в правой колонки массово обновлен')
            // сразу очистим выбор
            const updatedIds = [...selectedProducts.value]
            selectedProducts.value = []
            // и оптимистично поправим флаг в таблице
            paginatedProducts.value.forEach((a) => {
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
    if (selectedProducts.value.length === 0) {
        toast.warning('Выберите хотя бы один товар для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.products.bulkDestroy'), {
        data: {ids: selectedProducts.value},
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedProducts.value = []; // Очищаем выбор
            toast.success('Массовое удаление товаров успешно завершено.');
            // console.log('Массовое удаление статей успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении товаров.';
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
        selectedProducts.value = paginatedProducts.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedProducts.value = [];
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
    <AdminLayout :title="t('products')">
        <template #header>
            <TitlePage>
                {{ t('products') }}
            </TitlePage>
        </template>
        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.products.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addProduct') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="productsCount" @change="handleBulkAction"/>
                </div>
                <SearchInput v-if="productsCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="productsCount"> {{ productsCount }}</CountTable>
                <ProductTable
                    :products="paginatedProducts"
                    :selected-products="selectedProducts"
                    @toggle-left="toggleLeft"
                    @toggle-main="toggleMain"
                    @toggle-right="toggleRight"
                    @toggle-activity="toggleActivity"
                    @delete="confirmDelete"
                    @clone="cloneProduct"
                    @update-sort-order="handleSortOrderUpdate"
                    @toggle-select="toggleSelectProduct"
                    @toggle-all="toggleAll"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1"
                     v-if="productsCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage"
                                        @update:itemsPerPage="itemsPerPage = $event"/>
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredProducts.length"
                                @update:currentPage="currentPage = $event"/>
                    <SortSelect :sortParam="sortParam" @update:sortParam="val => sortParam = val"/>
                </div>
            </div>
        </div>

        <DangerModal
            :show="showConfirmDeleteModal"
            @close="closeModal"
            :onCancel="closeModal"
            :onConfirm="deleteProduct"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
