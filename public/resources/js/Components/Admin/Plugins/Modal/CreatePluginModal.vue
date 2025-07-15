<script setup>
import { defineProps, watch, defineEmits } from 'vue';
import { useForm } from '@inertiajs/vue3';
import CloseIconButton from '@/Components/Admin/Buttons/CloseIconButton.vue';
import CancelButton from '@/Components/Admin/Buttons/CancelButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import InputNumber from '@/Components/Admin/Input/InputNumber.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import DescriptionTextarea from '@/Components/Admin/Textarea/DescriptionTextarea.vue';
import { useI18n } from 'vue-i18n';
import CKEditor from "@/Components/Admin/CKEditor/CKEditor.vue";
import InputText from "@/Components/Admin/Input/InputText.vue";

const { t } = useI18n();

const props = defineProps({
    show: Boolean
});

const emit = defineEmits(['close']);

const form = useForm({
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

const submitForm = async () => {
    form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
    }));

    // console.log("Форма для отправки заполнена:", form.data());

    form.post(route('plugins.store'), {
        errorBag: 'createPlugin',
        preserveScroll: true,
        onSuccess: () => {
            // console.log("Форма успешно отправлена.");
            emit('close'); // Закрываем модальное окно
        },
        onError: (errors) => {
            // console.error("Не удалось отправить форму:", errors);
        }
    });
};

// обновление формы при изменении пропсов show
watch(
    () => props.show,
    (newShow) => {
        if (newShow) {
            form.reset();
        }
    }
);

// Функция для блокировки ввода кириллицы и разрешения только латинских букв, цифр и любых символов
const restrictInput = (value) => {
    return value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, '');
};

// Функция для преобразования первой буквы в заглавную
const capitalizeFirstLetter = (value) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
};

// Применение ограничения ввода и преобразования первой буквы к нужным полям
watch(() => form.name, (value) => {
    form.name = capitalizeFirstLetter(restrictInput(value));
});

watch(() => form.templates, (value) => {
    form.templates = capitalizeFirstLetter(restrictInput(value));
});

watch(() => form.icon, (value) => {
    form.icon = restrictInput(value);
});

watch(() => form.options, (value) => {
    form.options = restrictInput(value);
});

watch(() => form.code, (value) => {
    form.code = restrictInput(value);
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
                {{ t('registerModule') }}
            </h2>
            <form @submit.prevent="submitForm" class="p-3 w-full">
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
                    <div class="flex justify-end space-x-2">
                        <CancelButton @close="emit('close')"/>
                        <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }"
                                       :disabled="form.processing">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
                                    <path
                                        d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
                                </svg>
                            </template>
                            {{ t('create') }}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
