<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import DefaultLayout from '@/Layouts/DefaultLayout.vue';
import LikeButtonArticle from '@/Components/Public/Default/Article/LikeButtonArticle.vue';
import ArticleImageMain from '@/Components/Public/Default/Article/ArticleImageMain.vue';
import RecommendedVideos from '@/Components/Public/Default/Video/RecommendedVideos.vue';

const { t } = useI18n()

// Извлекаем настройки из props, переданных через Inertia
const { article, recommendedArticles,recommendedVideos, siteSettings } = usePage().props

// console.log('[recommendedVideos]', recommendedVideos);

const activeTags = computed(() => {
    return article.tags?.filter(tag => tag.activity) || []
})

// Референс для хранения состояния темной темы (true, если активен темный режим)
const isDarkMode = ref(false)

// Переменная для хранения экземпляра MutationObserver, чтобы можно было отключить наблюдение позже
let observer

// Функция для проверки, активирован ли темный режим, путем проверки наличия класса "dark" на элементе <html>
const checkDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
    //console.log('Dark mode updated to:', isDarkMode.value);
}

onMounted(() => {
    // Выполняем первоначальную проверку при монтировании компонента
    checkDarkMode()

    // Настраиваем MutationObserver для отслеживания изменений в атрибуте class у <html>
    // Это необходимо для того, чтобы реагировать на динамические изменения темы
    observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
        attributes: true,           // Следим за изменениями атрибутов
        attributeFilter: ['class']  // Фильтруем только по изменению класса
    })
})

onUnmounted(() => {
    // При размонтировании компонента отключаем наблюдатель, чтобы избежать утечек памяти
    if (observer) {
        observer.disconnect()
    }
})

// Вычисляемое свойство, которое возвращает нужный класс для фона в зависимости от текущего режима
// Если темный режим активен, возвращается значение из настройки для темного режима,
// иначе - значение из настройки для светлого режима.
const bgColorClass = computed(() => {
    return isDarkMode.value
        ? siteSettings.PublicDarkBackgroundColor
        : siteSettings.PublicLightBackgroundColor
})

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
</script>

