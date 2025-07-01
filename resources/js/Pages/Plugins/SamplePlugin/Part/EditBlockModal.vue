<script setup>
import {ref, watch, defineProps, defineEmits} from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import CloseIconButton from './CloseIconButton.vue';
import LabelInput from './LabelInput.vue';
import InputText from './InputText.vue';
import DescriptionTextarea from './DescriptionTextarea.vue';
import CancelButton from './CancelButton.vue';
import PrimaryButton from './PrimaryButton.vue';
import LabelCheckbox from './LabelCheckbox.vue';
import ActivityCheckbox from './ActivityCheckbox.vue';
import InputNumber from './InputNumber.vue';

const { t } = useI18n();

// Define component props
const props = defineProps({
    block: {
        type: Object,
        default: () => ({})
    },
    show: {
        type: Boolean,
        required: true
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    pluginName: {
        type: String,
        required: true
    }
});

// Define emit event
const emit = defineEmits(['close', 'update']);

// Reactive state for block
const block = ref({...props.block});

// Watch for changes in block prop
watch(() => props.block, (newBlock) => {
    block.value = {...newBlock};
}, {immediate: true});

// Handle form submission
const submit = async () => {
    try {
        // Ensure pluginName is defined
        // if (!props.pluginName) {
        //     console.error('pluginName не задан');
        //     return;
        // }

        const endpoint = `/api/plugins/${props.pluginName}/blocks${props.isEdit ? `/${block.value.id}` : ''}`;
        const method = props.isEdit ? 'put' : 'post';

        await axios({method, url: endpoint, data: block.value});

        emit('update');
        emit('close');
    } catch (error) {
        // console.error('Ошибка при сохранении блока:', error.response ? error.response.data : error.message);
    }
};

// Close modal
const close = () => {
    emit('close');
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto custom-scrollbar">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="absolute w-full
                    max-w-screen-2xl max-h-screen overflow-y-auto
                    bg-white dark:bg-gray-800
                    p-4 rounded-lg shadow-lg z-10
                    custom-scrollbar">
            <CloseIconButton @close="emit('close')"/>
            <h2 class="text-center text-lg font-bold mb-2 text-gray-600 dark:text-slate-100 tracking-wide">
                {{ isEdit ? 'Редактировать блок' : 'Создать блок' }}
            </h2>
            <form @submit.prevent="submit" class="p-3 w-full">
                <div class="pb-12">

                    <div class="mb-3 flex items-center">
                        <div class="flex justify-between w-full">
                            <div class="flex flex-row items-center">
                                <ActivityCheckbox v-model="block.activity"/>
                                <LabelCheckbox for="activity" :text="t('activity')"/>
                            </div>
                        </div>
                        <div class="flex flex-row items-center">
                            <LabelInput for="sort" :value="t('sort')" class="mr-3"/>
                            <InputNumber
                                id="sort"
                                type="number"
                                v-model="block.sort"
                                autocomplete="sort"
                            />
                        </div>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="block.links" value="Ссылка блока"/>
                        <InputText
                            id="links"
                            type="text"
                            v-model="block.links"
                            autocomplete="links"
                        />
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="svg_blocks" value="SVG блока"/>
                        <DescriptionTextarea v-model="block.svg_blocks" class="w-full"/>
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="title" value="Текст заголовка"/>
                        <InputText
                            id="title"
                            type="text"
                            v-model="block.title"
                            autocomplete="links"
                        />
                    </div>

                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="paragraph" value="Текст параграфа"/>
                        <DescriptionTextarea v-model="block.paragraph" class="w-full"/>
                    </div>

                </div>
                <div class="fixed
                            bottom-0
                            left-1/2
                            transform -translate-x-1/2
                            bg-white dark:bg-gray-800
                            p-4
                            shadow-md
                            z-20
                            w-full max-w-screen-2xl">
                    <div class="flex justify-end">
                        <PrimaryButton type="submit">{{ isEdit ? 'Сохранить' : 'Создать' }}</PrimaryButton>
                        <CancelButton @click="emit('close')" class="ml-2"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
