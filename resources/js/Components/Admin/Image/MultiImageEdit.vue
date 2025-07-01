<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import draggable from 'vuedraggable';
import LabelInput from "@/Components/Admin/Input/LabelInput.vue";

const { t } = useI18n();
const props = defineProps({
    images: {
        type: Array,
        default: () => []
    }
});
const emit = defineEmits(['update:images', 'delete-image']);

// Создаем локальную копию изображений
const localImages = ref([]);

watch(
    () => props.images,
    (newImages) => {
        localImages.value = newImages
            .map(img => ({
                id: img.id,
                order: img.order || 0,
                url: img.url, // ожидаем, что URL уже вычислен в родителе
                alt: img.alt || '',
                caption: img.caption || ''
            }))
            .sort((a, b) => a.order - b.order); // сортируем по возрастанию order
    },
    { immediate: true }
);

const updateImages = () => {
    emit('update:images', localImages.value);
};

// Функция обновления порядка после перетаскивания
const updateOrder = () => {
    localImages.value.forEach((image, index) => {
        image.order = index + 1;
    });
    updateImages();
};

const removeImage = (index) => {
    const removedImage = localImages.value[index];
    emit('delete-image', removedImage.id);
    localImages.value.splice(index, 1);
    updateOrder();
};
</script>

<template>
    <div class="multi-image-edit">
        <LabelInput :value="t('editImages')" />
        <div v-if="localImages.length" class="mt-4">
            <!-- Оборачиваем список изображений в draggable -->
            <draggable v-model="localImages" group="images" item-key="id" @end="updateOrder"
                       class="grid grid-cols-4 gap-4">
                <template #item="{ element, index }">
                    <div class="relative border border-slate-500 rounded-sm py-0.5 px-2">
                        <img :src="element.url" alt="Existing Image" class="h-40 w-full object-cover" />
                        <input
                            v-model="element.order"
                            @input="updateImages"
                            :placeholder="t('sort')"
                            class="w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"
                        />
                        <input
                            v-model="element.alt"
                            @input="updateImages"
                            :placeholder="t('seoAltImage')"
                            class="w-full my-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"
                        />
                        <input
                            v-model="element.caption"
                            @input="updateImages"
                            :placeholder="t('seoTitleImage')"
                            class="w-full mb-2 py-0.5 px-2 text-sm font-semibold border border-slate-500 rounded"
                        />
                        <button type="button" @click="removeImage(index)"
                                class="absolute top-2 right-2 bg-rose-500 hover:bg-rose-700 text-white rounded-sm p-1">
                            <svg class="w-4 h-4 fill-current opacity-80" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </template>
            </draggable>
        </div>
        <div v-else>
            <p class="text-sm text-left text-slate-800 dark:text-slate-100">{{ t('noData') }}</p>
        </div>
    </div>
</template>
