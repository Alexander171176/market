<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps, ref, computed, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import {useToast} from 'vue-toastification';
import {router} from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from "@/Components/Admin/Buttons/DefaultButton.vue";
import DangerModal from '@/Components/Admin/Modal/DangerModal.vue';
import Pagination from '@/Components/Admin/Pagination/Pagination.vue';
import SearchInput from '@/Components/Admin/Search/SearchInput.vue';
import CurrencyTable from '@/Components/Admin/Currency/Table/CurrencyTable.vue';
import CountTable from '@/Components/Admin/Count/CountTable.vue';
import BulkActionSelect from "@/Components/Admin/Currency/Select/BulkActionSelect.vue";
import ItemsPerPageSelect from "@/Components/Admin/Select/ItemsPerPageSelect.vue";
import SortSelect from "@/Components/Admin/Currency/Sort/SortSelect.vue";
import RefreshRatesButton from '@/Components/Admin/Currency/Buttons/RefreshRatesButton.vue'

// --- Инициализация экземпляр i18n, toast ---
const { t } = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps(
    ['currencies', 'currenciesCount', 'adminCountCurrencies', 'adminSortCurrencies']
);

/**
 * Реактивная переменная для хранения текущего количества элементов на странице.
 */
const itemsPerPage = ref(props.adminCountCurrencies); // Используем значение из props

/**
 * Наблюдатель за изменением количества элементов на странице.
 */
watch(itemsPerPage, (newVal) => {
    router.put(route('admin.settings.updateAdminCountCurrencies'), {value: newVal}, {
        preserveScroll: true,
        preserveState: true, // Не перезагружаем все props
        onSuccess: () => toast.info(`Показ ${newVal} элементов на странице.`),
        onError: (errors) => toast.error(errors.value || 'Ошибка обновления кол-ва элементов.'),
    });
});

/**
 * Реактивная переменная для хранения текущего параметра сортировки.
 */
const sortParam = ref(props.adminSortCurrencies); // Используем значение из props

/**
 * Наблюдатель за изменением параметра сортировки.
 */
