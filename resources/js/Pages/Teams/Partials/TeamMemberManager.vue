<script setup>
import {ref} from 'vue'
import {router, useForm, usePage} from '@inertiajs/vue3'
import ActionMessage from '@/Components/ActionMessage.vue'
import ActionSection from '@/Components/ActionSection.vue'
import ConfirmationModal from '@/Components/ConfirmationModal.vue'
import DangerButton from '@/Components/DangerButton.vue'
import DialogModal from '@/Components/DialogModal.vue'
import FormSection from '@/Components/FormSection.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import SectionBorder from '@/Components/SectionBorder.vue'
import TextInput from '@/Components/TextInput.vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const props = defineProps({
    team: Object,
    availableRoles: Array,
    userPermissions: Object
})

const page = usePage()

const addTeamMemberForm = useForm({
    email: '',
    role: null
})

const updateRoleForm = useForm({
    role: null
})

const leaveTeamForm = useForm({})
const removeTeamMemberForm = useForm({})

const currentlyManagingRole = ref(false)
const managingRoleFor = ref(null)
const confirmingLeavingTeam = ref(false)
const teamMemberBeingRemoved = ref(null)

const addTeamMember = () => {
    addTeamMemberForm.post(route('team-members.store', props.team), {
        errorBag: 'addTeamMember',
        preserveScroll: true,
        onSuccess: () => addTeamMemberForm.reset()
    })
}

const cancelTeamInvitation = (invitation) => {
    router.delete(route('team-invitations.destroy', invitation), {
        preserveScroll: true
    })
}

const manageRole = (teamMember) => {
    managingRoleFor.value = teamMember
    updateRoleForm.role = teamMember.membership.role
    currentlyManagingRole.value = true
}

const updateRole = () => {
    updateRoleForm.put(route('team-members.update', [props.team, managingRoleFor.value]), {
        preserveScroll: true,
        onSuccess: () => (currentlyManagingRole.value = false)
    })
}

const confirmLeavingTeam = () => {
    confirmingLeavingTeam.value = true
}

const leaveTeam = () => {
    leaveTeamForm.delete(route('team-members.destroy', [props.team, page.props.auth.user]))
}

const confirmTeamMemberRemoval = (teamMember) => {
    teamMemberBeingRemoved.value = teamMember
}

const removeTeamMember = () => {
    removeTeamMemberForm.delete(
        route('team-members.destroy', [props.team, teamMemberBeingRemoved.value]),
        {
            errorBag: 'removeTeamMember',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => (teamMemberBeingRemoved.value = null)
        }
    )
}

const displayableRole = (role) => {
    return props.availableRoles.find((r) => r.key === role).name
}
</script>

