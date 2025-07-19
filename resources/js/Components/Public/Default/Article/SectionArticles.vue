<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {Link, router, usePage} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';
import ArticleImageSlider from "@/Components/Public/Default/Article/ArticleImageSlider.vue";

const {t} = useI18n();
const { appUrl} = usePage().props;

const getImgSrc = (imgPath) => {
    if (!imgPath) return '';
    const base = appUrl.endsWith('/') ? appUrl.slice(0, -1) : appUrl;
    const path = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
    return `${base}/storage/${path}`;
};

const props = defineProps({
    articles: Array,
    pagination: Object,
    baseUrl: String,
    search: String,
});

const searchQuery = ref(props.search || '');
const onSearch = () => {
    const query = searchQuery.value.trim();
    router.get(props.baseUrl, { search: query }, {
        preserveScroll: true,
        preserveState: false,
    });
};

const clearSearch = () => {
    searchQuery.value = '';
    router.get(props.baseUrl, {}, {
        preserveScroll: true,
        preserveState: false,
    });
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы от 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const viewMode = ref('horizontal');

onMounted(() => {
    const saved = localStorage.getItem('articleViewMode');
    if (saved === 'grid') viewMode.value = 'grid';
});

const setViewMode = (mode) => {
    viewMode.value = mode;
    localStorage.setItem('articleViewMode', mode);
};

const goToPage = (page) => {
    if (page >= 1 && page <= props.pagination.lastPage) {
        router.get(props.baseUrl, { page_articles: page }, {
            preserveScroll: true,
            preserveState: false,
            only: ['articles', 'pagination'],
        });
    }
};

onMounted(() => {
    const scrollY = localStorage.getItem('scrollY');
    if (scrollY !== null) {
        window.scrollTo(0, parseInt(scrollY));
        localStorage.removeItem('scrollY');
    }
});

onBeforeUnmount(() => {
    localStorage.setItem('scrollY', window.scrollY);
});
</script>

<template>
    <div>

        <!-- Панель управления (сортировка + переключатель вида) -->
        <div class="flex flex-row items-center gap-4 mb-4">

            <!-- Поисковая строка -->
            <form @submit.prevent="onSearch"
                  class="flex-grow">
                <div class="relative w-full max-w-lg mx-auto">
                    <input
                        v-model="searchQuery"
                        type="text"
                        :placeholder="t('searchByName')"
                        class="w-full pl-3 pr-16 py-1 bg-slate-100 dark:bg-slate-600
                               font-semibold text-sm text-slate-600 dark:text-slate-100
                               border border-slate-500 dark:border-slate-400 rounded-sm
                               focus:outline-none focus:ring-1 focus:border-blue-300"
                    />
                    <!-- Кнопка сброса -->
                    <button
                        v-if="searchQuery"
                        type="button"
                        @click="clearSearch"
                        class="absolute right-8 top-1/2 transform -translate-y-1/2
                               bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800
                               border border-gray-900 dark:border-gray-100 py-0 px-1.5
                               text-slate-700 dark:text-white hover:text-red-500"
                        title="Очистить"
                    >
                        ✕
                    </button>

                    <!-- Кнопка поиска -->
                    <button
                        type="submit"
                        class="absolute right-1 top-1/2 transform -translate-y-1/2
                               bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800
                               border border-gray-900 dark:border-gray-100 p-1"
                        :title="t('searchByName')"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path class="fill-current text-slate-500 dark:text-slate-300" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"/>
                            <path class="fill-current text-slate-400 dark:text-slate-200" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"/>
                        </svg>
                    </button>

                </div>
            </form>


            <!-- Переключатель вида -->
            <div class="flex justify-end items-center space-x-2">
                <button @click="setViewMode('grid')"
                        :class="[
                  'p-1 border transition-colors duration-200 rounded',
                  viewMode === 'grid'
                  ? 'border-slate-400 dark:border-slate-200 text-red-400 dark:text-red-200'
                  : 'border-slate-300 dark:border-slate-400 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-500 dark:hover:border-slate-500']">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                </button>

                <button @click="setViewMode('horizontal')"
                        :class="[
                  'p-1 border transition-colors duration-200 rounded',
                  viewMode === 'horizontal'
                  ? 'border-slate-400 dark:border-slate-200 text-red-400 dark:text-red-200'
                  : 'border-slate-300 dark:border-slate-400 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:border-slate-500 dark:hover:border-slate-500']">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>

        </div>

        <!-- Grid отображение -->
        <div v-if="viewMode === 'grid'"
             class="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div v-for="article in articles" :key="article.id"
                 class="p-2 rounded-sm shadow-sm
                        overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-800
                        hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-gray-700">

                <!-- Контейнер Изображения -->
                <div class="overflow-hidden h-auto mb-2 rounded-md
                            shadow-lg shadow-gray-400 dark:shadow-gray-900">

                <Link v-if="article.img" :href="`/articles/${article.url}`">
                    <img :src="getImgSrc(article.img)" alt="Article image"
                         class="w-full h-auto object-cover"/>
                </Link>
                <Link v-else-if="article.images?.length" :href="`/articles/${article.url}`">
                    <ArticleImageSlider :images="article.images" :link="`/articles/${article.url}`"/>
                </Link>
                <Link v-else :href="`/articles/${article.url}`"
                      class="flex items-center justify-center bg-gray-200 dark:bg-gray-400 h-32">
                    <span class="text-gray-500 dark:text-gray-700">{{ t('noCurrentImage') }}</span>
                </Link>
            </div>

                <!-- Контент -->
                <div class="flex flex-col">
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

            </div>

        </div>

        <!-- Horizontal отображение -->
        <div v-else class="space-y-4">

            <div v-for="article in articles" :key="article.id"
                 class="col-span-full flex flex-col sm:flex-row items-start space-x-3 p-2
                        overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-800
                        hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-gray-700">

                <!-- Картинка -->
                <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-56 h-auto
                            shrink-0 overflow-hidden rounded-md">

                    <Link v-if="article.img" :href="`/articles/${article.url}`">
                        <img :src="getImgSrc(article.img)" alt="Article image"
                             class="w-full h-auto object-cover"/>
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

            </div>

        </div>

        <!-- Пагинация -->
        <div class="flex items-center justify-center mt-6 space-x-2 text-sm font-medium">

            <!-- Кнопка назад -->
            <button @click="goToPage(pagination.currentPage - 1)"
                    :disabled="pagination.currentPage === 1"
                    class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-600
                           text-gray-900 dark:text-gray-100
                           border border-gray-400 dark:border-gray-200 disabled:opacity-50">
                «
            </button>

            <input type="number"
                   :value="pagination.currentPage"
                   @change="e => goToPage(Number(e.target.value))"
                   :min="1"
                   :max="pagination.lastPage"
                   class="w-16 text-center px-3 py-1.5 rounded text-xs
                          border border-gray-400 dark:border-gray-200
                          bg-slate-100 dark:bg-slate-600 text-gray-900 dark:text-white"/>

            <span class="text-gray-700 dark:text-gray-200">/ {{ pagination.lastPage }}</span>

            <!-- Кнопка вперёд -->
            <button @click="goToPage(pagination.currentPage + 1)"
                    :disabled="pagination.currentPage === pagination.lastPage"
                    class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-600
                           text-gray-900 dark:text-gray-100
                           border border-gray-400 dark:border-gray-200 disabled:opacity-50">
                »
            </button>

        </div>

    </div>
</template>
