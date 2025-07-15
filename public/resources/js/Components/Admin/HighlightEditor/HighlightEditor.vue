<script setup>
import {ref, onMounted, watch} from 'vue';
import hljs from 'highlight.js';

const props = defineProps({
    modelValue: String,
});

// Локальная переменная для переключения темы подсветки кода
const isCodeDarkTheme = ref(false); // По умолчанию светлая тема

const codeContainer = ref(null);

// Функция для загрузки и переключения темы подсветки кода
const loadCodeTheme = async (theme) => {
    // Удаляем предыдущую тему, если она была
    const existingLink = document.getElementById('hljs-theme');
    if (existingLink) {
        document.head.removeChild(existingLink);
    }

    // Создаём новый link для нужной темы
    const link = document.createElement('link');
    link.id = 'hljs-theme';
    link.rel = 'stylesheet';
    link.href = theme;
    document.head.appendChild(link);
};

// Функция для переключения тем подсветки кода
watch(isCodeDarkTheme, async (newVal) => {
    const theme = newVal
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/monokai.min.css' // Тёмная тема
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github.min.css'; // Светлая тема
    await loadCodeTheme(theme);
    highlightCode();
});

// Функция для подсветки кода
const highlightCode = () => {
    if (codeContainer.value) {
        const codeBlock = codeContainer.value.querySelector('code');
        hljs.highlightElement(codeBlock);
    }
};

// Выполняем при монтировании компонента
onMounted(async () => {
    // Устанавливаем тему подсветки кода по умолчанию
    const initialTheme = isCodeDarkTheme.value
        ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/monokai.min.css'
        : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github.min.css';
    await loadCodeTheme(initialTheme);
    highlightCode(); // Подсвечиваем код
});

// Обновляем подсветку при изменении содержимого
watch(
    () => props.modelValue,
    () => {
        highlightCode();
    }
);
</script>

<template>
    <div>
        <!-- Переключатель тем в виде чекбокса -->
        <div  class="flex flex-col items-center mb-2">
            <input type="checkbox"
                   name="code-theme-switch"
                   id="code-theme-switch"
                   v-model="isCodeDarkTheme"
                   class="code-theme-switch sr-only"/>

            <label class="flex items-center justify-center
                      cursor-pointer
                      w-8 h-8
                      bg-slate-100 hover:bg-yellow-100
                      rounded-full border border-slate-200"
                   for="code-theme-switch">

                <!-- Иконка солнца для светлой темы -->
                <svg class="w-4 h-4"
                     v-if="!isCodeDarkTheme"
                     width="16" height="16"
                     xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-current text-slate-400"
                          d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"/>
                    <path class="fill-current text-slate-500"
                          d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"/>
                </svg>

                <!-- Иконка луны для тёмной темы -->
                <svg class="w-4 h-4"
                     v-if="isCodeDarkTheme"
                     width="16" height="16"
                     xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-current text-slate-400"
                          d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"/>
                    <path class="fill-current text-slate-500"
                          d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"/>
                </svg>

            </label>
        </div>

        <!-- Контейнер с кодом -->
        <div ref="codeContainer" class="highlight-editor">
            <pre><code class="language-javascript">{{ modelValue }}</code></pre>
        </div>
    </div>
</template>

<style scoped>
.highlight-editor {
    max-height: 100%;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>
