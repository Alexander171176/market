import {usePage} from "@inertiajs/vue3";

export function usePlugin() {
    const hasPlugin = (constant) => usePage().props.plugins.includes(constant);

    return {hasPlugin}
}
