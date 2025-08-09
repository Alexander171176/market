<script setup>
/**
 * @version PulsarCMS 1.0
 * Author: Александр Косолапов
 */
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import { transliterate } from '@/utils/transliteration';
import { defineProps } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import InputNumber from '@/Components/Admin/Input/InputNumber.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import SelectLocale from '@/Components/Admin/Select/SelectLocale.vue';

const { t } = useI18n()
const toast = useToast()

/**
 * Входные свойства
 * propertyValue — из PropertyValueResource
 */
const props = defineProps({
    propertyValue: { type: Object, required: true },
})

/**
 * Форма редактирования
 */
const form = useForm({
    activity: Boolean(props.propertyValue.activity ?? false),
    locale: props.propertyValue.locale ?? '',
    sort: props.propertyValue.sort ?? 0,
    name: props.propertyValue.name ?? '',
    slug: props.propertyValue.slug ?? '',
})

/**
 * Автоматически генерирует slug из поля name, если slug пуст.
 */
const handleUrlInputFocus = () => {
    if (form.name) {
        form.slug = transliterate(form.name.toLowerCase())
    }
}

/**
 * Сабмит обновления
 */
const submitForm = async () => {
    form.transform((data) => ({
        activity: data.activity ? 1 : 0,
        locale: data.locale,
        sort: data.sort,
        name: data.name,
        slug: data.slug || null,
    }))

    form.put(route('admin.property-values.update', { property_value: props.propertyValue.id }), {
        errorBag: 'editPropertyValue',
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Значение успешно обновлено!')
        },
        onError: (errors) => {
            console.error("❌ Ошибка при обновлении значения характеристики:", errors);
            const firstError = errors[Object.keys(errors)[0]];
            toast.error(firstError || 'Пожалуйста, проверьте правильность заполнения полей.');
        }
    })
}
</script>

<template>
    <AdminLayout :title="t('editPropertyValue')">
        <template #header>
            <TitlePage>
                {{ t('editPropertyValue') }}: {{ props.propertyValue.name }}
            </TitlePage>
        </template>

        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div
                class="p-4 bg-slate-50 dark:bg-slate-700
               border border-blue-400 dark:border-blue-200
               overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
               bg-opacity-95 dark:bg-opacity-95"
            >
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Назад -->
                    <DefaultButton :href="route('admin.property-values.index')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
                            </svg>
                        </template>
                        {{ t('back') }}
                    </DefaultButton>

                    <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
                </div>

                <form @submit.prevent="submitForm" class="p-3 w-full">
                    <!-- Верхняя панель: активность, локаль, сорт -->
                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">
                        <!-- Активность -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.activity" />
                            <LabelCheckbox for="activity" :text="t('activity')" class="text-sm h-8 flex items-center" />
                        </div>

                        <!-- Локализация -->
                        <div class="flex flex-row items-center gap-2 w-auto">
                            <SelectLocale v-model="form.locale" :errorMessage="form.errors.locale" />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.locale" />
                        </div>

                        <!-- Сортировка -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="sort" :value="t('sort')" class="text-sm" />
                            </div>
                            <InputNumber
                                id="sort"
                                type="number"
                                v-model="form.sort"
                                autocomplete="sort"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.sort" />
                        </div>
                    </div>

                    <!-- Имя значения -->
                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="name">
                                <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                                {{ t('name') }}
                            </LabelInput>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.name.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <InputText
                            id="name"
                            type="text"
                            v-model="form.name"
                            maxlength="255"
                            required
                            autocomplete="name"
                        />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <!-- Slug (опционально) -->
                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="slug">Slug</LabelInput>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ (form.slug || '').length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <InputText
                            id="slug"
                            type="text"
                            v-model="form.slug"
                            maxlength="255"
                            autocomplete="slug"
                            @focus="handleUrlInputFocus"
                        />
                        <InputError class="mt-2" :message="form.errors.slug" />
                    </div>

                    <!-- Кнопки -->
                    <div class="flex items-center justify-center mt-4">
                        <DefaultButton :href="route('admin.property-values.index')" class="mb-3">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path
                                        d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
                                </svg>
                            </template>
                            {{ t('back') }}
                        </DefaultButton>

                        <PrimaryButton class="ms-4 mb-0" :class="{ 'opacity-25': form.processing }"
                                       :disabled="form.processing">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
                                    <path
                                        d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
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

