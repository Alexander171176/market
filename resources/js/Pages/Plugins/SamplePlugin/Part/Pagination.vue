<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    }
});

const emits = defineEmits(['update:currentPage']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
const pageInput = ref(props.currentPage);

const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        emits('update:currentPage', page);
        pageInput.value = page;
    }
};

const handlePageInput = () => {
    let page = Number(pageInput.value);
    if (page < 1) {
        page = 1;
    } else if (page > totalPages.value) {
        page = totalPages.value;
    }
    changePage(page);
    pageInput.value = page;
};
</script>

<template>
    <div class="w-full sm:w-fit flex justify-center items-center">
        <div class="flex flex-col sm:flex-row justify-center items-center px-2 py-1 bg-white dark:bg-slate-700">
            <button @click="changePage(props.currentPage - 1)"
                    :disabled="props.currentPage === 1"
                    class="btn font-semibold text-sm
                            bg-slate-50 dark:bg-slate-300
                            border border-green-500
                            text-teal-700
                            px-2 py-1 rounded
                            hover:text-rose-500
                            disabled:opacity-50 disabled:text-slate-400">
                {{ t('previous') }}
            </button>
            <span class="flex flex-row items-center font-semibold text-sm ml-2 mr-2 text-slate-700 dark:text-slate-100">
                <span class="hidden lg:block">{{ t('page') }}</span>
                <input type="number" v-model="pageInput" @change="handlePageInput" :disabled="totalPages === 1" min="1"
                       :max="totalPages"
                       class="w-16 mx-2 py-1 text-center
                              border border-slate-400 rounded
                              dark:bg-slate-300 dark:text-slate-700"/>
                <span class="text-blue-500 dark:text-rose-300">{{ t('of') }} {{ totalPages }}</span>
            </span>
            <button @click="changePage(props.currentPage + 1)"
                    :disabled="props.currentPage === totalPages"
                    class="btn font-semibold text-sm
                            bg-white dark:bg-slate-100
                            border border-green-500
                            text-teal-700
                            px-2 py-1 rounded
                            hover:text-rose-500
                            disabled:opacity-50 disabled:text-slate-400">
                {{ t('next') }}
            </button>
        </div>
    </div>
</template>
