<script setup>
/**
 * @version PulsarCMS 1.0
 * Author: Александр Косолапов
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { transliterate } from '@/utils/transliteration'
import { useForm } from '@inertiajs/vue3'

import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue'
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue'
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue'
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue'
import MetaDescTextarea from '@/Components/Admin/Textarea/MetaDescTextarea.vue'
import InputNumber from '@/Components/Admin/Input/InputNumber.vue'
import LabelInput from '@/Components/Admin/Input/LabelInput.vue'
import InputText from '@/Components/Admin/Input/InputText.vue'
import InputError from '@/Components/Admin/Input/InputError.vue'
import SelectLocale from '@/Components/Admin/Select/SelectLocale.vue'
import TypeSelect from '@/Components/Admin/Property/Select/TypeSelect.vue'
import VueMultiselect from 'vue-multiselect'

const { t } = useI18n()
const toast = useToast()

/**
 * props:
 * - property: из PropertyResource (должен включать: group, values)
 * - propertyValues: список всех значений (PropertyValueResource[])
 * - groups: список всех групп (PropertyGroupResource[])
 */
const props = defineProps({
    property: { type: Object, required: true },
    propertyValues: { type: Array, default: () => [] },
    groups: { type: Array, default: () => [] },
})

/** найти объект группы среди options по id */
const selectedGroup = ref(
    props.property.group
        ? (props.groups.find(g => g.id === props.property.group.id) ?? null)
        : null
)

/** выбранные значения приводим к объектам из списка options по id */
const selectedValues = ref(
    Array.isArray(props.property.values)
        ? props.property.values
            .map(v => typeof v === 'object' ? v.id : v)
            .filter(Boolean)
            .map(id => props.propertyValues.find(o => o.id === id))
            .filter(Boolean)
        : []
)

/** форма */
const form = useForm({
    _method: 'PUT',
    sort: props.property.sort ?? 0,
    locale: props.property.locale ?? '',
    type: props.property.type ?? '',
    name: props.property.name ?? '',
    slug: props.property.slug ?? '',
    description: props.property.description ?? '',
    activity: Boolean(props.property.activity ?? false),
    is_filterable: Boolean(props.property.is_filterable ?? false),
    filter_type: props.property.filter_type ?? '',
    // эти поля мы не отправляем как есть, а собираем в transform
    property_group_id: null,
    values: [],
})

/** генерация slug */
const handleUrlInputFocus = () => {
    if (form.name && !form.slug) {
        form.slug = transliterate(form.name.toLowerCase())
    }
}

/** длина description (для счетчика) */
const descLength = computed(() => (form.description || '').length)

/** сабмит */
const submitForm = () => {
    form.transform((data) => {
        const valueIds = (selectedValues.value || [])
            .map(v => (typeof v === 'object' ? v.id : v))
            .filter(Boolean)

        return {
            ...data,
            activity: data.activity ? 1 : 0,
            is_filterable: data.is_filterable ? 1 : 0,
            property_group_id: selectedGroup.value ? selectedGroup.value.id : null,
            values: valueIds, // массив ID (под rules: 'values.* exists:property_values,id')
        }
    })

    // было form.post(..., { _method: 'PUT' })
    form.put(route('admin.properties.update', { property: props.property.id }), {
        errorBag: 'editProperty',
        preserveScroll: true,
        onSuccess: () => toast.success('Характеристика успешно обновлена!'),
        onError: () => toast.error('Проверьте корректность полей.'),
    })
}

</script>

