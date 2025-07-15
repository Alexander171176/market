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

const backups = ref([])
const isProcessing = ref(false)
const step = ref(0)
const progress = ref(0)
const downloadBaseUrl = '/storage/backups/'

const fetchBackups = async () => {
    try {
        const response = await axios.get(route('admin.backup.list'))
        backups.value = response.data.backups
    } catch {
        toast.error(t('failedToLoadBackups'))
    }
}

const createBackup = async () => {
    isProcessing.value = true
    progress.value = 20

    try {
        await axios.post(route('admin.backup.create'))
        progress.value = 100
        toast.success(t('backupCreated'))
        await fetchBackups()
    } catch {
        toast.error(t('backupFailed'))
    } finally {
        setTimeout(() => {
            progress.value = 0
            isProcessing.value = false
        }, 1000)
    }
}

const handleRestore = async (filename) => {
    if (!filename) return
    isProcessing.value = true
    step.value = 1
    progress.value = 33

    try {
        await axios.post(route('admin.backup.create'))
        step.value = 2
        progress.value = 66

        await router.post(route('admin.backup.restore'), { file: filename }, {
            preserveScroll: true,
            onSuccess: () => {
                step.value = 3
                progress.value = 100
                toast.success(t('backupRestored'))
                fetchBackups()
                setTimeout(() => {
                    step.value = 0
                    progress.value = 0
                }, 3000)
            },
            onError: () => {
                toast.error(t('backupRestoreFailed'))
                step.value = 0
                progress.value = 0
            },
            onFinish: () => {
                isProcessing.value = false
            }
        })
    } catch (error) {
        toast.error(t('backupFailed'))
        isProcessing.value = false
        step.value = 0
        progress.value = 0
    }
}

const handleDelete = (filename) => {
    if (!filename || !confirm(t('backupConfirmDeleteBackup'))) return

    isProcessing.value = true
    router.delete(route('admin.backup.delete'), {
        data: { file: filename },
        preserveScroll: true,
        onFinish: () => isProcessing.value = false,
        onSuccess: () => {
            toast.success(t('backupDeleted'))
            fetchBackups()
        },
        onError: () => toast.error(t('backupDeleteFailed'))
    })
}

onMounted(fetchBackups)
</script>

<template>
    <AdminLayout :title="t('databaseBackup')">
        <template #header>
            <TitlePage>
                {{ t('databaseBackup') }}
            </TitlePage>
        </template>

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95">

                <!-- Создать -->
                <div class="sm:flex sm:justify-between sm:items-center mb-4">
                    <button
                        @click="createBackup"
                        :disabled="isProcessing"
                        class="flex items-center btn px-2 py-0.5 bg-sky-600
                               text-white text-sm font-semibold rounded-sm shadow-md
                               transition-colors duration-300 ease-in-out
                               hover:bg-sky-700 focus:bg-sky-700 focus:outline-none">
                        <svg class="w-4 h-4 fill-current opacity-50 shrink-0 mr-1"
                             viewBox="0 0 16 16">
                            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                        </svg>
                        {{ t('createBackup') }}
                    </button>
                </div>

                <!-- Прогресс -->
                <div v-if="step > 0 || progress > 0" class="mb-4 w-full">
                    <div class="text-sm font-medium text-blue-700 dark:text-blue-200 mb-1">
                        {{
                            step === 1 ? t('backupStep1') :
                                step === 2 ? t('backupStep2') :
                                    step === 3 ? t('backupStep3') :
                                        progress > 0 ? t('creatingBackup') : ''
                        }}
                    </div>
                    <div class="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-600 transition-all duration-500"
                             :style="{ width: `${progress}%` }">
                        </div>
                    </div>
                </div>

                <!-- Backup List -->
                <div class="mt-6">

                    <!-- Оглавление -->
                    <h2 class="text-slate-700 dark:text-slate-200 text-center text-md
                               font-semibold mb-2">
                        {{ t('availableBackups') }}
                    </h2>

                    <div v-if="backups.length === 0" class="text-gray-500 text-center">
                        {{ t('noData') }}
                    </div>

                    <ul v-else class="divide-y border rounded">

                        <li v-for="backup in backups" :key="backup.name"
                            class="flex items-center justify-between px-3 py-1
                                   bg-gray-100 hover:bg-gray-50
                                   dark:bg-gray-700 dark:hover:bg-slate-800">

                            <!-- Бэкапы -->
                            <div>
                                <div class="font-medium text-sm text-amber-700 dark:text-amber-200">
                                    {{ backup.name }}
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    {{ (backup.size / 1024).toFixed(1) }} KB
                                </div>
                            </div>

                            <!-- Кнопки -->
                            <div class="flex items-center space-x-2">

                                <!-- Скачать -->
                                <a
                                    :href="route('admin.backup.download', { filename: backup.name })"
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
                                </a>

                                <!-- Восстановить -->
                                <button
                                    :title="t('recover')"
                                    @click="handleRestore(backup.name)"
                                    :disabled="isProcessing"
                                    class="w-8 h-8 flex items-center justify-center rounded-sm
                                           border border-slate-400 dark:border-slate-200
                                           bg-teal-200 hover:bg-teal-300 dark:bg-teal-700
                                           dark:hover:bg-teal-600 text-teal-600 dark:text-slate-100
                                           transition">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12,10C8.2,10,4.3,9.3,2,7.6V12c0,2.7,5.2,4,10,4s10-1.3,10-4V7.6C19.7,9.3,15.8,10,12,10z"/>
                                        <path d="M12,18c-3.8,0-7.7-0.7-10-2.4V20c0,2.7,5.2,4,10,4s10-1.3,10-4v-4.4C19.7,17.3,15.8,18,12,18z"/>
                                        <path d="M12,0C7.2,0,2,1.3,2,4s5.2,4,10,4s10-1.3,10-4S16.8,0,12,0z"/>
                                    </svg>
                                </button>

                                <!-- Удалить -->
                                <button
                                    :title="t('remove')"
                                    @click="handleDelete(backup.name)"
                                    :disabled="isProcessing"
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
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
