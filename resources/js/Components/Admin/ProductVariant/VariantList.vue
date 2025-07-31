<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import draggable from 'vuedraggable'
import ActivityToggle from '@/Components/Admin/Buttons/ActivityToggle.vue'

const { t } = useI18n()
const toast = useToast()

const props = defineProps({
    variants: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['edit', 'deleted', 'update-sort-order', 'toggle-activity'])

const localVariants = ref([])

watch(
    () => props.variants,
    (newVal) => {
        localVariants.value = JSON.parse(JSON.stringify(newVal || []))
    },
    { immediate: true, deep: true }
)

const confirmDelete = async (id) => {
    if (confirm('Вы уверены, что хотите удалить этот вариант?')) {
        try {
            await axios.delete(route('admin.product-variants.destroy', id))
            toast.success('Вариант успешно удален!')
            emit('deleted')
        } catch (error) {
            console.error('Ошибка удаления варианта:', error)
            toast.error('Не удалось удалить вариант.')
        }
    }
}

const handleDragEnd = () => {
    const newOrderIds = localVariants.value.map(variant => variant.id)
    emit('update-sort-order', newOrderIds)
}
</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm
                border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead
                    class="text-sm uppercase bg-slate-200 dark:bg-cyan-900
                           border border-solid border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="font-medium px-4 py-3 text-center w-px">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-4 h-4 fill-current text-slate-800 dark:text-slate-200"
                             height="24" width="24" viewBox="0 0 24 24">
                            <path d="M12.707,2.293a1,1,0,0,0-1.414,0l-5,5A1,1,0,0,0,7.707,8.707L12,4.414l4.293,4.293a1,1,0,0,0,1.414-1.414Z"></path><path d="M16.293,15.293,12,19.586,7.707,15.293a1,1,0,0,0-1.414,1.414l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,0,0-1.414-1.414Z"></path>
                        </svg>
                    </th>
                    <th class="flex justify-center px-4 py-3">
                        <svg class="w-6 h-6 fill-current shrink-0" viewBox="0 0 512 512">
                            <path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6l96 0 32 0 208 0c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path>
                        </svg>
                    </th>
                    <th class="font-medium px-4 py-3 text-center">ID</th>
                    <th class="font-medium px-4 py-3 text-left">{{ t('title') }}</th>
                    <th class="font-medium px-4 py-3 text-left">{{ t('sku') }}</th>
                    <th class="font-medium px-4 py-3 text-center">{{ t('quantity') }}</th>
                    <th class="font-medium px-4 py-3 text-center">{{ t('price') }}</th>
                    <th class="font-medium px-4 py-3 text-center">{{ t('actions') }}</th>
                </tr>
                </thead>
                <draggable
                    tag="tbody"
                    v-model="localVariants"
                    itemKey="id"
                    handle=".handle"
                    @end="handleDragEnd"
                >
                    <template #item="{ element: variant }">
                        <tr class="text-sm font-semibold border-b hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-4 py-2 text-center handle cursor-move">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-300"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7 4h2v2H7V4zm4 0h2v2h-2V4zM7 8h2v2H7V8zm4 0h2v2h-2V8zM7 12h2v2H7v-2zm4 0h2v2h-2v-2z" />
                                </svg>
                            </td>
                            <td class="px-4 py-2 text-center">
                                <!-- Условие: показываем изображение, только если оно есть -->
                                <div v-if="variant.images && variant.images.length > 0">
                                    <img
                                        :src="variant.images[0].webp_url || variant.images[0].url"
                                        :alt="variant.title"
                                        class="w-8 h-8 object-cover rounded-md mx-auto shadow-lg"
                                    >
                                </div>
                                <!-- Иначе показываем плейсхолдер -->
                                <div v-else class="w-8 h-8 flex items-center justify-center
                                                   bg-slate-100 dark:bg-slate-600
                                                   rounded-md mx-auto">
                                    <svg class="w-6 h-6 text-slate-400" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"></path></svg>
                                </div>
                            </td>
                            <td class="px-4 py-2 text-center">{{ variant.id }}</td>
                            <td class="px-4 py-2">{{ variant.title }}</td>
                            <td class="px-4 py-2">{{ variant.sku }}</td>
                            <td class="px-4 py-2 text-center">{{ variant.quantity }}</td>
                            <td class="px-4 py-2 text-center">{{ variant.price }} {{ variant.currency }}</td>
                            <td class="px-4 py-2">
                                <div class="flex justify-center space-x-2">
                                    <ActivityToggle
                                        :isActive="variant.activity"
                                        @toggle-activity="$emit('toggle-activity', variant)"
                                        :title="variant.activity ? t('enabled') : t('disabled')"
                                    />
                                    <button type="button"
                                            :title="t('edit')"
                                            class="flex items-center py-1 px-2 rounded
                                                   border border-slate-300 hover:border-sky-500
                                                   dark:border-sky-300 dark:hover:border-sky-100"
                                            @click="$emit('edit', variant)">
                                        <svg class="w-4 h-6 fill-current text-sky-500
                                                    hover:text-sky-700 dark:text-sky-300
                                                    dark:hover:text-sky-100 shrink-0"
                                             viewBox="0 0 16 16">
                                            <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/>
                                        </svg>
                                    </button>
                                    <button type="button"
                                            :title="t('delete')"
                                            class="flex items-center py-1 px-2 rounded
                                                   border border-slate-300 hover:border-rose-500
                                                   dark:border-rose-300 dark:hover:border-rose-100"
                                            @click="confirmDelete(variant.id)">
                                        <svg class="w-4 h-4 fill-current
                                                    text-rose-400
                                                    hover:text-rose-500
                                                    dark:text-red-300
                                                    dark:hover:text-red-100
                                                    shrink-0"
                                             viewBox="0 0 16 16">
                                            <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </template>
                </draggable>
            </table>
        </div>
    </div>
</template>