<template>
    <DefaultLayout :title="article.title" :can-login="$page.props.canLogin" :can-register="$page.props.canRegister">
        <Head>
            <title>{{ article.title }}</title>
            <!-- Основные метатеги, Open Graph, Twitter, Dublin Core, Schema.org и т.д. -->
            <meta name="title" :content="article.title || ''" />
            <meta name="description" :content="article.meta_desc || ''" />
            <meta name="keywords" :content="article.meta_keywords || ''" />
            <meta name="author" :content="article.author || ''" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <!-- Open Graph / Facebook -->
            <meta property="og:title" :content="article.title || ''" />
            <meta property="og:description" :content="article.meta_desc || ''" />
            <meta property="og:type" content="article" />
            <meta property="og:url" :content="`/articles/${article.url}`" />
            <meta property="og:image"
                  :content="article.images && article.images.length > 0 ? article.images[0].url : ''" />
            <meta property="og:locale" :content="article.locale || 'ru_RU'" />

            <!-- Twitter -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" :content="article.title || ''" />
            <meta name="twitter:description" :content="article.meta_desc || ''" />
            <meta name="twitter:image"
                  :content="article.images && article.images.length > 0 ? article.images[0].url : ''" />

            <!-- Schema.org / Google -->
            <meta itemprop="name" :content="article.title || ''" />
            <meta itemprop="description" :content="article.meta_desc || ''" />
            <meta itemprop="image"
                  :content="article.images && article.images.length > 0 ? article.images[0].url : ''" />
        </Head>

        <!-- Применяем вычисляемый класс к элементу статьи -->
        <article itemscope itemtype="https://schema.org/BlogPosting"
                 :class="['flex-1 p-4 selection:bg-red-400 selection:text-white', bgColorClass]">

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
                        {{ article.title }}
                    </li>
                </ol>
            </nav>

            <!-- Микроданные для заголовка -->
            <header>
                <!-- Дата публикации, форматируем по необходимости -->
                <time itemprop="datePublished"
                      :datetime="formatDate(article.published_at)"
                      class="mt-2 flex items-center justify-center
                                 text-xs font-semibold text-center
                                 text-slate-600 dark:text-slate-400 opacity-75">
                    {{ t('publishedAt') }}:&nbsp;
                    <svg class="w-3 h-3 fill-current shrink-0 mr-1" viewBox="0 0 16 16">
                        <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                    </svg>
                    {{ formatDate(article.published_at) }}
                </time>
                <div class="flex flex-row items-center justify-center my-1">
                    <h1 itemprop="headline"
                        class="flex items-center justify-center my-2 text-center font-bolder
                               text-xl text-slate-900 dark:text-slate-100">
                        {{ article.title }}
                    </h1>
                    <div class="ml-2 w-6 h-5 flex items-center justify-center rounded-full
                                text-[9px] font-semibold
                                text-black dark:text-white bg-slate-100 dark:bg-slate-700"
                         itemprop="interactionStatistic"
                         itemscope itemtype="http://schema.org/InteractionCounter">
                        <meta itemprop="interactionType" content="http://schema.org/ViewAction">
                        <meta itemprop="userInteractionCount" :content="article.views"
                              :title="t('views')">
                        {{ article.views }}
                    </div>
                </div>
            </header>

            <!-- Если изображений больше одного – слайдер -->
            <div v-if="article.images && article.images.length > 1"
                 class="flex flex-col justify-center items-center"
                 itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                <ArticleImageMain :images="article.images"
                                  :link="`/articles/${article.url}`"
                                  class="max-w-4xl" />
                <meta itemprop="width" content="800" />
                <meta itemprop="height" content="600" />
            </div>

            <!-- Если изображение одно – обычное изображение -->
            <div v-else-if="article.images && article.images.length === 1"
                 class="flex flex-col justify-center items-center"
                 itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                <img :src="article.images[0].webp_url || article.images[0].url"
                     :alt="article.images[0].alt"
                     class="w-full h-full object-cover
                            shadow-md shadow-gray-600 dark:shadow-gray-900" />
                <meta itemprop="width" content="800" />
                <meta itemprop="height" content="600" />
            </div>

            <!-- Если изображений нет – дефолтная заглушка -->
            <div v-else
                 class="flex flex-col justify-center items-center"
                 itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                <img src="/article_images/default-image.png"
                     alt="No image available"
                     class="w-full h-full object-cover opacity-40
                            shadow-md shadow-gray-600 dark:shadow-gray-900" />
                <meta itemprop="width" content="800" />
                <meta itemprop="height" content="600" />
            </div>

            <!-- Можно отобразить caption для первого изображения, либо для текущего слайдера -->
            <div v-if="article.images[0].caption"
                 class="mt-2 text-start text-xs text-gray-600 dark:text-gray-300"
                 itemprop="caption">
                {{ article.images[0].caption }}
            </div>

            <div v-if="article.short"
                 class="flex items-center justify-center my-3">
                <!-- Краткое описание -->
                <p itemprop="description"
                   class="text-sm font-semibold text-black dark:text-white mr-2">
                    {{ article.short }}
                </p>
            </div>

            <!-- Полное описание -->
            <div v-if="article.description"
                 class="w-full mx-auto my-4 dark:text-slate-200"
                 v-html="article.description" itemprop="articleBody"></div>

            <!-- Теги -->
            <div v-if="activeTags.length"
                 class="flex justify-start items-center mb-3 font-semibold italic">
                <span v-for="(tag, index) in activeTags" :key="tag.id">
                    <Link :href="`/tags/${tag.slug}`" itemprop="keywords"
                          class="text-sm text-blue-500 dark:text-violet-300
                                 hover:text-rose-400 hover:dark:text-rose-300">
                        {{ tag.name }}
                    </Link>
                    <span v-if="index < activeTags.length - 1">, </span>
                </span>
            </div>

            <div class="flex justify-center items-center">
                <!-- Автор -->
                <div v-if="article.author"
                     class="font-semibold text-sm text-black dark:text-white"
                     itemprop="author">
                    {{ t('postAuthor') }}:
                    <span class="mr-2 text-sky-600 dark:text-sky-300"> {{ article.author }}</span>
                </div>
                <!-- Лайк -->
                <LikeButtonArticle :already-liked="article.already_liked" />
            </div>

            <!-- Блок рекомендованных статей -->
            <div v-if="recommendedArticles && recommendedArticles.length > 0" class="mt-4">
                <h2 class="mb-4 tracking-wide text-center font-semibold text-lg
                           text-black dark:text-white">
                    {{ t('relatedArticles') }}:
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">

                    <!-- Изменённый фрагмент для каждого рекомендованного элемента -->
                    <Link :href="`/articles/${rec.url}`"
                          v-for="rec in recommendedArticles"
                          :key="rec.id"
                         class="shadow-md shadow-gray-300 dark:shadow-gray-800">
                        <div class="relative w-full">
                            <!-- Обёртка с соотношением сторон 4:3 -->
                            <div class="w-full aspect-[4/3] overflow-hidden">
                                <img
                                    v-if="rec.images && rec.images.length > 0"
                                    :src="rec.images[0].webp_url || rec.images[0].url"
                                    :alt="rec.images[0].alt"
                                    class="w-full h-full object-cover"
                                />
                                <div v-else
                                     class="w-full h-full flex items-center justify-center
                                            bg-gray-200 dark:bg-gray-400">
                                    <span class="text-gray-500 dark:text-gray-700">
                                        {{ t('noCurrentImage') }}
                                    </span>
                                </div>
                            </div>
                            <!-- Прозрачный блок с информацией, накладывается снизу на изображение -->
                            <div class="absolute bottom-0 left-0 w-full px-2 pt-1
                                        bg-slate-800 bg-opacity-75">
                                <div class="text-xs font-semibold leading-5 tracking-wider
                                             text-slate-100 hover:text-amber-200">
                                    {{ rec.title }}
                                </div>
                                <div class="mb-1 flex items-center justify-center
                                            text-xs font-semibold text-yellow-200 text-center">
                                    <svg class="w-3 h-3 fill-current shrink-0 mr-1"
                                         viewBox="0 0 16 16">
                                        <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                                    </svg>
                                    {{ rec.published_at.substring(0, 10) }}
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>

            <!-- Блок рекомендованных видео -->
            <div v-if="recommendedVideos && recommendedVideos.length > 0" class="mt-6">
                <RecommendedVideos
                    :videos="recommendedVideos"
                    :formatDate="formatDate"
                />
            </div>

        </article>

    </DefaultLayout>
</template>
