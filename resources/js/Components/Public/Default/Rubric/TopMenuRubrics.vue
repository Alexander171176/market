<script setup>
import { Link } from '@inertiajs/vue3';
import { ref, watch, computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const rubrics = ref([]);
const currentLocale = computed(() => usePage().props.locale ?? 'ru'); // ✅ исправлено


// 🔁 Метод получения рубрик
const fetchRubrics = async () => {
    const localePath = currentLocale.value; // 'ru', 'en' и т.д.
    const url = `/${localePath}/api/menu-rubrics`;

    //console.log('[TopMenuRubrics] Загружаем рубрики по пути:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`[TopMenuRubrics] Ошибка загрузки: ${response.status}`);
            return;
        }

        const data = await response.json();
        //console.log('[TopMenuRubrics] Результат:', data);

        rubrics.value = Array.isArray(data.rubrics) ? data.rubrics : [];
    } catch (error) {
        console.error('[TopMenuRubrics] Ошибка сети:', error);
    }
};

// 🚀 Загружаем при первом монтировании
onMounted(() => {
    fetchRubrics();
});

// 👀 Следим за изменением локали
watch(currentLocale, (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
        //console.log(`[TopMenuRubrics] Локаль изменилась: ${oldLocale} → ${newLocale}`);
        fetchRubrics();
    }
});
</script>

<template>
    <nav class="flex flex-wrap justify-center p-1">
        <ul v-if="rubrics.length" class="flex flex-wrap">
            <li>
                <Link :href="`/`"
                      class="flex items-center"
                      :class="[
                        'mx-2 pb-0.5 text-sm font-medium transition duration-300',
                        $page.url.includes(`/`)
                          ? 'border-b-2 border-blue-500 dark:border-blue-500 text-blue-500'
                          : 'text-slate-900 hover:text-blue-500'
                      ]">
                    <span>{{ t('home') }}</span>
                </Link>
            </li>
            <li v-for="rubric in rubrics" :key="rubric.id">
                <Link :href="`/rubrics/${rubric.url}`"
                      class="flex items-center"
                      :class="[
                        'mx-2 pb-0.5 text-sm font-medium transition duration-300',
                        $page.url.includes(`/rubrics/${rubric.url}`)
                          ? 'border-b-2 border-blue-500 dark:border-blue-500 text-blue-500'
                          : 'text-slate-900 hover:text-blue-500'
                      ]">
                    <span>{{ rubric.title }}</span>
                </Link>
            </li>

            <!-- Внутренняя ссылка -->
            <li>
                <Link :href="`/videos`"
                      class="flex items-center"
                      :class="[
                        'mx-2 pb-0.5 text-sm font-medium transition duration-300',
                        $page.url.includes(`/videos`)
                          ? 'border-b-2 border-blue-500 dark:border-blue-500 text-blue-500'
                          : 'text-slate-900 hover:text-blue-500'
                      ]">
                    <span>{{ t('allVideos') }}</span>
                </Link>
            </li>

            <!-- 🔗 Внешняя ссылка -->
            <li>
                <a href="https://vcg.org.kz/" target="_blank" rel="noopener noreferrer"
                   class="flex items-center mx-2 pt-1 uppercase
                          text-xs font-semibold text-slate-900 hover:text-blue-500 transition duration-300">
                    VCG
                </a>
            </li>
        </ul>
        <p v-else class="text-slate-100">{{ t("dataUploaded") }}</p>
    </nav>
</template>
