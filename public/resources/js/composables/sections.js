import {usePage} from "@inertiajs/vue3";

export function useSection() {
    const hasRubric = (title) => usePage().props.rubrics.includes(title);
    const hasSections = (title) => usePage().props.permissions.includes(title);

    return {hasRubric,hasSections}
}
