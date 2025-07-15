<script setup>
import {ref, watch, onMounted, onBeforeUnmount, nextTick} from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    modelValue: String,
    height: {type: Number, default: 300}
});
const emit = defineEmits(['update:modelValue']);

const editorId = `editor-${Math.random().toString(36).substr(2, 9)}`;
const isDarkTheme = ref(document.documentElement.classList.contains('dark')); // Начальное значение темы
const editorInstance = ref(null); // Экземпляр редактора
const isInitialized = ref(false); // Флаг, что редактор инициализирован

// Хелпер для применения высоты
const applyContainerHeight = (heightValue) => {
    // Используем requestAnimationFrame для ожидания отрисовки после init
    requestAnimationFrame(() => {
        if (editorInstance.value && editorInstance.value.getContainer()) {
            const container = editorInstance.value.getContainer();
            if (container && heightValue) {
                // console.log(`Applying height: ${heightValue}px`);
                container.style.height = `${heightValue}px`;
                container.style.minHeight = `${heightValue}px`; // Установим и minHeight
            }
        } else {
            // Попробуем еще раз через короткий таймаут, если контейнер еще не готов
            // setTimeout(() => applyContainerHeight(heightValue), 50);
            // console.warn("ApplyContainerHeight: Editor instance or container not ready yet.");
        }
    });
};

// Функция для получения конфига редактора
const getEditorConfig = () => ({
    selector: `#${editorId}`,
    min_height: props.height, // Используем как min_height для области текста
    resize: false, // Запрещаем ресайз пользователем (autoresize сделает свое дело)
    menubar: true,
    plugins: `accordion advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount`,
    toolbar: `undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | link image media | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code preview fullscreen`,
    skin_url: isDarkTheme.value ? '/tinymce/skins/ui/oxide-dark' : '/tinymce/skins/ui/oxide',
    content_css: isDarkTheme.value ? '/tinymce/skins/content/dark/content.min.css' : '/tinymce/skins/content/default/content.min.css',
    language_url: '/tinymce/langs/ru.js',
    language: 'ru',
    branding: false,
    license_key: 'gpl',
    setup(editor) {
        editorInstance.value = editor; // Сохраняем экземпляр

        editor.on('init', (e) => {
            // console.log('TinyMCE init event');
            isInitialized.value = true; // Устанавливаем флаг инициализации
            // Устанавливаем НАЧАЛЬНЫЙ контент
            editor.setContent(props.modelValue || '');
            // Устанавливаем НАЧАЛЬНУЮ высоту контейнера
            applyContainerHeight(props.height);
        });

        editor.on('change input', () => { // Используем change и input
            const newContent = editor.getContent();
            // Эмитим событие, только если контент реально изменился
            if (props.modelValue !== newContent) {
                emit('update:modelValue', newContent);
            }
        });

        editor.on('blur', () => { // Дополнительная синхронизация при потере фокуса
            const newContent = editor.getContent();
            if (props.modelValue !== newContent) {
                emit('update:modelValue', newContent);
            }
        });
    }
});

// Инициализация редактора
const initEditor = () => {
    // console.log('Attempting to init editor...');
    // Проверяем, что TinyMCE загружен
    if (!window.tinymce) {
        // console.error('TinyMCE is not loaded!');
        return;
    }

    // Удаляем предыдущий экземпляр, если он есть
    const existingEditor = window.tinymce.get(editorId);
    if (existingEditor) {
        // console.log('Destroying existing editor instance.');
        existingEditor.destroy();
        editorInstance.value = null;
        isInitialized.value = false;
    }

    // Инициализируем новый
    // console.log('Initializing new TinyMCE instance.');
    window.tinymce.init(getEditorConfig());
};

// Переключатель темы
const toggleTheme = () => {
    // Получаем текущий контент ПЕРЕД уничтожением
    // Пытаемся получить из экземпляра, если он есть, иначе из пропса
    const currentContent = editorInstance.value ? editorInstance.value.getContent() : props.modelValue;
    // console.log('Toggling theme, current content to restore:', currentContent);

    isDarkTheme.value = !isDarkTheme.value;
    // Пересоздаем редактор с новой темой
    initEditor();

    // Восстанавливаем контент после небольшой задержки (нужно дождаться init)
    // Используем setTimeout, чтобы гарантировать выполнение ПОСЛЕ возможного асинхронного init
    setTimeout(() => {
        // --- ИСПРАВЛЕННАЯ ПРОВЕРКА ---
        // Проверяем, что НОВЫЙ экземпляр редактора создан и НАШ флаг isInitialized установлен в true
        if (editorInstance.value && isInitialized.value) {
            // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
            // console.log('Restoring content after theme toggle');
            // Убедимся, что контент отличается перед установкой
            if (editorInstance.value.getContent() !== (currentContent || '')) {
                editorInstance.value.setContent(currentContent || '');
            } else {
                // console.log('Content already matches, no need to restore.');
            }
        } else {
            // console.warn('Editor not ready (or not initialized flag set) to restore content after theme toggle');
        }
    }, 150); // Увеличим задержку на всякий случай
};

