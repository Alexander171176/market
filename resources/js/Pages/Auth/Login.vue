<script setup>
import {defineProps} from 'vue'
import {Head, Link, useForm} from '@inertiajs/vue3'
import HeadingAuth from '@/Components/User/Heading/HeadingAuth.vue'
import Checkbox from '@/Components/Checkbox.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import {useI18n} from 'vue-i18n'
import TextInput from "@/Components/TextInput.vue";
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import CustomImageAuthentication from "@/Components/User/Image/CustomImageAuthentication.vue";

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

const { t } = useI18n();
</script>

<template>
    <DefaultLayout>
        <Head :title="t('loginTitle')" />

        <div class="relative w-full h-screen overflow-hidden bg-slate-900 text-white">
            <!-- Анимированный фон с параллаксом -->
            <div class="absolute top-0 left-0 w-full h-full z-0 animate-parallax">
                <CustomImageAuthentication />
            </div>

            <!-- Центрированный блок формы -->
            <div class="relative z-10 flex items-center justify-center h-full px-4">
                <div class="w-full max-w-sm bg-slate-700/80 px-8 py-4
                            rounded-lg shadow-lg text-slate-900 dark:text-white">

                    <div v-if="status" class="mb-4 text-green-600 font-medium text-md">
                        {{ status }}
                    </div>

                    <!-- Заголовок -->
                    <HeadingAuth>{{ t('loginUser') }}</HeadingAuth>

                    <!-- Форма -->
                    <form @submit.prevent="submit">
                        <div>
                            <InputLabel for="email" :value="t('email')" />
                            <TextInput
                                id="email"
                                v-model="form.email"
                                type="email"
                                class="mt-1 block w-full"
                                required
                                autofocus
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
                                autocomplete="current-password"
                            />
                            <InputError class="mt-2" :message="form.errors.password" />
                        </div>

                        <div class="block mt-2">
                            <label class="flex items-center">
                                <Checkbox v-model:checked="form.remember" name="remember" />
                                <span class="ml-2 text-md text-gray-100">{{ t('rememberMe') }}</span>
                            </label>
                        </div>

                        <div class="flex items-center justify-between mt-2">
                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="text-sky-200 hover:underline text-sm"
                            >
                                {{ t('forgotPassword') }}
                            </Link>

                            <PrimaryButton
                                :class="{ 'opacity-25': form.processing }"
                                :disabled="form.processing"
                            >
                                {{ t('login') }}
                            </PrimaryButton>
                        </div>
                    </form>

                    <!-- Подвал -->
                    <div class="pt-2 mt-2 border-t border-white/20 text-center">
                        <p class="text-sm text-white">
                            {{ t('registerPrompt') }}
                            <Link :href="route('register')" class="text-sky-200 hover:underline ml-1">
                                {{ t('register') }}
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
