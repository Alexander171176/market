import './bootstrap';
import '../css/app.css';

import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import i18n from './utils/i18n.js';
import { createHead } from '@vueuse/head';

import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        // ✅ Установка правильной локали из Inertia props
        const rawLocale = props.initialPage.props.locale;
        if (typeof rawLocale === 'string') {
            i18n.global.locale.value = rawLocale;
            document.documentElement.setAttribute('lang', rawLocale);
        }

        app
            .use(plugin)
            .use(ZiggyVue)
            .use(i18n)
            .use(Toast, toastOptions)
            .use(createHead())
            .mount(el);
    },
    progress: {
        color: '#4B5563',
        delay: 0,
    },
});
