<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputNumber from '@/Components/Admin/Input/InputNumber.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import MetaDescTextarea from '@/Components/Admin/Textarea/MetaDescTextarea.vue';
import TinyEditor from '@/Components/Admin/TinyEditor/TinyEditor.vue';
import MultiImageUpload from '@/Components/Admin/Image/MultiImageUpload.vue'
import MultiImageEdit from '@/Components/Admin/Image/MultiImageEdit.vue'

const toast = useToast()
const { t } = useI18n()

const emit = defineEmits(['close', 'updated']);

const props = defineProps({
    variant: {
        type: Object,
        required: true,
    },
    productId: { type: [Number, String], required: true },
});

// --- Локальное состояние для формы ---
// 1. Создаем реактивные переменные для данных формы, ошибок и состояния загрузки.
const form = ref({});
const errors = ref({});
const processing = ref(false);
const existingImages = ref([]);
const newImages = ref([]);
const deletedImageIds = ref([]); // Используем отдельный ref для ID удаленных

watch(() => props.variant, (newVariant) => {
    if (newVariant) {
        form.value = {
            product_id: newVariant.product_id ?? props.productId,
            title: newVariant.title ?? '',
            sku: newVariant.sku ?? '',
            quantity: newVariant.quantity ?? 0,
            weight: newVariant.weight ?? 0,
            price: newVariant.price ?? 0,
            old_price: newVariant.old_price ?? 0,
            availability: newVariant.availability ?? '',
            currency: newVariant.currency ?? 'KZT',
            barcode: newVariant.barcode ?? '',
            options: newVariant.options ?? '',
            short: newVariant.short ?? '',
            description: newVariant.description ?? '',
            admin: newVariant.admin ?? '',
            sort: newVariant.sort ?? 0,
            activity: Boolean(newVariant.activity),
        };

        existingImages.value = (newVariant.images || [])
            .filter(img => img.url)
            .map(img => ({
                id: img.id,
                url: img.webp_url || img.url,
                order: img.order || 0,
                alt: img.alt || '',
                caption: img.caption || ''
            }));

        newImages.value = [];
        deletedImageIds.value = [];
        errors.value = {};
    }
}, { immediate: true, deep: true });

const handleExistingImagesUpdate = (images) => {
    existingImages.value = images;
};

const handleDeleteExistingImage = (deletedId) => {
    if (!deletedImageIds.value.includes(deletedId)) {
        deletedImageIds.value.push(deletedId);
    }
    existingImages.value = existingImages.value.filter(img => img.id !== deletedId);
};

const handleNewImagesUpdate = (images) => {
    newImages.value = images;
};

const submit = async () => {
    if (!props.variant) return;

    processing.value = true;
    errors.value = {};

    const formData = new FormData();

    // **КЛЮЧЕВОЕ ИЗМЕНЕНИЕ**: Используем POST-запрос с подменой метода
    formData.append('_method', 'PUT');

    // Добавляем основные поля формы
    for (const key in form.value) {
        let value = form.value[key];
        // Корректно отправляем булевы значения как 1 или 0
        if (typeof value === 'boolean') {
            value = value ? '1' : '0';
        }
        // Не добавляем null или undefined значения
        if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    }

    // Добавляем ID удаленных изображений
    deletedImageIds.value.forEach(id => {
        formData.append('deletedImages[]', id);
    });

    // Объединяем существующие и новые изображения для отправки
    const allImages = [
        ...existingImages.value,
        ...newImages.value
    ];

    allImages.forEach((image, index) => {
        if (image.id) { // Существующее изображение
            formData.append(`images[${index}][id]`, image.id);
        } else if (image.file) { // Новое изображение
            formData.append(`images[${index}][file]`, image.file);
        }
        formData.append(`images[${index}][order]`, image.order || 0);
        formData.append(`images[${index}][alt]`, image.alt || '');
        formData.append(`images[${index}][caption]`, image.caption || '');
    });

    try {
        // **КЛЮЧЕВОЕ ИЗМЕНЕНИЕ**: Отправляем POST вместо PUT
        const response = await axios.post(
            route('admin.product-variants.update', props.variant.id),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.data.success) {
            toast.success('Вариант успешно обновлен!');
            emit('updated'); // Отправляем событие для обновления списка в родителе
            emit('close');
        }
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
            toast.error('Ошибка валидации. Проверьте поля.');
        } else {
            console.error('Ошибка при обновлении варианта:', error);
            toast.error(error.response?.data?.message || 'Произошла ошибка при сохранении.');
        }
    } finally {
        processing.value = false;
    }
};

