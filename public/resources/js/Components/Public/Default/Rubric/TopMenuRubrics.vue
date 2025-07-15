<script setup>
import {ref, onMounted, computed} from "vue";
import {usePage, Link} from "@inertiajs/vue3";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const rubrics = ref([]);

// Получаем текущий маршрут
const currentRoute = computed(() => usePage().url);

// Функция для загрузки рубрик с API
const fetchRubrics = async () => {
    try {
        const response = await fetch("/api/menu-rubrics");

        if (!response.ok) {
            console.error(`Ошибка при загрузке рубрик: ${response.status}`);
            return;
        }

        const data = await response.json();

        if (data.rubrics && Array.isArray(data.rubrics)) {
            rubrics.value = data.rubrics;
        } else {
            console.error("Ожидался массив rubrics, но получено:", data);
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
    }
};

onMounted(() => {
    fetchRubrics();
});
</script>

<template>
    <nav class="flex flex-wrap justify-center p-1">
        <ul v-if="rubrics.length" class="flex flex-wrap">
            <li v-for="rubric in rubrics" :key="rubric.id">
                <Link :href="`/rubrics/${rubric.url}`"
                      class="flex items-center"
                      :class="[
                      'mx-2 pb-0.5 text-xs lg:text-sm xl:text-lg font-medium transition duration-300',
                      currentRoute.includes(`/rubrics/${rubric.url}`)
                        ? 'border-b-2 border-red-400 dark:border-yellow-200 text-red-400 dark:text-yellow-200'
                        : 'text-slate-700 hover:text-red-400 dark:text-white dark:hover:text-yellow-200'
                      ]">
                    <span class="w-6 h-6 flex justify-center text-red-500" v-html="rubric.icon"></span>
                    <span>{{ rubric.title }}</span>
                </Link>
            </li>
        </ul>
        <p v-else class="text-slate-100">{{ t("dataUploaded") }}</p>
    </nav>
</template>
