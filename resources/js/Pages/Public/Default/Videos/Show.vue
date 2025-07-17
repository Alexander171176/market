<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import DefaultLayout from '@/Layouts/DefaultLayout.vue';
import VideoPlayer from '@/Components/Public/Default/Video/VideoPlayer.vue';
import RecommendedVideos from '@/Components/Public/Default/Video/RecommendedVideos.vue';

const { t } = useI18n();
const { appUrl, video, recommendedVideos, locale, siteSettings } = usePage().props;

// Тёмный режим
const isDarkMode = ref(false);
let observer;

const checkDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
};

onMounted(() => {
    checkDarkMode();
    observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// Цвет фона
const bgColorClass = computed(() => {
    return isDarkMode.value
        ? siteSettings.PublicDarkBackgroundColor
        : siteSettings.PublicLightBackgroundColor;
});

// Форматирование даты
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
</script>

<template>
    <DefaultLayout
        :title="video.title"
        :can-login="$page.props.canLogin"
        :can-register="$page.props.canRegister">

        <!-- SEO -->
        <Head>
            <title>{{ video.title }}</title>
            <meta name="title" :content="video.title || ''" />
            <meta name="description" :content="video.meta_desc || ''" />
            <meta name="keywords" :content="video.meta_keywords || ''" />
            <meta name="author" :content="video.author || ''" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" :content="video.title || ''" />
            <meta property="og:description" :content="video.meta_desc || ''" />
            <meta property="og:type" content="video" />
            <meta property="og:url" :content="`/videos/${video.url}`" />
            <meta property="og:image" :content="video.images?.[0]?.url || ''" />
            <meta property="og:locale" :content="video.locale || 'ru_RU'" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" :content="video.title || ''" />
            <meta name="twitter:description" :content="video.meta_desc || ''" />
            <meta name="twitter:image" :content="video.images?.[0]?.url || ''" />
            <meta itemprop="name" :content="video.title || ''" />
            <meta itemprop="description" :content="video.meta_desc || ''" />
            <meta itemprop="image" :content="video.images?.[0]?.url || ''" />
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
                        {{ video.title }}
                    </li>
                </ol>
            </nav>

            <!-- Заголовок тега -->
            <h1 class="flex items-center justify-center my-4
                       text-center font-bolder text-xl
                       text-slate-900 dark:text-slate-100">
                <svg class="w-4 h-4 fill-current text-blue-400 dark:text-indigo-300 mr-2"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h2v16H0V0Zm14 0h2v16h-2V0Zm-3 7H5c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1ZM6 5h4V2H6v3Zm5 11H5c-.6 0-1-.4-1-1v-5c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1Zm-5-2h4v-3H6v3Z"></path>
                </svg>
                {{ video.title }}
                <div class="ml-2 w-6 h-5 flex items-center justify-center rounded-full
                                text-[9px] font-semibold
                                text-black dark:text-white bg-slate-100 dark:bg-slate-700"
                     :title="t('views')">
                    {{ video.views }}
                </div>
            </h1>

            <div class="flex-1">

                <VideoPlayer :video="video" />

                <!-- Дата публикации, форматируем по необходимости -->
                <time :datetime="formatDate(video.published_at)"
                      class="opacity-75 text-left text-xs font-semibold
                             text-slate-600 dark:text-slate-400">
                    {{ t('publishedAt') }}: {{ formatDate(video.published_at) }}
                </time>

                <!-- Краткое описание, если есть -->
                <p v-if="video.short"
                   class="flex items-center my-4
                      tracking-wide text-sm font-semibold text-black dark:text-white">
                    {{ video.short }}
                </p>

                <!-- Полное описание -->
                <div v-if="video.description"
                     class="w-full mx-auto my-4 dark:text-slate-200"
                     v-html="video.description" itemprop="articleBody"></div>

            </div>

            <!-- Рекомендованные видео -->
            <RecommendedVideos
                :videos="recommendedVideos"
                :formatDate="formatDate"
            />

        </div>
    </DefaultLayout>
</template>
