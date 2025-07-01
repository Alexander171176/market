<script setup>
import {nextTick, ref} from 'vue'
import {Head, useForm} from '@inertiajs/vue3'
import ImageAuthentication from "@/Components/User/Image/ImageAuthentication.vue"
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue'
import HeadingAuth from '@/Components/User/Heading/HeadingAuth.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import {useI18n} from 'vue-i18n'
import DefaultLayout from "@/Layouts/DefaultLayout.vue";

const recovery = ref(false)

const form = useForm({
    code: '',
    recovery_code: ''
})

const recoveryCodeInput = ref(null)
const codeInput = ref(null)

const toggleRecovery = async () => {
    recovery.value ^= true

    await nextTick()

    if (recovery.value) {
        recoveryCodeInput.value.focus()
        form.code = ''
    } else {
        codeInput.value.focus()
        form.recovery_code = ''
    }
}

const submit = () => {
    form.post(route('two-factor.login'))
}

const {t} = useI18n();
</script>

<template>
    <DefaultLayout>
        <Head :title="t('twoFactorConfirmationTitle')"/>

        <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen w-full
                    bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900
                    selection:bg-red-500 selection:text-white">

            <div class="flex flex-row flex-wrap w-full">
                <!-- Content -->
                <div class="w-full md:w-1/2">
                    <div class="min-h-screen h-full flex flex-col justify-center items-center">
                        <div class="flex flex-col justify-center items-center max-w-sm mx-auto px-4 py-8">
                            <div class="mb-4 flex flex-col justify-center items-center">
                                <!-- Logo -->
                                <AuthenticationCardLogo/>
                            </div>
                            <div>
                                <!-- Heading -->
                                <HeadingAuth>{{ t('twoFactorConfirmation') }}</HeadingAuth>

                                <div class="mb-4 font-semibold text-md text-gray-900">
                                    <template v-if="!recovery">
                                        {{ t('authCodeDescription') }}
                                    </template>

                                    <template v-else>
                                        {{ t('recoveryCodeDescription') }}
                                    </template>
                                </div>

                                <!-- Form -->
                                <form @submit.prevent="submit">
                                    <div v-if="!recovery">
                                        <InputLabel for="code" :value="t('authCode')"/>
                                        <TextInput
                                            id="code"
                                            ref="codeInput"
                                            v-model="form.code"
                                            type="text"
                                            inputmode="numeric"
                                            class="mt-1 block w-full"
                                            autofocus
                                            autocomplete="one-time-code"
                                        />
                                        <InputError class="mt-2" :message="form.errors.code"/>
                                    </div>

                                    <div v-else>
                                        <InputLabel for="recovery_code" :value="t('recoveryCode')"/>
                                        <TextInput
                                            id="recovery_code"
                                            ref="recoveryCodeInput"
                                            v-model="form.recovery_code"
                                            type="text"
                                            class="mt-1 block w-full"
                                            autocomplete="one-time-code"
                                        />
                                        <InputError class="mt-2" :message="form.errors.recovery_code"/>
                                    </div>

                                    <div class="flex items-center justify-end mt-4">
                                        <button
                                            type="button"
                                            class="text-md text-gray-600 hover:text-gray-900 underline cursor-pointer"
                                            @click.prevent="toggleRecovery"
                                        >
                                            <template v-if="!recovery"> {{ t('useRecoveryCode') }}</template>

                                            <template v-else> {{ t('useAuthCode') }}</template>
                                        </button>

                                        <PrimaryButton
                                            class="ms-4"
                                            :class="{ 'opacity-25': form.processing }"
                                            :disabled="form.processing"
                                        >
                                            {{ t('login') }}
                                        </PrimaryButton>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- Image -->
                <ImageAuthentication/>
            </div>

        </div>

    </DefaultLayout>
</template>
