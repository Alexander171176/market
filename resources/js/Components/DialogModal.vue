<script setup>
import Modal from './Modal.vue'

const emit = defineEmits(['close'])

defineProps({
    show: {
        type: Boolean,
        default: false
    },
    maxWidth: {
        type: String,
        default: '2xl'
    },
    closeable: {
        type: Boolean,
        default: true
    }
})

const close = () => {
    emit('close')
}
</script>

<template>
    <Modal :show="show" :max-width="maxWidth" :closeable="closeable" @close="close">
        <div class="px-6 py-4">
            <div class="text-xl font-medium text-gray-900">
                <slot name="title"/>
            </div>

            <div class="mt-4 font-semibold text-lg text-violet-600">
                <slot name="content"/>
            </div>
        </div>

        <div class="flex flex-row justify-end px-6 py-4 bg-gray-100 text-end">
            <slot name="footer"/>
        </div>
    </Modal>
</template>
