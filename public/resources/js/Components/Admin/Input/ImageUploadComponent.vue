<script setup>
import { ref, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emits = defineEmits(['imageUploaded']);

const imageUrl = ref(null);

const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            imageUrl.value = response.data.url;
            // Emit event to parent component
            emits('imageUploaded', response.data.url);
        } catch (error) {
            console.error('Не удалось загрузить изображение:', error);
        }
    }
};
</script>

<template>
    <div class="relative w-full h-32 flex items-center justify-center
                bg-gray-100 dark:bg-teal-500 rounded-lg cursor-pointer
                border-2 border-dashed border-gray-400 dark:border-gray-300 hover:border-blue-400
                transition duration-150 ease-in-out">
        <input
            type="file"
            @change="uploadImage"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div class="text-center">
            <svg class="w-8 h-8 text-gray-400 dark:text-yellow-300 mx-auto fill-current" viewBox="0 0 16 16">
                <path
                    d="M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z"></path>
            </svg>
            <span class="block text-sm font-medium text-rose-400 dark:text-slate-100">
                {{ t('dragOrClickToUpload') }}
            </span>
        </div>
    </div>
    <img v-if="imageUrl"
         :src="imageUrl"
         alt="Preview Image"
         class="mt-3 p-1 shadow-lg w-full h-auto rounded-lg border">
</template>
