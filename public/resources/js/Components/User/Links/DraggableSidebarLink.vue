<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {Link, usePage} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';
import {sidebarIcons} from '@/utils/sidebarIcons';

const { siteSettings } = usePage().props;
const props = defineProps({
    id: String,
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

const colorText = computed(() => {
    return isDarkMode.value
        ? (siteSettings.AdminSidebarDarkText || 'text-slate-200')
        : (siteSettings.AdminSidebarLightText || 'text-slate-200');
});

const colorTextHover = computed(() => {
    return isDarkMode.value
        ? (siteSettings.AdminSidebarDarkHoverText || 'text-orange-300')
        : (siteSettings.AdminSidebarLightHoverText || 'text-orange-300');
});

const colorTextActive = computed(() => {
    return isDarkMode.value
        ? (siteSettings.AdminSidebarDarkActiveText || 'text-yellow-200')
        : (siteSettings.AdminSidebarLightActiveText || 'text-yellow-200');
});

const {t} = useI18n();
const {props: pageProps} = usePage();

const linkInfo = {
    dashboard: {label: t('dashboard'), route: 'dashboard'}, // Уже исправлено
    // Для API токенов и команд используем стандартные имена Jetstream/Fortify
    apiTokens: {label: t('apiTokens'), route: 'api-tokens.index'},
    teamSettings: {label: t('teamSettings'), route: 'teams.show', params: {team: pageProps.auth.user.current_team}},
    profile: {label: t('profile'), route: 'profile.show'},
};

const link = computed(() => linkInfo[props.id]);

const svgContent = computed(() => sidebarIcons[props.id]);

const classes = computed(() => {
    if (link.value.route === route().current()) {
        return `flex items-center px-1 pt-1 text-sm font-medium leading-3 ${colorTextActive.value} hover:${colorTextHover.value} focus:${colorTextHover.value} focus:outline-none transition duration-150 ease-in-out`;
    } else {
        return `flex items-center px-1 pt-1 text-sm font-medium leading-3 ${colorText.value} hover:${colorTextActive.value} focus:${colorTextActive.value} focus:outline-none transition duration-150 ease-in-out`;
    }
});

const containerClasses = computed(() => {
    return props.expanded ? 'mb-1' : 'mb-3';
});

const textClasses = computed(() => {
    return props.expanded ? 'ml-3 opacity-100' : 'ml-3 opacity-0 whitespace-nowrap overflow-hidden';
});
</script>

<template>
    <li :class="containerClasses">
        <Link :href="route(link.route, link.params || {})" :class="classes">
            <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24" v-html="svgContent"></svg>
            <span class="text-sm font-medium transition-opacity duration-200 max-w-full" :class="textClasses">
                {{ link.label }}
            </span>
        </Link>
    </li>
</template>
