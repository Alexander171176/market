<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import draggable from 'vuedraggable'
import ActivityToggle from '@/Components/Admin/Buttons/ActivityToggle.vue'
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue'
import EditIconButton from '@/Components/Admin/Buttons/EditIconButton.vue'

const { t } = useI18n()

const props = defineProps({
    groups: Array,
    selectedGroups: Array
})

const emits = defineEmits([
    'delete',
    'toggle-activity',
    'toggle-select',
    'toggle-all',
    'update-sort-order'
])

const localGroups = ref([])

watch(() => props.groups, (newVal) => {
    localGroups.value = JSON.parse(JSON.stringify(newVal || []))
}, { immediate: true, deep: true })

const handleDragEnd = () => {
    const newOrderIds = localGroups.value.map(group => group.id)
    emits('update-sort-order', newOrderIds)
}

const toggleAll = (event) => {
    const checked = event.target.checked
    const ids = localGroups.value.map(r => r.id)
    emits('toggle-all', { ids, checked })
}
</script>

<template>
    <div class="bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative">
        <div class="overflow-x-auto">
            <table v-if="groups.length > 0" class="table-auto w-full text-slate-700 dark:text-slate-100">
                <thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="px-2 py-3 w-px"></th>
                    <th class="px-2 py-3 text-center">{{ t('id') }}</th>
                    <th class="px-2 py-3 text-left">{{ t('name') }}</th>
                    <th class="px-2 py-3 text-center">{{ t('propertiesCount') }}</th>
                    <th class="px-2 py-3 text-center">{{ t('sort') }}</th>
                    <th class="px-2 py-3 text-center">{{ t('actions') }}</th>
                    <th class="px-2 py-3 text-center">
                        <input type="checkbox" @change="toggleAll" />
                    </th>
                </tr>
                </thead>
                <draggable
                    tag="tbody"
                    v-model="localGroups"
                    @end="handleDragEnd"
                    itemKey="id"
                    handle=".handle"
                >
                    <template #item="{ element: group }">
                        <tr class="text-sm font-semibold border-b hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-2 py-2 text-center cursor-move handle">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7 4h2v2H7V4zm4 0h2v2h-2V4zM7 8h2v2H7V8zm4 0h2v2h-2V8zM7 12h2v2H7v-2zm4 0h2v2h-2v-2z" />
                                </svg>
                            </td>
                            <td class="px-2 py-2 text-center">{{ group.id }}</td>
                            <td class="px-2 py-2">{{ group.name }}</td>
                            <td class="px-2 py-2 text-center">{{ group.properties.length }}</td>
                            <td class="px-2 py-2 text-center">{{ group.sort }}</td>
                            <td class="px-2 py-2 text-center">
                                <div class="flex justify-center space-x-2">
                                    <ActivityToggle
                                        :isActive="group.activity"
                                        @toggle-activity="$emit('toggle-activity', group)"
                                        :title="group.activity ? t('enabled') : t('disabled')"
                                    />
                                    <EditIconButton
                                        :href="route('admin.property-groups.edit', group.id)" />
                                    <DeleteIconButton @delete="$emit('delete', group.id)" />
                                </div>
                            </td>
                            <td class="px-2 py-2 text-center">
                                <input type="checkbox" :checked="selectedGroups.includes(group.id)" @change="$emit('toggle-select', group.id)" />
                            </td>
                        </tr>
                    </template>
                </draggable>
            </table>
            <div v-else class="p-5 text-center text-slate-700 dark:text-slate-100">
                {{ t('noData') }}
            </div>
        </div>
    </div>
</template>
