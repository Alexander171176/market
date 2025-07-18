<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    videos: Array
});

const { t } = useI18n();

const currentSlides = ref({});
const activeVideoIds = ref({});
const intervalIds = ref({});

const startSlideshow = (videoId, imagesLength) => {
    stopSlideshow(videoId);
    if (imagesLength > 1) {
        intervalIds.value[videoId] = setInterval(() => {
            currentSlides.value[videoId] =
                (currentSlides.value[videoId] + 1) % imagesLength;
        }, 4000);
    }
};

const stopSlideshow = (videoId) => {
    if (intervalIds.value[videoId]) {
        clearInterval(intervalIds.value[videoId]);
        delete intervalIds.value[videoId];
    }
};

const playVideo = (videoId) => {
    activeVideoIds.value[videoId] = true;
    stopSlideshow(videoId);
};

const getVideoUrl = (video) => {
    const source = video.source_type;
    const id = video.external_video_id;
    try {
        if (source === 'youtube') {
            const url = new URL(id);
            const videoId = url.searchParams.get('v');
            return `https://www.youtube.com/embed/${videoId}`;
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

onMounted(() => {
    props.videos.forEach(video => {
        currentSlides.value[video.id] = 0;
        if (video.images?.length > 1) startSlideshow(video.id, video.images.length);
    });
});

onUnmounted(() => {
    props.videos.forEach(video => stopSlideshow(video.id));
});
</script>

<template>
    <div v-if="videos && videos.length > 0" class="mt-4">
        <h2 class="mb-4 tracking-wide text-center font-semibold text-lg text-black dark:text-white">
            {{ t('relatedVideos') }}
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            <div v-for="item in videos" :key="item.id"
                 class="relative flex flex-col rounded overflow-hidden bg-slate-100 dark:bg-slate-700
                        border-2 border-slate-400 shadow-md shadow-gray-400 dark:shadow-gray-800">

                <!-- Слайдер или плеер -->
                <div class="relative w-full bg-black aspect-video overflow-hidden">
                    <template v-if="item.images?.length && !activeVideoIds[item.id]">
                        <div class="relative w-full h-full">
                            <template v-for="(img, index) in item.images" :key="img.id || index">
                                <img
                                    :src="img.url"
                                    :alt="img.alt || item.title"
                                    class="slide-fade w-full h-full object-cover"
                                    :class="{ 'slide-fade-active': index === currentSlides[item.id] }"
                                />
                            </template>
                            <div class="absolute inset-0 flex items-center justify-center z-20">
                                <button @click="playVideo(item.id)"
                                        class="bg-white/30 hover:bg-white/40 backdrop-blur-md rounded-full p-2 border-8 border-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-600"
                                         viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <template v-if="item.source_type === 'code'">
                            <div class="w-full h-full" v-html="getVideoUrl(item)"></div>
                        </template>
                        <iframe v-else-if="['youtube', 'vimeo'].includes(item.source_type)"
                                class="w-full h-full"
                                :src="getVideoUrl(item)"
                                style="width: 100% !important; aspect-ratio: 16 / 9 !important; display: block !important;"
                                frameborder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowfullscreen>
                        </iframe>
                        <video v-else-if="item.source_type === 'local'"
                               class="w-full h-full object-contain"
                               controls>
                            <source :src="getVideoUrl(item)" type="video/mp4" />
                            {{ t('videoNotSupported') }}
                        </video>
                    </template>
                </div>

                <!-- Название и дата -->
                <div class="text-center text-sm font-semibold text-slate-800 dark:text-slate-100 pt-1">
                    <Link :href="`/videos/${item.url}`"
                          class="block text-sm font-semibold text-slate-800 dark:text-slate-100
                                 hover:text-red-600 hover:dark:text-red-400 transition">
                        {{ item.title }}
                    </Link>
                    <div class="pb-2 flex items-center justify-center
                                text-center text-xs text-slate-600 dark:text-slate-400">
                        <svg class="w-3 h-3 fill-current shrink-0 mr-1" viewBox="0 0 16 16">
                            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                        </svg>
                        {{ item.published_at ? new Date(item.published_at).toLocaleDateString() : '' }}
                    </div>
                </div>
            </div>
        </div>
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
