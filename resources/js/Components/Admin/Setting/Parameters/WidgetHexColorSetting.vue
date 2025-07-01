<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import LabelInput from '@/Components/Admin/Setting/Input/LabelInput.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import IconSaveButton from '@/Components/Admin/Buttons/IconSaveButton.vue';
import InfoIconButton from '@/Components/Admin/Setting/Button/InfoIconButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
    setting: Object
});

const widgetHexColorSetting = ref(props.setting);
const widgetHexColorForm = useForm({
    _method: 'PUT',
    value: widgetHexColorSetting.value ? widgetHexColorSetting.value.value : '#000000', // значение по умолчанию
});

const submitWidgetHexColorForm = async () => {
    if (widgetHexColorSetting.value) {
        widgetHexColorForm.put(route('admin.actions.settings.updateValue', widgetHexColorSetting.value.id), {
            onSuccess: () => {
                console.log('Настройка widgetHexColor успешно обновлена');
            },
            onError: (errors) => {
                console.error('Ошибка при обновлении настройки widgetHexColor:', errors);
            }
        });
    }
};

// Обработчик для HEX-кода цвета с решеткой
const handleWidgetHexColorInput = (event) => {
    let value = event.target.value.toUpperCase();

    // Ограничиваем длину до 7 символов (#XXXXXX)
    if (value.length > 7) {
        value = value.slice(0, 7);
    }

    widgetHexColorForm.value = value;
};
</script>

<template>
    <form v-if="widgetHexColorSetting" @submit.prevent="submitWidgetHexColorForm">
        <div class="mb-2 flex items-center justify-between space-x-2">
            <div class="flex items-center justify-between space-x-2">
                <LabelInput for="value" :value="t('settingWidgetHexColorSetting')" class="w-full whitespace-nowrap"/>
                <input
                    id="value"
                    type="color"
                    v-model="widgetHexColorForm.value"
                    class="text-center w-72"
                    @input="handleWidgetHexColorInput"
                />
            </div>
            <div class="flex items-center justify-between space-x-2 min-w-20">
                <IconSaveButton class="ml-2" :class="{ 'opacity-25': widgetHexColorForm.processing }"
                                :disabled="widgetHexColorForm.processing">
                    {{ t('save') }}
                </IconSaveButton>
                <InfoIconButton @click="$emit('toggle-modal', widgetHexColorSetting.description)"/>
            </div>
        </div>
        <InputError class="mt-2" :message="widgetHexColorForm.errors.value"/>
    </form>
</template>
