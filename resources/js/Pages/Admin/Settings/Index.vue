<script setup>
import {ref, watch, defineProps} from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import SiteLayoutSetting from '@/Components/Admin/Setting/Parameters/SiteLayoutSetting.vue';
import DowntimeSetting from '@/Components/Admin/Setting/Parameters/DowntimeSetting.vue';
import LocaleSetting from '@/Components/Admin/Setting/Parameters/LocaleSetting.vue';
import WidgetHexColorSetting from '@/Components/Admin/Setting/Parameters/WidgetHexColorSetting.vue';
import WidgetOpacitySettings from '@/Components/Admin/Setting/Parameters/WidgetOpacitySettings.vue';
import Modal from '@/Components/Admin/Setting/Modal/Modal.vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

// Определение пропсов
const props = defineProps({
    settings: {
        type: Array,
        required: true,
    },
});

const showModal = ref(false);
const modalDescription = ref('');

const toggleModal = (description = '') => {
    modalDescription.value = description;
    showModal.value = !showModal.value;
};

// Найти настройки
const siteLayoutSetting = ref(props.settings.find(s => s.option === 'siteLayout') || null);
const downtimeSetting = ref(props.settings.find(s => s.option === 'downtimeSite') || null);
const localeSetting = ref(props.settings.find(s => s.option === 'locale') || null);
const widgetHexColorSetting = ref(props.settings.find(s => s.option === 'widgetHexColor') || null);
const widgetOpacitySetting = ref(props.settings.find(s => s.option === 'widgetOpacity') || null);

// Обновление настроек
watch(
    () => props.settings,
    (newSettings) => {
        siteLayoutSetting.value = newSettings.find(s => s.option === 'siteLayout') || null;
        downtimeSetting.value = newSettings.find(s => s.option === 'downtimeSite') || null;
        localeSetting.value = newSettings.find(s => s.option === 'locale') || null;
        widgetHexColorSetting.value = newSettings.find(s => s.option === 'widgetHexColor') || null;
        widgetOpacitySetting.value = newSettings.find(s => s.option === 'widgetOpacity') || null;
    },
    {immediate: true}
);
</script>

<template>
    <AdminLayout :title="t('siteSettingsTitle')">
        <template #header>
            <TitlePage>
                {{ t('siteSettingsTitle') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95 space-x-4">

                <!-- Компонент для настройки siteLayout -->
                <SiteLayoutSetting
                    v-if="siteLayoutSetting"
                    :setting="siteLayoutSetting"
                    @toggle-modal="toggleModal"
                />

                <!-- Компонент для настройки downtimeSite -->
                <DowntimeSetting
                    v-if="downtimeSetting"
                    :setting="downtimeSetting"
                    @toggle-modal="toggleModal"
                />

            </div>
        </div>

        <!-- Модальное окно -->
        <Modal
            v-if="showModal"
            :showModal="showModal"
            :modalDescription="modalDescription"
            @toggleModal="toggleModal"
        />

    </AdminLayout>
</template>