// Следим за изменением modelValue из родителя
watch(() => props.modelValue, (newValue, oldValue) => {
    // Обновляем контент в редакторе, только если он инициализирован и значение действительно изменилось
    if (editorInstance.value && isInitialized.value && newValue !== oldValue && editorInstance.value.getContent() !== newValue) {
        // console.log('External modelValue changed, updating editor content.');
        editorInstance.value.setContent(newValue || '');
    }
});

// Следим за изменением высоты из родителя
watch(() => props.height, (newHeight) => {
    // console.log('External height changed, applying new height.');
    // Просто применяем новую высоту к контейнеру, НЕ переинициализируем
    if (isInitialized.value) { // Применяем только если редактор уже есть
        applyContainerHeight(newHeight);
    }
});

// --- MutationObserver для системной темы ---
let observer = null;
const checkSystemTheme = () => {
    const systemIsDark = document.documentElement.classList.contains('dark');
    if (systemIsDark !== isDarkTheme.value) {
        // console.log('System theme changed, toggling editor theme.');
        toggleTheme(); // Переключаем тему редактора при смене системной
    }
};

// Инициализация при монтировании
onMounted(() => {
    initEditor(); // Инициализируем редактор
    // Наблюдаем за изменением темы ОС/страницы
    observer = new MutationObserver(checkSystemTheme);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
});

// Уничтожение редактора и наблюдателя при размонтировании
onBeforeUnmount(() => {
    // console.log('Component unmounting, destroying editor and observer.');
    const editor = window.tinymce?.get(editorId);
    if (editor) {
        editor.destroy();
        editorInstance.value = null;
    }
    if (observer) {
        observer.disconnect();
    }
});
</script>

<template>
    <div class="flex flex-row justify-between items-start"> <!-- Добавил items-start для выравнивания, если нужно -->
        <!-- Текстовое поле редактора -->
        <div class="flex-grow"> <!-- Обертка, чтобы текстовое поле занимало доступное место -->
            <textarea :id="editorId" :value="props.modelValue"></textarea>
        </div>

        <!-- Кнопка переключения темы -->
        <button
            type="button"
        @click="toggleTheme"
        :title="t('changeEditorTheme')"
        class="flex items-center justify-center
        ml-2 w-6 h-6 flex-shrink-0 rounded-full <!-- flex-shrink-0 чтобы кнопка не сжималась -->
        bg-slate-100 dark:bg-slate-900 hover:bg-yellow-100 dark:hover:bg-slate-600/80
        transition-colors">
        <!-- SVG иконки -->
        <svg v-if="!isDarkTheme"
             xmlns="http://www.w3.org/2000/svg"
             class="w-4 h-4" width="16" height="16">
            <path class="fill-current text-red-400 dark:text-yellow-200"
                  d="M7 0h2v2H7V0Zm5.88 1.637 1.414 1.415-1.415 1.413-1.414-1.414 1.415-1.414ZM14 7h2v2h-2V7Zm-1.05 7.433-1.415-1.414 1.414-1.414 1.415 1.413-1.414 1.415ZM7 14h2v2H7v-2Zm-4.02.363L1.566 12.95l1.415-1.414 1.414 1.415-1.415 1.413ZM0 7h2v2H0V7Zm3.05-5.293L4.465 3.12 3.05 4.535 1.636 3.121 3.05 1.707Z"/>
            <path class="fill-current text-red-400 dark:text-yellow-200"
                  d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"/>
        </svg>
        <svg v-else
             xmlns="http://www.w3.org/2000/svg"
             class="w-4 h-4" width="16" height="16">
            <path class="fill-current text-slate-900 dark:text-white"
                  d="M6.2 2C3.2 2.8 1 5.6 1 8.9 1 12.8 4.2 16 8.1 16c3.3 0 6-2.2 6.9-5.2C9.7 12.2 4.8 7.3 6.2 2Z"/>
            <path class="fill-current text-slate-900 dark:text-white"
                  d="M12.5 6a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 6Z"/>
        </svg>
        </button>
    </div>
</template>
