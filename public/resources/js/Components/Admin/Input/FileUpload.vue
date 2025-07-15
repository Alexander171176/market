<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
    accept: {
        type: String,
        default: 'image/*'
    },
    preview: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['input-filter']);

const fileInput = ref(null);

const handleChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            emits('input-filter', { file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
    }
};
</script>

<template>
    <div class="file-upload">
        <input
            type="file"
            :multiple="multiple"
            @change="handleChange"
            :accept="accept"
            :data-token="token"
            ref="fileInput"
        />
        <img v-if="preview" :src="preview" alt="Image preview" class="mt-3 p-1 shadow-lg w-full h-auto rounded-lg border" />
    </div>
</template>

<style scoped>
.file-upload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
