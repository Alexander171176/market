<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePage, Link } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import ArticleImageSlider from '@/Components/Public/Default/Article/ArticleImageSlider.vue'
import BannerImageSlider from '@/Components/Public/Default/Banner/BannerImageSlider.vue'
import SidebarVideos from '@/Components/Public/Default/Video/SidebarVideos.vue'

const { t } = useI18n()
// Получаем данные для правой колонки из страницы, статьи, баннеры и настройки
const { rightArticles, rightBanners, rightVideos, siteSettings } = usePage().props

// Вычисляем статьи и баннеры
const articles = computed(() => rightArticles || [])
const banners = computed(() => rightBanners || [])

// переменная свёртывания колонки, по умолчанию не свёрнута
const isCollapsed = ref(false)

// функция свёртывания/развёртывания
const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
}

// класс стилей правой колонки, включая для маленьких экранов
const sidebarClasses = computed(() => {
    return [
        'transition-all',
        'duration-300',
        'p-2',
        'w-full', // на маленьких экранах всегда full width
        isCollapsed.value ? 'lg:w-8' : 'lg:w-80'
    ].join(' ')
})

// Референс для хранения состояния темной темы (true, если активен темный режим)
const isDarkMode = ref(false)

// Переменная для хранения экземпляра MutationObserver, ч
// тобы можно было отключить наблюдение позже
let observer

// Функция для проверки, активирован ли темный режим,
// путем проверки наличия класса "dark" на элементе <html>
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
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы от 0
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}
</script>

<template>
    <div class="relative">
        <!-- одна ветка поверх левой колонки -->
<!--        <img-->
<!--            src="./../../../../../images/tree.png"-->
<!--            alt="Vine frame"-->
<!--            loading="lazy"-->
<!--            class="hidden md:block absolute top-0 h-full w-auto opacity-60 pointer-events-none z-10-->
<!--                   filter contrast-125 brightness-90 saturate-150"-->
<!--            style="left: -80px"-->
<!--        />-->
        <aside v-if="articles.length > 0" :class="[sidebarClasses, bgColorClass]">
            <div class="flex items-center justify-end">
                <!--            <h2 v-if="!isCollapsed"-->
                <!--                class="w-full text-center text-xl font-semibold text-gray-900 dark:text-slate-100">-->
                <!--                {{ t('latestNews') }}-->
                <!--            </h2>-->
                <button @click="toggleSidebar" class="focus:outline-none" :title="t('toggleSidebar')">
                    <svg v-if="isCollapsed"
                         class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 5v14l-11-7z" />
                    </svg>
                    <svg v-else
                         class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>
            </div>

            <!-- Содержимое сайдбара показывается, когда он развернут -->
            <div v-show="!isCollapsed" class="mt-1">
                <div class="flex flex-col items-center justify-center">
                    <ul class="max-w-xl">
                        <li v-for="banner in banners" :key="banner.id"
                            class="mb-3 pb-2">

                            <!-- Если изображений много то слайдер, иначе одно изображение -->
                            <div v-if="banner.images && banner.images.length > 0">
                                <template v-if="banner.link">
                                    <Link :href="banner.link">
                                        <BannerImageSlider :images="banner.images" />
                                    </Link>
                                </template>
                                <template v-else>
                                    <BannerImageSlider :images="banner.images" />
                                </template>
                            </div>

                            <!-- Ссылка Баннера, иначе просто заголовок -->
                            <div v-if="banner.title">
                                <template v-if="banner.link">
                                    <Link :href="banner.link">
                                        <div class="mt-3">
                                            <h3 class="px-3 py-1 text-center text-xs font-semibold
                                               text-black dark:text-white
                                               hover:text-blue-600 dark:hover:text-blue-400
                                               border border-dashed
                                               border-gray-400 dark:border-gray-200">
                                                {{ banner.title }}
                                            </h3>
                                        </div>
                                    </Link>
                                </template>
                                <template v-else>
                                    <div class="mt-3">
                                        <h3 class="px-3 py-1 text-center text-xs font-semibold
                                               text-black dark:text-white
                                               border border-dashed
                                               border-gray-400 dark:border-gray-200">
                                            {{ banner.title }}
                                        </h3>
                                    </div>
                                </template>
                            </div>

                        </li>
                        <li v-for="article in articles" :key="article.id"
                            class="col-span-full flex flex-col items-start mb-3 p-2
                               overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-800
                               hover:shadow-md hover:shadow-gray-400 dark:hover:shadow-gray-700">

                            <!-- Если изображений много то слайдер, иначе одно изображение -->
                            <div class="w-full h-auto shrink-0 overflow-hidden mb-2
                                    rounded-md shadow-md shadow-gray-400 dark:shadow-gray-700">

                                <Link v-if="article.img" :href="`/articles/${article.url}`">
                                    <img :src="getImgSrc(article.img)" :alt="article.img.alt"
                                         class="w-full h-auto object-cover" loading="lazy" />
                                </Link>
                                <Link v-else-if="article.images?.length"
                                      :href="`/articles/${article.url}`">
                                    <ArticleImageSlider
                                        :images="article.images" :link="`/articles/${article.url}`" />
                                </Link>
                                <Link v-else :href="`/articles/${article.url}`"
                                      class="flex items-center justify-center
                                         bg-gray-200 dark:bg-gray-400 h-32">
                                <span class="text-slate-900 dark:text-slate-100">
                                    {{ t('noCurrentImage') }}
                                </span>
                                </Link>
                            </div>

                            <!-- Контент -->
                            <div class="flex flex-col flex-grow h-auto">
                                <h3 class="text-xs font-semibold text-black dark:text-white my-1">
                                    <Link :href="`/articles/${article.url}`"
                                          class="hover:text-blue-600 dark:hover:text-blue-400">
                                        {{ article.title }}
                                    </Link>
                                </h3>

                                <div class="flex items-center justify-center
                                        text-center text-xs font-semibold
                                        text-slate-600 dark:text-slate-400 opacity-75">
                                    <svg class="w-3 h-3 fill-current shrink-0 mr-1" viewBox="0 0 16 16">
                                        <path
                                            d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                                    </svg>
                                    <span>{{ formatDate(article.published_at) }}</span>
                                </div>
                            </div>

                        </li>
                        <SidebarVideos :videos="rightVideos" />
                    </ul>
                </div>
            </div>

        </aside>
    </div>
</template>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
