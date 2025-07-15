<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import {usePage, Link} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';
import ArticleImageSlider from "@/Components/Public/Default/Article/ArticleImageSlider.vue";
import BannerImageSlider from "@/Components/Public/Default/Banner/BannerImageSlider.vue";

const {t} = useI18n();
// Получаем данные из страницы, включая новый пропс leftArticles
const {leftArticles, leftBanners, siteSettings} = usePage().props;

// Используем prop leftArticles вместо вычисления через секции
const articles = computed(() => leftArticles || []);
const banners = computed(() => leftBanners || []);

const isCollapsed = ref(false);
const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
};

const sidebarClasses = computed(() => {
    return [
        'transition-all',
        'duration-300',
        'p-2',
        'w-full', // на маленьких экранах всегда full width
        isCollapsed.value ? 'lg:w-8' : 'lg:w-80'
    ].join(' ');
});

// Референс для хранения состояния темной темы (true, если активен темный режим)
const isDarkMode = ref(false);

// Переменная для хранения экземпляра MutationObserver, чтобы можно было отключить наблюдение позже
let observer;

// Функция для проверки, активирован ли темный режим, путем проверки наличия класса "dark" на элементе <html>
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
    <aside v-if="articles.length > 0" :class="[sidebarClasses, bgColorClass]">
        <div class="flex items-center justify-start">
            <button @click="toggleSidebar" class="focus:outline-none" :title="t('toggleSidebar')">
                <svg v-if="isCollapsed"
                     class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <svg v-else
                     class="w-6 h-6 text-rose-500 dark:text-rose-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 5v14l-11-7z"/>
                </svg>
            </button>
            <h2 v-if="!isCollapsed"
                class="w-full text-center text-xl font-semibold text-gray-900 dark:text-slate-100">
                {{ t('latestNews') }}
            </h2>
        </div>

        <!-- Содержимое сайдбара показывается, когда он развернут -->
        <div v-show="!isCollapsed" class="mt-4">
            <div class="flex flex-col items-center justify-center">
                <ul class="max-w-3xl">
                    <li v-for="article in articles" :key="article.id"
                        class="mb-2 pb-2">

                        <!-- Изображение статьи -->
                        <Link v-if="article.images && article.images.length > 0"
                              :href="`/articles/${article.url}`"
                              class="h-auto overflow-hidden">
                            <ArticleImageSlider
                                :images="article.images"
                                :link="`/articles/${article.url}`"/>
                        </Link>
                        <Link v-else :href="`/articles/${article.url}`"
                              class="h-auto flex items-center justify-center bg-gray-200 dark:bg-gray-400">
                            <span class="text-gray-500 dark:text-gray-700">{{ t('noCurrentImage') }}</span>
                        </Link>

                        <!-- Ссылка и дата статьи -->
                        <div class="px-3 my-1">
                            <div class="text-center text-xs font-semibold text-orange-500 dark:text-orange-400">
                                {{ article.created_at.substring(0, 10) }}
                            </div>
                            <h3 class="text-md font-semibold text-blue-900 dark:text-white">
                                <Link :href="`/articles/${article.url}`"
                                      class="hover:text-blue-600 dark:hover:text-blue-400">
                                    {{ article.title }}
                                </Link>
                            </h3>
                        </div>

                        <!-- Краткое описание статьи -->
                        <div class="flex flex-wrap items-center p-2
                                border border-dashed border-slate-400 dark:border-slate-200">
                            <p class="italic text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {{ article.short }}
                            </p>
                        </div>

                    </li>
                    <li v-for="banner in banners" :key="banner.id"
                        class="mb-2 pb-2">

                        <!-- Название баннера -->
                        <template v-if="banner.link">
                            <Link :href="banner.link">
                                <div class="px-3 my-1">
                                    <h3 class="text-center text-lg font-semibold
                                        text-teal-600 dark:text-yellow-200">
                                        {{ banner.title }}
                                    </h3>
                                </div>
                            </Link>
                        </template>
                        <template v-else>
                            <div class="px-3 my-1">
                                <h3 class="text-center text-lg font-semibold
                                    text-teal-600 dark:text-yellow-200">
                                    {{ banner.title }}
                                </h3>
                            </div>
                        </template>

                        <!-- Изображение баннера -->
                        <!-- Если banner.link не пустой, оборачиваем слайдер в ссылку, иначе просто выводим слайдер -->
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


                        <!-- Краткое описание статьи -->
                        <!--                    <p class="mt-2 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">-->
                        <!--                        {{ banner.short }}-->
                        <!--                    </p>-->

                    </li>
                </ul>
            </div>
        </div>

    </aside>
</template>

<style scoped>
/* Дополнительные стили при необходимости */
</style>
