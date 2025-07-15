<script setup>
import { useI18n } from 'vue-i18n';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';

const { t } = useI18n();
</script>

<template>
    <div class="pt-2 pb-24 space-y-1">
        <!-- Админские маршруты с префиксом -->
        <ResponsiveNavLink :href="route('admin.index')" :active="route().current('admin.index')">{{ t('adminPanel') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.users.index')" :active="route().current('admin.users.index')">{{ t('users') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.roles.index')" :active="route().current('admin.roles.index')">{{ t('roles') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.permissions.index')" :active="route().current('admin.permissions.index')">{{ t('permissions') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.rubrics.index')" :active="route().current('admin.rubrics.index')">{{ t('rubrics') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.sections.index')" :active="route().current('admin.sections.index')">{{ t('sections') }}</ResponsiveNavLink> <!-- ИСПРАВЛЕНО -->
        <ResponsiveNavLink :href="route('admin.articles.index')" :active="route().current('admin.articles.index')">{{ t('posts') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.tags.index')" :active="route().current('admin.tags.index')">{{ t('tags') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.comments.index')" :active="route().current('admin.comments.index')">{{ t('comments') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.banners.index')" :active="route().current('admin.banners.index')">{{ t('banners') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.videos.index')" :active="route().current('admin.videos.index')">{{ t('videos') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.reports.index')" :active="route().current('admin.reports.index')">{{ t('reports') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.charts.index')" :active="route().current('admin.charts.index')">{{ t('charts') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.settings.index')" :active="route().current('admin.settings.index')">{{ t('settings') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.parameters.index')" :active="route().current('admin.parameters.index')">{{ t('parameters') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.logs.index')" :active="route().current('admin.logs.index')">{{ t('logs') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.phpinfo.index')" :active="route().current('admin.phpinfo.index')">phpinfo</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.composer.index')" :active="route().current('admin.composer.index')">composer</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.package.index')" :active="route().current('admin.package.index')">package</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.env.index')" :active="route().current('admin.env.index')">env</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.backup.index')" :active="route().current('admin.backup.index')">{{ t('backups') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.files.index')" :active="route().current('admin.files.index')">{{ t('archive') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.components.index')" :active="route().current('admin.components.index')">{{ t('components') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.robot.index')" :active="route().current('admin.robot.index')">{{ t('robot') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.sitemap.index')" :active="route().current('admin.sitemap.index')">sitemap.xml</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.diagrams.index')" :active="route().current('admin.diagrams.index')">{{ t('diagrams') }}</ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.plugins.index')" :active="route().current('admin.plugins.index')">{{ t('plugins') }}</ResponsiveNavLink>

        <!-- Маршрут пользовательского дашборда остается без префикса -->
        <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">{{ t('dashboard') }}</ResponsiveNavLink>
    </div>
</template>
