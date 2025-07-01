import {usePage} from "@inertiajs/vue3";

export function useSetting() {
    const hasSetting = (constant) => usePage().props.settings.includes(constant);

    return {hasSetting}
}
