<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePage, Link } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { mainArticles } = usePage().props;
const articles = computed(() => mainArticles || []);

const currentSlide = ref(0);
const currentArticle = computed(() => articles.value[currentSlide.value] || null);

const next = () => {
    if (articles.value.length > 0) {
        currentSlide.value = (currentSlide.value + 1) % articles.value.length;
    }
};

const prev = () => {
    if (articles.value.length > 0) {
        currentSlide.value = (currentSlide.value - 1 + articles.value.length) % articles.value.length;
    }
};

let slideInterval = null;
onMounted(() => {
    slideInterval = setInterval(next, 3000);
});
onUnmounted(() => {
    clearInterval(slideInterval);
});
</script>

<template>
    <div v-if="currentArticle"
         class="slider p-1 flex justify-center
                w-full md:w-2/3 h-auto max-h-56 sm:max-h-96 lg:max-h-72 xl:max-h-96">
        <div class="relative overflow-hidden w-full max-w-2xl">
            <transition name="fade" mode="out-in">
                <div v-if="currentArticle" :key="currentArticle.id" class="slide absolute inset-0">
                    <!-- Информация о статье -->
                    <div class="w-full absolute p-3 bg-slate-800 opacity-75">
                        <div class="text-xs font-semibold text-yellow-200 mb-1">
                            {{ currentArticle.created_at.substring(0, 10) }}
                        </div>
                        <Link
                            :href="`/articles/${currentArticle.url}`"
                            class="font-semibold text-white hover:text-blue-700 dark:hover:text-blue-600">
                            {{ currentArticle.title }}
                        </Link>
                    </div>
                    <!-- Обёртка с соотношением сторон 4:3 -->
                    <div class="w-full aspect-[4/3] overflow-hidden">
                        <img
                            v-if="currentArticle.images && currentArticle.images.length > 0"
                            :src="currentArticle.images[0].webp_url || currentArticle.images[0].url"
                            :alt="currentArticle.images[0].alt"
                            class="w-full h-full object-cover"
                        />
                        <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-400">
                            <span class="text-gray-500 dark:text-gray-700">{{ t('noCurrentImage') }}</span>
                        </div>
                    </div>
                </div>
            </transition>

            <!-- Кнопки навигации -->
            <button
                @click="prev"
                class="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2
                       bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-sm
                       focus:outline-none"
                title="Previous">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.707 3.707a1 1 0 010 1.414L4.414 8H16a1 1 0 110 2H4.414l3.293 3.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
            <button
                @click="next"
                class="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2
                       bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-sm
                       focus:outline-none"
                title="Next">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 12H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 5s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.slider {
    height: 36rem;
}

.slide {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
