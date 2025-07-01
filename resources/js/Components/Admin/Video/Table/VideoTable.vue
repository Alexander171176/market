<script setup>
import {defineProps, defineEmits, watch, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import draggable from 'vuedraggable';
import IconEdit from "@/Components/Admin/Buttons/IconEdit.vue";
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue';
import ActivityToggle from "@/Components/Admin/Buttons/ActivityToggle.vue";
import LeftToggle from "@/Components/Admin/Buttons/LeftToggle.vue";
import MainToggle from "@/Components/Admin/Buttons/MainToggle.vue";
import RightToggle from "@/Components/Admin/Buttons/RightToggle.vue";

const { t } = useI18n();

const props = defineProps({
    videos: Array,
    selectedVideos: Array
});

const emits = defineEmits([
    'toggle-left',
    'toggle-main',
    'toggle-right',
    'toggle-activity',
    'edit',
    'delete',
    'update-sort-order',
    'toggle-select',
    'toggle-all'
]);

// Функция форматирования даты
const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d)) return ''
    return d.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// --- Локальная копия для vuedraggable ---
const localVideos = ref([]);

// --- Следим за изменением props.videos и обновляем локальную копию ---
watch(() => props.videos, (newVal) => {
    // Создаем глубокую копию, чтобы избежать мутации props
    localVideos.value = JSON.parse(JSON.stringify(newVal || []));
}, { immediate: true, deep: true }); // immediate: true для инициализации

// --- Функция, вызываемая vuedraggable после завершения перетаскивания ---
const handleDragEnd = () => {
    // Отправляем НОВЫЙ ПОРЯДОК ID из локального массива
    const newOrderIds = localVideos.value.map(video => video.id);
    emits('update-sort-order', newOrderIds); // Отправляем массив ID
};

// --- Логика массовых действий ---
const toggleAll = (event) => {
    const checked = event.target.checked;
    const ids = localVideos.value.map(r => r.id);
    emits('toggle-all', { ids, checked });
};

