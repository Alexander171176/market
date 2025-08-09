<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue'
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue'
import Modal from '@/Components/Admin/Modal/Modal.vue'
import InputText from '@/Components/Admin/Input/InputText.vue'
import InputNumber from '@/Components/Admin/Input/InputNumber.vue'
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue'
import LabelInput from '@/Components/Admin/Input/LabelInput.vue'
import InputError from '@/Components/Admin/Input/InputError.vue'
import EditIconButton from '@/Components/Admin/Buttons/EditIconButton.vue'
import DeleteIconButton from '@/Components/Admin/Buttons/DeleteIconButton.vue'
import { transliterate } from '@/utils/transliteration'

// --- Инициализация ---
const { t } = useI18n()
const toast = useToast()

const props = defineProps({
    properties: Array,
    groups: Array
})

// --- Состояние модальных окон ---
const showPropertyModal = ref(false)
const isEditingProperty = ref(false)

// --- Форма для Характеристики ---
const propertyForm = useForm({
    id: null,
    name: '',
    slug: '',
    sort: 0,
    activity: true,
    property_group_id: null,
    type: 'text',
    description: '',
    all_categories: true,
    is_filterable: true,
    filter_type: 'checkbox'
})

// --- Форма для Значения Характеристики ---
const valueForm = useForm({
    id: null,
    property_id: null,
    value: '',
    slug: '',
    sort: 0
})

const editingValueId = ref(null) // ID значения, которое сейчас редактируется

// --- Логика Slug ---
const generateSlug = () => {
    if (propertyForm.name) {
        propertyForm.slug = transliterate(propertyForm.name.toLowerCase())
    }
}

// --- Управление модальными окнами для ХАРАКТЕРИСТИК ---
const openCreatePropertyModal = () => {
    isEditingProperty.value = false
    propertyForm.reset()
    showPropertyModal.value = true
}

const openEditPropertyModal = (property) => {
    isEditingProperty.value = true
    propertyForm.id = property.id
    propertyForm.name = property.name
    propertyForm.slug = property.slug
    propertyForm.sort = property.sort
    propertyForm.activity = property.activity
    propertyForm.property_group_id = property.property_group_id
    propertyForm.type = property.type
    propertyForm.description = property.description
    propertyForm.all_categories = property.all_categories
    propertyForm.is_filterable = property.is_filterable
    propertyForm.filter_type = property.filter_type
    showPropertyModal.value = true
}

const closePropertyModal = () => {
    showPropertyModal.value = false
}

// --- CRUD для ХАРАКТЕРИСТИК ---
const submitPropertyForm = () => {
    const routeName = isEditingProperty.value ? 'admin.properties.update' : 'admin.properties.store'
    const params = isEditingProperty.value ? { property: propertyForm.id } : {}

    propertyForm.post(route(routeName, params), {
        preserveScroll: true,
        onSuccess: () => {
            closePropertyModal()
            toast.success(isEditingProperty.value ? t('updated_successfully') : t('created_successfully'))
        },
        onError: (errors) => {
            console.error(errors)
            toast.error(t('error_occurred'))
        }
    })
}

const deleteProperty = (propertyId) => {
    if (confirm(t('are_you_sure'))) {
        const form = useForm({})
        form.delete(route('admin.properties.destroy', { property: propertyId }), {
            preserveScroll: true,
            onSuccess: () => toast.success(t('deleted_successfully'))
        })
    }
}

// --- CRUD для ЗНАЧЕНИЙ ---
const startEditValue = (value) => {
    editingValueId.value = value.id
    valueForm.id = value.id
    valueForm.value = value.value
    valueForm.slug = value.slug
    valueForm.sort = value.sort
}

const cancelEditValue = () => {
    editingValueId.value = null
    valueForm.reset()
}

const submitValueForm = (propertyId) => {
    valueForm.property_id = propertyId

    if (editingValueId.value) { // Обновление
        valueForm.put(route('admin.properties.values.update', { property_value: editingValueId.value }), {
            preserveScroll: true,
            onSuccess: () => {
                cancelEditValue()
                toast.success(t('value_updated'))
            }
        })
    } else { // Создание
        valueForm.post(route('admin.properties.values.store', { property: propertyId }), {
            preserveScroll: true,
            onSuccess: () => {
                valueForm.reset('value', 'slug', 'sort')
                toast.success(t('value_added'))
            }
        })
    }
}

