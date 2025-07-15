<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <AppLayout :title="t('dashboard')">
        <template #header>
            <TitlePage>
                {{ t('dashboard') }}
            </TitlePage>
        </template>

        <div class="py-8">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-slate-700 overflow-hidden shadow-xl sm:rounded-lg">

                </div>
            </div>
        </div>

        <!--        <pre>{{ $page.props }}</pre>-->

    </AppLayout>
</template>
