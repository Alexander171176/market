<!-- resources/js/Pages/NotFound.vue -->
<script setup>
import { Link } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import authImage from '../../images/auth-image.jpg';

const { t } = useI18n();
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center px-4 bg-contain bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${authImage})` }"
    >
        <div class="bg-white bg-opacity-85 p-8 rounded-lg shadow-md max-w-md text-center">
            <h1 class="text-9xl font-extrabold text-slate-600">404</h1>
            <p class="mt-4 text-2xl font-semibold text-red-400">{{ t('pageNotFound') }}</p>
            <p class="mt-2 text-lg font-semibold text-slate-500">
                {{ t('pageNotFoundText') }}
            </p>
            <div class="mt-6">
                <Link :href="route('home')"
                      class="px-3 py-1.5 bg-blue-700 text-white rounded-md
                             hover:bg-blue-500 transition-colors duration-200">
                    {{ t('home') }}
                </Link>
            </div>
        </div>
    </div>
</template>
