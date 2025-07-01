import {usePage} from "@inertiajs/vue3";

export function useRubrics() {
    const hasRubrics = (title) => usePage().props.rubrics.includes(title);

    return {hasRubrics}
}
