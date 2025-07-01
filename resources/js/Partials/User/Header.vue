<script setup>
import { ref, defineEmits } from 'vue';
import { router, Link } from '@inertiajs/vue3'
import Dropdown from '@/Components/Dropdown.vue'
import DropdownLink from '@/Components/DropdownLink.vue'
import ApplicationMark from '@/Components/ApplicationMark.vue'
import ThemeToggle from '@/Components/User/ThemeToggle/ThemeToggle.vue'
import DigitalClock from "@/Components/Admin/CurrentTime/DigitalClock.vue";
import ResponsiveNavLinks from '@/Components/User/Links/ResponsiveNavLinks.vue'
import TopPanel from '@/Partials/User/TopPanel.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emits = defineEmits(['toggleNavigationDropdown']);

const props = defineProps({
    title: String,
    currentTime: String,
    showingNavigationDropdown: Boolean
});

const switchToTeam = (team) => {
    router.put(
        route('current-team.update'),
        {
            team_id: team.id,
        },
        {
            preserveState: false,
        }
    )
}

const logout = () => {
    router.post(route('logout'))
}
</script>

<template>
    <div class="sticky top-0
                bg-gradient-to-b from-slate-100 to-slate-300
                dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900
                border-b border-slate-200 dark:border-slate-700 z-20">

        <TopPanel/>

        <nav class="border-b border-gray-100">
            <div class="max-w-full mx-auto px-4 sm:px-0">
                <div class="flex items-center justify-between h-10">
                    <div class="flex items-center justify-center">
                        <div class="shrink-0 flex items-center md:hidden">
                            <Link :href="route('dashboard')">
                                <ApplicationMark class="block h-9 w-auto"/>
                            </Link>
                        </div>
                        <DigitalClock class="relative z-10"/>
                    </div>
                    <div class="hidden sm:flex sm:items-center sm:ms-6">
                        <div class="ms-3 relative">
                            <Dropdown align="right" width="60" class="relative z-10">
                                <template #trigger>
                                    <button v-if="$page.props.jetstream.managesProfilePhotos"
                                            class="flex items-center
                                                    px-2 py-1
                                                    font-semibold text-sm
                                                    text-sky-600 dark:text-slate-100
                                                    border-2 border-transparent rounded-full
                                                    focus:outline-none focus:border-gray-400
                                                    transition">
                                        <img class="h-8 w-8 mr-2 rounded-full object-cover"
                                             :src="$page.props.auth.user.profile_photo_url"
                                             :alt="$page.props.auth.user.name"/>
                                        <span>{{ $page.props.auth.user.email }}</span>
                                    </button>
                                    <span v-else class="inline-flex rounded-md">
                                        <button type="button"
                                                class="inline-flex items-center
                                                        bg-white active:bg-gray-50
                                                        px-3 py-2
                                                        border border-transparent rounded-md
                                                        text-sm leading-4 font-medium text-slate-500
                                                        hover:text-slate-700
                                                        focus:outline-none focus:bg-gray-50
                                                        transition ease-in-out duration-150">
                                            {{ $page.props.auth.user.name }}
                                            <svg class="ms-2 -me-0.5 h-4 w-4"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke-width="1.5"
                                                 stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                            </svg>
                                        </button>
                                    </span>
                                </template>
                                <template #content>
                                    <div class="block px-4 py-2 text-sm text-slate-400">
                                        {{ t('accountManagement') }}
                                    </div>
                                    <DropdownLink :href="route('profile.show')">
                                        {{ t('profile') }}
                                    </DropdownLink>
                                    <DropdownLink v-if="$page.props.jetstream.hasApiFeatures"
                                                  :href="route('api-tokens.index')">
                                        {{ t('apiTokens') }}
                                    </DropdownLink>
                                    <div class="border-t border-gray-200"></div>
                                    <form @submit.prevent="logout">
                                        <DropdownLink as="button">{{ t('logout') }}</DropdownLink>
                                    </form>
                                </template>
                            </Dropdown>
                        </div>
                        <div class="ms-3 relative">
                            <Dropdown v-if="$page.props.jetstream.hasTeamFeatures" align="right" width="60" class="relative z-10">
                                <template #trigger>
                                    <span class="inline-flex rounded-md">
                                        <button type="button"
                                                class="inline-flex items-center
                                                        bg-white dark:bg-slate-500 active:bg-gray-50
                                                        px-2 py-1
                                                        border border-transparent rounded-xs
                                                        text-sm leading-4 font-medium text-slate-500
                                                        dark:text-slate-100 hover:text-slate-700
                                                        focus:outline-none focus:bg-gray-50
                                                        transition ease-in-out duration-150">
                                            {{ $page.props.auth.user.current_team.name }}
                                            <svg class="ms-2 -me-0.5 h-4 w-4"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke-width="1.5"
                                                 stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                            </svg>
                                        </button>
                                    </span>
                                </template>
                                <template #content>
                                    <div class="w-60">
                                        <div class="block px-4 py-2 text-sm text-slate-400">
                                            {{ t('teamManagement') }}
                                        </div>
                                        <DropdownLink :href="route('teams.show', $page.props.auth.user.current_team)">
                                            {{ t('teamSettings') }}
                                        </DropdownLink>
                                        <DropdownLink v-if="$page.props.jetstream.canCreateTeams"
                                                      :href="route('teams.create')">
                                            {{ t('createNewTeam') }}
                                        </DropdownLink>
                                        <template v-if="$page.props.auth.user.all_teams.length > 1">
                                            <div class="w-60 border-t border-gray-200"></div>
                                            <div class="block px-4 py-2 text-sm text-slate-400">
                                                {{ t('switchTeams') }}
                                            </div>
                                            <template v-for="team in $page.props.auth.user.all_teams" :key="team.id">
                                                <form @submit.prevent="switchToTeam(team)">
                                                    <DropdownLink as="button">
                                                        <div class="flex items-center">
                                                            <svg v-if="team.id == $page.props.auth.user.current_team_id"
                                                                 class="me-2 h-5 w-5 text-green-400"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 fill="none"
                                                                 viewBox="0 0 24 24"
                                                                 stroke-width="1.5"
                                                                 stroke="currentColor">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                            </svg>
                                                            <div>{{ team.name }}</div>
                                                        </div>
                                                    </DropdownLink>
                                                </form>
                                            </template>
                                        </template>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <div class="mx-2 flex items-center">
                            <ThemeToggle class="relative z-10"/>
                        </div>
                    </div>
                    <div class="-me-2 flex items-center sm:hidden">
                        <button class="inline-flex items-center justify-center
                                        p-2 rounded-md
                                        text-slate-400 hover:text-slate-500
                                        hover:bg-gray-100
                                        focus:outline-none focus:bg-gray-100 focus:text-slate-500
                                        transition duration-150 ease-in-out"
                                @click="$emit('toggleNavigationDropdown')">
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                <path :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }" class="sm:hidden">
                <ResponsiveNavLinks />
            </div>
        </nav>
    </div>
    <!-- Page Heading -->
    <header v-if="$slots.header" class="bg-slate-100 dark:bg-sky-900 shadow">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-4 lg:px-8">
            <slot name="header"/>
        </div>
    </header>
</template>
