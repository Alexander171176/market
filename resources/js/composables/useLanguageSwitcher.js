import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Inertia } from '@inertiajs/inertia';

export default function useLanguageSwitcher() {
    const { locale } = useI18n();
    const selectedLocale = ref(locale.value);

    watch(selectedLocale, (newLocale) => {
        if (newLocale !== locale.value) {
            locale.value = newLocale;

            // Редирект на главную страницу с новой локалью
            Inertia.visit(`/${newLocale}`, {
                preserveState: false,
                preserveScroll: true,
            });
        }
    });

    return {
        selectedLocale,
    };
}