</script>

<template>
    <div class="fixed inset-0 z-50 bg-black bg-opacity-50
                flex items-center justify-center"
         @click.self="emit('close')">

        <div class="w-full max-w-3xl max-h-[90vh]
                    bg-slate-100 dark:bg-slate-900 overflow-y-auto pt-4 px-4
                    border-2 border-slate-400 shadow-xl shadow-gray-700">

            <div class="relative w-full mb-4">
                <h2 class="text-gray-700 dark:text-gray-300 text-center text-md font-semibold">
                    {{ t('editProductVariant') }}
                </h2>

                <button
                    type="button"
                    @click="emit('close')"
                    :title="t('close')"
                    class="absolute right-0 top-0 btn btn-outline
                           text-slate-400 hover:text-slate-500">
                    <svg class="w-4 h-4 fill-current">
                        <path
                            d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                    </svg>
                </button>
            </div>

            <form v-if="variant" @submit.prevent="submit" enctype="multipart/form-data">
                <div class="space-y-2">

                    <div class="mb-1 flex justify-between flex-col lg:flex-row items-center gap-2">

                        <!-- Активность -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.activity" />
                            <LabelCheckbox for="activity" :text="t('activity')"
                                           class="text-sm h-8 flex items-center" />
                        </div>

                        <!-- Сортировка -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="sort" :value="t('sort')"
                                            class="text-sm" />
                            </div>
                            <InputNumber
                                id="sort"
                                type="number"
                                v-model="form.sort"
                                autocomplete="sort"
                                class="w-full lg:w-28"
                            />
                            <div v-if="errors.sort"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.sort[0] }}
                            </div>
                        </div>

                    </div>

                    <!-- Название -->
                    <div class="flex flex-col items-start">
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
                        <div v-if="errors.title"
                             class="text-sm text-red-600 dark:text-orange-200">
                            {{ errors.title[0] }}
                        </div>
                    </div>

                    <div class="flex justify-between flex-col
                                lg:flex-row items-center gap-2">

                        <!-- Артикул -->
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
                            <div v-if="errors.sku"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.sku[0] }}
                            </div>
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
                            <div v-if="errors.availability"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.availability[0] }}
                            </div>
                        </div>

                    </div>

                    <div class="flex justify-between flex-col
                                lg:flex-row items-center gap-2">

                        <!-- Количество -->
                        <div class="flex flex-row items-center gap-2">
                            <LabelInput for="quantity" :value="t('quantity')"
                                        class="text-sm" />
                            <InputNumber
                                id="quantity"
                                type="number"
                                v-model="form.quantity"
                                autocomplete="quantity"
                                class="w-full lg:w-28"
                            />
                            <div v-if="errors.quantity"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.quantity[0] }}
                            </div>
                        </div>

                        <!-- Вес -->
                        <div class="flex flex-row items-center gap-2">
                            <LabelInput for="weight" :value="t('weight')"
                                        class="text-sm" />
                            <InputNumber
                                id="weight"
                                type="number"
                                v-model="form.weight"
                                autocomplete="weight"
                                class="w-full lg:w-28"
                            />
                            <div v-if="errors.weight"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.weight[0] }}
                            </div>
                        </div>

                    </div>

                    <div class="flex justify-between flex-col lg:flex-row items-center gap-4">

                        <div>
                            <div class="h-6 flex items-center">
                                <LabelInput for="old_price" :value="t('priceOld')"
                                            class="text-sm" />
                            </div>
                            <InputNumber
                                id="old_price"
                                v-model.number="form.old_price"
                                step="0.01"
                                min="0"
                                class="w-full lg:w-28"
                            />
                            <div v-if="errors.old_price"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.old_price[0] }}
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center">
                                <LabelInput for="currency" :value="t('currency')"
                                            class="text-sm" />
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
                            <div v-if="errors.currency"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.currency[0] }}
                            </div>
                        </div>

                        <div>
                            <div class="h-6 flex items-center">
                                <LabelInput for="price" :value="t('price')"
                                            class="text-sm" />
                            </div>
                            <InputNumber
                                id="price"
                                v-model.number="form.price"
                                step="0.01"
                                min="0"
                                class="w-full lg:w-28"
                            />
                            <div v-if="errors.price"
                                 class="text-sm text-red-600 dark:text-orange-200">
                                {{ errors.price[0] }}
                            </div>
                        </div>

                    </div>

                    <!-- Штрих-код -->
                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="barcode" :value="t('barcode')"
                                        class="text-sm w-28" />
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.barcode?.length || 0 }} / 255 {{ t('characters') }}
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

                        <div v-if="errors.barcode"
                             class="text-sm text-red-600 dark:text-orange-200">
                            {{ errors.barcode[0] }}
                        </div>
                    </div>

                    <div class="flex flex-col items-start">
                        <LabelInput for="options">
                            {{ t('options') }}
                        </LabelInput>
                        <InputText
                            id="options"
                            type="text"
                            v-model="form.options"
                            autocomplete="options"
                        />
                        <div v-if="errors.options"
                             class="text-sm text-red-600 dark:text-orange-200">
                            {{ errors.options[0] }}
                        </div>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="short" :value="t('shortDescription')" />
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.short.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.short" class="w-full" />
                        <div v-if="errors.short"
                             class="text-sm text-red-600 dark:text-orange-200">
                            {{ errors.short[0] }}
                        </div>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="description" :value="t('description')" />
                        <TinyEditor v-model="form.description" :height="500" />
                        <!-- <CKEditor v-model="form.description" class="w-full"/> -->
                        <div v-if="errors.description"
                             class="text-sm text-red-600 dark:text-orange-200">
                            {{ errors.description[0] }}
                        </div>
                    </div>

                    <div class="flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="admin">
                                {{ t('comment') }}
                            </LabelInput>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.admin.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <InputText
                            id="admin"
                            type="text"
                            v-model="form.admin"
                            autocomplete="admin"
                        />
                        <div v-if="errors.admin"
                             class="text-sm text-red-600 dark:text-orange-200">
                            {{ errors.admin[0] }}
                        </div>
                    </div>

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

                <div
                    class="sticky bottom-0 left-0 z-10 px-2
                           bg-slate-200 dark:bg-slate-800 py-2 mt-6
                           flex justify-between rounded-t-lg
                           border border-gray-500 dark:border-gray-400">
                    <button type="button"
                            class="flex items-center btn px-2 py-0.5
                                   bg-sky-600 text-white text-sm font-semibold
                                   rounded-sm shadow-md
                                   transition-colors duration-300 ease-in-out
                                   hover:bg-sky-700 focus:bg-sky-700 focus:outline-none"
                            @click="emit('close')">
                        <span>
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                            </svg>
                        </span>
                        <span class="ml-1">
                            {{ t('cancel') }}
                        </span>
                    </button>
                    <!-- Блокируем кнопку во время отправки -->
                    <button type="submit"
                            class="flex items-center
                                   btn px-2 py-0.5
                                   bg-teal-500 shadow-md
                                   text-white text-sm font-semibold
                                   transition-colors duration-300 ease-in-out
                                   hover:bg-teal-600 focus:bg-teal-600 focus:outline-none"
                            :disabled="form.processing">
                        <span>
                            <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
                                <path
                                    d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
                            </svg>
                        </span>
                        <span class="ml-2">
                            {{ t('save') }}
                        </span>
                    </button>
                </div>
            </form>

        </div>
    </div>
</template>
