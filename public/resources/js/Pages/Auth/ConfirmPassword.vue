<script setup>
import {ref} from 'vue'
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

const form = useForm({
    password: ''
})

const passwordInput = ref(null)

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset()

            passwordInput.value.focus()
        }
    })
}

const {t} = useI18n();
</script>

<template>
    <DefaultLayout>
        <Head :title="t('passwordConfirmation')"/>

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
                                <HeadingAuth>{{ t('passwordConfirmation') }}</HeadingAuth>

                                <div class="mb-4 font-semibold text-md text-gray-900">
                                    {{ t('passwordConfirmationMessage') }}
                                </div>

                                <!-- Form -->
                                <form @submit.prevent="submit">
                                    <div>
                                        <InputLabel for="password" :value="t('password')"/>
                                        <TextInput
                                            id="password"
                                            ref="passwordInput"
                                            v-model="form.password"
                                            type="password"
                                            class="mt-1 block w-full"
                                            required
                                            autocomplete="current-password"
                                            autofocus
                                        />
                                        <InputError class="mt-2" :message="form.errors.password"/>
                                    </div>

                                    <div class="flex justify-end mt-4">
                                        <PrimaryButton
                                            class="ms-4"
                                            :class="{ 'opacity-25': form.processing }"
                                            :disabled="form.processing"
                                        >
                                            {{ t('confirm') }}
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