const deleteValue = (valueId) => {
    if (confirm(t('are_you_sure'))) {
        const form = useForm({})
        form.delete(route('admin.properties.values.destroy', { property_value: valueId }), {
            preserveScroll: true,
            onSuccess: () => toast.success(t('value_deleted'))
        })
    }
}
</script>

<template>
    <AdminLayout :title="t('properties')">
        <template #header>
            <TitlePage>{{ t('properties') }}</TitlePage>
        </template>

        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">

                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <PrimaryButton @click="openCreatePropertyModal">
                        {{ t('addProperty') }}
                    </PrimaryButton>
                </div>

                <div v-if="!props.properties.length"
                     class="text-center p-6 bg-white dark:bg-slate-800 rounded-md shadow">
                    {{ t('noData') }}
                </div>

                <div v-else class="space-y-6">
                    <!-- Карточка для каждой характеристики -->
                    <div v-for="property in props.properties"
                         :key="property.id"
                         class="bg-white dark:bg-slate-800 rounded-lg shadow-md
                            border border-gray-200 dark:border-slate-700">
                        <!-- Заголовок карточки характеристики -->
                        <div class="p-4 flex justify-between items-center
                                border-b dark:border-slate-600">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {{ property.name }}
                                    <span class="text-sm text-gray-500">
                                    ({{ property.type }})
                                </span></h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    SLUG: {{ property.slug }} | Группа: {{ property.group?.name || 'Без группы' }}
                                </p>
                            </div>
                            <div class="flex items-center space-x-2">
                            <span :class="property.activity ? 'text-green-500' : 'text-red-500'">
                                ●
                            </span>
                                <EditIconButton @click="openEditPropertyModal(property)" />
                                <DeleteIconButton @delete="deleteProperty(property.id)" />
                            </div>
                        </div>

                        <!-- Тело карточки: значения и форма добавления -->
                        <div class="p-4">
                            <h4 class="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                {{ t('propertyValue') }}:
                            </h4>
                            <!-- Список существующих значений -->
                            <ul v-if="property.values.length" class="space-y-2 mb-4">
                                <li v-for="value in property.values" :key="value.id"
                                    class="flex items-center justify-between p-2
                                       bg-gray-50 dark:bg-slate-700 rounded">
                                    <template v-if="editingValueId === value.id">
                                        <!-- Форма редактирования значения -->
                                        <form @submit.prevent="submitValueForm(property.id)"
                                              class="flex items-center gap-2 w-full">
                                            <InputText v-model="valueForm.value"
                                                       class="flex-grow" placeholder="Значение" />
                                            <InputText v-model="valueForm.slug"
                                                       class="w-32" placeholder="Slug (опц.)" />
                                            <InputNumber v-model="valueForm.sort"
                                                         class="w-20" placeholder="Сорт." />
                                            <PrimaryButton type="submit"
                                                           :disabled="valueForm.processing">
                                                ✓
                                            </PrimaryButton>
                                            <PrimaryButton type="button"
                                                           @click="cancelEditValue">
                                                ✗
                                            </PrimaryButton>
                                        </form>
                                    </template>
                                    <template v-else>
                                        <!-- Отображение значения -->
                                        <div class="flex-grow">
                                        <span class="font-medium">
                                            {{ value.value }}
                                        </span>
                                            <span v-if="value.slug"
                                                  class="text-xs text-gray-500 ml-2">
                                            ({{ value.slug }})
                                        </span>
                                        </div>
                                        <div class="flex items-center space-x-3">
                                        <span class="text-sm text-gray-400">
                                            Сорт: {{ value.sort }}
                                        </span>
                                            <EditIconButton @click="startEditValue(value)"
                                                            class="cursor-pointer" />
                                            <DeleteIconButton @delete="deleteValue(value.id)" />
                                        </div>
                                    </template>
                                </li>
                            </ul>
                            <p v-else class="text-sm text-gray-500 mb-4">{{ t('noValues') }}</p>

                            <!-- Форма добавления нового значения -->
                            <form @submit.prevent="submitValueForm(property.id)"
                                  class="mt-4 pt-4 border-t dark:border-slate-600">
                                <h5 class="font-semibold text-sm mb-2
                                       text-gray-700 dark:text-gray-300">
                                    {{ t('addNewValue') }}
                                </h5>
                                <div class="flex items-start gap-2">
                                    <div class="flex-grow">
                                        <InputText v-model="valueForm.value"
                                                   placeholder="Новое значение" class="w-full" />
                                        <InputError :message="valueForm.errors.value" />
                                    </div>
                                    <div class="w-32">
                                        <InputText v-model="valueForm.slug" placeholder="Slug" />
                                        <InputError :message="valueForm.errors.slug" />
                                    </div>
                                    <div class="w-20">
                                        <InputNumber v-model="valueForm.sort" placeholder="Сорт." />
                                        <InputError :message="valueForm.errors.sort" />
                                    </div>
                                    <PrimaryButton type="submit" :disabled="valueForm.processing">
                                        +
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Модальное окно для создания/редактирования Характеристики -->
        <Modal :show="showPropertyModal" @close="closePropertyModal" max-width="2xl">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {{ isEditingProperty ? t('editProperty') : t('createProperty') }}
                </h2>
                <form @submit.prevent="submitPropertyForm" class="mt-6 space-y-4">
                    <!-- Name and Slug -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <LabelInput :value="t('name')" :required="true" />
                            <InputText v-model="propertyForm.name"
                                       @input="generateSlug" class="w-full" />
                            <InputError :message="propertyForm.errors.name" />
                        </div>
                        <div>
                            <LabelInput :value="t('slug')" :required="true" />
                            <InputText v-model="propertyForm.slug" class="w-full" />
                            <InputError :message="propertyForm.errors.slug" />
                        </div>
                    </div>

                    <!-- Group and Type -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <LabelInput :value="t('group')" />
                            <select v-model="propertyForm.property_group_id"
                                    class="w-full block py-2 px-3
                                           border border-gray-300
                                           bg-white dark:bg-slate-800 rounded-md shadow-sm
                                           focus:outline-none
                                           focus:ring-indigo-500 focus:border-indigo-500
                                           sm:text-sm">
                                <option :value="null">{{ t('noGroup') }}</option>
                                <option v-for="group in props.groups" :key="group.id"
                                        :value="group.id">
                                    {{ group.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <LabelInput :value="t('type')" />
                            <select v-model="propertyForm.type"
                                    class="w-full block py-2 px-3
                                           border border-gray-300 bg-white dark:bg-slate-800
                                           rounded-md shadow-sm
                                           focus:outline-none focus:ring-indigo-500
                                           focus:border-indigo-500 sm:text-sm">
                                <option value="text">Текст</option>
                                <option value="number">Число</option>
                                <option value="checkbox">Чекбокс (множественный выбор)</option>
                                <option value="select">Селект (одиночный выбор)</option>
                                <option value="boolean">Да/Нет</option>
                            </select>
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <LabelInput :value="t('description')" />
                        <textarea v-model="propertyForm.description" rows="2"
                                  class="w-full border-gray-300 dark:border-slate-600
                                         dark:bg-slate-900 rounded-md shadow-sm"></textarea>
                    </div>

                    <!-- Checkboxes -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="flex items-center">
                            <ActivityCheckbox v-model="propertyForm.activity"
                                              id="prop_activity" />
                            <label for="prop_activity" class="ml-2">
                                {{ t('activity') }}
                            </label>
                        </div>
                        <div class="flex items-center">
                            <ActivityCheckbox v-model="propertyForm.all_categories"
                                              id="prop_all_cat" />
                            <label for="prop_all_cat" class="ml-2">
                                {{ t('forAllCategories') }}
                            </label>
                        </div>
                        <div class="flex items-center">
                            <ActivityCheckbox v-model="propertyForm.is_filterable"
                                              id="prop_filterable" />
                            <label for="prop_filterable" class="ml-2">
                                {{ t('useInFilters') }}
                            </label>
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <DefaultButton type="button"
                                       @click="closePropertyModal">
                            {{ t('cancel') }}
                        </DefaultButton>
                        <PrimaryButton class="ml-3"
                                       :disabled="propertyForm.processing">
                            {{ t('save') }}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>

    </AdminLayout>
</template>
