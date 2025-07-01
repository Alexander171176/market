<template>
    <div class="px-5 py-1 text-right">
        <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {{ t('total') }} <span class="text-blue-500 dark:text-blue-200 font-medium">
                <slot></slot>
            </span>
        </h2>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
