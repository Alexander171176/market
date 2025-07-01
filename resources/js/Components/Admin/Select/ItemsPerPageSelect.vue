<!-- resources/js/Components/Admin/Select/ItemsPerPageSelect.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    itemsPerPage: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(['update:itemsPerPage'])

const updateItemsPerPage = (event) => {
    emits('update:itemsPerPage', Number(event.target.value))
}
</script>

<template>
    <select :title="t('titleItemsPerPage')" :value="props.itemsPerPage" @change="updateItemsPerPage"
            class="w-20 sm:ml-4 px-3 py-0.5 form-select bg-white dark:bg-gray-200
                 text-gray-600 dark:text-gray-900
                 border border-slate-400 dark:border-slate-600
                 rounded-sm shadow-sm">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
    </select>
</template>
