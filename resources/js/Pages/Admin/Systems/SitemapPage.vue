<script setup>
import { useForm } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue'

const { t } = useI18n()
const toast = useToast()
const props = defineProps({ content: String, flash: Object })

const form = useForm({})   // пустая форма: только POST без данных

const generate = () => {
    form.post(route('admin.sitemap.generate'), {
        preserveScroll: true,
        onSuccess: () => toast.success(props.flash?.success ?? t('sitemapSuccess')),
        onError: () => toast.error(t('sitemapError'))
    })
}
</script>

<template>
    <AdminLayout :title="t('sitemapTitle')">
        <template #header>
            <TitlePage>{{ t('sitemapTitle') }}</TitlePage>
        </template>

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500
                        dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95">

                <form @submit.prevent="generate">
                    <div class="flex items-center justify-between">

                        <!-- Сгенерировать -->
                        <PrimaryButton :disabled="form.processing">
                            {{ t('generate') }}
                        </PrimaryButton>

                        <!-- Скачать -->
                        <a
                            v-if="props.content"
                            :href="route('admin.sitemap.download')"
                            target="_blank"
                            class="flex items-center btn px-2 py-0.5
                                    bg-sky-600 text-white text-sm font-semibold
                                    rounded-sm shadow-md
                                    transition-colors duration-300 ease-in-out
                                    hover:bg-sky-700 focus:bg-sky-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 class="w-4 h-4 fill-current opacity-50 shrink-0">
                                <path
                                    d="M22,15a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V16A1,1,0,0,0,22,15Z"></path>
                                <path
                                    d="M11.232,17.64a1,1,0,0,0,1.536,0l5-6A1,1,0,0,0,17,10H13V2a1,1,0,0,0-2,0v8H7a1,1,0,0,0-.768,1.64Z"></path>
                            </svg>
                            <span class="ml-2">{{ t('download') }}</span>
                        </a>

                    </div>
                </form>

                <textarea
                    v-model="props.content"
                    readonly
                    rows="22"
                    class="mt-2 w-full p-2 text-xs font-mono bg-gray-100 dark:bg-gray-800
                           text-slate-900 dark:text-slate-100 border-2 border-gray-400
                           rounded resize-y"
                />

            </div>
        </div>
    </AdminLayout>
</template>
