<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import LabelInput from '@/Components/Admin/Setting/Input/LabelInput.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import IconSaveButton from '@/Components/Admin/Buttons/IconSaveButton.vue';
import SettingsCheckbox from '@/Components/Admin/Setting/Input/SettingsCheckbox.vue';
import InfoIconButton from '@/Components/Admin/Setting/Button/InfoIconButton.vue';
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';

// --- Инициализация ---
const toast = useToast();
const { t } = useI18n();

const props = defineProps({
    setting: Object
});

const downtimeSetting = ref(props.setting);
const downtimeForm = useForm({
    _method: 'PUT',
    value: downtimeSetting.value ? (downtimeSetting.value.value === 'true' ? 'true' : 'false') : 'false',
});

const submitDowntimeForm = async () => {
    if (downtimeSetting.value) {
        downtimeForm.value = downtimeForm.value === 'true' ? 'true' : 'false';
        downtimeForm.put(route('admin.actions.settings.updateValue', downtimeSetting.value.id), {
            onSuccess: () => {
                // console.log('Настройка downtimeSite успешно обновлена');
                toast.success('Настройка downtimeSite успешно обновлена!');
            },
            onError: (errors) => {
                console.error('Ошибка при обновлении настройки downtimeSite:', errors);
                const firstError = errors[Object.keys(errors)[0]];
                toast.error(firstError || 'Ошибка при обновлении настройки downtimeSite.');
            }
        });
    }
};
</script>

<template>
    <form v-if="downtimeSetting" @submit.prevent="submitDowntimeForm">
        <div class="mb-2 flex items-center justify-between space-x-4">
            <LabelInput for="downtimeSite" :value="t('settingDowntimeSite')" class="whitespace-nowrap"/>
            <div class="flex items-center space-x-4">
                <SettingsCheckbox
                    id="downtimeSite"
                    v-model="downtimeForm.value"/>
                <IconSaveButton :class="{ 'opacity-25': downtimeForm.processing }" :disabled="downtimeForm.processing">
                    {{ t('save') }}
                </IconSaveButton>
                <InfoIconButton @click="$emit('toggle-modal', downtimeSetting.description)"/>
            </div>
        </div>
        <InputError class="mt-2" :message="downtimeForm.errors.value"/>
    </form>
</template>
