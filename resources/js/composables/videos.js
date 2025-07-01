import {usePage} from "@inertiajs/vue3";

export function useVideos() {
    const hasVideos = (title) => usePage().props.videos.includes(title);

    return {hasVideos}
}
