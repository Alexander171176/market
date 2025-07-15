<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import {defineProps} from 'vue';
import {transliterate} from '@/utils/transliteration';
import {useI18n} from 'vue-i18n';
import { useToast } from 'vue-toastification';
import {useForm} from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import MetatagsButton from '@/Components/Admin/Buttons/MetatagsButton.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import DescriptionTextarea from "@/Components/Admin/Textarea/DescriptionTextarea.vue";
import MetaDescTextarea from '@/Components/Admin/Textarea/MetaDescTextarea.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import InputNumber from '@/Components/Admin/Input/InputNumber.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import CKEditor from "@/Components/Admin/CKEditor/CKEditor.vue";
import SelectLocale from "@/Components/Admin/Select/SelectLocale.vue";
import ClearMetaButton from "@/Components/Admin/Buttons/ClearMetaButton.vue";
import TinyEditor from "@/Components/Admin/TinyEditor/TinyEditor.vue";
import VueMultiselect from "vue-multiselect";

// --- Инициализация ---
const {t} = useI18n();
const toast = useToast();

/**
 * Входные свойства компонента.
 */
const props = defineProps({
    rubric: { type: Object, required: true },
    sections: Array,
});

/**
 * Формируем форму редактирования.
 */
const form = useForm({
    _method: 'PUT',
    sort: props.rubric.sort ?? 0,
    icon: props.rubric.icon ?? '',
    locale: props.rubric.locale ?? '',
    title: props.rubric.title ?? '',
    url: props.rubric.url ?? '',
    short: props.rubric.short ?? '',
    description: props.rubric.description ?? '',
    meta_title: props.rubric.meta_title ?? '',
    meta_keywords: props.rubric.meta_keywords ?? '',
    meta_desc: props.rubric.meta_desc ?? '',
    activity: Boolean(props.rubric.activity ?? false),
    sections: props.rubric.sections ?? [],
});

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
    if (!text || text.length <= maxLength) return text || ''; // Добавим проверку на null/undefined
    // Ищем последний пробел ДО максимальной длины
    const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
    // Если пробела нет или он в самом начале, просто режем по maxLength
    const truncated = lastSpaceIndex > 0 ? text.substr(0, lastSpaceIndex) : text.substr(0, maxLength);
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
const submitForm = async () => {
    form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
    }));

    form.post(route('admin.rubrics.update', props.rubric.id), {
        errorBag: 'editRubric',
        preserveScroll: true,
        onSuccess: () => {
            // Сообщение об успехе будет показано через flash из HandleInertiaRequests
            toast.success('Рубрика успешно обновлена!'); // Можно добавить, если нужно кастомное
        },
        onError: (errors) => {
            // console.error("Ошибка обновления рубрики:", errors);
            const firstError = errors[Object.keys(errors)[0]];
            toast.error(firstError || 'Пожалуйста, проверьте правильность заполнения полей.')
        }
    });
};
</script>

<template>
    <AdminLayout :title="t('editRubric')">
        <template #header>
            <TitlePage>
                {{ t('editRubric') }}: {{ props.rubric.title }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Кнопка назад -->
                    <DefaultButton :href="route('admin.rubrics.index')">
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
                        <LabelInput for="icon" :value="t('svg')"/>
                        <DescriptionTextarea v-model="form.icon" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.icon"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="title">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span> {{ t('rubricTitle') }}
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
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span> {{ t('rubricUrl') }}
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

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="meta_title" :value="t('metaTitle')"/>
                            <div class="text-xs text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.meta_title.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <InputText
                            id="meta_title"
                            type="text"
                            v-model="form.meta_title"
                            maxlength="255"
                            autocomplete="url"
                        />
                        <InputError class="mt-2" :message="form.errors.meta_title"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="meta_keywords" :value="t('metaKeywords')"/>
                            <div class="text-xs text-gray-900 dark:text-gray-400 mt-1">
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
                            <div class="text-xs text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.meta_desc.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.meta_desc" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.meta_desc"/>
                    </div>

                    <div class="flex justify-end mt-4">
                        <!-- Кнопка очистки мета-полей -->
                        <ClearMetaButton @clear="clearMetaFields" class="mr-4">
                            <template #default>
                                <svg class="w-4 h-4 fill-current text-gray-500 shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5V7h6v2z"/>
                                </svg>
                                {{ t('clearMetaFields') }}
                            </template>
                        </ClearMetaButton>
                        <MetatagsButton @click.prevent="generateMetaFields">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-600 shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path
                                        d="M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z"></path>
                                </svg>
                            </template>
                            {{ t('generateMetaTags') }}
                        </MetatagsButton>
                    </div>

                    <div class="flex items-center justify-center mt-4">
                        <DefaultButton :href="route('admin.rubrics.index')" class="mb-3">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path
                                        d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
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
