<script setup>
import { defineProps, onMounted, watch, defineEmits } from 'vue';
import { useForm } from '@inertiajs/vue3';
import CloseIconButton from '@/Components/Admin/Buttons/CloseIconButton.vue';
import CancelButton from '@/Components/Admin/Buttons/CancelButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import DescriptionTextarea from '@/Components/Admin/Textarea/DescriptionTextarea.vue';
import { useI18n } from 'vue-i18n';
import InputNumber from "@/Components/Admin/Input/InputNumber.vue";
import CKEditor from "@/Components/Admin/CKEditor/CKEditor.vue";

const { t } = useI18n();

const props = defineProps({
    plugin: {
        type: Object,
        default: null
    },
    show: {
        type: Boolean,
        required: true
    },
});

const emit = defineEmits(['close']);

const form = useForm({
    _method: 'PUT',
    sort: 0,
    icon: '',
    name: '',
    version: '',
    description: '',
    readme: '',
    options: '',
    code: '',
    templates: '',
    activity: false,
});

// Инициализация данных в форме для модального окна
const updateForm = () => {
    form.sort = props.plugin?.sort ?? '';
    form.icon = props.plugin?.icon ?? '';
    form.name = props.plugin?.name ?? '';
    form.version = props.plugin?.version ?? '';
    form.description = props.plugin?.description ?? '';
    form.readme = props.plugin?.readme ?? '';
    form.options = props.plugin?.options ?? '';
    form.code = props.plugin?.code ?? '';
    form.templates = props.plugin?.templates ?? '';
    form.activity = Boolean(props.plugin?.activity ?? false);

    // console.log("Форма дополнена данными:", {
    //     plugin: props.plugin
    // });
};

// Метод сохранения
const submitForm = async () => {
    form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
    }));

    // console.log("Форма для отправки заполнена:", form.data());

    form.post(route('plugins.update', props.plugin.id), {
        errorBag: 'editPlugin',
        preserveScroll: true,
        onSuccess: () => {
            // console.log("Форма успешно обновлена.");
            emit('close'); // Закрываем модальное окно
        },
        onError: (errors) => {
            // console.error("Не удалось обновить форму:", errors);
        }
    });
};

// Путь к изображению и вывод рубрик
onMounted(() => {
    updateForm();
});

// Обновление формы при изменении пропсов show и plugin
watch(
    () => props.show,
    (newShow) => {
        if (newShow) {
            updateForm();
        }
    }
);

watch(
    () => props.plugin,
    (newSetting) => {
        updateForm();
    }
);

// Метод для фильтрации ввода
const filterInput = (value) => {
    return value.replace(/[^a-zA-Z0-9\s\.,;:?!@#$%^&*()_+\-=[\]{}|<>\/\\~`"'—–—]/g, '');
};

// Метод для капитализации первой буквы
const capitalizeFirstLetter = (value) => {
    if (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
};

// Наблюдатели за изменением полей
watch(() => form.icon, (newVal) => {
    form.icon = filterInput(newVal);
});

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
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto custom-scrollbar">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="absolute
                    w-full
                    max-w-screen-2xl
                    max-h-screen
                    overflow-y-auto
                    bg-white dark:bg-gray-800
                    p-6
                    rounded-lg
                    shadow-lg
                    z-10
                    custom-scrollbar">
            <CloseIconButton @close="emit('close')"/>
            <h2 class="text-center text-2xl font-bold mb-4 text-gray-600 dark:text-slate-100 tracking-wide">
                {{ t('editModule') }} ID: {{ props.plugin.id }}
            </h2>
            <form @submit.prevent="submitForm" enctype="multipart/form-data" class="p-3 w-full">
                <div class="pb-12">

                    <div class="mb-3 flex items-center justify-center">
                        <div class="mb-3 flex flex-col items-start">
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
                        <div class="mb-3 flex flex-col items-start ml-2">
                            <LabelInput for="version" :value="t('version')"/>
                            <InputText
                                id="version"
                                type="text"
                                v-model="form.version"
                                autocomplete="version"
                            />
                            <InputError class="mt-2" :message="form.errors.version"/>
                        </div>
                    </div>

                    <div class="mb-3 flex items-center">
                        <div class="flex justify-between w-full">
                            <div class="flex flex-row items-center">
                                <ActivityCheckbox v-model="form.activity"/>
                                <LabelCheckbox for="activity" :text="t('activity')"/>
                            </div>
                        </div>
                        <div class="flex flex-row items-center">
                            <LabelInput for="sort" :value="t('sort')" class="mr-3"/>
                            <InputNumber
                                id="sort"
                                type="number"
                                v-model="form.sort"
                                autocomplete="sort"
                            />
                            <InputError class="mt-2" :message="form.errors.sort"/>
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

                </div>
                <div class="fixed
                            bottom-0
                            left-1/2
                            transform -translate-x-1/2
                            bg-white dark:bg-gray-800
                            p-4
                            shadow-md
                            z-20
                            w-full max-w-screen-2xl">
                    <div class="flex justify-end">
                        <PrimaryButton type="submit">{{ t('save') }}</PrimaryButton>
                        <CancelButton @click="emit('close')" class="ml-2"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
