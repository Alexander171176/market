<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue'
import Welcome from '@/Components/Welcome.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <AdminLayout :title="t('adminPanel')">
        <template #header>
            <TitlePage>
                {{ t('adminPanel') }}
            </TitlePage>
        </template>

        <div class="py-8">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow-xl sm:rounded-lg">
                    <Welcome />
<!--                    <pre class="text-slate-700 bg-slate-200 dark:text-slate-200 dark:bg-slate-700">{{ $page.props }}</pre>-->
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
