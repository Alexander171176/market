<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    id: {
        type: String,
        default: 'activity'
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <input
        :id="id"
        type="checkbox"
        class="h-5 w-5
                text-cyan-600
                border-gray-500
                rounded
                focus:ring-cyan-500
                dark:bg-teal-500
                dark:border-slate-300
                dark:focus:ring-cyan-600
                dark:ring-offset-gray-800
                dark:focus:ring-offset-gray-800"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
</template>
