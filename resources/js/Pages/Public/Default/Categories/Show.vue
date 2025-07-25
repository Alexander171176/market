<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import {Head,  Link, usePage} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';
import DefaultLayout from '@/Layouts/DefaultLayout.vue';

const {t} = useI18n();
const {category, locale, siteSettings} = usePage().props;

// Референс для хранения состояния темной темы (true, если активен темный режим)
const isDarkMode = ref(false);

// Переменная для хранения экземпляра MutationObserver,
// чтобы можно было отключить наблюдение позже
let observer;

// Функция для проверки, активирован ли темный режим,
// путем проверки наличия класса "dark" на элементе <html>
const checkDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
    //console.log('Dark mode updated to:', isDarkMode.value);
};

onMounted(() => {
    // Выполняем первоначальную проверку при монтировании компонента
    checkDarkMode();

    // Настраиваем MutationObserver для отслеживания изменений в атрибуте class у <html>
    // Это необходимо для того, чтобы реагировать на динамические изменения темы
    observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
        attributes: true,           // Следим за изменениями атрибутов
        attributeFilter: ['class']  // Фильтруем только по изменению класса
    });
});

onUnmounted(() => {
    // При размонтировании компонента отключаем наблюдатель, чтобы избежать утечек памяти
    if (observer) {
        observer.disconnect();
    }
});

// Вычисляемое свойство, которое возвращает нужный класс для фона в зависимости от текущего режима
// Если темный режим активен, возвращается значение из настройки для темного режима,
// иначе - значение из настройки для светлого режима.
const bgColorClass = computed(() => {
    return isDarkMode.value
        ? siteSettings.PublicDarkBackgroundColor
        : siteSettings.PublicLightBackgroundColor;
});
</script>

<template>
    <DefaultLayout
        :title="category.title"
        :can-login="$page.props.canLogin"
        :can-register="$page.props.canRegister">

        <!-- SEO -->
        <Head>
            <title>{{ category.title }}</title>
            <meta name="title" :content="category.title || ''"/>
            <meta name="keywords" :content="category.meta_keywords || ''"/>
            <meta name="description" :content="category.meta_desc || ''"/>

            <meta property="og:title" :content="category.title || ''"/>
            <meta property="og:description" :content="category.meta_desc || ''"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" :content="`/categories/${category.url}`"/>
            <meta property="og:locale" :content="category.locale || 'ru_RU'"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" :content="category.title || ''"/>
            <meta name="twitter:description" :content="category.meta_desc || ''"/>

            <meta name="DC.title" :content="category.title || ''"/>
            <meta name="DC.description" :content="category.meta_desc || ''"/>
            <meta name="DC.identifier" :content="`/categories/${category.url}`"/>
            <meta name="DC.language" :content="category.locale || 'ru'"/>
        </Head>

        <div class="flex-1 p-4" :class="[bgColorClass]">

            <!-- Хлебные крошки -->
            <nav class="text-sm mb-4" aria-label="Breadcrumb">
                <ol class="list-reset flex items-center space-x-0">
                    <li>
                        <Link href="/" class="hover:underline text-slate-900 dark:text-slate-100">
                            {{ t('home') }}
                        </Link>
                    </li>
                    <li>
                        <span class="mx-1 text-slate-900 dark:text-slate-100">/</span>
                    </li>
                    <li class="text-slate-900 dark:text-slate-100">
                        {{ category.title }}
                    </li>
                </ol>
            </nav>

            <!-- Заголовок тега -->
            <h1 class="flex items-center justify-center my-4
                       text-center font-bolder text-xl
                       text-slate-900 dark:text-slate-100">
                {{ category.title }}
                <span v-if="category.icon" class="flex justify-center ml-2" v-html="category.icon" />
                <div class="ml-2 w-6 h-5 flex items-center justify-center rounded-full
                                text-[9px] font-semibold
                                text-black dark:text-white bg-slate-100 dark:bg-slate-700"
                     :title="t('views')">
                    {{ category.views }}
                </div>
            </h1>

            <!-- Краткое описание тега, если есть -->
            <p v-if="category.short"
               class="flex items-center justify-center mb-4
                      tracking-wide text-sm font-semibold text-black dark:text-white">
                {{ category.short }}
            </p>


        </div>
    </DefaultLayout>
</template>
