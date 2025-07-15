<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from '@/Components/Admin/Input/InputText.vue';
import LabelInput from '@/Components/Admin/Input/LabelInput.vue';

const { t } = useI18n();

const props = defineProps({
    modelValue: { // Тип источника: 'youtube', 'vimeo', 'local', 'code'
        type: String,
        required: true
    },
    videoUrl: { // Для local и code – URL, если вводится вручную
        type: String,
        default: ''
    },
    externalVideoId: { // Для youtube/vimeo (ввод ссылки)
        type: String,
        default: ''
    },
    videoFile: { // Новый проп для файла локального видео
        type: Object,
        default: null
    },
    embedCode: { type: String, default: '' },
});

const emit = defineEmits([
    'update:modelValue',
    'update:videoUrl',
    'update:externalVideoId',
    'update:videoFile',
    'update:embedCode',
]);

// Функции для извлечения ID из ссылки YouTube/Vimeo
const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const extractVimeoId = (url) => {
    const regex = /vimeo\.com\/(?:video\/)?(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const embedUrl = computed(() => {
    if (!props.externalVideoId) return '';
    if (props.modelValue === 'youtube') {
        const id = extractYouTubeId(props.externalVideoId);
        return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    if (props.modelValue === 'vimeo') {
        const id = extractVimeoId(props.externalVideoId);
        return id ? `https://player.vimeo.com/video/${id}` : '';
    }
    return '';
});

// Обработчик загрузки файла для локального видео
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Передаём объект File в videoFile, а не в videoUrl
    emit('update:videoFile', file);
};
</script>

<template>
    <!-- Блок для YouTube или Vimeo -->
    <div v-if="modelValue === 'youtube' || modelValue === 'vimeo'" class="w-full mb-3">
        <LabelInput for="external_video_url" :value="t('externalVideoId')"/>
        <InputText
            id="external_video_url"
            type="text"
            :modelValue="externalVideoId"
            @input="$emit('update:externalVideoId', $event.target.value)"
            autocomplete="external_video_url"
            :placeholder="t('videoLinkInsert')"
        />
        <div v-if="embedUrl" class="mt-2 text-sm text-green-700 dark:text-green-300">
            {{ embedUrl }}
        </div>
        <div v-if="embedUrl" class="relative pb-[56.25%] h-0 overflow-hidden bg-black mt-4">
            <iframe
                :src="embedUrl"
                class="absolute top-0 left-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"></iframe>
        </div>
    </div>

    <!-- Блок для local -->
    <div v-else-if="modelValue === 'local'" class="w-full mb-3">
        <div class="mb-3 flex flex-col">
            <LabelInput for="video_file" :value="t('uploadVideo')" />
            <input
                id="video_file"
                type="file"
                @change="handleFileUpload"
                class="bg-slate-100 dark:bg-slate-300 text-gray-900 dark:text-gray-700 px-3 py-0.5"
            />
        </div>
        <div class="mb-3 flex flex-col">
            <LabelInput for="video_url" :value="t('videoUrl')" />
            <InputText
                id="video_url"
                type="text"
                :modelValue="videoUrl"
                @input="$emit('update:videoUrl', $event.target.value)"
                autocomplete="video_url"
                placeholder="Введите URL локального видео (если требуется)"
            />
        </div>
        <div v-if="props.videoUrl" class="mt-2 flex justify-center">
            <video controls :src="props.videoUrl" class="max-w-full rounded-sm shadow" />
        </div>
    </div>

    <!-- Блок для code -->
    <div v-else-if="modelValue === 'code'" class="w-full mb-3">
        <div class="mb-3 flex flex-col">
            <LabelInput for="video_code" :value="t('videoCode')" />
            <textarea
                :value="embedCode"
                @input="$emit('update:embedCode', $event.target.value)"
                class="h-80 form-textarea …"
                :placeholder="t('videoCodeInsert')"
            ></textarea>
        </div>
    </div>

</template>
