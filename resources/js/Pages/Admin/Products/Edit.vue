<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';
import { transliterate } from '@/utils/transliteration';
import {defineProps, onMounted, ref} from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import ClearMetaButton from '@/Components/Admin/Buttons/ClearMetaButton.vue';
import MetatagsButton from '@/Components/Admin/Buttons/MetatagsButton.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import TinyEditor from "@/Components/Admin/TinyEditor/TinyEditor.vue";
import CKEditor from '@/Components/Admin/CKEditor/CKEditor.vue';
import MetaDescTextarea from '@/Components/Admin/Textarea/MetaDescTextarea.vue';
import InputNumber from '@/Components/Admin/Input/InputNumber.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import SelectLocale from "@/Components/Admin/Select/SelectLocale.vue";
import VueMultiselect from 'vue-multiselect';

// Импорт двух отдельных компонентов для работы с изображениями:
import MultiImageUpload from '@/Components/Admin/Image/MultiImageUpload.vue'; // для загрузки новых изображений
import MultiImageEdit from '@/Components/Admin/Image/MultiImageEdit.vue';     // для редактирования существующих

// --- Инициализация ---
const toast = useToast();
const { t } = useI18n();

/**
 * Входные свойства компонента.
 */
const props = defineProps({
    product: { type: Object, required: true },
    categories: Array,
    related_products: { type: Array, default: () => [] } // задаём дефолтное значение
});

/**
 * Формируем форму редактирования.
 */
const form = useForm({
    _method: 'PUT',
    sort: props.product.sort ?? 0,
    locale: props.product.locale ?? '',
    sku: props.product.sku ?? '',
    title: props.product.title ?? '',
    url: props.product.url ?? '',
    short: props.product.short ?? '',
    description: props.product.description ?? '',
    quantity: props.product.quantity ?? 0,
    unit: props.product.unit ?? '',
    weight: props.product.weight ?? 0,
    availability: props.product.availability ?? '',
    price: props.product.price ?? 0,
    old_price: props.product.old_price ?? 0,
    currency: props.product.currency ?? 'USD',
    barcode: props.product.barcode ?? '',
    meta_title: props.product.meta_title ?? '',
    meta_keywords: props.product.meta_keywords ?? '',
    meta_desc: props.product.meta_desc ?? '',
    admin: props.product.admin ?? '',

    activity: Boolean(props.product.activity),
    left: Boolean(props.product.left),
    main: Boolean(props.product.main),
    right: Boolean(props.product.right),
    is_new: Boolean(props.product.is_new),
    is_hit: Boolean(props.product.is_hit),
    is_sale: Boolean(props.product.is_sale),

    categories: props.product.categories ?? [],
    related_products: props.product.related_products ?? [],
    deletedImages: [] // массив для хранения ID удалённых изображений
});

/**
 * Массив существующих изображений.
 */
const existingImages = ref(
    (props.product.images || [])
        .filter(img => img.url) // фильтруем изображения, у которых есть URL
        .map(img => ({
            id: img.id,
            // Если есть WebP-версия, используем её, иначе — оригинальный URL
            url: img.webp_url || img.url,
            order: img.order || 0,
            alt: img.alt || '',
            caption: img.caption || ''
        }))
);

/**
 * Массив для новых изображений (будут содержать свойство file).
 */
const newImages = ref([]);

/**
 * Обработчик обновления существующих изображений, приходящих из компонента MultiImageEdit.
 */
const handleExistingImagesUpdate = (images) => {
    existingImages.value = images;
};

/**
 * Обработчик удаления изображения из существующего списка.
 */
const handleDeleteExistingImage = (deletedId) => {
    if (!form.deletedImages.includes(deletedId)) {
        form.deletedImages.push(deletedId);
    }
    existingImages.value = existingImages.value.filter(img => img.id !== deletedId);
    // console.log("Deleted IDs:", form.deletedImages);
    // console.log("Remaining images:", existingImages.value);
};

/**
 * Обработчик обновления новых изображений из компонента MultiImageUpload.
 */
const handleNewImagesUpdate = (images) => {
    newImages.value = images;
};

/**
 * Автоматически генерирует URL из поля title, если URL пуст.
 */
const handleUrlInputFocus = () => {
    if (form.title) {
        form.url = transliterate(form.title.toLowerCase());
    }
};

/**
 * Обрезает текст до заданной длины, стараясь не разрывать слова при генерации мета-тегов.
 */
const truncateText = (text, maxLength, addEllipsis = false) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
    return addEllipsis ? `${truncated}...` : truncated;
};

/**
 * очистка мета-тегов.
 */
const clearMetaFields = () => {
    form.meta_title = '';
    form.meta_keywords = '';
    form.meta_desc = '';
};

/**
 * Генерирует значения для мета-полей (title, keywords, description),
 * если они не были заполнены вручную.
 */
