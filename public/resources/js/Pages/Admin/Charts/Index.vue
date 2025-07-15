<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import ArticleLineChart01 from '@/Components/Admin/Chart/Article/ArticleLineChart01.vue';
import RubricBarChart01 from "@/Components/Admin/Chart/Rubric/RubricBarChart01.vue";

const { t } = useI18n();

const props = defineProps({
    rubrics: {
        type: Array,
        default: () => []
    },
    articles: {
        type: Array,
        default: () => []
    }
});
</script>

<template>
    <AdminLayout :title="t('charts')">
        <template #header>
            <TitlePage>
                {{ t('charts') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Возможно, сюда стоит добавить какой-то контент -->
                </div>
                <ArticleLineChart01 :articles="props.articles" :width="600" :height="400" />
                <RubricBarChart01 :rubrics="props.rubrics" :width="600" :height="400" />
            </div>
        </div>
    </AdminLayout>
</template>
