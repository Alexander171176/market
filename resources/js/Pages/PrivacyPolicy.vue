<script setup>
import { Head } from '@inertiajs/vue3'
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
    policy: String
})
</script>

<template>
    <Head :title="t('privacyPolicy')"/>

    <div class="font-sans text-gray-900 antialiased">
        <div class="pt-4 bg-gray-100">
            <div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
                <div>
                    <AuthenticationCardLogo/>
                </div>

                <div
                    class="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose"
                    v-html="policy"
                />
            </div>
        </div>
    </div>
</template>
