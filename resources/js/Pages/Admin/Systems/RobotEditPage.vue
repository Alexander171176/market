<script setup>
import { useForm } from '@inertiajs/vue3'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue'

const { t } = useI18n()
const toast = useToast()

const props = defineProps({
    content: String
})

const form = useForm({
    content: props.content
})

const submit = () => {
    form.put(route('admin.robot.update'), {
        onSuccess: () => toast.success(t('robotSuccess')),
        onError: () => toast.error(t('robotError'))
    })
}
</script>

<template>
    <AdminLayout :title="t('robotTitle')">
        <template #header>
            <TitlePage>{{ t('robotTitle') }}</TitlePage>
        </template>

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-lg shadow-gray-500
                        dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95">

                <form @submit.prevent="submit" class="space-y-4">
                    <label for="robots"
                           class="block text-sm font-medium text-slate-900 dark:text-slate-100">
                        {{ t('robotContent') }}
                    </label>
                    <textarea
                        id="robots"
                        v-model="form.content"
                        rows="16"
                        class="w-full p-3 text-sm border rounded bg-gray-100 dark:bg-gray-800
                               text-slate-900 dark:text-slate-100"></textarea>

                    <div class="flex items-center justify-end">
                        <PrimaryButton
                            :disabled="form.processing"
                            :class="{ 'opacity-50 cursor-not-allowed': form.processing }"
                        >
                            {{ t('save') }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>
