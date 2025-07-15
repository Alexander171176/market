<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager.vue';
import { useI18n } from 'vue-i18n';

defineProps({
    tokens: Array,
    availablePermissions: Array,
    defaultPermissions: Array,
});

const { t } = useI18n();
</script>

<template>
    <AppLayout :title="t('apiTokens')">
        <template #header>
            <h2 class="font-semibold text-md text-gray-800 leading-tight">
                {{ t('apiTokens') }}
            </h2>
        </template>

        <div>
            <div class="bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90
                        max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <ApiTokenManager
                    :tokens="tokens"
                    :available-permissions="availablePermissions"
                    :default-permissions="defaultPermissions"
                />
            </div>
        </div>
    </AppLayout>
</template>
