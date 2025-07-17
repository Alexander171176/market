import {usePage} from "@inertiajs/vue3";

export function useTag() {
    const hasArticles = (title) => usePage().props.articles.includes(title);

    return {hasArticles}
}
