<script setup>
import {Head, usePage} from "@inertiajs/vue3";
import {defineProps} from 'vue';
import {useSetting} from '@/composables/settings.js';
import {usePlugin} from '@/composables/plugins.js';
import Header from "@/Partials/Default/Header.vue";
import LeftSidebar from "@/Components/Public/Default/Partials/LeftSidebar.vue";
import RightSidebar from "@/Components/Public/Default/Partials/RightSidebar.vue";
import Footer from "@/Partials/Default/Footer.vue";

const { siteSettings } = usePage().props;

const props = defineProps({
    title: String,
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});

const {hasPlugin} = usePlugin();
const {hasSetting} = useSetting();

const {props: pageProps} = usePage();

</script>

<template>
    <Head :title="title"/>

    <!-- Импортируем Header и передаем пропсы -->
    <Header :can-login="canLogin" :can-register="canRegister"/>

    <main class="min-h-screen flex justify-center flex-col lg:flex-row tracking-wider">
        <!-- Левый сайдбар: не показываем, если параметр равен "false" -->
        <LeftSidebar v-if="!siteSettings.ViewLeftColumn || siteSettings.ViewLeftColumn === 'true'" />

        <slot/>

        <!-- Правый сайдбар: не показываем, если параметр равен "false" -->
        <RightSidebar v-if="!siteSettings.ViewRightColumn || siteSettings.ViewRightColumn === 'true'" />
    </main>

    <Footer :can-login="canLogin" :can-register="canRegister"/>

</template>
