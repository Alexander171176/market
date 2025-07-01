<script setup>
import {computed} from 'vue'
import {Head, Link, useForm} from '@inertiajs/vue3'
import ImageAuthentication from "@/Components/User/Image/ImageAuthentication.vue"
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue'
import HeadingAuth from '@/Components/User/Heading/HeadingAuth.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import {useI18n} from 'vue-i18n'
import DefaultLayout from "@/Layouts/DefaultLayout.vue";

const props = defineProps({
    status: String
})

const form = useForm({})

const submit = () => {
    form.post(route('verification.send'))
}

const verificationLinkSent2 = computed(() => props.status === 'verification-link-sent')

const {t} = useI18n();
</script>

<template>
    <DefaultLayout>
        <Head :title="t('emailVerificationTitle')"/>

        <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen w-full
                    bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900
                    selection:bg-red-500 selection:text-white">

            <div class="flex flex-row flex-wrap w-full">
                <!-- Content -->
                <div class="w-full md:w-1/2">
                    <div class="min-h-screen h-full flex flex-col justify-center items-center">

                        <div v-if="verificationLinkSent2" class="mb-4 font-medium text-md text-green-600">
                            {{ t('verificationLinkSent2') }}
                        </div>

                        <div class="flex flex-col justify-center items-center max-w-sm mx-auto px-4 py-8">
                            <div class="mb-4 flex flex-col justify-center items-center">
                                <!-- Logo -->
                                <AuthenticationCardLogo/>
                            </div>
                            <div>

                                <!-- Heading -->
                                <HeadingAuth>{{ t('resetPassword') }}</HeadingAuth>

                                <div class="mb-4 font-semibold text-md text-gray-900">
                                    {{ t('confirmEmailPrompt') }}
                                </div>

                                <!-- Form -->
                                <form @submit.prevent="submit">
                                    <div class="mt-4 flex items-center justify-between">
                                        <PrimaryButton :class="{ 'opacity-25': form.processing }"
                                                       :disabled="form.processing">
                                            {{ t('resendVerification') }}
                                        </PrimaryButton>

                                        <div>
                                            <Link
                                                :href="route('profile.show')"
                                                class="underline text-md text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                {{ t('editProfile') }}
                                            </Link>

                                            <Link
                                                :href="route('logout')"
                                                method="post"
                                                as="button"
                                                class="underline text-md text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ms-2"
                                            >
                                                {{ t('logout') }}
                                            </Link>
                                        </div>
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
