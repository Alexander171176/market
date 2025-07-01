<script setup>
import {ref} from 'vue'
import {useForm} from '@inertiajs/vue3'
import ActionSection from '@/Components/ActionSection.vue'
import DangerButton from '@/Components/DangerButton.vue'
import DialogModal from '@/Components/DialogModal.vue'
import InputError from '@/Components/InputError.vue'
import SecondaryButton from '@/Components/SecondaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import {useI18n} from 'vue-i18n'

const confirmingUserDeletion = ref(false)
const passwordInput = ref(null)

const form = useForm({
    password: ''
})

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true

    setTimeout(() => passwordInput.value.focus(), 250)
}

const deleteUser = () => {
    form.delete(route('current-user.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
    })
}

const closeModal = () => {
    confirmingUserDeletion.value = false

    form.reset()
}

const {t} = useI18n();
</script>

<template>
    <ActionSection>
        <template #title>{{ t('deleteAccountButton') }}</template>

        <template #description>{{ t('deleteAccountDescription') }}</template>

        <template #content>
            <div class="max-w-xl font-semibold text-sm text-indigo-900 dark:text-sky-200">
                {{ t('deleteAccountWarning') }}
            </div>

            <div class="mt-5">
                <DangerButton @click="confirmUserDeletion">{{ t('deleteAccountButton') }}</DangerButton>
            </div>

            <!-- Delete Account Confirmation Modal -->
            <DialogModal :show="confirmingUserDeletion" @close="closeModal">
                <template #title>{{ t('deleteAccountButton') }}</template>

                <template #content>
                    {{ t('deleteAccountConfirmation') }}

                    <div class="mt-4">
                        <TextInput
                            ref="passwordInput"
                            v-model="form.password"
                            type="password"
                            class="mt-1 block w-3/4"
                            :placeholder="t('password')"
                            autocomplete="current-password"
                            @keyup.enter="deleteUser"
                        />

                        <InputError :message="form.errors.password" class="mt-2"/>
                    </div>
                </template>

                <template #footer>
                    <SecondaryButton @click="closeModal">{{ t('cancel') }}</SecondaryButton>

                    <DangerButton
                        class="ms-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        {{ t('deleteAccountButton') }}
                    </DangerButton>
                </template>
            </DialogModal>
        </template>
    </ActionSection>
</template>
