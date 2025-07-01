<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.vue'
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue'
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm.vue'
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import { useI18n } from 'vue-i18n'

defineProps({
    confirmsTwoFactorAuthentication: Boolean,
    sessions: Array
})

const { t } = useI18n();
</script>

<template>
    <AppLayout :title="t('profile')">
        <template #header>
            <TitlePage>
                {{ t('profile') }}
            </TitlePage>
        </template>

        <div>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-700 opacity-95">
                <div v-if="$page.props.jetstream.canUpdateProfileInformation">
                    <UpdateProfileInformationForm :user="$page.props.auth.user"/>

                    <SectionBorder/>
                </div>

                <div v-if="$page.props.jetstream.canUpdatePassword">
                    <UpdatePasswordForm class="mt-10 sm:mt-0"/>

                    <SectionBorder/>
                </div>

                <div v-if="$page.props.jetstream.canManageTwoFactorAuthentication">
                    <TwoFactorAuthenticationForm
                        :requires-confirmation="confirmsTwoFactorAuthentication"
                        class="mt-10 sm:mt-0"
                    />

                    <SectionBorder/>
                </div>

                <LogoutOtherBrowserSessionsForm :sessions="sessions" class="mt-10 sm:mt-0"/>

                <template v-if="$page.props.jetstream.hasAccountDeletionFeatures">
                    <SectionBorder/>

                    <DeleteUserForm class="mt-10 sm:mt-0"/>
                </template>
            </div>
        </div>
    </AppLayout>
</template>