const generateMetaFields = () => {
    // Генерация meta_title
    if (form.title && !form.meta_title) {
        form.meta_title = truncateText(form.title, 160); // Используем вашу функцию truncateText
    }

    // Генерация meta_keywords из form.short
    if (!form.meta_keywords && form.short) {
        // 1. Удаляем HTML-теги (на случай, если они есть в form.short)
        let text = form.short.replace(/(<([^>]+)>)/gi, "");

        // 2. Удаляем знаки препинания, кроме дефисов внутри слов (опционально)
        //    Оставляем буквы (включая кириллицу/другие языки), цифры, дефисы и пробелы
        text = text.replace(/[.,!?;:()\[\]{}"'«»]/g, ''); // Удаляем основную пунктуацию
        // text = text.replace(/[^\p{L}\p{N}\s-]/gu, ''); // Более строгий вариант: оставить только буквы, цифры, пробелы, дефис

        // 3. Разбиваем текст на слова по пробелам
        const words = text.split(/\s+/)
            // 4. Фильтруем пустые строки и короткие слова (например, менее 3 символов), если нужно
            .filter(word => word && word.length >= 3)
            // 5. Приводим к нижнему регистру (стандартно для ключевых слов)
            .map(word => word.toLowerCase())
            // 6. Удаляем дубликаты слов
            .filter((value, index, self) => self.indexOf(value) === index);

        // 7. Объединяем слова через запятую и пробел
        const keywords = words.join(', ');

        // 8. Обрезаем результат до максимальной длины (если нужно)
        form.meta_keywords = truncateText(keywords, 255); // Используем вашу функцию truncateText
    }

    // Генерация meta_desc из form.short
    if (form.short && !form.meta_desc) {
        // Убираем HTML-теги для описания
        const descText = form.short.replace(/(<([^>]+)>)/gi, "");
        form.meta_desc = truncateText(descText, 200, true); // Используем другую длину и добавление ...
    }
};

/**
 * Отправляет данные формы для обновления.
 */
const submitForm = () => {
    // Используем transform для объединения данных формы с массивами новых и существующих изображений
    form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
        left: data.left ? 1 : 0,
        main: data.main ? 1 : 0,
        right: data.right ? 1 : 0,
        images: [
            ...newImages.value.map(img => ({
                file: img.file,
                order: img.order,
                alt: img.alt,
                caption: img.caption
            })),
            ...existingImages.value.map(img => ({
                id: img.id,
                order: img.order,
                alt: img.alt,
                caption: img.caption
            }))
        ],
        deletedImages: form.deletedImages
    }));

    form.post(route('admin.products.update', props.product.id), {
        preserveScroll: true,
        forceFormData: true, // Принудительно отправляем как FormData
        onSuccess: (page) => {
            //console.log("Edit.vue onSuccess:", page);
            toast.success('Товар успешно обновлен!'); // Можно добавить, если нужно кастомное
        },
        onError: (errors) => {
            console.error("❌ Ошибка при обновлении товара:", errors);
            const firstError = errors[Object.keys(errors)[0]];
            toast.error(firstError || 'Пожалуйста, проверьте правильность заполнения полей.')
        }
    });
};

</script>

