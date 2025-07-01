<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {usePage} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

// Получаем данные статьи из пропсов страницы
const {article} = usePage().props;
// Если нужно, делаем реактивной копию
const likes = ref(article.likes);

const likeArticle = () => {
    axios.post(route('articles.like', article.id))
        .then(response => {
            if (response.data.success) {
                likes.value = response.data.likes;
            }
        })
        .catch(error => {
            console.error('Ошибка лайка:', error);
        });
}
</script>

<template>
    <div itemprop="interactionStatistic" itemscope itemtype="http://schema.org/InteractionCounter">
        <meta itemprop="interactionType" content="http://schema.org/LikeAction">
        <meta itemprop="userInteractionCount" :content="article.likes">
        <div @click="likeArticle" :title="t('like')"
             class="w-12 px-1 py-0.5 flex flex-row items-center cursor-pointer rounded
              bg-slate-200 dark:bg-slate-700 hover:bg-opacity-75 active:bg-opacity-75
              border-2 border-slate-400
              transition-all duration-200 transform hover:scale-105 active:scale-95">
            <svg class="w-4 h-4 fill-current text-rose-400 hover:text-yellow-500 active:text-fuchsia-500
                transition-all duration-200 transform"
                 viewBox="0 0 512 512">
                <path
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
            </svg>
            <span class="ml-1 font-semibold text-sm dark:text-slate-100">
      {{ article.likes }}
    </span>
        </div>
    </div>
</template>
