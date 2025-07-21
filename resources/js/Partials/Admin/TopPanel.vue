<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Link } from '@inertiajs/vue3'

const {t} = useI18n();
const isPanelOpen = ref(false)

const togglePanel = () => {
    isPanelOpen.value = !isPanelOpen.value
}
</script>

<template>
    <div>
        <button
            class="fixed top-0 right-3 z-50 hidden md:inline-block
                    px-3 py-3
                    cursor-pointer"
            @click="togglePanel">
            <svg class="w-6 h-6" viewBox="0 0 20 20">
                <circle fill="none" class="stroke-violet-500" cx="9.997" cy="10" r="3.31"></circle>
                <path fill="none" class="stroke-violet-500"
                      d="M18.488,12.285 L16.205,16.237 C15.322,15.496 14.185,15.281 13.303,15.791 C12.428,16.289 12.047,17.373 12.246,18.5 L7.735,18.5 C7.938,17.374 7.553,16.299 6.684,15.791 C5.801,15.27 4.655,15.492 3.773,16.237 L1.5,12.285 C2.573,11.871 3.317,10.999 3.317,9.991 C3.305,8.98 2.573,8.121 1.5,7.716 L3.765,3.784 C4.645,4.516 5.794,4.738 6.687,4.232 C7.555,3.722 7.939,2.637 7.735,1.5 L12.263,1.5 C12.072,2.637 12.441,3.71 13.314,4.22 C14.206,4.73 15.343,4.516 16.225,3.794 L18.487,7.714 C17.404,8.117 16.661,8.988 16.67,10.009 C16.672,11.018 17.415,11.88 18.488,12.285 L18.488,12.285 Z"></path>
            </svg>
        </button>
        <transition name="top-panel">
            <div v-if="isPanelOpen"
                 class="fixed top-0 left-0 right-0
                        border-b-2 border-slate-200 dark:border-slate-800
                        bg-slate-700 bg-opacity-90 dark:bg-opacity-90
                        shadow-md font-semibold
                        text-center text-lg
                        z-40 h-12 py-2
                        overflow-y-auto
                        flex items-center justify-center
                        space-x-4">

                <Link
                    :href="route('admin.parameters.index')"
                    :title="t('parameters')"
                    :class="{ 'active-link': route().current('admin.parameters.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M15.9,18.45C17.25,18.45 18.35,17.35 18.35,16C18.35,14.65 17.25,13.55 15.9,13.55C14.54,13.55 13.45,14.65 13.45,16C13.45,17.35 14.54,18.45 15.9,18.45M21.1,16.68L22.58,17.84C22.71,17.95 22.75,18.13 22.66,18.29L21.26,20.71C21.17,20.86 21,20.92 20.83,20.86L19.09,20.16C18.73,20.44 18.33,20.67 17.91,20.85L17.64,22.7C17.62,22.87 17.47,23 17.3,23H14.5C14.32,23 14.18,22.87 14.15,22.7L13.89,20.85C13.46,20.67 13.07,20.44 12.71,20.16L10.96,20.86C10.81,20.92 10.62,20.86 10.54,20.71L9.14,18.29C9.05,18.13 9.09,17.95 9.22,17.84L10.7,16.68L10.65,16L10.7,15.31L9.22,14.16C9.09,14.05 9.05,13.86 9.14,13.71L10.54,11.29C10.62,11.13 10.81,11.07 10.96,11.13L12.71,11.84C13.07,11.56 13.46,11.32 13.89,11.15L14.15,9.29C14.18,9.13 14.32,9 14.5,9H17.3C17.47,9 17.62,9.13 17.64,9.29L17.91,11.15C18.33,11.32 18.73,11.56 19.09,11.84L20.83,11.13C21,11.07 21.17,11.13 21.26,11.29L22.66,13.71C22.75,13.86 22.71,14.05 22.58,14.16L21.1,15.31L21.15,16L21.1,16.68M6.69,8.07C7.56,8.07 8.26,7.37 8.26,6.5C8.26,5.63 7.56,4.92 6.69,4.92A1.58,1.58 0 0,0 5.11,6.5C5.11,7.37 5.82,8.07 6.69,8.07M10.03,6.94L11,7.68C11.07,7.75 11.09,7.87 11.03,7.97L10.13,9.53C10.08,9.63 9.96,9.67 9.86,9.63L8.74,9.18L8,9.62L7.81,10.81C7.79,10.92 7.7,11 7.59,11H5.79C5.67,11 5.58,10.92 5.56,10.81L5.4,9.62L4.64,9.18L3.5,9.63C3.41,9.67 3.3,9.63 3.24,9.53L2.34,7.97C2.28,7.87 2.31,7.75 2.39,7.68L3.34,6.94L3.31,6.5L3.34,6.06L2.39,5.32C2.31,5.25 2.28,5.13 2.34,5.03L3.24,3.47C3.3,3.37 3.41,3.33 3.5,3.37L4.63,3.82L5.4,3.38L5.56,2.19C5.58,2.08 5.67,2 5.79,2H7.59C7.7,2 7.79,2.08 7.81,2.19L8,3.38L8.74,3.82L9.86,3.37C9.96,3.33 10.08,3.37 10.13,3.47L11.03,5.03C11.09,5.13 11.07,5.25 11,5.32L10.03,6.06L10.06,6.5L10.03,6.94Z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.logs.index')"
                    :title="t('logs')"
                    :class="{ 'active-link': route().current('admin.logs.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5.5,17h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,17Zm0-5h13a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-1A.5.5,0,0,1,5.5,12Zm5-3h-5A.5.5,0,0,1,5,8.5v-1A.5.5,0,0,1,5.5,7h5a.5.5,0,0,1,.5.5v1A.5.5,0,0,1,10.5,9Z"></path>
                        <polygon class="fill-current text-cyan-400"
                                 points="21.414 6 16 6 16 0.586 21.414 6"></polygon>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.phpinfo.index')"
                    title="phpinfo"
                    :class="{ 'active-link': route().current('admin.phpinfo.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M20,1H4c-1.654,0-3,1.346-3,3V20c0,1.654,1.346,3,3,3H20c1.654,0,3-1.346,3-3V4c0-1.654-1.346-3-3-3Zm-7,16c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-.553,.448-1,1-1s1,.447,1,1v6Zm-1-9c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25,.56,1.25,1.25-.56,1.25-1.25,1.25Z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.composer.index')"
                    title="composer"
                    :class="{ 'active-link': route().current('admin.composer.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M10,7H2A1,1,0,0,1,1,6V2A1,1,0,0,1,2,1h8a1,1,0,0,1,1,1V6A1,1,0,0,1,10,7Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M10,23H2a1,1,0,0,1-1-1V18a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v4A1,1,0,0,1,10,23Z"></path>
                        <rect class="fill-current text-cyan-400"
                              x="5" y="8" width="2" height="8"></rect>
                        <path class="fill-current text-cyan-400"
                              d="M19,7H17V5H12V3h6a1,1,0,0,1,1,1Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M18,21H12V19h5V17h2v3A1,1,0,0,1,18,21Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M18,16a1,1,0,0,1-.515-.143l-5-3a1,1,0,0,1,0-1.714l5-3a1,1,0,0,1,1.03,0l5,3a1,1,0,0,1,0,1.714l-5,3A1,1,0,0,1,18,16Z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.package.index')"
                    title="package"
                    :class="{ 'active-link': route().current('admin.package.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M10,7H2A1,1,0,0,1,1,6V2A1,1,0,0,1,2,1h8a1,1,0,0,1,1,1V6A1,1,0,0,1,10,7Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M10,23H2a1,1,0,0,1-1-1V18a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v4A1,1,0,0,1,10,23Z"></path>
                        <rect class="fill-current text-cyan-400"
                              x="5" y="8" width="2" height="8"></rect>
                        <path class="fill-current text-cyan-400"
                              d="M19,7H17V5H12V3h6a1,1,0,0,1,1,1Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M18,21H12V19h5V17h2v3A1,1,0,0,1,18,21Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M18,16a1,1,0,0,1-.515-.143l-5-3a1,1,0,0,1,0-1.714l5-3a1,1,0,0,1,1.03,0l5,3a1,1,0,0,1,0,1.714l-5,3A1,1,0,0,1,18,16Z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.env.index')"
                    title="env"
                    :class="{ 'active-link': route().current('admin.env.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M18.293,.293L10.257,8.329C5.507,6.925,.49,10.125-.009,15.33c-.304,3.169,1.397,6.299,4.222,7.767,4.639,2.411,10.053-.058,11.458-4.808,.439-1.484,.439-3.062,0-4.546l2.036-2.036c.188-.188,.293-.442,.293-.707v-2c0-.552,.448-1,1-1h2c.265,0,.52-.105,.707-.293l2-2c.188-.188,.293-.442,.293-.707V1c0-.552-.448-1-1-1h-4c-.265,0-.52,.105-.707,.293ZM8,19c-1.657,0-3-1.343-3-3s1.343-3,3-3,3,1.343,3,3-1.343,3-3,3Z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.backup.index')"
                    :title="t('backups')"
                    :class="{ 'active-link': route().current('admin.env.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M12,10C8.2,10,4.3,9.3,2,7.6V12c0,2.7,5.2,4,10,4s10-1.3,10-4V7.6C19.7,9.3,15.8,10,12,10z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M12,18c-3.8,0-7.7-0.7-10-2.4V20c0,2.7,5.2,4,10,4s10-1.3,10-4v-4.4C19.7,17.3,15.8,18,12,18z"></path>
                        <path class="fill-current text-cyan-600"
                              d="M12,0C7.2,0,2,1.3,2,4s5.2,4,10,4s10-1.3,10-4S16.8,0,12,0z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.files.index')"
                    :title="t('archive')"
                    :class="{ 'active-link': route().current('admin.files.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M23.746,16.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M23.746,11.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z"></path>
                        <path class="fill-current text-cyan-600"
                              d="M23.746,6.564l-11.5-6.5a.507.507,0,0,0-.492,0l-11.5,6.5a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.components.index')"
                    :title="t('components')"
                    :class="{ 'active-link': route().current('admin.components.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <circle class="fill-current text-cyan-600"
                                cx="16" cy="8" r="8"></circle>
                        <circle class="fill-current text-cyan-400"
                                cx="8" cy="16" r="8"></circle>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.robot.index')"
                    :title="t('robot')"
                    :class="{ 'active-link': route().current('admin.robot.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M17,23H4c-1.654,0-3-1.346-3-3V7c0-1.654,1.346-3,3-3h5c.552,0,1,.448,1,1s-.448,1-1,1H4c-.551,0-1,.449-1,1v13c0,.551,.449,1,1,1h13c.551,0,1-.449,1-1v-5c0-.552,.448-1,1-1s1,.448,1,1v5c0,1.654-1.346,3-3,3Z"></path>
                        <path class="fill-current text-cyan-400"
                              d="M20.414,8l1.585-1.585c.378-.377,.587-.879,.587-1.414,0-.535-.208-1.037-.586-1.416l-1.585-1.585c-.377-.378-.879-.587-1.414-.587h0c-.534,0-1.037,.208-1.415,.586l-1.586,1.586,4.414,4.414Z"></path>
                        <path class="fill-current text-cyan-600"
                              d="M14.586,5l-6.293,6.293c-.096,.096-.171,.21-.222,.335l-2,5c-.148,.372-.061,.796,.222,1.079,.191,.191,.447,.293,.707,.293,.125,0,.251-.023,.372-.071l5-2c.125-.05,.24-.126,.335-.222l6.293-6.293-4.414-4.414Z"></path>
                    </svg>
                </Link>
                <Link
                    :href="route('admin.sitemap.index')"
                    title="sitemap.xml"
                    :class="{ 'active-link': route().current('admin.sitemap.index'),
                    'base-link': true }"
                >
                    <svg class="shrink-0 h-4 w-4" viewBox="0 0 24 24">
                        <path class="fill-current text-cyan-400"
                              d="M24,8V4H20V5H15.858A3.981,3.981,0,0,0,8.142,5H4V4H0V8H4V7H8.142a3.9,3.9,0,0,0,.247.692A10.007,10.007,0,0,0,2.055,16H1a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H5a1,1,0,0,0,1-1V17a1,1,0,0,0-1-1H4.069A8.015,8.015,0,0,1,9.775,9.321a3.985,3.985,0,0,0,4.45,0A8.015,8.015,0,0,1,19.931,16H19a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V17a1,1,0,0,0-1-1H21.945a10.007,10.007,0,0,0-6.334-8.308A3.9,3.9,0,0,0,15.858,7H20V8ZM12,4a2,2,0,1,1-2,2A2,2,0,0,1,12,4Z"></path>
                    </svg>
                </Link>

            </div>
        </transition>
    </div>
</template>

<style scoped>
.top-panel-enter-active,
.top-panel-leave-active {
    transition: transform 0.3s ease;
}
.top-panel-enter-from,
.top-panel-leave-to {
    transform: translateY(-100%);
}
.top-panel-enter-to,
.top-panel-leave-from {
    transform: translateY(0);
}

.base-link {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    text-decoration: none;
    color: #e2e8f0; /* slate-200 */
    font-size: 11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.base-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
.active-link {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-weight: 600;
}
</style>
