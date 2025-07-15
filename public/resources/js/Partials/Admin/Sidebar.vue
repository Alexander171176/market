<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import {Link, usePage} from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import DraggableSidebarGroupLink from '@/Components/Admin/Links/DraggableSidebarGroupLink.vue';
import DraggableSidebarSystemLinks from "@/Components/Admin/Links/DraggableSidebarSystemLinks.vue";
import SidebarLinkPlugin from '@/Components/Admin/Links/SidebarLinkPlugin.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

library.add(fas);

const { t } = useI18n();
const { siteSettings } = usePage().props;
const props = defineProps({
    sidebarOpen: Boolean,
    sidebarTitle: String,
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

// Вычисляемое свойство для получения класса фона из настроек в зависимости от темы
const bgColorClass = computed(() => {
    return isDarkMode.value
        ? (siteSettings.AdminSidebarDarkColor || 'bg-cyan-900')
        : (siteSettings.AdminSidebarLightColor || 'bg-cyan-900');
});

const colorTextActive = computed(() => {
    return isDarkMode.value
        ? (siteSettings.AdminSidebarDarkActiveText || 'text-yellow-200')
        : (siteSettings.AdminSidebarLightActiveText || 'text-yellow-200');
});

const emit = defineEmits(['close-sidebar']);
const trigger = ref(null);
const sidebar = ref(null);
const sidebarExpanded = ref(localStorage.getItem('sidebar-expanded') === 'true'); // Теперь состояние раскрытия загружается из localStorage
const currentPath = ref(window.location.pathname); // Используем window.location.pathname для текущего пути

const clickHandler = ({ target }) => {
    if (!sidebar.value || !trigger.value) return;
    if (!props.sidebarOpen || sidebar.value.contains(target) || trigger.value.contains(target)) return;
    emit('close-sidebar');
};

const keyHandler = ({ keyCode }) => {
    if (!props.sidebarOpen || keyCode !== 27) return;
    emit('close-sidebar');
};

onMounted(async () => {
    document.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyHandler);
});

onUnmounted(() => {
    document.removeEventListener('click', clickHandler);
    document.removeEventListener('keydown', keyHandler);
});

// Следим за изменением состояния раскрытия сайдбара и сохраняем его в localStorage
watch(sidebarExpanded, (newVal) => {
    localStorage.setItem('sidebar-expanded', newVal.toString());
});

const isActive = (path) => {
    return currentPath.value === path;
};
</script>

<template>
    <div>
        <div
            class="fixed inset-0 z-20 bg-cyan-800 dark:bg-gray-700 dark:border-r dark:border-gray-600 bg-opacity-30
                   md:hidden md:z-auto transition-opacity duration-200"
            :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

        <div id="sidebar" ref="sidebar"
             :class="[bgColorClass, { 'translate-x-0': sidebarOpen, '-translate-x-58': !sidebarOpen, 'hidden md:flex': true, 'md:w-16': !sidebarExpanded, 'md:!w-58 2xl:!w-58': sidebarExpanded }]"
             class="h-screen absolute z-40 w-58 left-0 top-0 pb-16 p-2 flex flex-col
                    dark:border-r dark:border-gray-600
                    md:static md:left-auto md:top-auto md:translate-x-0 md:overflow-y-auto
                    overflow-y-scroll no-scrollbar transition-all duration-200 ease-in-out">

            <div class="flex justify-around items-center mb-5 pr-3 md:px-0">
                <button @click.prevent="sidebarExpanded = !sidebarExpanded" title="t('toggleSidebar')">
                    <svg :class="{ 'rotate-180': sidebarExpanded }"
                         class="mx-1 w-6 h-6 py-1 fill-current transition-transform duration-200
                                border border-gray-400 hover:border-red-400"
                         viewBox="0 0 24 24">
                        <path class="text-slate-400 hover:text-red-400"
                              d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"/>
                        <path class="text-slate-600" d="M3 23H1V1h2z"/>
                    </svg>
                </button>
                <Link :href="route('admin.index')" v-if="sidebarExpanded">
                    <ApplicationMark class="h-6 w-auto 2xl:block"/>
                </Link>
                <span class="text-indigo-300 font-semibold text-md hidden 2xl:block" v-if="sidebarExpanded">
                    Pulsar CMS {{ sidebarTitle }}
                </span>
                <FontAwesomeIcon :icon="['fas', 'sliders']" class="text-white" v-if="sidebarExpanded"/>
            </div>

            <div class="space-y-2">
                <!-- Ссылки главного ряда -->
                <span :class="[colorTextActive]"
                      class="flex justify-center text-xs uppercase font-semibold pl-3"
                      v-if="sidebarExpanded">
                    {{ t('pages') }}
                </span>
                <DraggableSidebarGroupLink :expanded="sidebarExpanded"/>

                <!-- Ссылки ситемных функций -->
                <DraggableSidebarSystemLinks :expanded="sidebarExpanded"/>

                <!-- Ссылки плагинов -->
                <span :class="[colorTextActive]"
                      class="flex justify-center text-xs uppercase font-semibold pl-3 mt-0"
                      v-if="sidebarExpanded">
                    {{ t('plugins') }}
                </span>
                <ul>
                    <SidebarLinkPlugin class="mt-0"
                        v-for="plugin in $page.props.plugins"
                        :key="plugin.id"
                        :href="`/admin/plugins/${plugin.id}`"
                        :active="isActive(`/admin/plugins/${plugin.id}`)"
                        :expanded="props.expanded"
                    >
                        <template #default>
                            <!-- Отображаем SVG иконку, используя v-html -->
                            <span v-html="plugin.icon" class="icon-class"></span>
                        </template>
                        <template #text>
                            {{ plugin.name }}
                        </template>
                    </SidebarLinkPlugin>
                </ul>

            </div>
        </div>
    </div>
</template>

<style>
.sidebar-expanded {
    width: 18rem !important;
}
</style>
