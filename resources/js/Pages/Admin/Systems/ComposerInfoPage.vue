<script setup>
import {defineProps} from 'vue'
import TitlePage from "@/Components/Admin/Headlines/TitlePage.vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";

const props = defineProps({
    composer: Object
})
</script>

<template>
    <AdminLayout title="composer.json">
        <template #header>
            <TitlePage>composer.json</TitlePage>
        </template>
        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="overflow-x-auto border rounded-md shadow p-4 bg-white dark:bg-gray-900 text-sm">
                    <div v-for="(value, key) in composer" :key="key" class="mb-4">
                        <div class="font-semibold text-blue-700 dark:text-blue-300">
                            {{ key }}
                        </div>
                        <pre v-if="typeof value === 'object'"
                             class="whitespace-pre-wrap text-slate-900 dark:text-slate-100">
                            {{ JSON.stringify(value, null, 2) }}
                        </pre>
                        <div v-else class="text-slate-900 dark:text-slate-100">{{ value }}</div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
