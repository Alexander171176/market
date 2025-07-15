<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
import {Head, usePage} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';
import DefaultLayout from '@/Layouts/DefaultLayout.vue';
import MainSlider from "@/Components/Public/Default/Article/MainSlider.vue";
import LeftColumn from "@/Components/Public/Default/Partials/LeftColumn.vue";
import SectionArticlesPagination from "@/Components/Public/Default/Article/SectionArticlesPagination.vue";

const {t} = useI18n();
const {tag, articles, articlesCount, siteSettings} = usePage().props;

// Референс для хранения состояния темной темы (true, если активен темный режим)
const isDarkMode = ref(false);

// Переменная для хранения экземпляра MutationObserver, чтобы можно было отключить наблюдение позже
let observer;

// Функция для проверки, активирован ли темный режим, путем проверки наличия класса "dark" на элементе <html>
const checkDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
    // console.log('Dark mode updated to:', isDarkMode.value);
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

// Реактивная переменная для поискового запроса
const searchQuery = ref('');

// Вычисляемое свойство для фильтрации статей по названию
const filteredArticles = computed(() => {
    if (!searchQuery.value.trim()) {
        return articles;
    }
    const query = searchQuery.value.toLowerCase();
    return articles.filter(article =>
        article.title.toLowerCase().includes(query)
    );
});
</script>

<template>
    <DefaultLayout :title="tag.name" :can-login="$page.props.canLogin" :can-register="$page.props.canRegister">
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

        <div :class="[bgColorClass]"
             class="flex-1 p-4 selection:bg-red-400 selection:text-white">
            <div class="flex justify-center flex-col md:flex-row md:space-x-4">
                <MainSlider/>
                <LeftColumn/>
            </div>

            <!-- Заголовок тега -->
            <h1 class="flex items-center justify-center my-4
                       text-center font-bolder text-3xl text-gray-900 dark:text-slate-100">
                {{ tag.name }}
                <span class="ml-2 px-1 py-0 text-xs font-semibold text-white bg-emerald-500 rounded-sm">
          {{ articlesCount }}
        </span>
            </h1>

            <!-- Краткое описание тега, если есть -->
            <p v-if="tag.short"
               class="flex items-center justify-center mb-4
                      tracking-wide text-center text-xl text-gray-700 dark:text-gray-300">
                {{ tag.short }}
            </p>

            <!-- Строка поиска -->
            <div class="mb-2 max-w-3xl mx-auto">
                <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="t('searchByName')"
                    class="w-full px-3 py-1.5 bg-white dark:bg-gray-700
                    font-semibold text-md text-slate-600 dark:text-slate-100
                    border border-slate-500 dark:border-slate-400 rounded-sm
                    focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <!-- Список статей, связанных с тегом -->
            <div v-if="filteredArticles.length" class="space-y-8">
                <div class="overflow-hidden">
                    <div class="p-6">
                        <SectionArticlesPagination
                            :articles="filteredArticles"
                            :items-per-page="siteSettings.PublicCountArticle ? parseInt(siteSettings.PublicCountArticle) : 2"
                        />
                    </div>
                </div>
            </div>
            <div v-else class="text-gray-500 text-lg text-center">
                {{ t('noData') }}
            </div>
        </div>
    </DefaultLayout>
</template>
