<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    // объект валюты из таблицы (ожидаем поля: id, is_default, activity, rate_vs_default, rate_at, rate_provider)
    currency: { type: Object, required: true },
    // текст подсказки для кнопки/инпута (опц.)
    placeholder: { type: String, default: '' },
    step: { type: String, default: '0.000001' },
    precision: { type: Number, default: 6 },
    min: { type: Number, default: 0.000001 },
});

const emit = defineEmits(['save']);

// локальное значение — ВСЕГДА инициализируем из текущего курса,
// для базовой — 1.0 (но будет disabled)
const local = ref('');

const initLocal = () => {
    if (props.currency.is_default) {
        local.value = '1.000000';
    } else if (props.currency.rate_vs_default !== null && props.currency.rate_vs_default !== undefined) {
        local.value = Number(props.currency.rate_vs_default).toFixed(props.precision);
    } else {
        // если курсов нет — пусто (пользователь введёт)
        local.value = '';
    }
};
initLocal();

// когда приходят новые props (после перерендера Inertia) — синхронизируем
watch(() => props.currency, () => initLocal(), { deep: true });

// валидация/состояния
const isBase = computed(() => !!props.currency.is_default);
const isDisabledInput = computed(() => isBase.value || !props.currency.activity);
const isValid = computed(() => {
    if (isBase.value) return false; // базовую не сохраняем
    const v = Number(local.value);
    return Number.isFinite(v) && v > 0;
});

// клик «Сохранить»
const save = () => {
    const num = Number(local.value);
    if (isBase.value || !Number.isFinite(num) || num <= 0) return;
    emit('save', { id: props.currency.id, value: num });
};
</script>

<template>
    <div class="flex items-center gap-2">
        <!-- инпут (всегда виден) -->
        <input
            type="number"
            v-model="local"
            :step="step"
            :min="min"
            :disabled="isDisabledInput"
            :placeholder="placeholder || 'Курс за 1 базовую'"
            :title="currency.rate_at ? new Date(currency.rate_at).toLocaleString() : ''"
            class="w-28 md:w-32 lg:w-36 px-2 py-1 rounded border
             border-slate-300 dark:border-slate-600
             bg-white dark:bg-slate-800
             text-slate-800 dark:text-slate-100
             focus:outline-none focus:ring-2 focus:ring-indigo-400
             disabled:opacity-60 disabled:cursor-not-allowed"
        />

        <!-- кнопка (всегда видна; у базовой дизейбл) -->
        <button
            type="button"
            class="inline-flex items-center gap-1 p-2 rounded text-white
             bg-emerald-500 hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-600
             disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!isValid || isBase"
            @click="save"
            :title="isBase ? 'Единица базовая валюты' : 'Сохранить курс'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.707,6.707,17.293,1.293A1,1,0,0,0,16.586,1H4A3,3,0,0,0,1,4V20a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V7.414A1,1,0,0,0,22.707,6.707ZM14.5,4h1a.5.5,0,0,1,.5.5v4a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5v-4A.5.5,0,0,1,14.5,4ZM19,12.5v6a.5.5,0,0,1-.5.5H5.5a.5.5,0,0,1-.5-.5v-6a.5.5,0,0,1,.5-.5h13A.5.5,0,0,1,19,12.5Z"></path>
            </svg>
        </button>

        <!-- провайдер/штамп -->
        <span v-if="currency.rate_provider" class="text-xs opacity-70">
      ({{ currency.rate_provider }})
    </span>
    </div>
</template>
