<script setup>
/**
 * @version PulsarCMS 1.0
 * @author
 */
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useForm } from '@inertiajs/vue3'
import { watch } from 'vue'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import TitlePage from '@/Components/Admin/Headlines/TitlePage.vue'
import DefaultButton from '@/Components/Admin/Buttons/DefaultButton.vue'
import LabelInput from '@/Components/Admin/Input/LabelInput.vue'
import InputText from '@/Components/Admin/Input/InputText.vue'
import InputError from '@/Components/Admin/Input/InputError.vue'
import PrimaryButton from '@/Components/Admin/Buttons/PrimaryButton.vue'
import LabelCheckbox from '@/Components/Admin/Checkbox/LabelCheckbox.vue'
import ActivityCheckbox from '@/Components/Admin/Checkbox/ActivityCheckbox.vue'
import InputNumber from '@/Components/Admin/Input/InputNumber.vue'
import ThousandsSeparatorSelect from '@/Components/Admin/Currency/Select/ThousandsSeparatorSelect.vue'
import DecimalSeparatorSelect from '@/Components/Admin/Currency/Select/DecimalSeparatorSelect.vue'

const toast = useToast()
const { t } = useI18n()

/**
 * Форма: используем токены, чтобы избежать TrimStrings-проблемы.
 */
const form = useForm({
    sort: '0',
    name: '',
    code: '',
    symbol: '',
    precision: '2',
    symbol_first: false,
    thousands_sep: 'space', // токен!
    decimal_sep: 'comma',     // токен!
    activity: false,
})

/**
 * Автозащита: не позволяем одинаковые токены.
 * Если совпали — меняем decimal на альтернативу.
 */
watch(
    () => form.thousands_sep,
    (th) => {
        if (!th || !form.decimal_sep) return
        if (th === form.decimal_sep) {
            form.decimal_sep = th === 'dot' ? 'comma' : 'dot'
            toast.info('Десятичный разделитель изменён, чтобы не совпадать с разделителем тысяч.')
        }
    }
)

watch(
    () => form.decimal_sep,
    (dec) => {
        if (!dec || !form.thousands_sep) return
        if (dec === form.thousands_sep) {
            // Приоритет сохраняем за decimal, двигаем thousands
            form.thousands_sep = dec === 'dot' ? 'comma' : 'dot'
            toast.info('Разделитель тысяч изменён, чтобы не совпадать с десятичным.')
        }
    }
)

/**
 * submit: конвертируем токены в реальные символы ПЕРЕД отправкой.
 */
const submit = () => {
    form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
        symbol_first: data.symbol_first ? 1 : 0,
    }))

    form.post(route('admin.currencies.store'), {
        errorBag: 'createCurrency',
        preserveScroll: true,
        onSuccess: () => toast.success('Валюта успешно создана!'),
        onError: (errors) => {
            console.error('Не удалось отправить форму:', errors)
            const firstError = errors[Object.keys(errors)[0]]
            toast.error(firstError || 'Проверьте правильность заполнения полей.')
        },
    })
}
</script>

