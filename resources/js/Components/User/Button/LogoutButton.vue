<script setup>

import {Link} from "@inertiajs/vue3";

defineProps({
    href: String,
    as: String
})
</script>

<template>
    <div>
        <button type="submit"
                class="btn px-3 pb-0.5
                       text-sm font-semibold
                       text-slate-900 hover:text-orange-500
                       dark:text-slate-100 dark:hover:text-yellow-200
                       focus:outline focus:outline-2 focus:rounded-sm
                       focus:outline-orange-500 dark:focus:outline-yellow-200">
            <slot/>
        </button>
    </div>
</template>
