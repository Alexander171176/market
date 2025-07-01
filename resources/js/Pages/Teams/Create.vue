<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <AppLayout :title="t('createTeam')">
        <template #header>
            <TitlePage>
                {{ t('createTeam') }}
            </TitlePage>
        </template>

        <div>
            <div class="bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90
                        max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 h-lvh">
                <CreateTeamForm />
            </div>
        </div>
    </AppLayout>
</template>
