<script setup>
import { useForm } from '@inertiajs/vue3'
import FormSection from '@/Components/FormSection.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import TextInput from '@/Components/TextInput.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = useForm({
    name: ''
})

const createTeam = () => {
    form.post(route('teams.store'), {
        errorBag: 'createTeam',
        preserveScroll: true
    })
}
</script>

<template>
    <FormSection @submitted="createTeam">
        <template #title>{{ t('teamInformation') }}</template>

        <template #description>{{ t('createNewTeamDesc') }}</template>

        <template #form>
            <div class="col-span-6">
                <InputLabel :value="t('teamOwner')"/>

                <div class="flex items-center mt-2">
                    <img
                        class="object-cover w-12 h-12 rounded-full"
                        :src="$page.props.auth.user.profile_photo_url"
                        :alt="$page.props.auth.user.name"
                    />

                    <div class="ms-4 leading-tight">
                        <div class="font-semibold text-orange-400 text-sm">{{ $page.props.auth.user.name }}</div>
                        <div class="font-semibold text-teal-600 text-sm">
                            {{ $page.props.auth.user.email }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel for="name" :value="t('teamName')"/>
                <TextInput id="name" v-model="form.name" type="text" class="block w-full mt-1" autofocus/>
                <InputError :message="form.errors.name" class="mt-2"/>
            </div>
        </template>

        <template #actions>
            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                {{ t('create') }}
            </PrimaryButton>
        </template>
    </FormSection>
</template>