<template>
    <AdminLayout :title="t('editProduct')">
        <template #header>
            <TitlePage>{{ t('editProduct') }}: {{ props.product.title }}</TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Кнопка назад -->
                    <DefaultButton :href="route('admin.products.index')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                                 viewBox="0 0 16 16">
                                <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                            </svg>
                        </template>
                        {{ t('back') }}
                    </DefaultButton>

                    <!-- Right: Actions -->
                    <div class="grid grid-flow-col sm:auto-cols-max
                                justify-start sm:justify-end gap-2">
                        <!-- Datepicker built with flatpickr -->
                    </div>
                </div>
                <form @submit.prevent="submitForm"
                      enctype="multipart/form-data" class="p-3 w-full">

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Активность -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.activity"/>
                            <LabelCheckbox for="activity" :text="t('activity')"
                                           class="text-sm h-8 flex items-center"/>
                        </div>

                        <!-- Локализация -->
                        <div class="flex flex-row items-center gap-2 w-auto">
                            <SelectLocale v-model="form.locale" :errorMessage="form.errors.locale"/>
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.locale"/>
                        </div>

                        <!-- Сортировка -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="sort" :value="t('sort')" class="text-sm"/>
                            </div>
                            <InputNumber
                                id="sort"
                                type="number"
                                v-model="form.sort"
                                autocomplete="sort"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.sort"/>
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Показывать в левом сайдбаре -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.left"/>
                            <LabelCheckbox for="left" :text="t('left')"
                                           class="text-sm h-8 flex items-center"/>
                        </div>

                        <!-- Показывать в главных новостях -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.main"/>
                            <LabelCheckbox for="main" :text="t('main')"
                                           class="text-sm h-8 flex items-center"/>
                        </div>

                        <!-- Показывать в правом сайдбаре -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.right"/>
                            <LabelCheckbox for="right" :text="t('right')"
                                           class="text-sm h-8 flex items-center"/>
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Показывать в новинках -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.is_new"/>
                            <LabelCheckbox for="left" :text="t('isNew')"
                                           class="text-sm h-8 flex items-center"/>
                        </div>

                        <!-- Показывать в рекомендованных -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.is_hit"/>
                            <LabelCheckbox for="main" :text="t('isHit')"
                                           class="text-sm h-8 flex items-center"/>
                        </div>

                        <!-- Показывать в распродаже -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.is_sale"/>
                            <LabelCheckbox for="right" :text="t('isSale')"
                                           class="text-sm h-8 flex items-center"/>
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <div class="flex flex-row items-center gap-2">
                            <LabelInput for="sku">
                                {{ t('sku') }}
                            </LabelInput>
                            <InputText
                                id="sku"
                                type="text"
                                v-model="form.sku"
                                autocomplete="sku"
                            />
                            <InputError class="mt-2" :message="form.errors.sku" />
                        </div>

                        <!-- Наличие -->
                        <div class="flex flex-row items-center gap-2">
                            <LabelInput for="availability">
                                {{ t('availability') }}
                            </LabelInput>
                            <InputText
                                id="availability"
                                type="text"
                                v-model="form.availability"
                                autocomplete="availability"
                            />
                            <InputError class="mt-2" :message="form.errors.availability" />
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Старая цена -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="old_price" :value="t('priceOld')" class="text-sm" />
                            </div>
                            <InputNumber
                                id="old_price"
                                v-model.number="form.old_price"
                                step="0.01"
                                min="0"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.old_price" />
                        </div>

                        <!-- Валюта -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="flex items-center">
                                <LabelInput for="currency" :value="t('currency')" class="text-sm"/>
                            </div>
                            <select
                                id="currency"
                                v-model="form.currency"
                                class="w-full lg:w-28 block py-0.5 rounded-sm shadow-sm
                                       font-semibold text-sm border-slate-500
                                       focus:border-indigo-500 focus:ring-indigo-300
                                       dark:bg-cyan-800 dark:text-slate-100"
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="KZT">KZT</option>
                                <option value="RUB">RUB</option>
                            </select>
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.currency"/>
                        </div>

                        <!-- Стоимость -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="price" :value="t('price')" class="text-sm" />
                            </div>
                            <InputNumber
                                id="price"
                                v-model.number="form.price"
                                step="0.01"
                                min="0"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.price" />
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Количество -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="quantity" :value="t('quantity')" class="text-sm"/>
                            </div>
                            <InputNumber
                                id="quantity"
                                type="number"
                                v-model="form.quantity"
                                autocomplete="quantity"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.quantity"/>
                        </div>

                        <!-- Единица измерения -->
                        <div class="flex flex-row items-center gap-2 w-auto">
                            <LabelInput for="title">
                                {{ t('unit') }}
                            </LabelInput>
                            <InputText
                                id="unit"
                                type="text"
                                v-model="form.unit"
                                autocomplete="unit"
                            />
                            <InputError class="mt-2" :message="form.errors.unit"/>
                        </div>

                        <!-- Вес -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="weight" :value="t('weight')" class="text-sm"/>
                            </div>
                            <InputNumber
                                id="weight"
                                type="number"
                                v-model="form.weight"
                                autocomplete="weight"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.weight"/>
                        </div>

                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="categories" :value="t('categories')" class="mb-1"/>
                        <VueMultiselect v-model="form.categories"
                                        :options="categories"
                                        :multiple="true"
                                        :close-on-select="true"
                                        :placeholder="t('select')"
                                        label="title"
                                        track-by="title"
                        />
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="title">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                            {{ t('title') }}
                        </LabelInput>
                        <InputText
                            id="title"
                            type="text"
                            v-model="form.title"
                            required
                            autocomplete="title"
                        />
                        <InputError class="mt-2" :message="form.errors.title"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="url">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                            {{ t('url') }}
                        </LabelInput>
                        <InputText
                            id="url"
                            type="text"
                            v-model="form.url"
                            required
                            autocomplete="url"
                            @focus="handleUrlInputFocus"
                        />
                        <InputError class="mt-2" :message="form.errors.url"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="short" :value="t('shortDescription')"/>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.short.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.short" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.short"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="description" :value="t('description')"/>
                        <TinyEditor v-model="form.description" :height="500" />
                        <!-- <CKEditor v-model="form.description" class="w-full"/> -->
                        <InputError class="mt-2" :message="form.errors.description"/>
                    </div>

                    <!-- Мультиселект для связанных статей -->
                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="related_products" :value="t('relatedProducts')"
                                    class="mb-1" />
                        <VueMultiselect v-model="form.related_products"
                                        :options="related_products"
                                        :multiple="true"
                                        :close-on-select="true"
                                        :placeholder="t('select')"
                                        label="title"
                                        track-by="title" />
                        <InputError class="mt-2" :message="form.errors.related_products" />
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="meta_title" :value="t('metaTitle')"/>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.meta_title.length }} / 160 {{ t('characters') }}
                            </div>
                        </div>
                        <InputText
                            id="meta_title"
                            type="text"
                            v-model="form.meta_title"
                            maxlength="160"
                            autocomplete="url"
                        />
                        <InputError class="mt-2" :message="form.errors.meta_title"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="meta_keywords" :value="t('metaKeywords')"/>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.meta_keywords.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <InputText
                            id="meta_keywords"
                            type="text"
                            v-model="form.meta_keywords"
                            maxlength="255"
                            autocomplete="url"
                        />
                        <InputError class="mt-2" :message="form.errors.meta_keywords"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="meta_desc" :value="t('metaDescription')"/>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.meta_desc.length }} / 200 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.meta_desc" maxlength="200" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.meta_desc"/>
                    </div>

                    <div class="flex justify-end mt-4">
                        <MetatagsButton @click.prevent="generateMetaFields">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-600 shrink-0 mr-2"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z"></path>
                                </svg>
                            </template>
                            {{ t('generateMetaTags') }}
                        </MetatagsButton>
                    </div>

                    <!-- Штрих-код -->
                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="barcode" :value="t('barcode')" class="text-sm w-28" />
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.barcode.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>

                        <div class="relative w-full">
                            <InputText
                                id="barcode"
                                type="text"
                                v-model="form.barcode"
                                @input="form.barcode = form.barcode.replace(/\D/g, '')"
                                maxlength="255"
                                autocomplete="off"
                                class="w-full pr-10"
                            />

                            <!-- Кнопка очистки -->
                            <button
                                v-if="form.barcode"
                                @click.prevent="form.barcode = ''"
                                type="button"
                                class="absolute right-2 top-1/2 -translate-y-1/2
                                       text-red-500 hover:text-red-700
                                       dark:text-red-400 dark:hover:text-red-200"
                                title="Очистить"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.54-10.46a.75.75 0 10-1.06-1.06L10 8.94 7.53 6.47a.75.75 0 10-1.06 1.06L8.94 10l-2.47 2.47a.75.75 0 101.06 1.06L10 11.06l2.47 2.47a.75.75 0 101.06-1.06L11.06 10l2.47-2.47z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        <InputError class="mt-2" :message="form.errors.barcode" />
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="admin" :value="t('comment')"/>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.admin.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.admin" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.admin"/>
                    </div>

                    <div class="flex justify-end mt-4">
                        <!-- Кнопка очистки мета-полей -->
                        <ClearMetaButton @clear="clearMetaFields" class="mr-4">
                            <template #default>
                                <svg class="w-4 h-4 fill-current text-gray-500 shrink-0 mr-2"
                                     viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5V7h6v2z"/>
                                </svg>
                                {{ t('clearMetaFields') }}
                            </template>
                        </ClearMetaButton>
                        <!-- Кнопка генерации мета-полей -->
                        <MetatagsButton @click.prevent="generateMetaFields">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-600 shrink-0 mr-2"
                                     viewBox="0 0 16 16">
                                    <path d="M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z"></path>
                                </svg>
                            </template>
                            {{ t('generateMetaTags') }}
                        </MetatagsButton>

                    </div>

                    <!-- Блок редактирования существующих изображений -->
                    <div class="mt-4">
                        <MultiImageEdit
                            :images="existingImages"
                            @update:images="handleExistingImagesUpdate"
                            @delete-image="handleDeleteExistingImage" />
                    </div>

                    <!-- Блок загрузки новых изображений -->
                    <div class="mt-4">
                        <MultiImageUpload @update:images="handleNewImagesUpdate" />
                    </div>

                    <div class="flex items-center justify-center mt-4">
                        <DefaultButton :href="route('admin.products.index')" class="mb-3">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                                     viewBox="0 0 16 16">
                                    <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c-.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2 .8-6.4z"></path>
                                </svg>
                            </template>
                            {{ t('back') }}
                        </DefaultButton>
                        <PrimaryButton class="ms-4 mb-0"
                                       :disabled="form.processing"
                                       :class="{ 'opacity-25': form.processing }">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100"
                                     viewBox="0 0 16 16">
                                    <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
                                </svg>
                            </template>
                            {{ t('save') }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>

<style src="../../../../css/vue-multiselect.min.css"></style>
