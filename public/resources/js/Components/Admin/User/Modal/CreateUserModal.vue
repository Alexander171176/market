<script setup>
import { defineProps, watch, defineEmits } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import CloseIconButton from '@/Components/Admin/Buttons/CloseIconButton.vue';
import CancelButton from '@/Components/Admin/Buttons/CancelButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import VueMultiselect from "vue-multiselect";

const { t } = useI18n();

const props = defineProps({
    show: Boolean,
    roles: Array,
    permissions: Array,
});

const emit = defineEmits(['close']);

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    roles: [],
    permissions: [],
});

const submitForm = async () => {
    form.transform((data) => ({
        ...data,
    }));

    // console.log("Форма для отправки заполнена:", form.data());

    form.post(route('users.store'), {
        errorBag: 'createUser',
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
                    bg-white dark:bg-gray-700
                    p-6
                    rounded-lg
                    shadow-lg
                    z-10
                    custom-scrollbar">
            <CloseIconButton @close="emit('close')"/>
            <h2 class="text-center text-2xl font-bold mb-4 text-gray-600 dark:text-slate-100 tracking-wide">
                {{ t('createUser') }}
            </h2>
            <form @submit.prevent="submitForm" class="p-3 w-full">
                <div class="pb-12">
                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="name" :value="t('userName')"/>
                        <InputText
                            id="name"
                            type="text"
                            v-model="form.name"
                            required
                            autocomplete="name"
                        />
                        <InputError class="mt-2" :message="form.errors.name"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="email" :value="t('userEmail')"/>
                        <InputText
                            id="email"
                            type="email"
                            v-model="form.email"
                            required
                            autocomplete="email"
                        />
                        <InputError class="mt-2" :message="form.errors.email"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="password" :value="t('userPassword')"/>
                        <InputText
                            id="password"
                            type="password"
                            v-model="form.password"
                            required
                            autocomplete="new-password"
                        />
                        <InputError class="mt-2" :message="form.errors.password"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="password_confirmation" :value="t('passwordConfirmation')"/>
                        <InputText
                            id="password_confirmation"
                            type="password"
                            v-model="form.password_confirmation"
                            required
                            autocomplete="new-password"
                        />
                        <InputError class="mt-2" :message="form.errors.password_confirmation"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="roles" :value="t('roles')" class="mb-1"/>
                        <VueMultiselect v-model="form.roles"
                                        :options="props.roles"
                                        :multiple="true"
                                        :close-on-select="true"
                                        :placeholder="t('select')"
                                        label="name"
                                        track-by="name"
                        />
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="permissions" :value="t('permissions')" class="mb-1"/>
                        <VueMultiselect v-model="form.permissions"
                                        :options="props.permissions"
                                        :multiple="true"
                                        :close-on-select="true"
                                        :placeholder="t('select')"
                                        label="name"
                                        track-by="name"
                        />
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
                            {{ t('save') }}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style src="../../../../../css/vue-multiselect.min.css"></style>
