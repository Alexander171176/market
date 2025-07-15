<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

const props = defineProps({
    id: String,
    name: String,
    imagePreview: String,
    altText: String,
    titleText: String
});

const emits = defineEmits(['change']);
const inputRef = ref(null);
const imagePreview = ref(props.imagePreview);

const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
            emits('change', {file, preview: e.target.result});
        };
        reader.readAsDataURL(file);
    }
};

watch(() => props.imagePreview, (newValue) => {
    imagePreview.value = newValue;
});
</script>

<template>
    <div class="w-full flex flex-col items-center space-y-4 p-4 bg-gray-200 dark:bg-gray-400 rounded-lg shadow-md">
        <div class="relative w-full h-32 flex items-center justify-center
                bg-gray-100 dark:bg-teal-500 rounded-lg cursor-pointer
                border-2 border-dashed border-gray-400 dark:border-gray-300 hover:border-blue-400
                transition duration-150 ease-in-out">
            <input
                type="file"
                :id="id"
                :name="name"
                @change="handleChange"
                ref="inputRef"
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
        <img v-if="imagePreview"
             :src="imagePreview"
             :alt="altText"
             :title="titleText"
             class="mt-3 p-1 shadow-lg w-full h-auto rounded-lg border">
    </div>
</template>
