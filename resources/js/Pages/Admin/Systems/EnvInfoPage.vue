<script setup>
import {defineProps} from 'vue'
import TitlePage from "@/Components/Admin/Headlines/TitlePage.vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";

const props = defineProps({
    env: Array
})
</script>

<template>
    <AdminLayout title="Configuration .env">
        <template #header>
            <TitlePage>Configuration .env</TitlePage>
        </template>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500
                        dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95">
                <div class="overflow-x-auto border rounded-md shadow p-4 bg-white dark:bg-gray-900 text-sm">
                    <table class="w-full text-left border-collapse">
                        <thead>
                        <tr>
                            <th class="pb-2 border-b border-gray-400 font-semibold text-indigo-700 dark:text-indigo-300">
                                Key
                            </th>
                            <th class="pb-2 border-b border-gray-400 font-semibold text-indigo-700 dark:text-indigo-300">
                                Value
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(entry, index) in env" :key="index">
                            <td class="py-0.5 pr-4 align-top font-mono text-slate-900 dark:text-slate-100">
                                {{ entry.key }}
                            </td>
                            <td class="py-0.5 font-mono break-all text-slate-900 dark:text-slate-100">
                                {{ entry.value }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
