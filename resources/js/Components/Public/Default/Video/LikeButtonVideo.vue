<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { usePage } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { video } = usePage().props

const likes = ref(video.likes_count)
const alreadyLiked = ref(video.already_liked || false)

const likeVideo = () => {
    if (alreadyLiked.value) return

    axios.post(route('videos.like', video.id))
        .then(response => {
            if (response.data.success) {
                likes.value = response.data.likes
                alreadyLiked.value = true
            } else {
                alert(response.data.message || t('alertLikeAlready')) //Вы уже лайкали это видео
            }
        })
        .catch(error => {
            if (error.response?.status === 401) {
                alert(t('alertLikeAuthRequired'))
            } else {
                console.error('Ошибка лайка:', error)
                alert(t('alertLikeError'))
            }
        })
}
</script>

<template>
    <div itemprop="interactionStatistic"
         itemscope itemtype="http://schema.org/InteractionCounter">
        <meta itemprop="interactionType" content="http://schema.org/LikeAction">
        <meta itemprop="userInteractionCount" :content="likes" />
        <div :title="t('like')"
             class="w-fit flex flex-row items-center justify-center cursor-pointer">
            <svg
                @click="likeVideo"
                :class="[
                    'w-4 h-4 fill-current transition-all duration-200 transform',
                    alreadyLiked
                        ? 'text-red-500 dark:text-red-300'
                        : 'text-amber-500 dark:text-amber-400 hover:text-yellow-300 dark:hover:text-yellow-200 active:text-yellow-300 dark:active:text-yellow-100'
                ]"
                viewBox="0 0 24 24"
            >
                <path d="M3,9H1a1,1,0,0,0-1,1V22a1,1,0,0,0,1,1H4V10A1,1,0,0,0,3,9Z"></path>
                <path
                    d="M21.882,8.133A2.986,2.986,0,0,0,21,8H15V5c0-3.824-2.589-4.942-3.958-5a1.017,1.017,0,0,0-.734.277A1,1,0,0,0,10,1V5.638l-4,4.8V23H18.23A2.985,2.985,0,0,0,21.1,20.882l2.769-9A3,3,0,0,0,21.882,8.133Z"></path>
            </svg>
            <span v-if="likes > 0" class="ml-1 font-semibold text-xs dark:text-slate-100">
              {{ likes }}
            </span>
        </div>
    </div>
</template>
