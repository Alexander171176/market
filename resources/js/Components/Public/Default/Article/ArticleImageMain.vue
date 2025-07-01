<script setup>
import { ref, computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
    // Если нужно оборачивать изображение в ссылку
    link: {
        type: String,
        default: '',
    }
});

const currentIndex = ref(0);
const totalImages = computed(() => props.images.length);
const currentImage = computed(() => props.images[currentIndex.value]);
</script>

<template>
    <div class="relative w-full h-full">
        <!-- Изображение оборачивается в ссылку, если задан prop link -->
        <Link v-if="link" :href="link" class="block w-full h-full">
            <transition name="fade" mode="out-in">
                <img
                    :key="currentImage.id"
                    :src="currentImage.webp_url || currentImage.url"
                    :alt="currentImage.alt"
                    class="w-full h-full object-cover"
                />
            </transition>
        </Link>
        <template v-else>
            <transition name="fade" mode="out-in">
                <img
                    :key="currentImage.id"
                    :src="currentImage.webp_url || currentImage.url"
                    :alt="currentImage.alt"
                    class="w-full h-full object-cover"
                />
            </transition>
        </template>
        <!-- Кнопка "назад" -->
        <button
            @click="currentIndex = (currentIndex - 1 + totalImages) % totalImages"
            class="absolute top-1/2 left-0 transform -translate-y-1/2
                   bg-gray-700 bg-opacity-75 text-white px-2 py-1 rounded-r focus:outline-none"
            aria-label="Previous"
        >
            &#10094;
        </button>
        <!-- Кнопка "вперёд" -->
        <button
            @click="currentIndex = (currentIndex + 1) % totalImages"
            class="absolute top-1/2 right-0 transform -translate-y-1/2
                   bg-gray-700 bg-opacity-75 text-white px-2 py-1 rounded-l focus:outline-none"
            aria-label="Next"
        >
            &#10095;
        </button>
        <!-- Навигационные точки -->
        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span
          v-for="(dot, index) in totalImages"
          :key="index"
          @click="currentIndex = index"
          class="cursor-pointer w-3 h-3 rounded-full border border-gray-500"
          :class="currentIndex === index ? 'bg-red-500' : 'bg-slate-100'"
      ></span>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
