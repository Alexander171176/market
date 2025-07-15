<script setup>
import {ref, defineProps, computed, watch} from 'vue';
import {Head, router, usePage} from '@inertiajs/vue3';
import { useToast } from 'vue-toastification'; // Импортируем useToast
import Header from '@/Partials/Admin/Header.vue';
import Sidebar from '@/Partials/Admin/Sidebar.vue';
import Footer from '@/Partials/Admin/Footer.vue';
import WidgetPanel from '@/Partials/Admin/WidgetPanel.vue';
import ScrollButtons from '@/Components/Admin/Scroll/ScrollButtons.vue';
import {usePermission} from '@/composables/permissions.js';
import {useRubrics} from '@/composables/rubrics.js';
import {useSection} from '@/composables/sections.js';
import {useArticle} from '@/composables/articles.js';
import {useBanners} from '@/composables/banners.js';
import {useVideos} from '@/composables/videos.js';
import {useSetting} from '@/composables/settings.js';
import {usePlugin} from '@/composables/plugins.js';

// Импорт изображения
import authImage from '../../images/auth-image.jpg';
import {Container as page} from "vue-smooth-dnd";

const props = defineProps({
    title: String,
});

const {hasPlugin} = usePlugin();
const {hasSetting} = useSetting();
const {HasRole} = usePermission();
const {HasRubric} = useRubrics();
const {HasVideosSection} = useSection();
const {HasSection} = useArticle();
const {HasTags} = useArticle();
const {HasBanners} = useBanners();
const {HasVideos} = useVideos();

const sidebarOpen = ref(false);
const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(
        route('current-team.update'),
        {
            team_id: team.id,
        },
        {
            preserveState: false,
        }
    );
};

const logout = () => {
    router.post(route('logout'));
};

const {props: pageProps} = usePage();
const toast = useToast(); // Получаем экземпляр toast

// Наблюдаем за изменением flash-сообщений в props
watch(() => page.props.flash, (flashMessages) => {
    if (flashMessages) {
        if (flashMessages.success) {
            toast.success(flashMessages.success);
        }
        if (flashMessages.error) {
            toast.error(flashMessages.error);
        }
        if (flashMessages.warning) {
            toast.warning(flashMessages.warning);
        }
        if (flashMessages.info) {
            toast.info(flashMessages.info);
        }
        // Можно добавить обработку других типов сообщений
    }
}, {
    deep: true, // Наблюдаем за изменениями внутри объекта flash
    // immediate: true // Раскомментируйте, если нужно проверить flash при первой загрузке лэйаута
});

// Получаем значение INFO_MOD_VERSION
const sidebarTitle = computed(() => {
    const setting = pageProps.settings.find(setting => setting.constant === 'INFO_MOD_VERSION');
    return setting ? setting.value : '';
});
</script>

<template>
    <Head :title="title"/>
    <div class="flex flex-row h-screen overflow-hidden">
        <!-- Sidebar -->
        <Sidebar :sidebar-open="sidebarOpen" :sidebar-title="sidebarTitle" @close-sidebar="sidebarOpen = false"/>

        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            <!-- Header -->
            <Header :showing-navigation-dropdown="showingNavigationDropdown"
                    @toggle-navigation-dropdown="showingNavigationDropdown = !showingNavigationDropdown"/>

            <!-- TitlePage Page Heading -->
            <header v-if="$slots.header" class="dark:bg-slate-700 bg-slate-50 shadow">
                <div class="max-w-7xl mx-auto py-2 px-1 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main class="flex-grow bg-center border-l border-r border-slate-400"
                  :style="{ backgroundImage: `url(${authImage})`, backgroundAttachment: 'fixed' }">
                <slot/>
            </main>

            <!-- Footer -->
            <Footer/>

            <ScrollButtons/>

        </div>

        <!-- Widget Panel -->
        <WidgetPanel :widgetPanelTitle="sidebarTitle"/>

    </div>
</template>

<style scoped>
/* Убедитесь, что ваше основное содержимое занимает доступное пространство */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

main {
    width: 100%;
    height: auto;
    background-size: contain; /* изменяет размер изображения, чтобы оно полностью отображалось */
    background-repeat: no-repeat; /* предотвращает повторение изображения */
    background-position: center;
    background-attachment: fixed; /* делает фон фиксированным при прокрутке */
}
</style>