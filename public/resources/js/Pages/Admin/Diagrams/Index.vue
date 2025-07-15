<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import { useI18n } from 'vue-i18n';
import BarChart from "@/Components/Admin/Diagram/BarChart.vue";
import VueFlow from "@/Components/Admin/Diagram/VueFlow.vue";

const { t } = useI18n();
</script>

<template>
    <AdminLayout :title="t('diagrams')">
        <template #header>
            <TitlePage>
                {{ t('diagrams') }}
            </TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="bg-gray-100 dark:bg-slate-900 overflow-hidden shadow-xl sm:rounded-lg">
                <VueFlow />
                <BarChart />
            </div>
            <div class="sm:flex sm:justify-between sm:items-center mb-1">

            </div>
        </div>
    </AdminLayout>
</template>
