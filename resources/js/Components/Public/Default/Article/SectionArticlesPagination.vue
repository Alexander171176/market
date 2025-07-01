<!-- SectionArticlesPagination.vue -->
<script setup>
import { ref, computed } from 'vue';
import {Link, usePage} from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import ArticleImageSlider from "@/Components/Public/Default/Article/ArticleImageSlider.vue";

const { t } = useI18n();

const { siteSettings } = usePage().props;
const props = defineProps({
    articles: {
        type: Array,
        required: true,
    },
    itemsPerPage: {
        type: Number,
        default: 2, // Вы можете изменить стандартное значение, если горизонтальный вид требует меньше/больше
    },
});

const currentPage = ref(1);
const viewMode = ref(siteSettings.PublicViewArticle || 'horizontal'); // Используем настройку из базы, иначе по умолчанию "horizontal"

const totalPages = computed(() => {
    return Math.ceil(props.articles.length / props.itemsPerPage);
});

const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage;
    return props.articles.slice(start, start + props.itemsPerPage);
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// --- НОВОЕ: Функции для смены режима ---
const setViewMode = (mode) => {
    viewMode.value = mode;
    // Опционально: можно сбросить пагинацию на 1 страницу при смене вида
    // currentPage.value = 1;
};

</script>

<template>
    <div>
        <!-- НОВОЕ: Переключатель вида -->
        <div class="flex justify-end items-center mb-4 mr-1 space-x-2">
            <button
                @click="setViewMode('grid')"
                :class="[
                    'p-1 border transition-colors duration-200',
                    viewMode === 'grid'
                        ? 'bg-blue-400 border-blue-700 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-500 dark:hover:border-slate-500'
                ]"
                :title="t('gridView')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            </button>
            <button
                @click="setViewMode('horizontal')"
                :class="[
                     'p-1 border transition-colors duration-200',
                     viewMode === 'horizontal'
                         ? 'bg-blue-400 border-blue-700 text-white'
                         : 'bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:border-slate-500 dark:hover:border-slate-500'
                 ]"
                :title="t('horizontalView')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>

        <!-- Список статей -->
        <div :class="[viewMode === 'grid' ? 'grid grid-cols-12 gap-3' : 'space-y-3']">
            <div
                v-for="article in paginatedArticles"
                :key="article.id"
                :class="[
                    'overflow-hidden transition-all duration-300 rounded-sm',
                    'hover:bg-slate-50 hover:dark:bg-slate-800 hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-700', // Общие стили hover
                    viewMode === 'grid'
                      ? 'px-1 py-1 col-span-full sm:col-span-6 md:col-span-4 lg:col-span-12 xl:col-span-6 2xl:col-span-4 hover:scale-101 shadow-none flex flex-col h-full' // Стили СЕТКИ + Flex
                      : 'col-span-full flex flex-row items-start space-x-3 p-2 shadow-sm' // Стили ГОРИЗОНТАЛЬНЫЕ
                ]"
            >
                <!-- Внутренний контейнер для управления компоновкой (только для горизонтального) -->
                <template v-if="viewMode === 'horizontal'">
                    <!-- Контейнер Изображения (горизонтальный вид) -->
                    <div class="w-1/3 lg:w-1/4 xl:w-48 shrink-0 aspect-video md:aspect-square overflow-hidden">
                        <ArticleImageSlider
                            v-if="article.images && article.images.length > 0"
                            :images="article.images"
                            :link="`/articles/${article.url}`"
                            class="w-full h-full object-cover"
                        /> <!-- ИСПРАВЛЕНО -->
                        <Link v-else :href="`/articles/${article.url}`"
                              class="flex items-center justify-center w-full h-full p-2 border border-slate-400 bg-gray-200 dark:bg-gray-700">
                            <span class="text-center text-gray-700 dark:text-gray-300 text-xs">
                                {{ t('noCurrentImage') }}
                            </span>
                        </Link>
                    </div>
                    <!-- Контейнер Контента (горизонтальный вид) -->
                    <div class="flex flex-col flex-grow pl-3">
                        <!-- Ссылка и дата статьи -->
                        <div class="my-1 text-left">
                            <div class="text-xs font-semibold text-orange-500 dark:text-orange-400 mb-1">
                                {{ article.created_at.substring(0, 10) }}
                            </div>
                            <h3 class="text-md font-semibold text-blue-900 dark:text-white">
                                <Link :href="`/articles/${article.url}`"
                                      class="hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2">
                                    {{ article.title }}
                                </Link>
                            </h3>
                        </div>
                        <!-- Краткое описание статьи -->
                        <div class="mb-2">
                            <p class="italic text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-3">
                                {{ article.short }}
                            </p>
                        </div>
                        <!-- Автор, просмотры, лайки, теги статьи -->
                        <ul class="text-xs space-y-1 my-1 mt-auto"> <!-- mt-auto прижимает мету вниз -->
                            <li class="h-4 flex items-center justify-between">
                                <div class="font-semibold text-teal-600 dark:text-teal-300 truncate pr-1">
                                    {{ article.author }}
                                </div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16"><path d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z"></path></svg>
                            </li>
                            <li class="h-4 flex items-center justify-between">
                                <div class="font-semibold text-gray-700 dark:text-gray-300">Просмотры: {{ article.views || '0' }}</div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16"><path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg>
                            </li>
                            <li class="h-4 flex items-center justify-between">
                                <div class="font-semibold text-gray-700 dark:text-gray-300">Лайки: {{ article.likes || '0' }}</div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                            </li>
                            <li class="h-fit flex items-center justify-between pt-1">
                                <div class="font-semibold text-violet-600 dark:text-violet-300 truncate pr-1">
                                        <span v-for="(tag, index) in article.tags" :key="tag.id + '-horiz-tag'">
                                          <Link :href="`/tags/${tag.slug}`" class="hover:text-rose-400 hover:dark:text-rose-300">{{ tag.name }}</Link>
                                          <span v-if="index < article.tags.length - 1">, </span>
                                        </span>
                                    <span v-if="!article.tags || article.tags.length === 0"> </span>
                                </div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16"><path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z"></path></svg>
                            </li>
                        </ul>
                    </div>
                </template>

                <!-- Внутренний контейнер для Grid вида -->
                <template v-if="viewMode === 'grid'">
                    <!-- Контейнер Изображения -->
                    <div class="overflow-hidden h-auto">
                        <ArticleImageSlider
                            v-if="article.images && article.images.length > 0"
                            :images="article.images"
                            :link="`/articles/${article.url}`"
                            class="w-full h-full object-cover"
                        /> <!-- ИСПРАВЛЕНО -->
                        <Link v-else :href="`/articles/${article.url}`"
                              class="flex items-center justify-center h-48 p-4 bg-gray-200 dark:bg-gray-700">
                                <span class="text-center text-gray-700 dark:text-gray-300 text-xs">
                                    {{ t('noCurrentImage') }}
                                </span>
                        </Link>
                    </div>
                    <!-- Контейнер Контента -->
                    <div class="flex flex-col flex-grow">
                        <!-- Ссылка и дата статьи -->
                        <div class="px-3 my-1 text-center">
                            <div class="text-xs font-semibold text-orange-500 dark:text-orange-400 mb-1">
                                {{ article.created_at.substring(0, 10) }}
                            </div>
                            <h3 class="text-md font-semibold text-blue-900 dark:text-white">
                                <Link :href="`/articles/${article.url}`"
                                      class="hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2">
                                    {{ article.title }}
                                </Link>
                            </h3>
                        </div>
                        <!-- Краткое описание статьи -->
                        <div class="flex flex-wrap items-center p-2 border border-dashed border-slate-400 dark:border-slate-200">
                            <p class="italic text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {{ article.short }}
                            </p>
                        </div>
                        <!-- Автор, просмотры, лайки, теги статьи -->
                        <ul class="text-xs space-y-1 my-1 px-1 mt-auto">
                            <li class="h-4 flex items-center justify-between">
                                <div class="font-semibold text-teal-600 dark:text-teal-300 truncate pr-1">
                                    {{ article.author }}
                                </div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16"><path d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z"></path></svg>
                            </li>
                            <li class="h-4 flex items-center justify-between">
                                <div class="font-semibold text-gray-700 dark:text-gray-300">Просмотры: {{ article.views || '0' }}</div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16"><path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg>
                            </li>
                            <li class="h-4 flex items-center justify-between">
                                <div class="font-semibold text-gray-700 dark:text-gray-300">Лайки: {{ article.likes || '0' }}</div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                            </li>
                            <li class="h-fit flex items-center justify-between pt-1">
                                <div class="font-semibold text-violet-600 dark:text-violet-300 truncate pr-1">
                                        <span v-for="(tag, index) in article.tags" :key="tag.id + '-grid-tag'">
                                          <Link :href="`/tags/${tag.slug}`" class="hover:text-rose-400 hover:dark:text-rose-300">{{ tag.name }}</Link>
                                          <span v-if="index < article.tags.length - 1">, </span>
                                        </span>
                                    <span v-if="!article.tags || article.tags.length === 0"> </span>
                                </div>
                                <svg class="w-3.5 h-3.5 fill-current text-slate-400 shrink-0 ml-1" viewBox="0 0 16 16"><path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z"></path></svg>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>

        <!-- Элементы навигации пагинации -->
        <div v-if="totalPages > 1" class="flex justify-center items-center mt-4">
            <button @click="prevPage" :disabled="currentPage === 1" :title="t('previous')"
                    class="px-3 py-1 rounded-l disabled:opacity-50
                           hover:bg-gray-100 dark:hover:bg-gray-900
                           text-red-500 dark:text-red-300 hover:text-slate-700 dark:hover:text-slate-100
                           border-2 border-gray-400 dark:border-gray-200 hover:border-red-400 dark:hover:border-red-400">
                «
            </button>
            <div class="px-2 font-semibold text-slate-700 dark:text-slate-200">
                <span>{{ t('page') }}
                    <span class="px-1 text-red-500 dark:text-red-300 border border-red-500 dark:border-red-300">
                        {{ currentPage }}
                    </span>
                    {{ t('of') }} {{ totalPages }}
                </span>
            </div>
            <button @click="nextPage" :disabled="currentPage === totalPages" :title="t('next')"
                    class="px-3 py-1 rounded-r disabled:opacity-50
                           hover:bg-gray-100 dark:hover:bg-gray-900
                           text-red-500 dark:text-red-300 hover:text-slate-700 dark:hover:text-slate-100
                           border-2 border-gray-400 dark:border-gray-200 hover:border-red-400 dark:hover:border-red-400">
                »
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Можно добавить стили для активных кнопок переключателя вида */
/* Например: */
/* button[title="Grid View"].active-view { ... } */
/* button[title="Horizontal View"].active-view { ... } */
</style>
