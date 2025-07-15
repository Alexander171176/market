<script setup>
import {ref, onMounted, watch} from 'vue';
import {EditorState} from '@codemirror/state';
import {EditorView, keymap, lineNumbers, highlightActiveLineGutter} from '@codemirror/view';
import {defaultKeymap, history, historyKeymap} from '@codemirror/commands';
import {foldGutter, foldKeymap, indentOnInput, syntaxHighlighting, defaultHighlightStyle} from '@codemirror/language';
import {javascript} from '@codemirror/lang-javascript';
import {oneDark} from '@codemirror/theme-one-dark';

const props = defineProps({
    modelValue: String,
    theme: { type: String, default: 'light' },
});

const emit = defineEmits(['update:modelValue']);

const editor = ref(null);
const isDarkTheme = ref(false); // const isDarkTheme = ref(props.theme === 'dark');

let editorView;

const buildExtensions = (darkTheme = false) => {
    const baseExtensions = [
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        foldGutter(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap]),
        javascript(),
        EditorView.theme({ ".cm-content": { "font-size": "16px" } }),
        EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                emit('update:modelValue', update.state.doc.toString());
            }
        }),
    ];
    if (darkTheme) baseExtensions.push(oneDark);
    return baseExtensions;
};

onMounted(() => {
    editorView = new EditorView({
        state: EditorState.create({
            doc: props.modelValue,
            extensions: buildExtensions(isDarkTheme.value),
        }),
        parent: editor.value,
    });
});

watch(() => props.modelValue, (newValue) => {
    if (editorView) {
        const currentValue = editorView.state.doc.toString();
        if (newValue !== currentValue) {
            editorView.dispatch({
                changes: { from: 0, to: currentValue.length, insert: newValue },
            });
        }
    }
});

watch(isDarkTheme, (newValue) => {
    if (editorView) {
        const newState = EditorState.create({
            doc: editorView.state.doc.toString(),
            extensions: buildExtensions(newValue),
        });
        editorView.setState(newState);
    }
});
</script>

<template>
    <div>
        <!-- Переключатель темы -->
        <div class="flex justify-center items-center mb-2">
            <input type="checkbox" id="theme-toggle" v-model="isDarkTheme" class="sr-only" />
            <label for="theme-toggle"
                   class="flex items-center justify-center
                          w-8 h-8 bg-slate-100 hover:bg-yellow-100 rounded-full
                          border border-slate-400 cursor-pointer">
                <!-- Солнце -->
                <svg v-if="!isDarkTheme" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-current text-slate-400"
                          d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"/>
                    <path class="fill-current text-slate-500"
                          d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"/>
                </svg>
                <!-- Луна -->
                <svg v-else class="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-current text-slate-400"
                          d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"/>
                    <path class="fill-current text-slate-500"
                          d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"/>
                </svg>
            </label>
        </div>
        <div ref="editor" class="code-editor"></div>
    </div>
</template>

<style scoped>
.code-editor {
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>
