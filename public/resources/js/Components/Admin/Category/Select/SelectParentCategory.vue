<script setup>
import LabelInput from "@/Components/Admin/Input/LabelInput.vue";
import InputError from "@/Components/Admin/Input/InputError.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    modelValue: [Number, null],
    options: {
        type: Array,
        default: () => [],
    },
    errorMessage: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: null,
    },
    nullable: {
        type: Boolean,
        default: true,
    }
});

const emit = defineEmits(['update:modelValue']);
const { t } = useI18n();
</script>

<template>
    <div class="flex flex-col items-start w-full mb-3">
        <LabelInput :for="'parent_id'" :value="label || t('parentCategory')" />

        <select
            id="parent_id"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value ? parseInt($event.target.value) : null)"
            class="block w-full py-0.5 border-slate-500 font-semibold text-md
                   focus:border-indigo-500 focus:ring-indigo-300 rounded-sm shadow-sm
                   dark:bg-cyan-800 dark:text-slate-100"
        >
            <option v-if="nullable" :value="null">{{ t('noParent') }}</option>
            <option
                v-for="option in options"
                :key="option.id"
                :value="option.id"
                :class="{
                    'bg-indigo-500 text-white': modelValue === option.id,
                    'bg-white text-black dark:bg-slate-700 dark:text-white': modelValue !== option.id
                }">

                {{ option.title }}
            </option>

        </select>

        <InputError class="mt-2" :message="errorMessage" />
    </div>
</template>
