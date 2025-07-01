<script setup>
import {defineProps, watch, defineEmits} from 'vue';
import {useForm} from '@inertiajs/vue3';
import CloseIconButton from '@/Components/Admin/Buttons/CloseIconButton.vue';
import CancelButton from '@/Components/Admin/Buttons/CancelButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue';
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import MetaDescTextarea from '@/Components/Admin/Textarea/MetaDescTextarea.vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const props = defineProps({
    show: Boolean
});

const emit = defineEmits(['close']);

const form = useForm({
    type: '',
    option: '',
    value: '',
    constant: '',
    category: '',
    description: '',
    activity: false,
});

// Функция для преобразования camelCase в UPPER_CASE с нижним подчёркиванием
const toUpperCaseWithUnderscore = (str) => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
};

// Обработчик фокуса на поле constant
const handleConstantFocus = () => {
    if (form.option) {
        form.constant = toUpperCaseWithUnderscore(form.option);
    }
};

const submitForm = async () => {

    form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
    }));

    // console.log("Форма для отправки заполнена:", form.data());

    form.post(route('parameters.store'), {
        errorBag: 'createSetting',
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
                {{ t('createParameter') }}
            </h2>
            <form @submit.prevent="submitForm" class="p-3 w-full">
                <div class="pb-12">

                    <div class="mb-3 flex items-center">
                        <div class="flex justify-between w-full">
                            <div class="flex flex-row items-center">
                                <ActivityCheckbox v-model="form.activity"/>
                                <LabelCheckbox for="activity" :text="t('activity')"/>
                            </div>
                        </div>
                        <div class="flex flex-row items-center">
                            <LabelInput for="type" :value="t('type')" class="mr-3"/>
                            <InputText
                                id="type"
                                type="text"
                                v-model="form.type"
                                autocomplete="type"
                            />
                            <InputError class="mt-2" :message="form.errors.type"/>
                        </div>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="option" :value="t('parameterName')"/>
                        <InputText
                            id="option"
                            type="text"
                            v-model="form.option"
                            required
                            autocomplete="option"
                        />
                        <InputError class="mt-2" :message="form.errors.option"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="constant" :value="t('parameterConstant')"/>
                        <InputText
                            id="constant"
                            type="text"
                            v-model="form.constant"
                            @focus="handleConstantFocus"
                            required
                            autocomplete="constant"
                        />
                        <InputError class="mt-2" :message="form.errors.constant"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="value" :value="t('parameterValue')"/>
                        <InputText
                            id="value"
                            type="text"
                            v-model="form.value"
                            autocomplete="value"
                        />
                        <InputError class="mt-2" :message="form.errors.value"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="category" :value="t('parameterCategory')"/>
                        <InputText
                            id="category"
                            type="text"
                            v-model="form.category"
                            autocomplete="value"
                        />
                        <InputError class="mt-2" :message="form.errors.category"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="description" :value="t('parameterDescription')"/>
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ form.description.length }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.description" class="w-full"/>
                        <InputError class="mt-2" :message="form.errors.description"/>
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
