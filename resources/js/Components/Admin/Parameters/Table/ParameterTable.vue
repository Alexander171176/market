<script setup>
import {defineProps, defineEmits, watch, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import draggable from 'vuedraggable';

import ActivityToggle from '@/Components/Admin/Buttons/ActivityToggle.vue';
import IconEdit from "@/Components/Admin/Buttons/IconEdit.vue";
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue';

const {t} = useI18n();

const props = defineProps({
    settings: Array,
    selectedSettings: Array,
});

const emits = defineEmits([
    'toggle-activity',
    'delete',
    'update-sort-order',
    'toggle-select',
    'toggle-all'
]);

const localSettings = ref([]);

watch(() => props.settings, (newVal) => {
    localSettings.value = JSON.parse(JSON.stringify(newVal || []));
}, {immediate: true, deep: true});

const handleDragEnd = () => {
    const newOrderIds = localSettings.value.map(setting => setting.id);
    emits('update-sort-order', newOrderIds);
};

const toggleAll = (event) => {
    const checked = event.target.checked;
    const ids = localSettings.value.map(p => p.id);
    emits('toggle-all', {ids, checked});
};
</script>

<template>
    <div class="bg-white dark:bg-slate-700 rounded-md shadow-md border">
        <div class="overflow-x-auto">
            <table v-if="settings.length" class="table-auto w-full text-sm">
                <thead class="text-sm uppercase
                               bg-slate-200 dark:bg-cyan-900
                               border border-solid border-gray-300 dark:border-gray-700">
                <tr>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                        <div class="font-medium text-center text-slate-800 dark:text-slate-200">
                            {{ t('id') }}
                        </div>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                        :title="t('parameter')">
                        <svg class="shrink-0 h-5 w-5" viewBox="0 0 24 24">
                            <path class="fill-current text-blue-600" d="M10,7H2A1,1,0,0,1,1,6V2A1,1,0,0,1,2,1h8a1,1,0,0,1,1,1V6A1,1,0,0,1,10,7Z"></path>
                            <path class="fill-current text-blue-600" d="M10,23H2a1,1,0,0,1-1-1V18a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1v4A1,1,0,0,1,10,23Z"></path>
                            <rect class="fill-current text-sky-500" x="5" y="8" width="2" height="8"></rect>
                            <path class="fill-current text-sky-500" d="M19,7H17V5H12V3h6a1,1,0,0,1,1,1Z"></path>
                            <path class="fill-current text-sky-500" d="M18,21H12V19h5V17h2v3A1,1,0,0,1,18,21Z"></path>
                            <path class="fill-current text-violet-500" d="M18,16a1,1,0,0,1-.515-.143l-5-3a1,1,0,0,1,0-1.714l5-3a1,1,0,0,1,1.03,0l5,3a1,1,0,0,1,0,1.714l-5,3A1,1,0,0,1,18,16Z"></path>
                        </svg>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                        :title="t('value')">
                        <svg class="shrink-0 h-5 w-5" viewBox="0 0 24 24">
                            <path class="fill-current text-sky-500" d="M23.57,10.005l-2.907-.415c-.197-.71-.476-1.385-.831-2.014l1.76-2.348c.148-.199,.129-.478-.047-.653l-2.121-2.121c-.176-.176-.456-.194-.653-.047l-2.348,1.76c-.628-.356-1.303-.634-2.014-.831l-.415-2.907c-.035-.247-.246-.43-.495-.43h-3c-.249,0-.46,.183-.495,.43l-.415,2.907c-.71,.197-1.385,.476-2.014,.831l-2.348-1.76c-.197-.147-.478-.129-.653,.047l-2.121,2.121c-.176,.176-.195,.454-.047,.653l1.76,2.348c-.356,.628-.634,1.303-.831,2.014l-2.907,.415c-.247,.035-.43,.246-.43,.495v3c0,.249,.183,.46,.43,.495l2.907,.415c.197,.71,.476,1.385,.831,2.014l-1.76,2.348c-.148,.199-.129,.478,.047,.653l2.121,2.121c.097,.097,.225,.146,.354,.146,.105,0,.211-.033,.3-.1l2.348-1.76c.628,.356,1.303,.634,2.014,.831l.415,2.907c.035,.247,.246,.43,.495,.43h3c.249,0,.46-.183,.495-.43l.415-2.907c.71-.197,1.385-.476,2.014-.831l2.348,1.76c.089,.066,.194,.1,.3,.1,.129,0,.257-.05,.354-.146l2.121-2.121c.176-.176,.195-.454,.047-.653l-1.76-2.348c.356-.628,.634-1.303,.831-2.014l2.907-.415c.247-.035,.43-.246,.43-.495v-3c0-.249-.183-.46-.43-.495Zm-11.57,5.995c-2.209,0-4-1.791-4-4s1.791-4,4-4,4,1.791,4,4-1.791,4-4,4Z" fill="#212121"></path>
                        </svg>
                    </th>
                    <th class="flex justify-center px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
                        :title="t('category')">
                        <svg class="shrink-0 h-5 w-5" viewBox="0 0 24 24">
                            <path class="fill-current text-blue-600" d="M23.746,16.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z" fill="#212121"></path>
                            <path class="fill-current text-blue-600" d="M23.746,11.564l-1.62-.915-8.9,5.028a2.5,2.5,0,0,1-2.459,0l-8.9-5.029-1.62.915a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z" fill="#212121"></path>
                            <path class="fill-current text-sky-500" d="M23.746,6.564l-11.5-6.5a.507.507,0,0,0-.492,0l-11.5,6.5a.5.5,0,0,0,0,.872l11.5,6.5a.5.5,0,0,0,.492,0l11.5-6.5a.5.5,0,0,0,0-.872Z" fill="#212121"></path>
                        </svg>
                    </th>
                    <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                        <div class="font-medium text-center">{{ t('actions') }}</div>
                    </th>
                    <th>
                        <input type="checkbox" @change="toggleAll"/>
                    </th>
                </tr>
                </thead>
                <draggable tag="tbody" v-model="localSettings" @end="handleDragEnd" itemKey="id">
                    <template #item="{ element: setting }">
                        <tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800">
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center text-slate-800 dark:text-slate-200">
                                    {{ setting.id }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left text-sm font-semibold text-orange-400 dark:text-orange-200"
                                            :title="setting.type">
                                    {{ setting.option }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-left text-sm font-semibold text-teal-500 dark:text-teal-200">
                                    {{ setting.value }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="text-center py-0.5 px-2 badge bg-blue-500 rounded-sm text-xs text-slate-100"
                                     :title="setting.description">
                                    {{ setting.category }}
                                </div>
                            </td>
                            <td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap">
                                <div class="flex justify-center space-x-2">
                                <ActivityToggle :isActive="setting.activity"
                                                @toggle-activity="$emit('toggle-activity', setting)"/>
                                <IconEdit :href="route('admin.parameters.edit', setting.id)"/>
                                <DeleteIconButton @delete="$emit('delete', setting.id)"/>
                                </div>
                            </td>
                            <td>
                                <input type="checkbox" :checked="selectedSettings.includes(setting.id)"
                                       @change="$emit('toggle-select', setting.id)"/>
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
