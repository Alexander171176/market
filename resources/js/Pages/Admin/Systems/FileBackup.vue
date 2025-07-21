<script setup>
import { ref, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'

const { t } = useI18n()
const toast = useToast()

const isProcessing = ref(false)
const progress = ref(0)
const step = ref(0)
const archives = ref([])

const fetchArchives = async () => {
    try {
        const res = await axios.get(route('admin.files.list'))
        // console.log('📦 archives response:', res.data)
        archives.value = res.data.archives || []
    } catch (error) {
        // console.error('❌ Failed to load archives:', error)
        toast.error(t('failedToLoadBackups'))
        archives.value = []
    }
}

const createArchive = async () => {
    isProcessing.value = true
    step.value = 1
    progress.value = 25

    try {
        await axios.post(route('admin.files.create'))
        step.value = 2
        progress.value = 100
        toast.success(t('archiveCreated'))
        await fetchArchives()
        setTimeout(() => {
            step.value = 0
            progress.value = 0
            isProcessing.value = false
        }, 3000)
    } catch {
        toast.error(t('archiveCreateFailed'))
        step.value = 0
        progress.value = 0
        isProcessing.value = false
    }
}

const handleRestore = async (filename) => {
    if (!filename) return

    isProcessing.value = true
    step.value = 1
    progress.value = 25

    try {
        await axios.post(route('admin.files.restore'), { file: filename })
        step.value = 2
        progress.value = 100
        toast.success(t('archiveRestored'))
        setTimeout(() => {
            step.value = 0
            progress.value = 0
            isProcessing.value = false
        }, 3000)
    } catch {
        toast.error(t('archiveRestoreFailed'))
        step.value = 0
        progress.value = 0
        isProcessing.value = false
    }
}

const handleDelete = async (filename) => {
    if (!filename || !confirm(t('backupConfirmDeleteBackup'))) return
    isProcessing.value = true

    try {
        await axios.delete(route('admin.files.delete'), { data: { file: filename } })
        toast.success(t('backupDeleted'))
        await fetchArchives()
    } catch {
        toast.error(t('backupDeleteFailed'))
    } finally {
        isProcessing.value = false
    }
}

const downloadArchive = (filename) => {
    window.open(route('admin.files.download', { file: filename }), '_blank')
}

onMounted(fetchArchives)
</script>

<template>
    <AdminLayout :title="t('fileBackup')">
        <template #header>
            <TitlePage>
                {{ t('fileBackup') }}
            </TitlePage>
        </template>

        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">

                <!-- Создать -->
                <div class="sm:flex sm:justify-between sm:items-center mb-4">
                    <button
                        @click="createArchive"
                        :disabled="isProcessing"
                        class="flex items-center btn px-2 py-0.5 bg-sky-600
                               text-white text-sm font-semibold rounded-sm shadow-md
                               transition-colors duration-300 ease-in-out
                               hover:bg-sky-700 focus:bg-sky-700 focus:outline-none">
                        <svg class="w-4 h-4 fill-current opacity-50 shrink-0 mr-1"
                             viewBox="0 0 16 16">
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                        </svg>
                        {{ t('createArchive') }}
                    </button>
                </div>

                <!-- Прогресс -->
                <div v-if="step > 0" class="mb-4 w-full">
                    <div class="text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                        {{
                            step === 1 ? t('archivingStep') :
                                step === 2 ? t('archivingDone') : ''
                        }}
                    </div>
                    <div class="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-600 transition-all duration-500"
                             :style="{ width: `${progress}%` }">
                        </div>
                    </div>
                </div>

                <!-- Archive List -->
                <div>

                    <!-- Оглавление -->
                    <h2 class="text-slate-700 dark:text-slate-200 text-center text-md
                               font-semibold mb-2">
                        {{ t('availableArchives') }}
                    </h2>

                    <ul v-if="Array.isArray(archives) && archives.length"
                        class="divide-y border rounded">

                        <li v-for="archive in archives" :key="archive.name"
                            class="flex items-center justify-between px-3 py-1
                                   bg-gray-100 hover:bg-gray-50
                                   dark:bg-gray-700 dark:hover:bg-slate-800">

                            <!-- Архивы -->
                            <div>
                                <div class="font-medium text-sm text-amber-700 dark:text-amber-200">
                                    {{ archive.name }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ (archive.size / 1024 / 1024).toFixed(2) }} MB
                                </div>
                            </div>

                            <!-- Кнопки -->
                            <div class="flex items-center space-x-2">

                                <!-- Скачать -->
                                <button @click="downloadArchive(archive.name)"
                                        :title="t('download')"
                                        class="w-8 h-8 flex items-center justify-center rounded-sm
                                           border border-slate-400 dark:border-slate-200
                                           bg-indigo-100 hover:bg-indigo-200
                                           dark:bg-indigo-700 dark:hover:bg-indigo-500
                                           text-indigo-600 dark:text-slate-100 transition"
                                >
                                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7z"/>
                                    </svg>
                                </button>

                                <!-- Восстановить -->
                                <button @click="handleRestore(archive.name)"
                                        :disabled="isProcessing"
                                        :title="t('recover')"
                                        class="w-8 h-8 flex items-center justify-center rounded-sm
                                           border border-slate-400 dark:border-slate-200
                                           bg-teal-200 hover:bg-teal-300 dark:bg-teal-700
                                           dark:hover:bg-teal-600 text-teal-600 dark:text-slate-100
                                           transition">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.746,16.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z"></path>
                                        <path d="M23.746,11.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z"></path>
                                        <path d="M23.746,6.564l-11.5-6.5a.507.507,0,0,0-.492,0l-11.5,6.5a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z"></path>
                                    </svg>
                                </button>

                                <!-- Удалить -->
                                <button @click="handleDelete(archive.name)"
                                        :disabled="isProcessing"
                                        :title="t('remove')"
                                        class="w-8 h-8 flex items-center justify-center rounded-sm
                                           border border-slate-400 dark:border-slate-200
                                           bg-red-200 hover:bg-red-300 dark:bg-red-700
                                           dark:hover:bg-red-600 text-red-600 dark:text-slate-100
                                           transition">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                        <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
                                    </svg>
                                </button>

                            </div>
                        </li>
                    </ul>
                    <div v-else class="text-gray-500 text-center">
                        {{ t('noData') }}
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
