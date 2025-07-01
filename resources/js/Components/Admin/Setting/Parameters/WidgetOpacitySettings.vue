<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import LabelInput from '@/Components/Admin/Setting/Input/LabelInput.vue';
import InputText from '@/Components/Admin/Setting/Input/InputText.vue';
import InputError from '@/Components/Admin/Input/InputError.vue';
import IconSaveButton from '@/Components/Admin/Buttons/IconSaveButton.vue';
import InfoIconButton from '@/Components/Admin/Setting/Button/InfoIconButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
    setting: Object
});

const widgetOpacitySetting = ref(props.setting);
const widgetOpacityForm = useForm({
    _method: 'PUT',
    value: widgetOpacitySetting.value ? widgetOpacitySetting.value.value : '1.00', // значение по умолчанию
});

const submitWidgetOpacity = async () => {
    if (widgetOpacitySetting.value) {
        widgetOpacityForm.put(route('admin.actions.settings.updateValue', widgetOpacitySetting.value.id), {
            onSuccess: () => {
                console.log('Настройка widgetOpacity успешно обновлена');
            },
            onError: (errors) => {
                console.error('Ошибка при обновлении настройки widgetOpacity:', errors);
            }
        });
    }
};

// Обработчик для значения прозрачности
const handleOpacityInput = (event) => {
    let value = event.target.value;

    // Оставляем только цифры и одну точку
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
        if (value.indexOf('.') >= 0) {
            // Обрезаем до двух знаков после точки
            value = value.substring(0, value.indexOf('.') + 3);
        }

        // Принудительно ограничиваем значения в пределах 0.00 - 1.00
        let numericValue = parseFloat(value);
        if (numericValue > 1) {
            value = '1.00';
        } else if (numericValue < 0) {
            value = '0.00';
        }

        widgetOpacityForm.value = value;
    } else {
        // Если значение не соответствует формату, сбрасываем его
        widgetOpacityForm.value = '0.00';
    }
};
</script>

<template>
    <form v-if="widgetOpacitySetting" @submit.prevent="submitWidgetOpacity">
        <div class="mb-2 flex items-center space-x-4">
            <LabelInput for="value" :value="t('settingWidgetOpacity')" class="whitespace-nowrap"/>
            <InputText
                id="value"
                type="text"
                v-model="widgetOpacityForm.value"
                autocomplete="value"
                @input="handleOpacityInput"
                class="text-center w-20"
                maxlength="4" />
            <IconSaveButton :class="{ 'opacity-25': widgetOpacityForm.processing }"
                            :disabled="widgetOpacityForm.processing">
                {{ t('save') }}
            </IconSaveButton>
            <InfoIconButton @click="$emit('toggle-modal', widgetOpacitySetting.description)"/>
        </div>
        <InputError class="mt-2" :message="widgetOpacityForm.errors.value"/>
    </form>
</template>
