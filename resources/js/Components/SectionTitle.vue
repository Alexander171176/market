<template>
    <div class="md:col-span-1 flex justify-between">
        <div class="px-4 sm:px-0">
            <h3 class="text-md font-medium text-blue-700 dark:text-blue-500">
                <slot name="title" />
            </h3>

            <p class="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <slot name="description" />
            </p>
        </div>

        <div class="px-4 sm:px-0">
            <slot name="aside" />
        </div>
    </div>
</template>
