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
        console.log('📦 archives response:', res.data)
        archives.value = res.data.archives || []
    } catch (error) {
        console.error('❌ Failed to load archives:', error)
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

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">

                <!-- Actions -->
                <div class="mb-4">
                    <button
                        @click="createArchive"
                        :disabled="isProcessing"
                        class="btn bg-sky-600 hover:bg-sky-700 text-white px-4 py-1 text-sm rounded shadow">
                        {{ t('createArchive') }}
                    </button>
                </div>

                <!-- Progress -->
                <div v-if="step > 0" class="mb-4 w-full">
                    <div class="text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                        {{
                            step === 1 ? t('archivingStep') :
                                step === 2 ? t('archivingDone') : ''
                        }}
                    </div>
                    <div class="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-600 transition-all duration-500"
                             :style="{ width: `${progress}%` }"></div>
                    </div>
                </div>

                <!-- Archive List -->
                <div>
                    <h2 class="text-slate-700 dark:text-slate-200 text-center text-md font-semibold mb-2">
                        {{ t('availableArchives') }}
                    </h2>

                    <ul v-if="Array.isArray(archives.value) && archives.value.length"
                        class="divide-y border rounded">
                        <li v-for="archive in archives" :key="archive.name"
                            class="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800">
                            <div>
                                <div class="font-medium text-sm text-amber-700 dark:text-amber-200">
                                    {{ archive.name }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ (archive.size / 1024 / 1024).toFixed(2) }} MB
                                </div>
                            </div>

                            <div class="flex items-center space-x-2">
                                <button @click="handleRestore(archive.name)" :disabled="isProcessing"
                                        class="w-8 h-8 bg-teal-500 hover:bg-teal-600 text-white rounded-sm">
                                    🔄
                                </button>
                                <button @click="downloadArchive(archive.name)"
                                        class="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-sm">
                                    ⬇️
                                </button>
                                <button @click="handleDelete(archive.name)" :disabled="isProcessing"
                                        class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-sm">
                                    🗑️
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
