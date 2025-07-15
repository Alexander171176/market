<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import {Inertia} from '@inertiajs/inertia';
import LocaleSelectOption from "@/Components/Admin/Select/LocaleSelectOption.vue";

const { t, locale } = useI18n();

// инициализация селектора на текущей локали
const selectedLocale = ref(locale.value);

// При изменении селектора — меняем i18n и роут
watch(selectedLocale, (newLocale) => {
    if (newLocale !== locale.value) {
        // обновить саму локаль в плагине
        locale.value = newLocale;

        // перестроить URL: заменить первый сегмент (код языка)
        const segments = window.location.pathname.split('/');
        // segments[0] === '' из-за ведущего '/'
        segments[1] = newLocale;
        const newPath = segments.join('/') + window.location.search;

        // переходим на новый URL без полной перезагрузки
        Inertia.visit(newPath, {preserveState: false, preserveScroll: true});
    }
});
</script>

<template>
    <footer class="sticky px-3 py-1 bottom-0 bg-gradient-to-b from-slate-100 to-slate-300 dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700 z-20">
        <div class="flex items-center justify-between flex-wrap">
            <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                © {{ new Date().getFullYear() }}
                <a href="/" target="_blank" class="font-semibold text-red-400 hover:text-rose-300">Pulsar CMS</a>
                {{ t('allRightsReserved') }}
            </div>
            <div class="flex items-center space-x-2">
                <a href="https://t.me/k_a_v_www" target="_blank"
                   class="flex items-center space-x-2 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                         class="w-5 h-5 sm:w-6 sm:h-6">
                        <path
                            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.175 8.89l-1.4 6.63c-.105.467-.405.578-.82.36l-2.27-1.67-1.093 1.054c-.12.12-.222.222-.45.222l.168-2.39 4.35-3.923c.19-.168-.04-.263-.29-.095L8.78 11.167l-2.42-.76c-.464-.14-.474-.464.096-.684l9.452-3.65c.44-.16.82.108.66.717z"/>
                    </svg>
                    <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ t('supportService') }}</span>
                </a>
                <LocaleSelectOption v-model="selectedLocale"/>
            </div>
        </div>
    </footer>
</template>
