<script setup>
import { ref } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue';
import HighlightEditor from "@/Components/Admin/HighlightEditor/HighlightEditor.vue"; // компонент редактора
import DirectoryStructure from '@/Components/Admin/Component/DirectoryStructure.vue';
import CodeMirrorEditor from "@/Components/Admin/CodeMirrorEditor/CodeMirrorEditor.vue"; // Импортируем новый компонент редактора

const { t } = useI18n();

const { props } = usePage();
const fileContents = ref(props.fileContents);
const selectedFile = ref('');
const selectedGroup = ref(Object.keys(fileContents.value)[0]);
const fileContent = ref('');
const errorMessage = ref('');

const selectFile = (fileName, group) => {
    selectedFile.value = fileName;
    selectedGroup.value = group;
    fileContent.value = fileContents.value[group][fileName];
    errorMessage.value = '';
};

const saveChanges = async () => {
    router.post(route('admin.components.save'), {
        fileName: selectedFile.value,
        fileContent: fileContent.value,
    });
    errorMessage.value = 'Не удалось сохранить изменения в файле';
    window.location.reload(); // Перезагрузка страницы после успешного сохранения
};
</script>

<template>
    <AdminLayout :title="t('componentEditorHeader')">
        <template #header>
            <TitlePage>
                {{ t('componentEditorHeader') }}
            </TitlePage>
        </template>
        <div class="bg-gray-100 dark:bg-slate-900 bg-opacity-90 dark:bg-opacity-90
                    px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto">
            <span class="mb-4 py-1 px-3
                        w-full
                        flex items-center justify-center
                        text-sm italic font-semibold text-rose-400
                        bg-amber-50 opacity-80 border border-rose-200">
                    {{ t('componentEditorWarning') }}
            </span>
            <!-- Tabs -->
            <ul class="flex items-center justify-center flex-row pb-4 px-4 text-sm overflow-x-auto flex-nowrap">
                <li v-for="tab in Object.keys(fileContents)" :key="tab" class="inline mr-1">
                    <a
                        href="#"
                        @click.prevent="selectedGroup = tab"
                        :class="{
                            'block px-3 py-1 rounded-t-md bg-blue-600 text-white border border-gray-300 whitespace-nowrap': selectedGroup === tab,
                            'block px-3 py-1 rounded-t-md bg-zinc-200 dark:bg-zinc-400 border border-zinc-500 text-black whitespace-nowrap': selectedGroup !== tab
                        }"
                    >
                        {{ tab }}
                    </a>
                </li>
            </ul>

            <!-- Links for the selected tab -->
            <div class="flex items-center justify-center flex-row flex-wrap pb-4">
                <div class="flex items-center overflow-x-auto">
                    <a
                        v-for="(content, fileName) in fileContents[selectedGroup]"
                        :key="fileName"
                        href="#"
                        @click.prevent="selectFile(fileName, selectedGroup)"
                        :class="{
                            'block mr-1 px-3 py-1 text-sm border border-gray-500 rounded-sm hover:text-rose-700 dark:hover:text-red-300 hover:bg-teal-400 dark:hover:bg-teal-700': true,
                            'bg-teal-600 text-white': selectedFile === fileName && selectedGroup === selectedGroup,
                            'bg-slate-200 text-black dark:border-slate-400 dark:bg-slate-600 dark:text-slate-100': selectedFile !== fileName || selectedGroup !== selectedGroup,
                        }"
                    >
                        {{ fileName }}
                    </a>
                </div>
            </div>

            <div v-if="selectedFile"
                 class="border border-gray-400 bg-slate-100 dark:bg-slate-200 overflow-hidden shadow-xl sm:rounded-lg p-4">
                <h2 class="mb-1 font-semibold text-gray-900">
                    <span class="text-sm text-blue-500">{{ t('editingFile') }}</span> {{ selectedFile }}
                </h2>
<!--                <HighlightEditor v-model="fileContent" class="w-full" />-->
                <CodeMirrorEditor v-model="fileContent" theme="dark"
                                  class="w-full h-auto" /> <!-- max-h-96 overflow-y-auto -->
                <div class="flex justify-end mt-2">
                    <button @click="saveChanges"
                            class="flex items-center
                       btn px-3 py-1
                       bg-teal-500
                       text-white text-md font-semibold
                       rounded-md shadow-md
                       transition-colors duration-300 ease-in-out
                       hover:bg-teal-600 focus:bg-teal-600 focus:outline-none">
                        <svg class="w-4 h-4 fill-current text-slate-100 mr-1" viewBox="0 0 16 16">
                            <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
                        </svg>
                        {{ t('save') }}
                    </button>
                </div>
                <div v-if="errorMessage" class="text-red-600 mt-2">
                    {{ errorMessage }}
                </div>
            </div>

<!--            <DirectoryStructure :fileContents="fileContents" />-->
        </div>
    </AdminLayout>
</template>

<style>
canvas {
    border: 1px solid #ccc;
    margin-top: 20px;
}
/* кастомные стили редактора для тёмного режима */
.ͼo {
    color: #F2F2F2;
    background-color: #2B2B2B;
}
.ͼo .cm-gutters {
    background-color: #111111;
    color: #FFFFFF;
}
.cm-line .ͼq {color: #98ACBF;}
.ͼo .cm-line .ͼf {color: #FF4747;}
.ͼo .cm-line .ͼb {color: #FFFF00;}
.ͼo .cm-line .ͼg {color: #24B87F;}
.ͼo .cm-line .ͼe {color: #FFC46B;}
.ͼo .cm-line .ͼm {color: #9F9F9E;}
.ͼo .cm-line .ͼc {color: #9775A6;}
.ͼo .cm-line .ͼv {color: #56b6c2;}
.ͼo .cm-line .ͼr {color: #61afef;}
.ͼo .cm-line .ͼd {color: #00CCFF;}
.ͼo .cm-line .ͼi {color: #99CC00;}
</style>
