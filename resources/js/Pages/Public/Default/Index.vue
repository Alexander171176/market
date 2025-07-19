<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n';
import DefaultLayout from '@/Layouts/DefaultLayout.vue';
import ArticleImageSlider from '@/Components/Public/Default/Article/ArticleImageSlider.vue'

const { t } = useI18n();

// Получаем доступ к глобальным свойствам страницы
const { appUrl, sections, locale, siteSettings } = usePage().props;
//console.log('Текущая локаль:', locale);

const getImgSrc = (imgPath) => {
    if (!imgPath) return '';
    const base = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl;
    const path = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `${base}/storage/${path}`;
};

defineProps({
    title: String,
    canLogin: Boolean,
    canRegister: Boolean,
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

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
        :title="title"
        :can-login="canLogin"
        :can-register="canRegister"
    >

        <!-- SEO -->
        <Head>
            <title>{{ t('home') }}</title>
            <meta name="title" :content="''" />
            <meta name="keywords" :content="''" />
            <meta name="description" :content="''" />

            <meta property="og:title" :content="''" />
            <meta property="og:description" :content="''" />
            <meta property="og:type" content="website" />
            <meta property="og:url" :content="`/`" />
            <meta property="og:image" :content="''" />
            <meta property="og:locale" :content="'ru_RU'" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" :content="''" />
            <meta name="twitter:description" :content="''" />
            <meta name="twitter:image" :content="''" />

            <meta name="DC.title" :content="''" />
            <meta name="DC.description" :content="''" />
            <meta name="DC.identifier" :content="`/`" />
            <meta name="DC.language" :content="'ru'" />
        </Head>

        <div class="flex-1 p-4" :class="[bgColorClass]">

            <!-- Хлебные крошки -->
            <nav class="text-sm"
                 aria-label="Breadcrumb">
                <ol class="list-reset flex items-center space-x-0">
                    <li class="text-slate-900 dark:text-slate-100">
                        {{ t('home') }}
                    </li>
                    <li>
                        <span class="mx-1 text-slate-900 dark:text-slate-100">/</span>
                    </li>
                </ol>
            </nav>

            <!-- Заголовок рубрики -->
            <h1 class="flex items-center justify-center my-4
                       text-center font-bolder text-xl
                       text-slate-900 dark:text-slate-100">
                {{ t('home') }}
            </h1>

            <!-- Секции с их статьями -->
            <section v-for="section in sections" :key="section.id">
                <ul>
                    <li v-for="article in section.articles" :key="article.id"
                        class="col-span-full flex flex-col sm:flex-row items-start space-x-3 p-2
                        overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-800
                        hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-gray-700">
                        <!-- Картинка -->
                        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-56 h-auto
                            shrink-0 overflow-hidden rounded-md">

                            <Link v-if="article.img" :href="`/articles/${article.url}`">
                                <img :src="getImgSrc(article.img)" :alt="article.img.alt"
                                     class="w-full h-auto object-cover" loading="lazy"/>
                            </Link>
                            <Link v-else-if="article.images?.length" :href="`/articles/${article.url}`">
                                <ArticleImageSlider :images="article.images" :link="`/articles/${article.url}`"/>
                            </Link>
                            <Link v-else :href="`/articles/${article.url}`"
                                  class="flex items-center justify-center bg-gray-200 dark:bg-gray-400 h-32">
                                <span class="text-slate-900 dark:text-slate-100">{{ t('noCurrentImage') }}</span>
                            </Link>
                        </div>

                        <!-- Контент -->
                        <div class="flex flex-col flex-grow">
                            <h3 class="text-md font-semibold text-black dark:text-white my-1">
                                <Link :href="`/articles/${article.url}`"
                                      class="hover:text-blue-600 dark:hover:text-blue-400">
                                    {{ article.title }}
                                </Link>
                            </h3>

                            <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                {{ article.short }}
                            </p>

                            <div class="flex items-center justify-center
                                text-xs font-semibold text-center
                                text-slate-600 dark:text-slate-400 opacity-75">
                                <svg class="w-3 h-3 fill-current shrink-0 mr-1" viewBox="0 0 16 16">
                                    <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                                </svg>
                                <span>{{ formatDate(article.published_at) }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>

        </div>

    </DefaultLayout>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}

@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