<template>
    <AdminLayout :title="t('editProperty')">
        <template #header>
            <TitlePage>
                {{ t('editProperty') }}: {{ props.property.name }}
            </TitlePage>
        </template>

        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div
                class="p-4 bg-slate-50 dark:bg-slate-700
               border border-blue-400 dark:border-blue-200
               overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
               bg-opacity-95 dark:bg-opacity-95"
            >
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <DefaultButton :href="route('admin.properties.index')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"
                                />
                            </svg>
                        </template>
                        {{ t('back') }}
                    </DefaultButton>
                    <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
                </div>

                <form @submit.prevent="submitForm" class="p-3 w-full">
                    <!-- верхняя панель -->
                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">
                        <!-- Активность -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.activity" />
                            <LabelCheckbox for="activity" :text="t('activity')" class="text-sm h-8 flex items-center" />
                        </div>

                        <!-- Локализация -->
                        <div class="flex flex-row items-center gap-2 w-auto">
                            <SelectLocale v-model="form.locale" :errorMessage="form.errors.locale" />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.locale" />
                        </div>

                        <!-- Сортировка -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="sort" :value="t('sort')" class="text-sm" />
                            </div>
                            <InputNumber id="sort" type="number" v-model="form.sort" autocomplete="sort"
                                         class="w-full lg:w-28" />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.sort" />
                        </div>
                    </div>

                    <!-- тип / тип фильтра / is_filterable -->
                    <div class="flex items-center justify-between flex-col space-y-2 lg:flex-row">
                        <div class="flex flex-row items-center justify-center lg:gap-2">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                            <LabelInput for="type" :value="t('type')" class="mr-1" />
                            <TypeSelect v-model="form.type" :error="form.errors.type" class="w-full lg:w-64 mr-3" />
                        </div>

                        <div class="flex flex-row items-center justify-center lg:gap-2">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                            <LabelInput for="filter_type" :value="t('filterType')" class="mr-1" />
                            <TypeSelect v-model="form.filter_type" :error="form.errors.filter_type"
                                        class="w-full lg:w-64 mr-3" />
                        </div>

                        <div class="flex flex-row items-center lg:gap-2">
                            <ActivityCheckbox v-model="form.is_filterable" />
                            <LabelCheckbox for="is_filterable" :text="t('isFilterable')"
                                           class="text-sm h-8 flex items-center" />
                        </div>
                    </div>

                    <!-- группа -->
                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="property_group_id" :value="t('propertyGroups')" class="mb-1" />
                        <VueMultiselect
                            v-model="selectedGroup"
                            :options="groups"
                            :multiple="false"
                            :close-on-select="true"
                            :allow-empty="true"
                            :placeholder="t('select')"
                            label="name"
                            track-by="id"
                        />
                        <InputError class="mt-2" :message="form.errors.property_group_id" />
                    </div>

                    <!-- name -->
                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="name">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                            {{ t('name') }}
                        </LabelInput>
                        <InputText id="name" type="text" v-model="form.name" required autocomplete="name" />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <!-- slug -->
                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="slug">
                            <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                            {{ t('alias') }}
                        </LabelInput>
                        <InputText
                            id="slug"
                            type="text"
                            v-model="form.slug"
                            required
                            autocomplete="slug"
                            @focus="handleUrlInputFocus"
                        />
                        <InputError class="mt-2" :message="form.errors.slug" />
                    </div>

                    <!-- описание -->
                    <div class="mb-3 flex flex-col items-start">
                        <div class="flex justify-between w-full">
                            <LabelInput for="description" :value="t('description')" />
                            <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                {{ descLength }} / 255 {{ t('characters') }}
                            </div>
                        </div>
                        <MetaDescTextarea v-model="form.description" class="w-full" />
                        <InputError class="mt-2" :message="form.errors.description" />
                    </div>

                    <!-- значения many-to-many -->
                    <div class="mb-3 flex flex-col items-start">
                        <LabelInput for="values" :value="t('variants')" class="mb-1" />
                        <VueMultiselect
                            v-model="selectedValues"
                            :options="propertyValues"
                            :multiple="true"
                            :close-on-select="false"
                            :placeholder="t('select')"
                            label="name"
                            track-by="id"
                        />
                        <InputError class="mt-2" :message="form.errors.values" />
                        <InputError v-if="form.errors['values.0']" class="mt-1" :message="form.errors['values.0']" />
                    </div>

                    <div class="flex items-center justify-center mt-4">
                        <DefaultButton :href="route('admin.properties.index')" class="mb-3">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16">
                                    <path
                                        d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"
                                    />
                                </svg>
                            </template>
                            {{ t('back') }}
                        </DefaultButton>

                        <PrimaryButton class="ms-4 mb-0" :class="{ 'opacity-25': form.processing }"
                                       :disabled="form.processing">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
                                    <path
                                        d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                    />
                                </svg>
                            </template>
                            {{ t('save') }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>

<style src="../../../../css/vue-multiselect.min.css"></style>