watch(sortParam, (newVal) => {
    router.put(route('admin.settings.updateAdminSortCurrencies'), {value: newVal}, {
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
const currencyToDeleteId = ref(null);

/**
 * Название для отображения в модальном окне.
 */
const currencyToDeleteName = ref(''); // Сохраняем название для сообщения

/**
 * Открывает модальное окно подтверждения удаления с входными переменными.
 */
const confirmDelete = (id, name) => {
    currencyToDeleteId.value = id;
    currencyToDeleteName.value = name;
    showConfirmDeleteModal.value = true;
};

/**
 * Закрывает модальное окно подтверждения и сбрасывает связанные переменные.
 */
const closeModal = () => {
    showConfirmDeleteModal.value = false;
    currencyToDeleteId.value = null;
    currencyToDeleteName.value = '';
};

// --- Логика удаления ---
/**
 * Отправляет запрос на удаление тега на сервер.
 */
const deleteCurrency = () => {
    if (currencyToDeleteId.value === null) return;

    const idToDelete = currencyToDeleteId.value; // Сохраняем ID во временную переменную
    const nameToDelete = currencyToDeleteName.value; // Сохраняем name во временную переменную

    router.delete(route('admin.currencies.destroy', {currency: idToDelete}), { // Используем временную переменную
        preserveScroll: true,
        preserveState: false,
        onSuccess: (page) => {
            closeModal(); // Закрываем модалку
            toast.success(`Валюта "${nameToDelete || 'ID: ' + idToDelete}" удалена.`);
            // console.log('Удаление успешно.');
        },
        onError: (errors) => {
            closeModal();
            const errorMsg = errors.general || errors[Object.keys(errors)[0]] || 'Произошла ошибка при удалении.';
            toast.error(`${errorMsg} (Валюта: ${nameToDelete || 'ID: ' + idToDelete})`);
            console.error('Ошибка удаления:', errors);
        },
        onFinish: () => {
            // console.log('Запрос на удаление завершен.');
            currencyToDeleteId.value = null;
            currencyToDeleteName.value = '';
        }
    });
};

/**
 * Отправляет запрос для изменения статуса активности.
 */
const toggleActivity = (currency) => {
    const newActivity = !currency.activity;
    const actionText = newActivity ? 'активирована' : 'деактивирована';

    // Используем Inertia.put для простого обновления
    router.put(route('admin.actions.currencies.updateActivity', {currency: currency.id}),
        {activity: newActivity},
        {
            preserveScroll: true, // Сохраняем скролл
            preserveState: true,  // Обновляем только измененные props (если бэк отдает reload: false)
            // Или false, если бэк всегда отдает reload: true и нужно перезагрузить данные
            onSuccess: () => {
                // Обновляем состояние локально СРАЗУ ЖЕ (оптимистичное обновление)
                // Или дожидаемся обновления props, если preserveState: false
                // currency.activity = newActivity; // Уже не нужно, если preserveState: false
                toast.success(`Валюта "${currency.name}" ${actionText}.`);
            },
            onError: (errors) => {
                toast.error(errors.activity || errors.general || `Ошибка изменения активности для "${currency.name}".`);
                // Можно откатить изменение на фронте, если нужно
                // currency.activity = !newActivity;
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
const sortCurrencies = (currencies) => {
    if (sortParam.value === 'idAsc') {
        return currencies.slice().sort((a, b) => a.id - b.id);
    }
    if (sortParam.value === 'idDesc') {
        return currencies.slice().sort((a, b) => b.id - a.id);
    }
    if (sortParam.value === 'activity') {
        return currencies.filter(currency => currency.activity);
    }
    if (sortParam.value === 'inactive') {
        return currencies.filter(currency => !currency.activity);
    }
    return currencies.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value]) return -1
        if (a[sortParam.value] > b[sortParam.value]) return 1
        return 0
    });
};

/**
 * Вычисляемое свойство, отсортированный список поиска.
 */
const filteredCurrencies = computed(() => {
    let filtered = props.currencies;

    if (searchQuery.value) {
        filtered = filtered.filter(currency =>
            currency.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return sortCurrencies(filtered);
});

/**
 * Вычисляемое свойство пагинации, возвращающее для текущей страницы.
 */
const paginatedCurrencies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredCurrencies.value.slice(start, start + itemsPerPage.value);
});

/**
 * Вычисляемое свойство, возвращающее общее количество страниц пагинации.
 */
const totalPages = computed(() => Math.ceil(filteredCurrencies.value.length / itemsPerPage.value));

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
    router.put(route('admin.actions.currencies.updateSortBulk'),
        {currencies: sortData}, // Отправляем массив объектов
        {
            preserveScroll: true,
            preserveState: true, // Сохраняем состояние, т.к. на сервере нет редиректа
            onSuccess: () => {
                toast.success("Порядок валют успешно обновлен.");
                // Обновляем локальные данные (если нужно, но Inertia должна прислать обновленные props)
                // Возможно, лучше сделать preserveState: false и дождаться обновления props
            },
            onError: (errors) => {
                console.error("Ошибка обновления сортировки:", errors);
                toast.error(errors.general || errors.currencies || "Не удалось обновить порядок валют.");
                // TODO: Откатить порядок на фронтенде? Сложно без сохранения исходного состояния.
                // Проще сделать preserveState: false или router.reload при ошибке.
                router.reload({only: ['currencies'], preserveScroll: true}); // Перезагружаем данные при ошибке
            },
        }
    );
};

/**
 * Массив выбранных ID для массовых действий.
 */
const selectedCurrencies = ref([]);

/**
 * Логика выбора всех для массовых действий.
 */
const toggleAll = ({ids, checked}) => {
    if (checked) {
        // добавляем текущее множество ids
        selectedCurrencies.value = [...new Set([...selectedCurrencies.value, ...ids])];
    } else {
        // удаляем эти ids из выбранных
        selectedCurrencies.value = selectedCurrencies.value.filter(id => !ids.includes(id));
    }
};

/**
 * Обрабатывает событие выбора/снятия выбора одной строки.
 */
const toggleSelectCurrency = (currencyId) => {
    const index = selectedCurrencies.value.indexOf(currencyId);
    if (index > -1) {
        selectedCurrencies.value.splice(index, 1);
    } else {
        selectedCurrencies.value.push(currencyId);
    }
};

/**
 * Выполняет массовое включение/выключение активности выбранных.
 */
const bulkToggleActivity = (newActivity) => {
    if (!selectedCurrencies.value.length) {
        toast.warning('Выберите валюту для активации/деактивации');
        return;
    }

    router.put(
        route('admin.actions.currencies.bulkUpdateActivity'),
        {
            ids: selectedCurrencies.value,
            activity: newActivity,
        },
        {
            preserveScroll: true,
            // Заставляем Inertia обновить props с сервера, это перезагрузит таблицу
            preserveState: false,
            onSuccess: () => {
                toast.success('Активность валют массово обновлена');
                // Очищаем массив выделенных элементов
                selectedCurrencies.value = [];
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
    if (selectedCurrencies.value.length === 0) {
        toast.warning('Выберите хотя бы одну валюту для удаления.'); // <--- Используем toast
        return;
    }
    if (!confirm(`Вы уверены, что хотите их удалить ?`)) {
        return;
    }
    router.delete(route('admin.actions.currencies.bulkDestroy'), {
        data: {ids: selectedCurrencies.value},
        preserveScroll: true,
        preserveState: false, // Перезагружаем данные страницы
        onSuccess: (page) => {
            selectedCurrencies.value = []; // Очищаем выбор
            toast.success('Массовое удаление тегов успешно завершено.');
            // console.log('Массовое удаление статей успешно завершено.');
        },
        onError: (errors) => {
            console.error("Ошибка массового удаления:", errors);
            // Отображаем первую ошибку
            const errorKey = Object.keys(errors)[0];
            const errorMessage = errors[errorKey] || 'Произошла ошибка при удалении валют.';
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
        selectedCurrencies.value = paginatedCurrencies.value.map(r => r.id);
    } else if (action === 'deselectAll') {
        selectedCurrencies.value = [];
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
 * Обновляет курс валют с внешнего источника.
 */
// вернём «текущую базу» — ту, где is_default = true
const currentBase = computed(() => {
    return (props.currencies || []).find(c => c.is_default) || null;
});

const refreshFromProvider = () => {
    if (!currentBase.value) {
        toast.error('Не выбрана основная валюта.');
        return;
    }
    if (!confirm(`Обновить курсы из провайдера для базы ${currentBase.value.code}?`)) {
        return;
    }

    router.put(
        route('admin.actions.currencies.refreshRates', { currency: currentBase.value.id }),
        {},
        {
            preserveScroll: true,
            preserveState: false, // перезагрузим props, чтобы увидеть новые курсы/время
            onSuccess: () => toast.success('Курсы обновлены из провайдера.'),
            onError: (err) => {
                const msg = err?.general || 'Ошибка обновления курсов из провайдера.';
                toast.error(msg);
            },
        }
    );
};

/**
 * Обрабатывает переключение основной валюты.
 */
const setDefault = (currency) => {
    if (currency.is_default) return;

    router.put(
        route('admin.actions.currencies.setDefault', { currency: currency.id }),
        {},
        {
            preserveScroll: true,
            preserveState: false, // обновим props, чтобы подсветка/курсы пересчитались
            onSuccess: () => toast.success(`Назначена основной: ${currency.name}`),
            onError: (errors) => {
                const msg = errors.general || 'Не удалось назначить основную валюту.';
                toast.error(msg);
            }
        }
    );
};

/**
 * Обработчик курса валют в инпутах.
 */
const saveRate = ({ id, value }) => {
    router.put(
        route('admin.actions.currencies.updateRate', { currency: id }), // ✅ имя теперь реально есть
        { rate: value, provider: 'manual' },
        {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => toast.success('Курс обновлён'),
            onError: (errors) => {
                const msg = errors.general || errors.rate || 'Ошибка обновления курса';
                toast.error(msg);
            },
        }
    );
};

</script>

<template>
    <AdminLayout :title="t('currencies')">
        <template #header>
            <TitlePage>
                {{ t('currencies') }}
            </TitlePage>
        </template>
        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.currencies.create')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                <path
                                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
                            </svg>
                        </template>
                        {{ t('addCurrency') }}
                    </DefaultButton>
                    <BulkActionSelect v-if="currenciesCount" @change="handleBulkAction" />
                </div>
                <div class="flex justify-center items-center mb-2">
                    <!-- КНОПКА ОБНОВИТЬ КУРСЫ -->
                    <RefreshRatesButton
                        :title="`Обновить курсы (${currentBase?.code || '—'})`"
                        :disabled="!currentBase"
                        @click="refreshFromProvider"
                    />
                </div>
                <SearchInput v-if="currenciesCount" v-model="searchQuery" :placeholder="t('searchByName')"/>
                <CountTable v-if="currenciesCount"> {{ currenciesCount }} </CountTable>
                <CurrencyTable
                    :currencies="paginatedCurrencies"
                    :selected-currencies="selectedCurrencies"
                    @toggle-activity="toggleActivity"
                    @update-sort-order="handleSortOrderUpdate"
                    @delete="confirmDelete"
                    @toggle-select="toggleSelectCurrency"
                    @toggle-all="toggleAll"
                    @set-default="setDefault"
                    @save-rate="saveRate"
                />
                <div class="flex justify-between items-center flex-col md:flex-row my-1" v-if="currenciesCount">
                    <ItemsPerPageSelect :items-per-page="itemsPerPage" @update:itemsPerPage="itemsPerPage = $event" />
                    <Pagination :current-page="currentPage"
                                :items-per-page="itemsPerPage"
                                :total-items="filteredCurrencies.length"
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
            :onConfirm="deleteCurrency"
            :cancelText="t('cancel')"
            :confirmText="t('yesDelete')"
        />
    </AdminLayout>
</template>