<template>
    <div>
        <div v-if="userPermissions.canAddTeamMembers">
            <SectionBorder/>

            <!-- Add Team Member -->
            <FormSection @submitted="addTeamMember">
                <template #title> {{ t('addTeamMember') }}</template>

                <template #description>
                    {{ t('addTeamMemberDescription') }}
                </template>

                <template #form>
                    <div class="col-span-6">
                        <div class="max-w-xl font-semibold text-sm text-indigo-800 dark:text-slate-300">
                            {{ t('addTeamMemberEmailPrompt') }}
                        </div>
                    </div>

                    <!-- Member Email -->
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="email" :value="t('email')"/>
                        <TextInput
                            id="email"
                            v-model="addTeamMemberForm.email"
                            type="email"
                            class="mt-1 block w-full"
                        />
                        <InputError :message="addTeamMemberForm.errors.email" class="mt-2"/>
                    </div>

                    <!-- Role -->
                    <div v-if="availableRoles.length > 0" class="col-span-6 lg:col-span-4">
                        <InputLabel for="roles" :value="t('roles')"/>
                        <InputError :message="addTeamMemberForm.errors.role" class="mt-2"/>

                        <div class="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                            <button
                                v-for="(role, i) in availableRoles"
                                :key="role.key"
                                type="button"
                                class="relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                                :class="{
                  'border-t border-gray-200 focus:border-none rounded-t-none': i > 0,
                  'rounded-b-none': i != Object.keys(availableRoles).length - 1
                }"
                                @click="addTeamMemberForm.role = role.key"
                            >
                                <div
                                    :class="{
                    'opacity-50': addTeamMemberForm.role && addTeamMemberForm.role != role.key
                  }"
                                >
                                    <!-- Role Name -->
                                    <div class="flex items-center">
                                        <div
                                            class="font-semibold text-md text-pink-400"
                                            :class="{ 'font-semibold': addTeamMemberForm.role == role.key }"
                                        >
                                            {{ role.name }}
                                        </div>

                                        <svg
                                            v-if="addTeamMemberForm.role == role.key"
                                            class="ms-2 h-5 w-5 text-green-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>

                                    <!-- Role Description -->
                                    <div class="mt-2 italic text-sm text-gray-900 dark:text-slate-50 text-start">
                                        {{ role.description }}
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </template>

                <template #actions>
                    <ActionMessage :on="addTeamMemberForm.recentlySuccessful" class="me-3">
                        {{ t('added') }}
                    </ActionMessage>

                    <PrimaryButton
                        :class="{ 'opacity-25': addTeamMemberForm.processing }"
                        :disabled="addTeamMemberForm.processing"
                    >
                        {{ t('add') }}
                    </PrimaryButton>
                </template>
            </FormSection>
        </div>

        <div v-if="team.team_invitations.length > 0 && userPermissions.canAddTeamMembers">
            <SectionBorder/>

            <!-- Team Member Invitations -->
            <ActionSection class="mt-10 sm:mt-0">
                <template #title> {{ t('pendingInvitations') }}</template>

                <template #description>
                    {{ t('pendingInvitationsDescription') }}
                </template>

                <!-- Pending Team Member Invitation List -->
                <template #content>
                    <div class="space-y-6">
                        <div
                            v-for="invitation in team.team_invitations"
                            :key="invitation.id"
                            class="flex items-center justify-between"
                        >
                            <div class="text-gray-600">
                                {{ invitation.email }}
                            </div>

                            <div class="flex items-center">
                                <!-- Cancel Team Invitation -->
                                <button
                                    v-if="userPermissions.canRemoveTeamMembers"
                                    class="cursor-pointer ms-6 text-sm text-red-500 focus:outline-none"
                                    @click="cancelTeamInvitation(invitation)"
                                >
                                    {{ t('cancel') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </ActionSection>
        </div>

        <div v-if="team.users.length > 0">
            <SectionBorder/>

            <!-- Manage Team Members -->
            <ActionSection class="mt-10 sm:mt-0">
                <template #title> {{ t('teamMembers') }}</template>

                <template #description> {{ t('teamMembersDescription') }}</template>

                <!-- Team Member List -->
                <template #content>
                    <div class="space-y-6">
                        <div
                            v-for="user in team.users"
                            :key="user.id"
                            class="flex items-center justify-between"
                        >
                            <div class="flex items-center">
                                <img
                                    class="w-8 h-8 rounded-full object-cover"
                                    :src="user.profile_photo_url"
                                    :alt="user.name"
                                />
                                <div class="ms-4">
                                    {{ user.name }}
                                </div>
                            </div>

                            <div class="flex items-center">
                                <!-- Manage Team Member Role -->
                                <button
                                    v-if="userPermissions.canUpdateTeamMembers && availableRoles.length"
                                    class="ms-2 text-sm text-gray-400 underline"
                                    @click="manageRole(user)"
                                >
                                    {{ displayableRole(user.membership.role) }}
                                </button>

                                <div v-else-if="availableRoles.length" class="ms-2 text-sm text-gray-400">
                                    {{ displayableRole(user.membership.role) }}
                                </div>

                                <!-- Leave Team -->
                                <button
                                    v-if="$page.props.auth.user.id === user.id"
                                    class="cursor-pointer ms-6 text-sm text-red-500"
                                    @click="confirmLeavingTeam"
                                >
                                    {{ t('leave') }}
                                </button>

                                <!-- Remove Team Member -->
                                <button
                                    v-else-if="userPermissions.canRemoveTeamMembers"
                                    class="cursor-pointer ms-6 text-sm text-red-500"
                                    @click="confirmTeamMemberRemoval(user)"
                                >
                                    {{ t('remove') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </ActionSection>
        </div>

        <!-- Role Management Modal -->
        <DialogModal :show="currentlyManagingRole" @close="currentlyManagingRole = false">
            <template #title> {{ t('manageRoles') }}</template>

            <template #content>
                <div v-if="managingRoleFor">
                    <div class="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                        <button
                            v-for="(role, i) in availableRoles"
                            :key="role.key"
                            type="button"
                            class="relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                            :class="{
                'border-t border-gray-200 focus:border-none rounded-t-none': i > 0,
                'rounded-b-none': i !== Object.keys(availableRoles).length - 1
              }"
                            @click="updateRoleForm.role = role.key"
                        >
                            <div
                                :class="{ 'opacity-50': updateRoleForm.role && updateRoleForm.role !== role.key }"
                            >
                                <!-- Role Name -->
                                <div class="flex items-center">
                                    <div
                                        class="text-sm text-gray-600"
                                        :class="{ 'font-semibold': updateRoleForm.role === role.key }"
                                    >
                                        {{ role.name }}
                                    </div>

                                    <svg
                                        v-if="updateRoleForm.role == role.key"
                                        class="ms-2 h-5 w-5 text-green-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>

                                <!-- Role Description -->
                                <div class="mt-2 text-xs text-gray-600">
                                    {{ role.description }}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </template>

            <template #footer>
                <SecondaryButton @click="currentlyManagingRole = false">{{ t('cancel') }}</SecondaryButton>

                <PrimaryButton
                    class="ms-3"
                    :class="{ 'opacity-25': updateRoleForm.processing }"
                    :disabled="updateRoleForm.processing"
                    @click="updateRole"
                >
                    {{ t('save') }}
                </PrimaryButton>
            </template>
        </DialogModal>

        <!-- Leave Team Confirmation Modal -->
        <ConfirmationModal :show="confirmingLeavingTeam" @close="confirmingLeavingTeam = false">
            <template #title> {{ t('leaveTeam') }}</template>

            <template #content> {{ t('leaveTeamConfirmation') }}</template>

            <template #footer>
                <SecondaryButton @click="confirmingLeavingTeam = false">{{ t('cancel') }}</SecondaryButton>

                <DangerButton
                    class="ms-3"
                    :class="{ 'opacity-25': leaveTeamForm.processing }"
                    :disabled="leaveTeamForm.processing"
                    @click="leaveTeam"
                >
                    {{ t('leave') }}
                </DangerButton>
            </template>
        </ConfirmationModal>

        <!-- Remove Team Member Confirmation Modal -->
        <ConfirmationModal :show="teamMemberBeingRemoved" @close="teamMemberBeingRemoved = null">
            <template #title> {{ t('removeTeamMember') }}</template>

            <template #content>
                {{ t('removeTeamMemberConfirmation') }}
            </template>

            <template #footer>
                <SecondaryButton @click="teamMemberBeingRemoved = null">{{ t('cancel') }}</SecondaryButton>

                <DangerButton
                    class="ms-3"
                    :class="{ 'opacity-25': removeTeamMemberForm.processing }"
                    :disabled="removeTeamMemberForm.processing"
                    @click="removeTeamMember"
                >
                    {{ t('remove') }}
                </DangerButton>
            </template>
        </ConfirmationModal>
    </div>
</template>