// Функция для выбора изображения с наименьшим значением order
const getPrimaryImage = (video) => {
    if (video.images && video.images.length) {
        // Создаем копию массива и сортируем по возрастанию order
        return [...video.images].sort((a, b) => a.order - b.order)[0];
    }
    return null;
};
</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table v-if="videos.length > 0" class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead
                    class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="font-medium text-center">{{ t('id') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex justify-center" :title="t('image')">
                            <svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 512 512">
                                <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                            </svg>
                        </div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex justify-center" :title="t('localization')">
                            <svg class="w-8 h-8 fill-current shrink-0" viewBox="0 0 640 512">
                                <path d="M0 128C0 92.7 28.7 64 64 64l192 0 48 0 16 0 256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64l-256 0-16 0-48 0L64 448c-35.3 0-64-28.7-64-64L0 128zm320 0l0 256 256 0 0-256-256 0zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1 73.6 0 8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276l-38 0 19-42.8zM448 164c11 0 20 9 20 20l0 4 44 0 16 0c11 0 20 9 20 20s-9 20-20 20l-2 0-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45L448 228l-72 0c-11 0-20-9-20-20s9-20 20-20l52 0 0-4c0-11 9-20 20-20z"/>
                            </svg>
                        </div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('type') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('title') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('url') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('sections') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-left">{{ t('articles') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex justify-center" :title="t('views')">
                            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                                <path d="M8 2C3.246 2 .251 7.29.127 7.515a.998.998 0 0 0 .002.975c.07.125 1.044 1.801 2.695 3.274C4.738 13.582 6.283 14 8 14c4.706 0 7.743-5.284 7.872-5.507a1 1 0 0 0 0-.98A13.292 13.292 0 0 0 8 2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                            </svg>
                        </div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="flex justify-center" :title="t('likes')">
                            <svg class="h-8 w-8 fill-current" viewBox="0 0 32 32">
                                <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z"></path>
                            </svg>
                        </div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-center">{{ t('show') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-center">{{ t('actions') }}</div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="text-center">
                            <input type="checkbox" @change="toggleAll"/>
                        </div>
                    </th>
                </tr>
                </thead>
                <draggable tag="tbody" v-model="localVideos" @end="handleDragEnd" itemKey="id">
                    <template #item="{ element: video }">
                        <tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center text-blue-600 dark:text-blue-200">{{ video.id }}</div>
                            </td>
                            <td class="first:pl-5 last:pr-5 py-1">
                                <div class="flex justify-center">
                                    <template v-if="video.images && video.images.length">
                                        <img
                                            :src="getPrimaryImage(video).webp_url || getPrimaryImage(video).url"
                                            :alt="getPrimaryImage(video).alt || t('defaultImageAlt')"
                                            :title="getPrimaryImage(video).caption || t('postImage')"
                                            class="h-8 w-8 object-cover rounded-full"
                                        >
                                    </template>
                                    <template v-else>
                                        <img
                                            src="/storage/video_images/default-image.png"
                                            :alt="t('defaultImageTitle')"
                                            class="h-8 w-8 object-cover rounded-full"
                                        >
                                    </template>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center uppercase text-orange-500 dark:text-orange-200">
                                    {{ video.locale }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left text-sky-600 dark:text-sky-200">{{ video.source_type}}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left text-teal-600 dark:text-green-200"
                                     :title="formatDate(video.published_at)">
                                    {{ video.title }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-7 last:pr-7 py-1 whitespace-nowrap">
                                <div class="text-left">
                                    <a :href="`/videos/${encodeURIComponent(video.url)}`"
                                       class="text-violet-600 dark:text-violet-200 hover:underline
                                              hover:text-violet-800 dark:hover:text-violet-50"
                                       target="_blank" rel="noopener noreferrer">
                                        {{ video.url }}
                                    </a>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left">
                                    <span v-for="section in video.sections" :key="section.id">
                                        <span :title="section.title"
                                              class="py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200
                                                     rounded-sm text-xs text-slate-100 dark:text-slate-900">
                                            {{ section.id }}
                                        </span>
                                    </span>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left">
                                    <span v-for="article in video.articles" :key="article.id">
                                        <span :title="article.title"
                                              class="py-0.5 px-1.5 mr-0.5 badge bg-blue-500 dark:bg-blue-200
                                                     rounded-sm text-xs text-slate-100 dark:text-slate-900">
                                            {{ article.id }}
                                        </span>
                                    </span>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center">{{ video.views }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center">{{ video.likes }}</div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="flex justify-center space-x-2">
                                    <LeftToggle :isActive="video.left"
                                                @toggle-left="$emit('toggle-left', video)"
                                                :title="video.left ? t('enabled') : t('disabled')"/>
                                    <MainToggle :isActive="video.main"
                                                @toggle-main="$emit('toggle-main', video)"
                                                :title="video.main ? t('enabled') : t('disabled')"/>
                                    <RightToggle :isActive="video.right"
                                                 @toggle-right="$emit('toggle-right', video)"
                                                 :title="video.right ? t('enabled') : t('disabled')"/>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="flex justify-center space-x-2">
                                    <ActivityToggle :isActive="video.activity"
                                                    @toggle-activity="$emit('toggle-activity', video)"
                                                    :title="video.activity ? t('enabled') : t('disabled')"/>
                                    <IconEdit :href="route('admin.videos.edit', video.id)" />
                                    <DeleteIconButton @delete="$emit('delete', video.id)"/>
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center">
                                    <input type="checkbox" :checked="selectedVideos.includes(video.id)"
                                           @change="$emit('toggle-select', video.id)"/>
                                </div>
                            </td>
                        </tr>
                    </template>
                </draggable>
            </table>
            <div v-else class="p-5 text-center text-slate-700 dark:text-slate-100">
                {{ t('noData') }}
            </div>
        </div>
    </div>
</template>
