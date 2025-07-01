<script setup>
import { Link } from '@inertiajs/vue3'
import {computed, defineProps} from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    href: {
        required: true
    },
    title: String
})

const buttonClass = computed(() => [
    'flex items-center py-1 px-2 rounded',
    'border border-slate-300',
    'hover:border-indigo-500',
    'dark:border-indigo-300 dark:hover:border-indigo-100'
]);
</script>

<template>
    <div class="text-center mr-1">
        <Link :href="href"
              :class="buttonClass"
              :title="t('view')">
            <svg class="w-6 h-6 fill-current shrink-0"
                 viewBox="0 0 24 24">
                <!-- Обновляем цвета через классы Tailwind -->
                <path d="M21.7 18.9L18.6 15.8C17.9 16.9 16.9 17.9 15.8 18.6L18.9 21.7C19.3 22.1 19.9 22.1 20.3 21.7L21.7 20.3C22.1 19.9 22.1 19.3 21.7 18.9Z"
                    class="text-indigo-900 dark:text-indigo-100"></path>
                <path opacity="0.3" d="M11 20C6 20 2 16 2 11C2 6 6 2 11 2C16 2 20 6 20 11C20 16 16 20 11 20ZM11 4C7.1 4 4 7.1 4 11C4 14.9 7.1 18 11 18C14.9 18 18 14.9 18 11C18 7.1 14.9 4 11 4ZM8 11C8 9.3 9.3 8 11 8C11.6 8 12 7.6 12 7C12 6.4 11.6 6 11 6C8.2 6 6 8.2 6 11C6 11.6 6.4 12 7 12C7.6 12 8 11.6 8 11Z"
                      class="text-indigo-700 dark:text-indigo-50"></path>
            </svg>
        </Link>
    </div>
</template>
