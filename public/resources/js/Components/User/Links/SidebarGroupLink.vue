<script setup>
import {ref, watch, onMounted, onUnmounted, computed} from 'vue';
import { useI18n } from 'vue-i18n';
import Draggable from 'vuedraggable';
import DraggableSidebarLink from '@/Components/User/Links/DraggableSidebarLink.vue';
import {usePage} from "@inertiajs/vue3";

const { siteSettings } = usePage().props;
const props = defineProps({
    expanded: Boolean
});

// Реф для хранения состояния темного режима (true, если активен)
const isDarkMode = ref(false);
let observer;

// Функция для проверки наличия класса "dark" на <html>
const checkDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
};

// При монтировании компонента запускаем первоначальную проверку и устанавливаем MutationObserver
onMounted(() => {
    checkDarkMode();
    observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
});

// При размонтировании отключаем наблюдатель
onUnmounted(() => {
    if (observer) observer.disconnect();
});

const colorTextActive = computed(() => {
    return isDarkMode.value
        ? (siteSettings.AdminSidebarDarkActiveText || 'text-yellow-200')
        : (siteSettings.AdminSidebarLightActiveText || 'text-yellow-200');
});

const emit = defineEmits(['update:mainLinks', 'update:hiddenLinks']);
const { t } = useI18n();

const mainLinks = ref(JSON.parse(localStorage.getItem('mainLinks')) || [
    'dashboard',
    'profile',
]);

const hiddenLinks = ref(JSON.parse(localStorage.getItem('hiddenLinks')) || [
    'apiTokens',
    'teamSettings',
]);

const showHiddenLinks = ref(false);

const toggleHiddenLinks = () => {
    showHiddenLinks.value = !showHiddenLinks.value;
};

const handleDragEnd = () => {
    localStorage.setItem('mainLinks', JSON.stringify(mainLinks.value));
    localStorage.setItem('hiddenLinks', JSON.stringify(hiddenLinks.value));
    emit('update:mainLinks', mainLinks.value);
    emit('update:hiddenLinks', hiddenLinks.value);
};

watch(mainLinks, (newVal) => {
    localStorage.setItem('mainLinks', JSON.stringify(newVal));
    emit('update:mainLinks', newVal);
});

watch(hiddenLinks, (newVal) => {
    localStorage.setItem('hiddenLinks', JSON.stringify(newVal));
    emit('update:hiddenLinks', newVal);
});

onMounted(() => {
    mainLinks.value = JSON.parse(localStorage.getItem('mainLinks')) || mainLinks.value;
    hiddenLinks.value = JSON.parse(localStorage.getItem('hiddenLinks')) || hiddenLinks.value;
});
</script>

<template>
    <Draggable v-model="mainLinks" @end="handleDragEnd" itemKey="id" group="links" tag="ul">
        <template #item="{ element }">
            <DraggableSidebarLink :id="element" :expanded="expanded" />
        </template>
    </Draggable>

    <button @click="toggleHiddenLinks" class="flex justify-center items-center w-full pt-3 mb-0">
        <span :class="[colorTextActive]"
              class="text-xs uppercase font-semibold">{{ t('more') }}</span>
    </button>

    <Draggable v-if="showHiddenLinks"
               v-model="hiddenLinks" @end="handleDragEnd" itemKey="id" group="links" tag="ul" class="my-3">
        <template #item="{ element }">
            <DraggableSidebarLink :id="element" :expanded="expanded" />
        </template>
    </Draggable>

    <br>
</template>
