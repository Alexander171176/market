<script setup>
import {ref} from "vue";
import {Head, Link, router} from '@inertiajs/vue3'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue'
import ApplicationMark from '@/Components/ApplicationMark.vue'
import ThemeToggle from '@/Components/User/ThemeToggle/ThemeToggle.vue'
import LogoutButton from '@/Components/User/Button/LogoutButton.vue'

defineProps({
    title: String,
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String
})

const showingNavigationDropdown = ref(false)

const logout = () => {
    router.post(route('logout'))
}
</script>

<template>
    <Head title="Welcome"/>

    <div class="min-h-screen w-full sm:fixed sm:top-0 sm:end-0 text-end z-10 shadow">

        <nav class="bg-white border-b border-gray-100 dark:bg-slate-900">

            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="w-full flex justify-between">

                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <ApplicationMark class="block h-9 w-auto"/>
                        </div>

                        <div class="hidden md:flex w-full flex-row flex-wrap items-center justify-end">
                            <Link href="/frontend"
                                  class="font-semibold
                                             text-gray-600
                                             text-sm
                                             px-3 py-1
                                             hover:text-gray-900
                                             dark:text-gray-400
                                             dark:hover:text-white
                                             focus:outline
                                             focus:outline-2
                                             focus:rounded-sm
                                             focus:outline-red-500">
                                Фронтенд
                            </Link>
                        </div>

                        <div v-if="canLogin" class="hidden md:flex w-full flex-row flex-wrap items-center justify-end">

                            <!-- Navigation Links -->
                            <Link
                                v-if="$page.props.auth.user"
                                :href="route('dashboard')"
                                class="font-semibold
                                           text-gray-600
                                           text-sm
                                           px-3 py-1
                                           hover:text-gray-900
                                           dark:text-gray-400
                                           dark:hover:text-white
                                           focus:outline
                                           focus:outline-2
                                           focus:rounded-sm
                                           focus:outline-red-500">
                                Личный кабинет
                            </Link>

                            <Link
                                v-if="$page.props.auth.user"
                                :href="route('admin.index')"
                                class="font-semibold
                                           text-gray-600
                                           text-sm
                                           mr-2 px-3 py-1
                                           hover:text-gray-900
                                           dark:text-gray-400
                                           dark:hover:text-white
                                           focus:outline
                                           focus:outline-2
                                           focus:rounded-sm
                                           focus:outline-red-500">
                                Панель администратора
                            </Link>

                            <!-- logout -->
                            <form v-if="$page.props.auth.user" @submit.prevent="logout">
                                <LogoutButton>
                                    Выход
                                </LogoutButton>
                            </form>

                            <template v-else>
                                <Link
                                    :href="route('login')"
                                    class="font-semibold
                                           text-gray-600
                                           text-sm
                                           px-3 py-1
                                           hover:text-gray-900
                                           dark:text-gray-400
                                           dark:hover:text-white
                                           focus:outline
                                           focus:outline-2
                                           focus:rounded-sm
                                           focus:outline-red-500">
                                    Вход
                                </Link>

                                <Link
                                    v-if="canRegister"
                                    :href="route('register')"
                                    class="font-semibold
                                           text-gray-600
                                           text-sm
                                           px-3 py-1
                                           hover:text-gray-900
                                           dark:text-gray-400
                                           dark:hover:text-white
                                           focus:outline
                                           focus:outline-2
                                           focus:rounded-sm
                                           focus:outline-red-500">
                                    Регистрация
                                </Link>
                            </template>

                        </div>

                    </div>

                    <!-- ThemeToggle -->
                    <div class="ml-2 flex items-center">
                        <ThemeToggle/>
                    </div>

                    <!-- Hamburger -->
                    <div class="-me-2 flex items-center md:hidden">
                        <button
                            class="inline-flex
                                       items-center
                                       justify-center
                                       p-2 rounded-md
                                       text-gray-400
                                       hover:text-gray-500
                                       hover:bg-gray-100
                                       focus:outline-none
                                       focus:bg-gray-100
                                       focus:text-gray-500
                                       transition duration-150 ease-in-out"
                            @click="showingNavigationDropdown = !showingNavigationDropdown"
                        >
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    :class="{
                                          hidden: showingNavigationDropdown,
                                          'inline-flex': !showingNavigationDropdown
                                        }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    :class="{
                                          hidden: !showingNavigationDropdown,
                                          'inline-flex': showingNavigationDropdown
                                        }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Responsive Navigation Menu -->
            <div
                :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                class="md:hidden"
            >
                <div v-if="canLogin" class="pt-2 pb-3 space-y-1">

                    <ResponsiveNavLink v-if="$page.props.auth.user" :href="route('dashboard')">
                        Панель управления
                    </ResponsiveNavLink>

                    <ResponsiveNavLink v-if="$page.props.auth.user" :href="route('admin.index')">
                        Панель Администратора
                    </ResponsiveNavLink>

                    <!-- logout -->
                    <form v-if="$page.props.auth.user" @submit.prevent="logout" class="w-fit ml-4">
                        <LogoutButton>
                            Выход
                        </LogoutButton>
                    </form>

                    <template v-else>
                        <ResponsiveNavLink
                            :href="route('login')"
                            class="font-semibold
                                       text-gray-600
                                       text-sm
                                       px-3 py-1
                                       hover:text-gray-900
                                       dark:text-gray-400
                                       dark:hover:text-white
                                       focus:outline
                                       focus:outline-2
                                       focus:rounded-sm
                                       focus:outline-red-500">
                            Вход
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            v-if="canRegister"
                            :href="route('register')"
                            class="font-semibold
                                       text-gray-600
                                       text-sm
                                       px-3 py-1
                                       hover:text-gray-900
                                       dark:text-gray-400
                                       dark:hover:text-white
                                       focus:outline
                                       focus:outline-2
                                       focus:rounded-sm
                                       focus:outline-red-500">
                            Регистрация
                        </ResponsiveNavLink>
                    </template>

                </div>

            </div>

        </nav>

    </div>

    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-slate-900 selection:bg-red-500 selection:text-white"
    >
        <div class="max-w-7xl mt-16 mx-auto p-6 lg:p-8">

            <div class="mt-16">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <a
                        href="https://laravel.com/docs/10.x"
                        class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                    >
                        <div>
                            <div
                                class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    class="w-7 h-7 stroke-red-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                    />
                                </svg>
                            </div>

                            <h2 class="mt-6 text-md font-semibold text-gray-900 dark:text-white">
                                Документация Laravel
                            </h2>

                            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                В Laravel есть замечательная документация, охватывающая каждый аспект фреймворка.
                                Независимо от того, являетесь ли вы новичком или имеете предыдущий опыт работы с
                                Laravel, мы рекомендуем прочитать нашу документацию от начала до конца.
                            </p>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                        </svg>
                    </a>

                    <a
                        href="https://laracasts.com"
                        class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                    >
                        <div>
                            <div
                                class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    class="w-7 h-7 stroke-red-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                            </div>

                            <h2 class="mt-6 text-md font-semibold text-gray-900 dark:text-white">Laracasts</h2>

                            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                Laracasts предлагает тысячи видеоуроков по разработке на Laravel, PHP и JavaScript.
                                Ознакомьтесь с ними, убедитесь сами и значительно повысьте свои навыки разработки в
                                процессе.
                            </p>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                        </svg>
                    </a>

                    <a
                        href="https://laravel-news.com"
                        class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                    >
                        <div>
                            <div
                                class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    class="w-7 h-7 stroke-red-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                                    />
                                </svg>
                            </div>

                            <h2 class="mt-6 text-md font-semibold text-gray-900 dark:text-white">Laravel News</h2>

                            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                Laravel News - это управляемый сообществом портал и информационная рассылка,
                                объединяющая все последние и наиболее важные новости в экосистеме Laravel, включая
                                новые выпуски пакетов и учебные пособия.
                            </p>
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                        </svg>
                    </a>

                    <div
                        class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                    >
                        <div>
                            <div
                                class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    class="w-7 h-7 stroke-red-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                                    />
                                </svg>
                            </div>

                            <h2 class="mt-6 text-md font-semibold text-gray-900 dark:text-white">
                                Vibrant Ecosystem
                            </h2>

                            <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                Laravel's robust library of first-party tools and libraries, such as
                                <a
                                    href="https://forge.laravel.com"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Forge</a
                                >,
                                <a
                                    href="https://vapor.laravel.com"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Vapor</a
                                >,
                                <a
                                    href="https://nova.laravel.com"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Nova</a
                                >, and
                                <a
                                    href="https://envoyer.io"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Envoyer</a
                                >
                                help you take your projects to the next level. Pair them with powerful open source
                                libraries like
                                <a
                                    href="https://laravel.com/docs/billing"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Cashier</a
                                >,
                                <a
                                    href="https://laravel.com/docs/dusk"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Dusk</a
                                >,
                                <a
                                    href="https://laravel.com/docs/broadcasting"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Echo</a
                                >,
                                <a
                                    href="https://laravel.com/docs/horizon"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Horizon</a
                                >,
                                <a
                                    href="https://laravel.com/docs/sanctum"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Sanctum</a
                                >,
                                <a
                                    href="https://laravel.com/docs/telescope"
                                    class="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Telescope</a
                                >, and more.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                <div class="text-center text-sm sm:text-start">&nbsp;</div>

                <div class="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
                    Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}

@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
