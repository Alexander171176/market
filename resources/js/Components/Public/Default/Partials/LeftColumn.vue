<script setup>
import {computed} from 'vue';
import {usePage, Link} from '@inertiajs/vue3';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
// Получаем данные из страницы, включая новый пропс sidebarArticles
const {mainArticles} = usePage().props;

// Используем prop mainArticles вместо вычисления через секции
const articles = computed(() => mainArticles || []);
</script>

<template>
    <div class="w-full hidden md:block lg:hidden xl:block md:w-1/3 h-auto max-h-96 md:max-h-full">
        <ul>
            <li v-for="article in articles" :key="article.id"
                class="mt-2 pb-2 border-b border-dashed border-slate-500 dark:border-slate-300">
                <div class="font-semibold text-xs text-orange-500 dark:text-orange-400 ml-2">
                    {{ article.created_at }}
                </div>
                <Link :href="`/articles/${article.url}`"
                      class="font-semibold text-gray-900 dark:text-white
                                 hover:text-blue-700 dark:hover:text-blue-600">
                    {{ article.title }}
                </Link>
            </li>
        </ul>
    </div>
</template>

<style scoped>

</style>
