import {usePage} from "@inertiajs/vue3";

export function useBanners() {
    const hasSection = (title) => usePage().props.roles.includes(title);
    const hasBanners = (title) => usePage().props.banners.includes(title);

    return {hasSection,hasBanners}
}
