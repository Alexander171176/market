<script setup>
import {defineProps, defineEmits} from 'vue';
import {useI18n} from 'vue-i18n';

const props = defineProps({
    handleBulkAction: Function
});

const emits = defineEmits(['change']);

const {t} = useI18n();
</script>

<template>
    <div class="flex flex-col sm:flex-row items-center">
        <label class="block mb-2 sm:mb-0 sm:mr-2 font-semibold
                      text-sm text-slate-700 dark:text-slate-500">
            {{ t('bulkActions') }}
        </label>
        <select class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200
                       text-gray-600 dark:text-gray-900
                       border border-slate-400 dark:border-slate-600
                       rounded-sm shadow-sm"
                @change="$emit('change', $event)">
            <option value="" disabled selected>{{ t('selectAction') }}</option>
            <option value="selectAll">{{ t('selectAll') }}</option>
            <option value="deselectAll">{{ t('deselectAll') }}</option>
            <option value="activate">{{ t('activate') }}</option>
            <option value="deactivate">{{ t('deactivate') }}</option>
            <option value="left">{{ t('left') }}</option>
            <option value="noLeft">{{ t('noLeft') }}</option>
            <option value="main">{{ t('main') }}</option>
            <option value="noMain">{{ t('noMain') }}</option>
            <option value="right">{{ t('right') }}</option>
            <option value="noRight">{{ t('noRight') }}</option>
            <option value="delete">{{ t('deleteSelected') }}</option>
        </select>
    </div>
</template>
