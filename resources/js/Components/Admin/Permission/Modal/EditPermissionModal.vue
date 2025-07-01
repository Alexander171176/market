<script setup>
import { defineProps, watch, defineEmits } from 'vue';
import { useForm } from '@inertiajs/vue3';
import CloseIconButton from '@/Components/Admin/Buttons/CloseIconButton.vue';
import CancelButton from '@/Components/Admin/Buttons/CancelButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    permission: {
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
    name: '',
});

// Инициализация данных в форме для модального окна
const updateForm = () => {
    form.name = props.permission?.name ?? '';

    // console.log("Форма дополнена данными:", {
    //     permission: props.permission
    // });
};

// Метод сохранения
const submitForm = async () => {
    form.transform((data) => ({
        ...data,
    }));

    // console.log("Форма для отправки заполнена:", form.data());

    form.post(route('permissions.update', props.permission.id), {
        errorBag: 'editPermission',
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

// Обновление формы при изменении пропсов show и permission
watch(
    () => props.show,
    (newShow) => {
        if (newShow) {
            updateForm();
        }
    }
);

watch(
    () => props.permission,
    (newPermission) => {
        updateForm();
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
                    bg-white dark:bg-gray-700
                    p-6
                    rounded-lg
                    shadow-lg
                    z-10
                    custom-scrollbar">
            <CloseIconButton @close="emit('close')"/>
            <h2 class="text-center text-2xl font-bold mb-4 text-gray-600 dark:text-slate-100 tracking-wide">
                {{ t('editPermission') }} ID: {{ props.permission.id }}
            </h2>
            <form @submit.prevent="submitForm" class="p-3 w-full">
                <div class="mb-3 flex flex-col items-start">
                    <LabelInput for="name" :value="t('permissionName')"/>
                    <InputText
                        id="name"
                        type="text"
                        v-model="form.name"
                        required
                        autocomplete="name"
                    />
                    <InputError class="mt-2" :message="form.errors.name"/>
                </div>
                <div class="mb-3 flex justify-end space-x-2">
                    <CancelButton @close="emit('close')"/>
                    <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
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
</template>
