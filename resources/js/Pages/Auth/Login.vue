<script setup>
import {defineProps} from 'vue'
import {Head, Link, useForm} from '@inertiajs/vue3'
import ImageAuthentication from "@/Components/User/Image/ImageAuthentication.vue"
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue'
import HeadingAuth from '@/Components/User/Heading/HeadingAuth.vue'
import Checkbox from '@/Components/Checkbox.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import {useI18n} from 'vue-i18n'
import TextInput from "@/Components/TextInput.vue";
import DefaultLayout from "@/Layouts/DefaultLayout.vue";

defineProps({
    canResetPassword: Boolean,
    status: String
})

const form = useForm({
    email: '',
    password: '',
    remember: false
})

const submit = () => {
    form
        .transform((data) => ({
            ...data,
            remember: form.remember ? 'on' : ''
        }))
        .post(route('login'), {
            onFinish: () => form.reset('password')
        })
}

const {t} = useI18n();
</script>

<template>
    <DefaultLayout>
        <Head :title="t('loginTitle')"/>

        <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen w-full
                    bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900
                    selection:bg-red-500 selection:text-white">

            <div class="flex flex-row flex-wrap w-full">

                <!-- Content -->
                <div class="w-full md:w-1/2">
                    <div class="min-h-screen h-full flex flex-col justify-center items-center">

                        <div v-if="status" class="w-full mb-4 font-medium text-md text-green-600">
                            {{ status }}
                        </div>

                        <div class="flex flex-col justify-center items-center max-w-sm mx-auto px-4 py-8">

                            <div class="mb-4 flex flex-col justify-center items-center">
                                <!-- Logo -->
                                <AuthenticationCardLogo/>
                            </div>

                            <div>

                                <!-- Heading -->
                                <HeadingAuth>{{ t('loginUser') }}</HeadingAuth>

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
                                            autocomplete="current-password"
                                        />
                                        <InputError class="mt-2" :message="form.errors.password"/>
                                    </div>

                                    <div class="block mt-4">
                                        <label class="flex items-center">
                                            <Checkbox v-model:checked="form.remember" name="remember"/>
                                            <span class="ms-2 text-md text-gray-600 dark:text-gray-200">
                                                {{ t('rememberMe') }}
                                            </span>
                                        </label>
                                    </div>

                                    <div class="flex items-center justify-end mt-4">
                                        <Link
                                            v-if="canResetPassword"
                                            :href="route('password.request')"
                                            class="border-b-[2px] text-lg text-sky-600 hover:text-sky-900"
                                        >
                                            {{ t('forgotPassword') }}
                                        </Link>

                                        <PrimaryButton
                                            class="ms-4"
                                            :class="{ 'opacity-25': form.processing }"
                                            :disabled="form.processing"
                                        >
                                            {{ t('login') }}
                                        </PrimaryButton>
                                    </div>
                                </form>

                                <!-- Footer -->
                                <div class="pt-5 mt-6 border-t border-slate-200">
                                    <div class="text-center text-lg text-slate-700 dark:text-slate-100">
                                        {{ t('registerPrompt') }}

                                        <Link
                                            :href="route('register')"
                                            class="border-b-[2px] text-lg text-sky-600 hover:text-sky-900"
                                        >
                                            {{ t('register') }}
                                        </Link>
                                    </div>
                                    <!-- Warning -->
                                    <div class="mt-5">
                                        <div class="bg-amber-100 text-amber-600 px-3 py-2 rounded">
                                            <svg class="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                                                <path
                                                    d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"/>
                                            </svg>
                                            <span class="text-sm">
                                            {{ t('loginWarning') }}
                                        </span>
                                        </div>
                                    </div>
                                </div>

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
