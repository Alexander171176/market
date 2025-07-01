<script setup>
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

const props = defineProps({
    email: String,
    token: String
})

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: ''
})

const submit = () => {
    form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation')
    })
}

const {t} = useI18n();
</script>

<template>
    <DefaultLayout>
        <Head :title="t('resetPasswordTitle')"/>

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
                                <HeadingAuth>{{ t('resetPassword') }}</HeadingAuth>

                                <!-- Form -->
                                <form @submit.prevent="submit">
                                    <div>
                                        <InputLabel for="email" :value="t('email')"/>
                                        <TextInput
                                            id="email"
                                            v-model="form.email"
                                            type="email"
                                            class="mt-1 block w-full"
                                            required
                                            autofocus
                                            autocomplete="username"
                                        />
                                        <InputError class="mt-2" :message="form.errors.email"/>
                                    </div>

                                    <div class="mt-4">
                                        <InputLabel for="password" :value="t('password')"/>
                                        <TextInput
                                            id="password"
                                            v-model="form.password"
                                            type="password"
                                            class="mt-1 block w-full"
                                            required
                                            autocomplete="new-password"
                                        />
                                        <InputError class="mt-2" :message="form.errors.password"/>
                                    </div>

                                    <div class="mt-4">
                                        <InputLabel for="password_confirmation" :value="t('confirmPassword')"/>
                                        <TextInput
                                            id="password_confirmation"
                                            v-model="form.password_confirmation"
                                            type="password"
                                            class="mt-1 block w-full"
                                            required
                                            autocomplete="new-password"
                                        />
                                        <InputError class="mt-2" :message="form.errors.password_confirmation"/>
                                    </div>

                                    <div class="flex items-center justify-end mt-4">
                                        <PrimaryButton :class="{ 'opacity-25': form.processing }"
                                                       :disabled="form.processing">
                                            {{ t('resetPasswordButton') }}
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
