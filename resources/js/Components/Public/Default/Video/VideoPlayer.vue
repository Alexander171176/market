<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    video: Object
});

const emit = defineEmits(['play']);

const { t } = useI18n();

const currentSlide = ref(0);
const intervalId = ref(null);

// Автосмена слайдов
const startSlideshow = () => {
    stopSlideshow();
    if (props.video.images?.length > 1) {
        intervalId.value = setInterval(() => {
            currentSlide.value = (currentSlide.value + 1) % props.video.images.length;
        }, 4000);
    }
};

const stopSlideshow = () => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null;
    }
};

onMounted(() => {
    startSlideshow();
});

onUnmounted(() => {
    stopSlideshow();
});

// Видео-плеер
const activeVideoId = ref(null);

const playVideo = (id) => {
    activeVideoId.value = id;
    stopSlideshow();
};

// Генерация URL
const getVideoUrl = (video) => {
    const source = video.source_type;
    const id = video.external_video_id;

    try {
        if (source === 'youtube') {
            let videoId = null;
            const url = new URL(id);

            // Попробовать вытащить параметр ?v=...
            videoId = url.searchParams.get('v');

            // Если это ссылка вида youtu.be/ID
            if (!videoId && url.hostname === 'youtu.be') {
                videoId = url.pathname.slice(1);
            }

            // Если это ссылка вида /shorts/ID или другой путь
            if (!videoId && url.pathname) {
                const match = url.pathname.match(/(?:\/shorts\/|\/watch\/|\/)([a-zA-Z0-9_-]{11})/);
                videoId = match ? match[1] : null;
            }

            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }

        if (source === 'vimeo') {
            const match = id.match(/vimeo\.com\/(?:video\/)?(\d+)/);
            return match ? `https://player.vimeo.com/video/${match[1]}` : null;
        }

        if (source === 'local') {
            return video.video_url || `/storage/${id}`;
        }

        if (source === 'code') {
            return video.video_code || video.embed_code || null;
        }
    } catch (e) {
        console.error('❌ Video URL error:', e);
        return null;
    }

    return null;
};

</script>

<template>
    <div class="relative w-full aspect-video bg-black rounded mb-4
              shadow-lg shadow-gray-400 dark:shadow-gray-800 overflow-hidden">

        <!-- Слайдер -->
        <template v-if="video.images?.length && activeVideoId !== video.id">
            <div class="relative w-full h-full">
                <template v-for="(img, index) in video.images" :key="img.id || index">
                    <img
                        :src="img.url"
                        :alt="img.alt || video.title"
                        loading="lazy"
                        class="slide-fade w-full h-full object-cover"
                        :class="{ 'slide-fade-active': index === currentSlide }"
                    />
                </template>

                <!-- Кнопка Play -->
                <div class="absolute inset-0 flex items-center justify-center z-20">
                    <button
                        @click="playVideo(video.id)"
                        class="bg-white/30 hover:bg-white/40 backdrop-blur-md rounded-full
                               p-2 border-8 border-white/30">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-8 h-8 text-red-600"
                             viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </template>

        <!-- Плеер -->
        <template v-else>
            <template v-if="video.source_type === 'code'">
                <div class="w-full h-full" v-html="getVideoUrl(video)"></div>
            </template>

            <iframe
                v-else-if="['youtube', 'vimeo'].includes(video.source_type)"
                class="w-full h-full"
                :src="getVideoUrl(video)"
                style="width: 100% !important;
               aspect-ratio: 16 / 9 !important;
               display: block !important;"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen loading="lazy"
            ></iframe>

            <video
                v-else-if="video.source_type === 'local'"
                class="w-full h-full object-contain"
                controls
            >
                <source :src="getVideoUrl(video)" type="video/mp4"/>
                {{ t('videoNotSupported') }}
            </video>
        </template>
    </div>
</template>

<style scoped>
.slide-fade {
    transition: opacity 1s ease-in-out;
    opacity: 0;
    position: absolute;
    inset: 0;
}
.slide-fade-active {
    opacity: 1;
    z-index: 10;
}
</style>
