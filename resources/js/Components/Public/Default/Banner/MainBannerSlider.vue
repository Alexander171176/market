<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    banners: {
        type: Array,
        required: true,
    },
});

const currentIndex = ref(0);
const isHovered = ref(false);
let intervalId = null;

const startSlider = () => {
    stopSlider();
    if (props.banners.length > 1) {
        intervalId = setInterval(() => {
            if (!isHovered.value) {
                currentIndex.value = (currentIndex.value + 1) % props.banners.length;
            }
        }, 5000);
    }
};

const stopSlider = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

onMounted(startSlider);
onBeforeUnmount(stopSlider);
</script>

<template>
    <div v-if="banners.length" class="mt-8 w-full overflow-hidden">
        <div
            class="relative w-full"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
        >
            <div v-for="(banner, index) in banners" :key="banner.id">
                <div v-show="currentIndex === index"
                     class="w-full transition-opacity duration-700">

                    <!-- Есть ссылка -->
                    <Link
                        v-if="banner.link"
                        :href="banner.link"
                        class="block w-full"
                    >
                        <img
                            :src="banner.images?.[0]?.webp_url || banner.images?.[0]?.url || '/images/no-image.svg'"
                            :alt="banner.title || ''"
                            :title="banner.title || ''"
                            class="w-full h-auto object-contain mx-auto
                                   transition-transform duration-500"
                            loading="lazy"
                        />
                    </Link>

                    <!-- Нет ссылки, но есть изображение -->
                    <img
                        v-else-if="banner.images?.[0]?.webp_url || banner.images?.[0]?.url"
                        :src="banner.images?.[0]?.webp_url || banner.images?.[0]?.url"
                        :alt="banner.title || ''"
                        :title="banner.title || ''"
                        class="w-full h-auto object-contain mx-auto
                               transition-transform duration-500"
                        loading="lazy"
                    />

                    <!-- Нет изображения → заглушка -->
                    <img
                        v-else
                        src="/banner_images/default-image.png"
                        alt="Нет изображения"
                        class="w-full h-auto object-contain mx-auto opacity-50
                               transition-transform duration-500"
                        loading="lazy"
                    />

                </div>
            </div>
        </div>
    </div>
</template>
