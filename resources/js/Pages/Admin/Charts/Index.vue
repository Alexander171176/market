<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import ArticleBarChart01 from "@/Components/Admin/Chart/Article/ArticleBarChart01.vue";
import RubricBarChart01 from "@/Components/Admin/Chart/Rubric/RubricBarChart01.vue";
import ArticleBarChart02 from "@/Components/Admin/Chart/Article/ArticleBarChart02.vue";
import RubricBarChart02 from "@/Components/Admin/Chart/Rubric/RubricBarChart02.vue";
import ArticleBarChart03 from "@/Components/Admin/Chart/Article/ArticleBarChart03.vue";
import RubricBarChart03 from "@/Components/Admin/Chart/Rubric/RubricBarChart03.vue";
import ArticleBarChart04 from "@/Components/Admin/Chart/Article/ArticleBarChart04.vue";
import RubricBarChart04 from "@/Components/Admin/Chart/Rubric/RubricBarChart04.vue";
import ArticleBarChartLikes from "@/Components/Admin/Chart/Article/ArticleBarChartLikes.vue";
import ArticleBarChart05 from "@/Components/Admin/Chart/Article/ArticleBarChart05.vue";
import ArticleBarChartLikes05 from "@/Components/Admin/Chart/Article/ArticleBarChartLikes05.vue";
import RubricBarChart05 from "@/Components/Admin/Chart/Rubric/RubricBarChart05.vue";
import ArticleBarChart06 from "@/Components/Admin/Chart/Article/ArticleBarChart06.vue";
import ArticleBarChartLikes06 from "@/Components/Admin/Chart/Article/ArticleBarChartLikes06.vue";
import RubricBarChart06 from "@/Components/Admin/Chart/Rubric/RubricBarChart06.vue";
import ArticleDoughnutChart from "@/Components/Admin/Chart/Article/ArticleDoughnutChart.vue";
import RubricDoughnutChart from "@/Components/Admin/Chart/Rubric/RubricDoughnutChart.vue";
import ArticleDoughnutChartLikes from "@/Components/Admin/Chart/Article/ArticleDoughnutChartLikes.vue";
import ArticleLineChart01 from "@/Components/Admin/Chart/Article/ArticleLineChart01.vue";
import ArticleLineChart02 from "@/Components/Admin/Chart/Article/ArticleLineChart02.vue";
import ArticleLineChart03 from "@/Components/Admin/Chart/Article/ArticleLineChart03.vue";
import ArticleLineChart04 from "@/Components/Admin/Chart/Article/ArticleLineChart04.vue";
import ArticleLineChartLikes04 from "@/Components/Admin/Chart/Article/ArticleLineChartLikes04.vue";
import RubricLineChart04 from "@/Components/Admin/Chart/Rubric/RubricLineChart04.vue";
import ArticleLineChart05 from "@/Components/Admin/Chart/Article/ArticleLineChart05.vue";
import ArticleLineChart06 from "@/Components/Admin/Chart/Article/ArticleLineChart06.vue";
import ArticleLineChart07 from "@/Components/Admin/Chart/Article/ArticleLineChart07.vue";
import ArticleLineChart08 from "@/Components/Admin/Chart/Article/ArticleLineChart08.vue";
import ArticleLineChart09 from "@/Components/Admin/Chart/Article/ArticleLineChart09.vue";
import ArticlePieChart from "@/Components/Admin/Chart/Article/ArticlePieChart.vue";
import ArticlePolarChart from "@/Components/Admin/Chart/Article/ArticlePolarChart.vue";
import ArticleRealtimeChart from "@/Components/Admin/Chart/Article/ArticleRealtimeChart.vue";

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
                <ArticleLineChart01 :articles="props.articles" :width="600" :height="400"/>
                <ArticleLineChart02 :articles="props.articles" :width="600" :height="400"/>
                <ArticleLineChart03 :articles="props.articles" :width="600" :height="400"/>
                <ArticleLineChart04 :articles="props.articles" :width="600" :height="400"/>
<!--                <ArticleLineChartLikes04 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <RubricLineChart04 :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                <ArticleLineChart05 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleLineChart06 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleLineChart07 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleLineChart08 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleLineChart09 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <RubricBarChart01 :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                <ArticleBarChart01 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <div class="flex items-center justify-around">-->
<!--                    <ArticleBarChart02 :articles="props.articles" :width="600" :height="400"/>-->
<!--                    <RubricBarChart02 :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                </div>-->
<!--                <ArticleBarChart03 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <RubricBarChart03 :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                <ArticleBarChart04 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleBarChartLikes :articles="props.articles" :width="600" :height="400"/>-->
<!--                <RubricBarChart04 :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                <ArticleBarChart05 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleBarChartLikes05 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <RubricBarChart05 :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                <ArticleBarChart06 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleBarChartLikes06 :articles="props.articles" :width="600" :height="400"/>-->
<!--                <RubricBarChart06 :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                <ArticleDoughnutChart :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleDoughnutChartLikes :articles="props.articles" :width="600" :height="400"/>-->
<!--                <RubricDoughnutChart :rubrics="props.rubrics" :width="600" :height="400"/>-->
<!--                <ArticlePieChart :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticlePolarChart :articles="props.articles" :width="600" :height="400"/>-->
<!--                <ArticleRealtimeChart :articles="props.articles" :width="600" :height="400"/>-->
            </div>
        </div>
    </AdminLayout>
</template>
