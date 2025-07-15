<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineEmits(['close']);
</script>

<template>
    <button type="button" @click="$emit('close')"
            class="flex items-center
                   btn mb-3 px-3 py-0.5
                   bg-violet-500 rounded-sm shadow-md
                   text-white text-sm font-semibold
                   transition-colors duration-300 ease-in-out
                   hover:bg-violet-600 focus:bg-violet-600 focus:outline-none">
        <svg class="w-6 h-6 fill-current text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        <span class="hidden xs:block ml-2">
          <slot>{{ t('cancel') }}</slot>
        </span>
    </button>
</template>
