<script setup>
import { defineProps, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { router, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';

const { t } = useI18n();
const toast = useToast();

const props = defineProps({
    log: String,
    files: Array,
    selectedFile: String,
});

const clearForm = useForm({});
const searchQuery = ref('');

const logLines = computed(() => props.log.split('\n'));

const filteredLines = computed(() => {
    if (!searchQuery.value) return logLines.value;
    return logLines.value.filter(line => line.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const changeFile = (fileKey) => {
    router.get(route('admin.logs.index', { file: fileKey }));
};

const clearLog = () => {
    if (confirm('Очистить выбранный лог?')) {
        clearForm.delete(route('admin.logs.clear', { file: props.selectedFile }));
    }
};

const getLineColor = (line) => {
    if (/ERROR|exception|critical/i.test(line)) return 'text-red-500 dark:text-red-200 font-bold';
    if (/WARN|warning/i.test(line)) return 'text-yellow-600 font-semibold';
    if (/INFO/i.test(line)) return 'text-indigo-800 dark:text-indigo-200';
    if (/DEBUG/i.test(line)) return 'text-fuchsia-800 dark:text-fuchsia-200 font-bold';
    return 'text-gray-900 dark:text-gray-100';
};

const downloadLog = () => {
    window.location.href = route('admin.logs.download', { file: props.selectedFile });
};
</script>

<template>
    <AdminLayout :title="t('logs')">
        <template #header>
            <TitlePage>{{ t('logs') }}</TitlePage>
        </template>

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500
                        dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95">

                <div class="p-6 bg-slate-100 dark:bg-slate-600 rounded shadow">

                    <h1 class="text-slate-700 dark:text-slate-100 text-center text-xl font-semibold mb-4">
                        {{ t('viewingLogs') }}
                    </h1>

                    <div class="flex flex-wrap gap-4 mb-4">

                        <select @change="e => changeFile(e.target.value)"
                                :value="props.selectedFile"
                                class="border rounded-sm h-8 py-0 px-2
                                       bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-50">
                            <option v-for="file in props.files" :key="file" :value="file" class="text-md">
                                {{ file }}
                            </option>
                        </select>

                        <input v-model="searchQuery" placeholder="Поиск..."
                               class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-50
                                      border rounded-sm h-8 py-0 px-2 flex-1" />

                        <button @click="clearLog" :disabled="clearForm.processing"
                                class="h-8 py-0 px-2 bg-rose-500 text-white rounded-sm
                                       hover:bg-amber-500 disabled:opacity-50">
                            {{ t('clearLog') }}
                        </button>

                        <button @click="downloadLog"
                                class="h-8 py-0 px-2 bg-green-500 text-white rounded-sm
                                hover:bg-teal-500">
                            {{ t('download') }}
                        </button>
                    </div>

                    <div class="border rounded p-4 bg-gray-50 dark:bg-gray-700
                                overflow-auto max-h-[600px] text-sm font-mono">
                        <div v-if="filteredLines.length === 0"
                             class="text-slate-700 dark:text-slate-100">
                            {{ t('noData') }}
                        </div>
                        <template v-else>
                            <div
                                v-for="(line, idx) in filteredLines"
                                :key="idx"
                                :id="'line-' + idx"
                                :class="['group flex hover:bg-yellow-100 dark:hover:bg-slate-900 transition-colors duration-200', getLineColor(line)]"
                            >
                                <span class="font-semibold text-blue-500 dark:text-blue-200
                                             inline-block w-12 text-right mr-2 select-none">
                                    {{ idx + 1 }}.
                                </span>
                                <pre class="whitespace-pre-wrap flex-1">{{ line }}</pre>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
