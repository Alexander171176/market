import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Inertia } from '@inertiajs/inertia';

export default function useLanguageSwitcher() {
    const { locale } = useI18n();
    const selectedLocale = ref(locale.value);

    watch(selectedLocale, (newLocale) => {
        if (newLocale !== locale.value) {
            locale.value = newLocale;

            const segments = window.location.pathname.split('/');
            segments[1] = newLocale;
            const newPath = segments.join('/') + window.location.search;

            Inertia.visit(newPath, {
                preserveState: false,
                preserveScroll: true,
            });
        }
    });

    return {
        selectedLocale,
    };
}
