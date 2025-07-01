<script setup>
import {defineProps} from 'vue';
import AdminLayout from "@/Layouts/AdminLayout.vue";
import TitlePage from "@/Components/Admin/Headlines/TitlePage.vue";

const props = defineProps({
    phpinfo: String,
})
</script>

<template>
    <AdminLayout title="PHP Info">
        <template #header>
            <TitlePage>PHP Info</TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500
                        dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95">
                <div class="overflow-x-auto border rounded-md shadow p-4 bg-white dark:bg-gray-900 text-sm">
                    <div v-html="phpinfo" class="prose max-w-none dark:prose-invert"/>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

th, td {
    padding: 6px 10px;
    border: 1px solid #ccc;
    text-align: left;
}
</style>