<template>
    <AdminLayout :title="t('createCurrency')">
        <template #header>
            <TitlePage>
                {{ t('createCurrency') }}
            </TitlePage>
        </template>
        <div class="px-2 py-2 w-full max-w-12xl mx-auto">
            <div class="p-4 bg-slate-50 dark:bg-slate-700
                        border border-blue-400 dark:border-blue-200
                        overflow-hidden shadow-md shadow-gray-500 dark:shadow-slate-400
                        bg-opacity-95 dark:bg-opacity-95">
                <div class="sm:flex sm:justify-between sm:items-center mb-2">
                    <!-- Кнопка назад -->
                    <DefaultButton :href="route('admin.currencies.index')">
                        <template #icon>
                            <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                                 viewBox="0 0 16 16">
                                <path
                                    d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                            </svg>
                        </template>
                        {{ t('back') }}
                    </DefaultButton>

                    <!-- Right: Actions -->
                    <div class="grid grid-flow-col sm:auto-cols-max
                                justify-start sm:justify-end gap-2">
                        <!-- Datepicker built with flatpickr -->
                    </div>
                </div>
                <form @submit.prevent="submit" class="p-3 w-full">

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Активность -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.activity" />
                            <LabelCheckbox for="activity" :text="t('activity')"
                                           class="text-sm h-8 flex items-center" />
                        </div>

                        <!-- Сортировка -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="sort" :value="t('sort')" class="text-sm" />
                            </div>
                            <InputNumber
                                id="sort"
                                type="number"
                                v-model="form.sort"
                                autocomplete="sort"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.sort" />
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4">

                        <!-- Наименование валюты -->
                        <div class="mb-3 flex flex-col items-start w-full lg:w-1/3">
                            <div class="flex justify-between w-full">
                                <LabelInput for="name">
                                    <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                                    {{ t('name') }}
                                </LabelInput>
                                <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                    {{ form.name.length }} / 100 {{ t('characters') }}
                                </div>
                            </div>
                            <InputText
                                id="name"
                                type="text"
                                v-model="form.name"
                                maxlength="100"
                                required
                                autocomplete="name"
                            />
                            <InputError class="mt-2" :message="form.errors.name" />
                        </div>

                        <!-- Код валюты -->
                        <div class="mb-3 flex flex-col items-start w-full lg:w-1/3">
                            <div class="flex justify-between w-full">
                                <LabelInput for="code">
                                    <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                                    {{ t('code') }}
                                </LabelInput>
                                <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                    {{ form.name.length }} / 3 {{ t('characters') }}
                                </div>
                            </div>
                            <InputText
                                id="name"
                                type="text"
                                v-model="form.code"
                                maxlength="3"
                                required
                                autocomplete="code"
                            />
                            <InputError class="mt-2" :message="form.errors.code" />
                        </div>

                        <!-- Символ валюты -->
                        <div class="mb-3 flex flex-col items-start w-full lg:w-1/3">
                            <div class="flex justify-between w-full">
                                <LabelInput for="symbol">
                                    <span class="text-red-500 dark:text-red-300 font-semibold">*</span>
                                    {{ t('symbol') }}
                                </LabelInput>
                                <div class="text-md text-gray-900 dark:text-gray-400 mt-1">
                                    {{ form.name.length }} / 1 {{ t('characters') }}
                                </div>
                            </div>
                            <InputText
                                id="name"
                                type="text"
                                v-model="form.symbol"
                                maxlength="1"
                                required
                                autocomplete="symbol"
                            />
                            <InputError class="mt-2" :message="form.errors.symbol" />
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col
                                lg:flex-row items-center gap-4">

                        <!-- Количество знаков после запятой -->
                        <div class="flex flex-row items-center gap-2">
                            <div class="h-8 flex items-center">
                                <LabelInput for="precision" :value="t('precision')" class="text-sm" />
                            </div>
                            <InputNumber
                                id="precision"
                                type="number"
                                v-model="form.precision"
                                autocomplete="precision"
                                class="w-full lg:w-28"
                            />
                            <InputError class="mt-2 lg:mt-0" :message="form.errors.precision" />
                        </div>

                        <!-- Символ валюты до или после числа -->
                        <div class="flex flex-row items-center gap-2">
                            <ActivityCheckbox v-model="form.symbol_first" />
                            <LabelCheckbox for="symbol_first" :text="t('symbolFirst')"
                                           class="text-sm h-8 flex items-center" />
                        </div>

                    </div>

                    <div class="mb-3 flex justify-between flex-col
                                lg:flex-row items-center gap-4">

                        <!-- Разделитель тысяч -->
                        <div class="w-full lg:w-1/2">
                            <ThousandsSeparatorSelect
                                v-model="form.thousands_sep"
                                :forbidden="form.decimal_sep"
                                :label="t('thousandsSeparator')"
                                id="thousands_sep"
                            />
                            <InputError class="mt-2" :message="form.errors.thousands_sep" />
                        </div>

                        <!-- Десятичный разделитель -->
                        <div class="w-full lg:w-1/2">
                            <DecimalSeparatorSelect
                                v-model="form.decimal_sep"
                                :forbidden="form.thousands_sep"
                                :label="t('decimalSeparator')"
                                id="decimal_sep"
                            />
                            <InputError class="mt-2" :message="form.errors.decimal_sep" />
                        </div>

                    </div>

                    <div class="flex items-center justify-center mt-4">
                        <DefaultButton :href="route('admin.currencies.index')" class="mb-3">
                            <template #icon>
                                <!-- SVG -->
                                <svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2"
                                     viewBox="0 0 16 16">
                                    <path
                                        d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"></path>
                                </svg>
                            </template>
                            {{ t('back') }}
                        </DefaultButton>
                        <PrimaryButton class="ms-4 mb-0" :class="{ 'opacity-25': form.processing }"
                                       :disabled="form.processing">
                            <template #icon>
                                <svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16">
                                    <path
                                        d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
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
