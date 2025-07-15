<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import LabelInput from '@/Components/Admin/Setting/Input/LabelInput.vue';
import InputLocale from '@/Components/Admin/Setting/Input/InputLocale.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import IconSaveButton from '@/Components/Admin/Buttons/IconSaveButton.vue';
import InfoIconButton from '@/Components/Admin/Setting/Button/InfoIconButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
    setting: Object
});

const localeSetting = ref(props.setting);
const localeForm = useForm({
    _method: 'PUT',
    value: localeSetting.value ? localeSetting.value.value : '',
});

const submitLocaleForm = async () => {
    if (localeSetting.value) {
        localeForm.put(route('admin.actions.settings.updateValue', localeSetting.value.id), {
            onSuccess: () => {
                // Перезагружаем страницу после успешного сохранения
                window.location.reload();
            },
            onError: (errors) => {
                // Обработка ошибок при обновлении настройки
                console.error('Ошибка при обновлении настройки locale:', errors);
            }
        });
    }
};

// Обработчик для проверки ввода только латинских букв в нижнем регистре
const handleLocale = (event) => {
    let value = event.target.value;
    value = value.toLowerCase().replace(/[^a-z]/g, ''); // Удаляем все символы, кроме латинских букв в нижнем регистре
    localeForm.value = value.slice(0, 2); // Ограничиваем длину до двух символов
};
</script>

<template>
    <form v-if="localeSetting" @submit.prevent="submitLocaleForm">
        <div class="mb-2 flex items-center space-x-4">
            <LabelInput for="value" :value="t('settingLocale')" class="whitespace-nowrap"/>
            <InputLocale
                id="value"
                type="text"
                v-model="localeForm.value"
                autocomplete="value"
                maxlength="2"
                class="text-center"
                @input="handleLocale"
            />
            <IconSaveButton :class="{ 'opacity-25': localeForm.processing }"
                            :disabled="localeForm.processing">
                {{ t('save') }}
            </IconSaveButton>
            <InfoIconButton @click="$emit('toggle-modal', localeSetting.description)"/>
        </div>
        <InputError class="mt-2" :message="localeForm.errors.value"/>
    </form>
</template>
