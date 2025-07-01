<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import LabelInput from '@/Components/Admin/Setting/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Setting/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import IconSaveButton from '@/Components/Admin/Buttons/IconSaveButton.vue';
import InfoIconButton from '@/Components/Admin/Setting/Button/InfoIconButton.vue';
import { useToast } from "vue-toastification";
import { useI18n } from 'vue-i18n';

// --- Инициализация ---
const toast = useToast();
const { t } = useI18n();

const props = defineProps({
    setting: Object
});

const siteLayoutSetting = ref(props.setting);
const siteLayoutForm = useForm({
    _method: 'PUT',
    value: siteLayoutSetting.value ? siteLayoutSetting.value.value : '',
});

const submitSiteLayoutForm = async () => {
    if (siteLayoutSetting.value) {
        siteLayoutForm.put(route('admin.actions.settings.updateValue', siteLayoutSetting.value.id), {
            onSuccess: () => {
                // console.log('Настройка siteLayout успешно обновлена');
                toast.success('Настройка siteLayout успешно обновлена!');
            },
            onError: (errors) => {
                // console.error('Ошибка при обновлении настройки siteLayout:', errors);
                const firstError = errors[Object.keys(errors)[0]];
                toast.error(firstError || 'Ошибка при обновлении настройки siteLayout.');
            }
        });
    }
};

const handleSiteLayoutInput = (event) => {
    let value = event.target.value;
    value = value.charAt(0).toUpperCase() + value.slice(1);
    value = value.replace(/[^a-zA-Z]/g, '');
    siteLayoutForm.value = value;
};
</script>

<template>
    <form v-if="siteLayoutSetting" @submit.prevent="submitSiteLayoutForm">
        <div class="mb-2 flex items-center space-x-4">
            <LabelInput for="value" :value="t('settingSiteLayout')" class="whitespace-nowrap"/>
            <InputText
                id="value"
                type="text"
                v-model="siteLayoutForm.value"
                autocomplete="value"
                @input="handleSiteLayoutInput"/>
            <IconSaveButton :class="{ 'opacity-25': siteLayoutForm.processing }"
                            :disabled="siteLayoutForm.processing">
                {{ t('save') }}
            </IconSaveButton>
            <InfoIconButton @click="$emit('toggle-modal', siteLayoutSetting.description)"/>
        </div>
        <InputError class="mt-2" :message="siteLayoutForm.errors.value"/>
    </form>
</template>
