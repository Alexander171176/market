<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import VideoPlayer from '@/Components/Public/Default/Video/VideoPlayer.vue'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'

const { t } = useI18n()
const page = usePage()
const { videos, pagination, locale, siteSettings, filters } = page.props

// Темный режим
const isDarkMode = ref(false)
let observer

const checkDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
}

const bgColorClass = computed(() => {
    return isDarkMode.value
        ? siteSettings.PublicDarkBackgroundColor
        : siteSettings.PublicLightBackgroundColor
})

// Поиск
const searchQuery = ref('')

const onSearch = () => {
    const query = searchQuery.value.trim()
    router.get('/videos', { search: query }, {
        preserveScroll: true,
        preserveState: false
    })
}

const clearSearch = () => {
    searchQuery.value = ''
    router.get('/videos', {}, {
        preserveScroll: true,
        preserveState: false
    })
}

// Вид
const viewMode = ref('horizontal')

const setViewMode = (mode) => {
    viewMode.value = mode
    localStorage.setItem('videoViewMode', mode)
}

// Переход по страницам
const goToPage = (page) => {
    if (page >= 1 && page <= pagination.lastPage) {
        router.get('/videos', {
            page_videos: page,
            search: searchQuery.value.trim()
        }, {
            preserveScroll: true,
            preserveState: false,
            only: ['videos', 'pagination']
        })
    }
}

// Инициализация
onMounted(() => {
    // Темная тема
    checkDarkMode()
    observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })

    // Поиск
    searchQuery.value = filters?.search || ''

    // Вид
    const savedView = localStorage.getItem('videoViewMode')
    viewMode.value = savedView === 'grid' ? 'grid' : 'horizontal'

    // Скролл
    const scrollY = localStorage.getItem('scrollY')
    if (scrollY !== null) {
        window.scrollTo(0, parseInt(scrollY))
        localStorage.removeItem('scrollY')
    }
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
    localStorage.setItem('scrollY', window.scrollY)
})
</script>

<template>
    <DefaultLayout
        :title="t('allVideos')"
        :can-login="$page.props.canLogin"
        :can-register="$page.props.canRegister">

        <Head>
            <title>{{ t('allVideos') }}</title>
            <meta name="title" :content="t('allVideos')" />
            <meta name="description" :content="t('allVideos')" />
        </Head>

        <div class="flex-1 p-4" :class="[bgColorClass]">

            <!-- Хлебные крошки -->
            <nav class="text-sm"
                 aria-label="Breadcrumb">
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
                        {{ t('allVideos') }}
                    </li>
                </ol>
            </nav>

            <!-- Заголовок рубрики -->
            <h1 class="flex items-center justify-center my-4
                       text-center font-bolder text-xl
                       text-slate-900 dark:text-slate-100">
                <svg class="w-4 h-3 fill-slate-400 mr-2" viewBox="0 0 16 12">
                    <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z"></path>
                </svg>
                {{ t('allVideos') }}
            </h1>

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
                                <path class="fill-current text-slate-500 dark:text-slate-300"
                                      d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                                <path class="fill-current text-slate-400 dark:text-slate-200"
                                      d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
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
                                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

            </div>

            <!-- вид 2 в ряд -->
            <div v-if="viewMode === 'grid'"
                 class="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div v-for="video in videos.data" :key="video.id"
                     class="mb-4 pb-4 border-b border-slate-500 dark:border-slate-100">

                    <!-- плеер -->
                    <Link :href="`/videos/${video.url}`">
                        <VideoPlayer :video="video" />
                    </Link>

                    <!-- дата публикации -->
                    <div class="flex items-center justify-center
                            text-center text-xs text-slate-600 dark:text-slate-400">
                        <svg class="w-3 h-3 fill-current shrink-0 mr-1" viewBox="0 0 16 16">
                            <path
                                d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                        </svg>
                        <span>
                            {{ video.published_at ? new Date(video.published_at).toLocaleDateString() : '' }}
                        </span>
                    </div>

                    <!-- ссылка заголовка -->
                    <Link :href="`/videos/${video.url}`"
                          class="my-1 block text-center text-sm font-semibold
                             text-black dark:text-white
                             hover:text-blue-600 dark:hover:text-blue-400 transition">
                        {{ video.title }}
                    </Link>

                    <!-- Краткое описание, если есть -->
                    <p v-if="video.short"
                       class="flex items-center
                          tracking-wide text-xs text-black dark:text-white">
                        {{ video.short }}
                    </p>

                </div>
            </div>

            <!-- вид 1 в ряд -->
            <div v-else class="grid grid-cols-1 gap-2">
                <div v-for="video in videos.data" :key="video.id"
                     class="mb-4 pb-4 border-b border-slate-500 dark:border-slate-100">

                    <!-- плеер -->
                    <Link :href="`/videos/${video.url}`">
                        <VideoPlayer :video="video" />
                    </Link>

                    <!-- дата публикации -->
                    <div class="flex items-center justify-center
                            text-center text-sm text-slate-600 dark:text-slate-400">
                        <svg class="w-3 h-3 fill-current shrink-0 mr-1" viewBox="0 0 16 16">
                            <path
                                d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                        </svg>
                        <span>
                            {{ video.published_at ? new Date(video.published_at).toLocaleDateString() : '' }}
                        </span>
                    </div>

                    <!-- ссылка заголовка -->
                    <Link :href="`/videos/${video.url}`"
                          class="my-1 block text-center text-md font-semibold
                             text-black dark:text-white
                             hover:text-blue-600 dark:hover:text-blue-400 transition">
                        {{ video.title }}
                    </Link>

                    <!-- Краткое описание, если есть -->
                    <p v-if="video.short"
                       class="flex items-center
                          tracking-wide text-sm text-black dark:text-white">
                        {{ video.short }}
                    </p>

                </div>
            </div>

            <!-- пагинация -->
            <div class="flex items-center justify-center mt-6 space-x-2 text-sm font-medium">

                <!-- кнопка назад -->
                <button @click="goToPage(pagination.currentPage - 1)"
                        :disabled="pagination.currentPage === 1"
                        class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-600
                           text-gray-900 dark:text-gray-100
                           border border-gray-400 dark:border-gray-200 disabled:opacity-50">
                    «
                </button>

                <!-- инпут страницы -->
                <input type="number" :value="pagination.currentPage"
                       @change="e => goToPage(Number(e.target.value))"
                       :min="1" :max="pagination.lastPage"
                       class="w-16 text-center px-3 py-1.5 rounded text-xs
                          border border-gray-400 dark:border-gray-200
                          bg-slate-100 dark:bg-slate-600 text-gray-900 dark:text-white"/>

                <!-- количество страниц -->
                <span class="text-gray-700 dark:text-gray-200">/ {{ pagination.lastPage }}</span>

                <!-- кнопка вперёд -->
                <button @click="goToPage(pagination.currentPage + 1)"
                        :disabled="pagination.currentPage === pagination.lastPage"
                        class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-600
                           text-gray-900 dark:text-gray-100
                           border border-gray-400 dark:border-gray-200 disabled:opacity-50">
                    »
                </button>

            </div>

        </div>
    </DefaultLayout>
</template>
