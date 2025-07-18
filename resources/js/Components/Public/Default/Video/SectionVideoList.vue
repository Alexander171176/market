<!-- SectionVideoList.vue -->
<script setup>
import { Link } from '@inertiajs/vue3'
import VideoPlayer from './VideoPlayer.vue'

defineProps({
    videos: {
        type: Array,
        default: () => []
    }
})
</script>

<template>
    <section v-if="videos.length" class="mt-8 space-y-6">
        <div class="flex flex-col gap-4">
            <div v-for="video in videos" :key="video.id"
                 class="mb-4 pb-4 border-b border-slate-500 dark:border-slate-100">
                <Link :href="`/videos/${video.url}`">
                    <VideoPlayer :video="video" />
                </Link>
                <div class="flex items-center justify-center
                            text-center text-xs text-slate-600 dark:text-slate-400">
                    <svg class="w-3 h-3 fill-current shrink-0 mr-1" viewBox="0 0 16 16">
                        <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                    </svg>
                    <span>
                        {{ video.published_at ? new Date(video.published_at).toLocaleDateString() : '' }}
                    </span>
                </div>
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
    </section>
</template>
