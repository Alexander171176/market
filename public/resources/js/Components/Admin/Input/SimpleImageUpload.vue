<script setup>
import { ref, defineEmits } from 'vue';

const imagePreview = ref(null);
const file = ref(null);

const emit = defineEmits(['fileSelected']);

const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        file.value = selectedFile;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
        emit('fileSelected', selectedFile);
    }
};
</script>

<template>
    <div class="w-full flex flex-col items-center space-y-4 p-4 bg-gray-200 dark:bg-gray-400 rounded-lg shadow-md">
        <input
            type="file"
            @change="handleFileChange"
            class="block w-full cursor-pointer
                   bg-gray-50 dark:bg-gray-700
                   text-sm text-gray-900 dark:text-gray-300
                   border border-gray-300 dark:border-gray-600
                   focus:outline-none focus:border-blue-500"
        />
        <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Preview"
            class="mt-4 w-full h-fit object-cover rounded-md border border-gray-300 dark:border-gray-600"
        />
    </div>
</template>
