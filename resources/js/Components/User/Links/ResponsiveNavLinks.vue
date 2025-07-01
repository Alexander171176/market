<script setup>
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <div class="pt-2 pb-3 space-y-1">
        <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">
            {{ t('dashboard') }}
        </ResponsiveNavLink>
        <ResponsiveNavLink :href="route('profile.show')" :active="route().current('profile.show')">
            {{ t('profile') }}
        </ResponsiveNavLink>
    </div>
</template>
