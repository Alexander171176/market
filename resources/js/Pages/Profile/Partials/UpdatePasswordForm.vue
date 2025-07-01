<script setup>
import {ref} from 'vue'
import {useForm} from '@inertiajs/vue3'
import ActionMessage from '@/Components/ActionMessage.vue'
import FormSection from '@/Components/FormSection.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import { useI18n } from 'vue-i18n'

const passwordInput = ref(null)
const currentPasswordInput = ref(null)

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
})

const updatePassword = () => {
    form.put(route('user-password.update'), {
        errorBag: 'updatePassword',
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation')
                passwordInput.value.focus()
            }

            if (form.errors.current_password) {
                form.reset('current_password')
                currentPasswordInput.value.focus()
            }
        }
    })
}

const { t } = useI18n();
</script>

<template>
    <FormSection @submitted="updatePassword">
        <template #title>{{ t('updatePassword') }}</template>

        <template #description>{{ t('updatePasswordDescription') }}</template>

        <template #form>
            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="current_password" :value="t('currentPassword')"/>
                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                />
                <InputError :message="form.errors.current_password" class="mt-2"/>
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="password" :value="t('newPassword')"/>
                <TextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />
                <InputError :message="form.errors.password" class="mt-2"/>
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="password_confirmation" :value="t('confirmPassword')"/>
                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />
                <InputError :message="form.errors.password_confirmation" class="mt-2"/>
            </div>
        </template>

        <template #actions>
            <ActionMessage :on="form.recentlySuccessful" class="me-3"> {{ t('saved') }}</ActionMessage>

            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ t('save') }}
            </PrimaryButton>
        </template>
    </FormSection>
</template>
