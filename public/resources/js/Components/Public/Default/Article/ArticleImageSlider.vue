<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
    // URL ссылки на статью, если нужно оборачивать изображение в ссылку
    link: {
        type: String,
        default: '',
    },
    // Альтернативный текст и заголовок (приоритет – данные из объекта изображения)
    alt: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    }
});

const currentIndex = ref(0);
let intervalId = null;

onMounted(() => {
    // Если изображений больше одного – запускаем переключатель
    if (props.images.length > 1) {
        intervalId = setInterval(() => {
            currentIndex.value = (currentIndex.value + 1) % props.images.length;
        }, 3000); // 3000 мс = 3 секунды
    }
});

onBeforeUnmount(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

const currentImage = computed(() => {
    return props.images[currentIndex.value];
});
</script>

<template>
    <div class="h-full">
        <!-- Если передана ссылка, оборачиваем в <Link> -->
        <Link v-if="link" :href="link" class="block h-full p-4 border border-slate-400">
            <img
                :src="currentImage.webp_url || currentImage.url"
                :alt="alt || currentImage.alt"
                :title="title || currentImage.caption"
                class="w-full h-full object-cover shadow-md shadow-gray-600
                       transition-transform duration-300 hover:scale-105"
            />
        </Link>
        <template v-else>
            <img
                :src="currentImage.webp_url || currentImage.url"
                :alt="alt || currentImage.alt"
                :title="title || currentImage.caption"
                class="w-full h-full object-cover"
            />
        </template>
    </div>
</template>
