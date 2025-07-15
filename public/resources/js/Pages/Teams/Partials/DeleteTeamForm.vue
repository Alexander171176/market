<script setup>
import {ref} from 'vue'
import {useForm} from '@inertiajs/vue3'
import ActionSection from '@/Components/ActionSection.vue'
import ConfirmationModal from '@/Components/ConfirmationModal.vue'
import DangerButton from '@/Components/DangerButton.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const props = defineProps({
    team: Object
})

const confirmingTeamDeletion = ref(false)
const form = useForm({})

const confirmTeamDeletion = () => {
    confirmingTeamDeletion.value = true
}

const deleteTeam = () => {
    form.delete(route('teams.destroy', props.team), {
        errorBag: 'deleteTeam'
    })
}
</script>

<template>
    <ActionSection>
        <template #title>{{ t('deleteTeam') }}</template>

        <template #description>{{ t('deleteTeamPermanently') }}</template>

        <template #content>
            <div class="max-w-xl text-sm text-gray-600">
                {{ t('deleteTeamWarning') }}
            </div>

            <div class="mt-5">
                <DangerButton @click="confirmTeamDeletion">{{ t('deleteTeam') }}</DangerButton>
            </div>

            <!-- Delete Team Confirmation Modal -->
            <ConfirmationModal :show="confirmingTeamDeletion" @close="confirmingTeamDeletion = false">
                <template #title>{{ t('deleteTeam') }}</template>

                <template #content>
                    {{ t('deleteTeamConfirmation') }}
                </template>

                <template #footer>
                    <SecondaryButton @click="confirmingTeamDeletion = false">{{ t('cancel') }}</SecondaryButton>

                    <DangerButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteTeam"
                    >
                        {{ t('deleteTeam') }}
                    </DangerButton>
                </template>
            </ConfirmationModal>
        </template>
    </ActionSection>
</template>
