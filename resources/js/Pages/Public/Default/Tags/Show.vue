<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import {Head,  Link, usePage} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';
import DefaultLayout from '@/Layouts/DefaultLayout.vue';
import MainSlider from "@/Components/Public/Default/Article/MainSlider.vue";
import TagArticles from '@/Components/Public/Default/Tag/TagArticles.vue';
import MainBannerSlider from '@/Components/Public/Default/Banner/MainBannerSlider.vue'

const {t} = useI18n();
const {tag, articles, pagination, locale, siteSettings} = usePage().props;

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
        :title="tag.name"
        :can-login="$page.props.canLogin"
        :can-register="$page.props.canRegister">

        <!-- SEO -->
        <Head>
            <title>{{ tag.name }}</title>
            <meta name="title" :content="tag.name || ''"/>
            <meta name="keywords" :content="tag.meta_keywords || ''"/>
            <meta name="description" :content="tag.meta_desc || ''"/>

            <meta property="og:title" :content="tag.name || ''"/>
            <meta property="og:description" :content="tag.meta_desc || ''"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" :content="`/tags/${tag.url}`"/>
            <meta property="og:locale" :content="tag.locale || 'ru_RU'"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" :content="tag.name || ''"/>
            <meta name="twitter:description" :content="tag.meta_desc || ''"/>

            <meta name="DC.title" :content="tag.name || ''"/>
            <meta name="DC.description" :content="tag.meta_desc || ''"/>
            <meta name="DC.identifier" :content="`/tags/${tag.url}`"/>
            <meta name="DC.language" :content="tag.locale || 'ru'"/>
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
                        {{ tag.name }}
                    </li>
                </ol>
            </nav>

            <!-- Заголовок тега -->
            <h1 class="flex items-center justify-center my-4
                       text-center font-bolder text-xl
                       text-slate-900 dark:text-slate-100">
                {{ tag.name }}
                <span class="flex justify-center ml-2">
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-slate-400 dark:text-slate-100"
                              d="M6.672,15.914l-5.379,5.379c-0.391,0.391-0.391,1.023,0,1.414C1.488,22.902,1.744,23,2,23 s0.512-0.098,0.707-0.293l5.379-5.379L6.672,15.914z"></path>
                        <path class="fill-current text-slate-600 dark:text-slate-300"
                              d="M23.707,7.293l-7-7c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l0.908,0.908L5.18,8.766 L3.707,7.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l13,13C15.488,21.902,15.744,22,16,22s0.512-0.098,0.707-0.293 c0.391-0.391,0.391-1.023,0-1.414l-1.473-1.473l6.151-11.021l0.908,0.908C22.488,8.902,22.744,9,23,9s0.512-0.098,0.707-0.293 C24.098,8.316,24.098,7.684,23.707,7.293z"></path>
                    </svg>
                </span>
            </h1>

            <!-- Краткое описание тега, если есть -->
            <p v-if="tag.short"
               class="flex items-center justify-center mb-4
                      tracking-wide text-sm font-semibold text-black dark:text-white">
                {{ tag.short }}
            </p>

            <!-- Вывод статей -->
            <TagArticles
                :articles="articles"
                :pagination="pagination"
                :base-url="`/${locale}/tags/${tag.slug}`"
                :search="$page.props.filters?.search ?? ''"
            />

            <MainSlider />

        </div>
    </DefaultLayout>
</template>
