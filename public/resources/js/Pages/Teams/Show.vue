<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue'
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager.vue'
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
    team: Object,
    availableRoles: Array,
    permissions: Object
})
</script>

<template>
    <AppLayout :title="t('teamSettings')">
        <template #header>
            <TitlePage>
                {{ t('teamSettings') }}
            </TitlePage>
        </template>

        <div>
            <div class="bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90
                        max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <UpdateTeamNameForm :team="team" :permissions="permissions"/>

                <TeamMemberManager
                    class="mt-10 sm:mt-0"
                    :team="team"
                    :available-roles="availableRoles"
                    :user-permissions="permissions"
                />

                <template v-if="permissions.canDeleteTeam && !team.personal_team">
                    <SectionBorder/>

                    <DeleteTeamForm class="mt-10 sm:mt-0" :team="team"/>
                </template>
            </div>
        </div>
    </AppLayout>
</template>
