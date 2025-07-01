<script setup>
/**
 * @version PulsarCMS 1.0
 * @author Александр Косолапов <kosolapov1976@gmail.com>
 */
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import InputNumber from '@/Components/Admin/Input/InputNumber.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import DescriptionTextarea from '@/Components/Admin/Textarea/DescriptionTextarea.vue';
import CKEditor from '@/Components/Admin/CKEditor/CKEditor.vue';

// --- Инициализация ---
const toast = useToast();
const {t} = useI18n();

/**
 * Входные свойства компонента.
 */
const props = defineProps({
    plugin: {
        type: Object,
        required: true
    },
});

/**
 * Формируем форму редактирования.
 */
const form = useForm({
    _method: 'PUT',
    sort: props.plugin?.sort ?? '',
    icon: props.plugin?.icon ?? '',
    name: props.plugin?.name ?? '',
    version: props.plugin?.version ?? '',
    description: props.plugin?.description ?? '',
    readme: props.plugin?.readme ?? '',
    options: props.plugin?.options ?? '',
    code: props.plugin?.code ?? '',
    templates: props.plugin?.templates ?? '',
    activity: Boolean(props.plugin?.activity ?? false),
});

const updateForm = () => {
    form.reset({
        _method: 'PUT',
        sort: props.plugin?.sort ?? '',
        icon: props.plugin?.icon ?? '',
        name: props.plugin?.name ?? '',
        version: props.plugin?.version ?? '',
        description: props.plugin?.description ?? '',
        readme: props.plugin?.readme ?? '',
        options: props.plugin?.options ?? '',
        code: props.plugin?.code ?? '',
        templates: props.plugin?.templates ?? '',
        activity: Boolean(props.plugin?.activity ?? false),
    });
};

watch(() => props.plugin, updateForm);

const filterInput = (value) => {
    return value.replace(/[^a-zA-Z0-9\s\.,;:?!@#$%^&*()_+\-=[\]{}|<>\/\\~`"'—–—]/g, '');
};

/**
 * Функция для преобразования первой буквы в заглавную.
 */
const capitalizeFirstLetter = (value) => {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
};

watch(() => form.icon, (newVal) => {
    form.icon = filterInput(newVal);
});

/**
 * Применение ограничения ввода и преобразования первой буквы к нужным полям.
 */
watch(() => form.name, (newVal) => {
    form.name = filterInput(newVal);
    form.name = capitalizeFirstLetter(form.name);
});

watch(() => form.options, (newVal) => {
    form.options = filterInput(newVal);
});

watch(() => form.code, (newVal) => {
    form.code = filterInput(newVal);
});

watch(() => form.templates, (newVal) => {
    form.templates = filterInput(newVal);
    form.templates = capitalizeFirstLetter(form.templates);
});
</script>

<template>
    <AdminLayout :title="t('editModule')">
        <template #header>
            <TitlePage>
                {{ t('editModule') }}: {{ props.plugin.name }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Кнопка назад -->
                    <DefaultButton :href="route('admin.plugins.index')">
                        <template #icon>
                            <!-- SVG -->
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                            </svg>
                        </template>
                        {{ t('back') }}
                    </DefaultButton>

                    <!-- Right: Actions -->
                    <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                        <!-- Datepicker built with flatpickr -->
                    </div>
                </div>
                <form @submit.prevent="form.put(route('admin.plugins.update', plugin.id))" class="p-3 w-full">

                <div class="mb-3 flex items-center justify-center">
                        <div class="flex flex-col items-start mr-4">
                            <LabelInput for="name" :value="t('nameModule')"/>
                            <InputText
                                id="name"
                                type="text"
                                v-model="form.name"
                                required
                                autocomplete="name"
                            />
                            <InputError class="mt-2" :message="form.errors.name"/>
                        </div>
                        <div class="flex flex-col items-start mr-4">
                            <LabelInput for="version" :value="t('version')"/>
                            <InputText
                                id="version"
                                type="text"
                                v-model="form.version"
                                autocomplete="version"
                            />
                            <InputError class="mt-2" :message="form.errors.version"/>
                        </div>
                        <div class="flex flex-col items-start mx-4">
                            <LabelInput for="sort" :value="t('sort')" class="mr-3"/>
                            <InputNumber
                                id="sort"
                                type="number"
                                v-model="form.sort"
                                autocomplete="sort"
                            />
                            <InputError class="mt-2" :message="form.errors.sort"/>
                        </div>
                        <div class="flex items-center justify-center flex-row mt-4">
                            <ActivityCheckbox v-model="form.activity"/>
                            <LabelCheckbox for="activity" :text="t('activity')"/>
                        </div>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="icon" :value="t('icon')"/>
                        <DescriptionTextarea v-model="form.icon" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.icon"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="description" :value="t('description')"/>
                        <DescriptionTextarea v-model="form.description" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.description"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="readme" :value="t('readme')"/>
                        <CKEditor v-model="form.readme" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.readme"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="options" :value="t('options')"/>
                        <DescriptionTextarea v-model="form.options" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.options"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="code" :value="t('serviceCode')"/>
                        <InputText
                            id="code"
                            type="text"
                            v-model="form.code"
                            autocomplete="code"
                        />
                        <InputError class="mt-2" :message="form.errors.code"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="templates" :value="t('inTemplates')"/>
                        <DescriptionTextarea v-model="form.templates" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.templates"/>
                    </div>

                    <div class="flex items-center justify-center mt-4">
                        <DefaultButton :href="route('admin.plugins.index')" class="mb-3">
                            <template #icon>
                                <!-- SVG -->
                                <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                                </svg>
                            </template>
                            {{ t('back') }}
                        </DefaultButton>
                        <PrimaryButton class="ms-4" type="submit">{{ t('save') }}</PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
