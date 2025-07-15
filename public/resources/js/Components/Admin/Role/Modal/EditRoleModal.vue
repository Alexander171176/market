<script setup>
import { defineProps, onMounted, watch, defineEmits } from 'vue';
import { useForm } from '@inertiajs/vue3';
import VueMultiselect from 'vue-multiselect';
import CloseIconButton from '@/Components/Admin/Buttons/CloseIconButton.vue';
import CancelButton from '@/Components/Admin/Buttons/CancelButton.vue';
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import DeleteIcon from '@/Components/Admin/Buttons/DeleteIcon.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    role: {
        type: Object,
        required: true
    },
    permissions: {
        type: Array,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    },
});

const emit = defineEmits(['close']);

const form = useForm({
    _method: 'PUT',
    name: props.role?.name ?? '',
    permissions: []
});

const updateForm = () => {
    form.name = props.role?.name ?? '';
    form.permissions = props.role?.permissions ?? [];
    // console.log("Форма дополнена данными:", {
    //     role: props.role,
    //     permissions: props.permissions
    // });
};

const submitForm = async () => {
    form.transform((data) => ({
        ...data,
    }));

    // console.log("Форма готова к отправке:", form.data());

    form.post(route('roles.update', props.role.id), {
        errorBag: 'editRole',
        preserveScroll: true,
        onSuccess: () => {
            // console.log("Форма успешно обновлена.");
            emit('close');
        },
        onError: (errors) => {
            // console.error("Не удалось обновить форму:", errors);
        }
    });
};

const removePermission = async (permissionId) => {
    const url = route('roles.permissions.destroy', [props.role.id, permissionId]);
    try {
        await form.delete(url, {
            onSuccess: () => {
                const index = form.permissions.findIndex(permission => permission.id === permissionId);
                if (index !== -1) {
                    form.permissions.splice(index, 1);
                    props.role.permissions.splice(index, 1);
                }
            },
            onError: (errors) => {
                // console.error("Не удалось удалить разрешение:", errors);
            }
        });
    } catch (error) {
        // console.error("Ошибка при удалении разрешения:", error);
    }
};

onMounted(() => {
    form.permissions = props.role?.permissions ?? [];
});

watch(
    () => props.show,
    (newShow) => {
        if (newShow) {
            updateForm();
        }
    }
);

watch(
    () => props.role,
    (newRole) => {
        form.permissions = newRole?.permissions ?? [];
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
                {{ t('editRole') }} ID: {{ props.role.id }}
            </h2>
            <form @submit.prevent="submitForm" class="p-3 w-full">
                <div class="pb-12">
                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="name" :value="t('roleName')" />
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
                </div>
            </form>

            <div v-if="props.role.permissions && props.role.permissions.length > 0"
                 class="bg-white shadow-lg rounded-sm border border-slate-200 relative w-full dark:bg-sky-900 mt-4">
                <div class="px-5 py-4">
                    <h2 class="text-lg text-center font-semibold text-amber-500 dark:text-amber-200">
                        {{ t('rolePermissions') }}
                    </h2>
                </div>
                <div class="max-h-96 overflow-y-auto"> <!-- Добавлена вертикальная прокрутка и максимальная высота -->
                    <table class="table-auto w-full">
                        <thead
                            class="text-xs font-semibold uppercase
                                    text-slate-700
                                    bg-slate-50
                                    border-t border-b border-slate-200
                                    dark:bg-cyan-800 dark:text-slate-100">
                        <tr>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                                <div class="font-semibold text-left">{{ t('id') }}</div>
                            </th>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="font-semibold text-left">{{ t('name') }}</div>
                            </th>
                            <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                <div class="font-semibold text-end">{{ t('actions') }}</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody
                            class="text-lg font-semibold divide-y divide-slate-200 text-teal-600 dark:text-violet-200">
                        <tr v-for="rolePermission in props.role.permissions" :key="rolePermission.id">
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap px">
                                <div class="text-left">{{ rolePermission.id }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left">{{ rolePermission.name }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="flex justify-end">
                                    <DeleteIcon @click="removePermission(rolePermission.id)"/>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<style src="../../../../../css/vue-multiselect.min.css"></style>
