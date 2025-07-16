<script setup>
import {ref} from 'vue'
import {Head, Link, useForm} from '@inertiajs/vue3'
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue'
import HeadingAuth from '@/Components/User/Heading/HeadingAuth.vue'
import Checkbox from '@/Components/Checkbox.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import {useI18n} from 'vue-i18n'
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import CustomImageAuthentication from "@/Components/User/Image/CustomImageAuthentication.vue";

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false
})

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation')
    })
}

const { t } = useI18n();
</script>

<template>
    <DefaultLayout>
        <Head :title="t('register')" />

        <div class="relative w-full h-screen overflow-hidden bg-slate-900 text-white">

            <!-- Анимированный фон -->
            <div class="absolute top-0 left-0 w-full h-full z-0 animate-parallax">
                <CustomImageAuthentication />
            </div>

            <!-- Центрированный блок формы -->
            <div class="relative z-10 flex items-center justify-center h-full px-4">
                <div class="w-full max-w-sm bg-slate-700/80 px-8 py-4
                            rounded-lg shadow-lg text-slate-900 dark:text-white">

                    <HeadingAuth>{{ t('register') }}</HeadingAuth>

                    <form @submit.prevent="submit">
                        <div>
                            <InputLabel for="name" :value="t('name')" />
                            <TextInput
                                id="name"
                                v-model="form.name"
                                type="text"
                                class="mt-1 block w-full"
                                required
                                autofocus
                                autocomplete="name"
                            />
                            <InputError class="mt-2" :message="form.errors.name" />
                        </div>

                        <div class="mt-2">
                            <InputLabel for="email" :value="t('email')" />
                            <TextInput
                                id="email"
                                v-model="form.email"
                                type="email"
                                class="mt-1 block w-full"
                                required
                                autocomplete="username"
                            />
                            <InputError class="mt-2" :message="form.errors.email" />
                        </div>

                        <div class="mt-2">
                            <InputLabel for="password" :value="t('password')" />
                            <TextInput
                                id="password"
                                v-model="form.password"
                                type="password"
                                class="mt-1 block w-full"
                                required
                                autocomplete="new-password"
                            />
                            <InputError class="mt-2" :message="form.errors.password" />
                        </div>

                        <div class="mt-2">
                            <InputLabel for="password_confirmation" :value="t('confirmPassword')" />
                            <TextInput
                                id="password_confirmation"
                                v-model="form.password_confirmation"
                                type="password"
                                class="mt-1 block w-full"
                                required
                                autocomplete="new-password"
                            />
                            <InputError class="mt-2" :message="form.errors.password_confirmation" />
                        </div>

                        <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-2">
                            <label class="flex items-start text-sm text-white space-x-2">
                                <Checkbox id="terms" v-model:checked="form.terms" name="terms" required />
                                <span>
                                    {{ t('agreeTerms1') }}
                                    <a :href="route('terms.show')" class="underline hover:text-sky-300" target="_blank">{{ t('termsOfService')
                                        }}</a>
                                    {{ t('and') }}
                                    <a :href="route('policy.show')" class="underline hover:text-sky-300"
                                       target="_blank">{{ t('privacyPolicy') }}</a>
                                </span>
                            </label>
                            <InputError class="mt-2" :message="form.errors.terms" />
                        </div>

                        <div class="flex items-center justify-end mt-2">
                            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                {{ t('register') }}
                            </PrimaryButton>
                        </div>
                    </form>

                    <div class="pt-2 mt-2 border-t border-white/20 text-center">
                        <p class="text-sm text-white">
                            {{ t('alreadyRegistered') }}
                            <Link :href="route('login')" class="text-sky-200 hover:underline ml-1">
                                {{ t('login') }}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </DefaultLayout>
</template>

<style scoped>
@keyframes parallax {
    0% {
        transform: scale(1.05) translateY(0);
    }
    50% {
        transform: scale(1.1) translateY(-10px);
    }
    100% {
        transform: scale(1.05) translateY(0);
    }
}

.animate-parallax {
    animation: parallax 20s ease-in-out infinite;
}
</style>
