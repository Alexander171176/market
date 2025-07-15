<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';
import { defineProps } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import MetaDescTextarea from '@/Components/Admin/Textarea/MetaDescTextarea.vue';
import InputNumber from '@/Components/Admin/Input/InputNumber.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import MultiImageUpload from "@/Components/Admin/Image/MultiImageUpload.vue";
import VueMultiselect from 'vue-multiselect';

// --- Инициализация ---
const toast = useToast();
const { t } = useI18n();

/**
 * Входные свойства компонента.
 */
defineProps({
    sections: Array,
    images: Array,
})

/**
 * Форма для создания.
 */
const form = useForm({
    sort: 0,
    title: '',
    link: '',
    short: '',
    comment: '',
    activity: false,
    left: false,
    right: false,
    sections: [],
    images: [] // Добавляем массив для загруженных изображений
});

/**
 * Отправляет данные формы для создания.
 */
const submitForm = () => {
    //console.log("📌 Отправляемые изображения перед трансформацией:", form.images);

    form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
        left: data.left ? 1 : 0,
        right: data.right ? 1 : 0,

        images: form.images.map(image => {
            if (image.file) {
                return { file: image.file, order: image.order, alt: image.alt, caption: image.caption }; // ✅ Новое изображение
            }
            if (image.id) {
                return { id: Number(image.id), order: image.order, alt: image.alt, caption: image.caption }; // ✅ Существующее изображение
            }
        }).filter(Boolean) // ❌ Убираем undefined/null
    }));

    //console.log("✅ Отправляемые изображения после трансформации:", form.images);

    form.post(route('admin.banners.store'), {
        preserveScroll: true,
        onSuccess: () => {
            // Действия при успехе (toast уведомление обычно делается через flash в HandleInertiaRequests)
            toast.success('Баннер успешно создан!');
            //console.log("✔️ Форма успешно отправлена.");
        },
        onError: (errors) => {
            console.error("❌ Не удалось отправить форму:", errors);
            // Можно показать toast с общей ошибкой или первой ошибкой из списка
            const firstError = errors[Object.keys(errors)[0]];
            toast.error(firstError || 'Пожалуйста, проверьте правильность заполнения полей.');
        }
    });
};

</script>

<template>
    <AdminLayout :title="t('createBanner')">
        <template #header>
            <TitlePage>
                {{ t('createBanner') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Кнопка назад -->
                    <DefaultButton :href="route('admin.banners.index')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                            </svg>
                        </template>
                        {{ t('back') }}
                    </DefaultButton>

                    <!-- Right: Actions -->
                    <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                        <!-- Datepicker built with flatpickr -->
                    </div>
                </div>
                <form @submit.prevent="submitForm" enctype="multipart/form-data" class="p-3 w-full">

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Активность -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.activity"/>
                            <LabelCheckbox for="activity" :text="t('activity')" class="text-sm h-8 flex items-center"/>
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
                            <LabelCheckbox for="left" :text="t('left')" class="text-sm h-8 flex items-center"/>
                        </div>

                        <!-- Показывать в правом сайдбаре -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.right"/>
                            <LabelCheckbox for="right" :text="t('right')" class="text-sm h-8 flex items-center"/>
                        </div>

                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="sections" :value="t('sections')" class="mb-1"/>
                        <VueMultiselect v-model="form.sections"
                                        :options="sections"
                                        :multiple="true"
                                        :close-on-select="true"
                                        :placeholder="t('select')"
                                        label="title"
                                        track-by="title"
                        />
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="title">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span> {{ t('bannerTitle') }}
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
                        <LabelInput for="link" :value="t('url')"/>
                        <InputText
                            id="link"
                            type="text"
                            v-model="form.link"
                            autocomplete="link"
                            pattern="^(https?:\/\/)?[A-Za-z0-9\.\-]+(:[0-9]+)?(\/[A-Za-z0-9\-\/]+)?$"
                            :title="t('urlVerification')"
                        />
                        <InputError class="mt-2" :message="form.errors.link"/>
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
                        <div class="flex justify-between w-full">
                            <LabelInput for="comment" :value="t('comment')"/>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.comment.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.comment" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.comment"/>
                    </div>

                    <MultiImageUpload @update:images="form.images = $event" />

                    <div class="flex items-center justify-center mt-4">
                        <DefaultButton :href="route('admin.banners.index')" class="mb-3">
                            <template #icon>
                                <!-- SVG -->
                                <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                                </svg>
                            </template>
                            {{ t('back') }}
                        </DefaultButton>
                        <PrimaryButton class="ms-4 mb-0" :class="{ 'opacity-25': form.processing }"
                                       :disabled="form.processing">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
                                    <path
                                        d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
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
