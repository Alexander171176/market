<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const { t } = useI18n()

const props = defineProps({
    commentableType: { type: String, required: true },
    commentableId: { type: Number, required: true },
    authUser: { type: Object, default: null }
})

const isVisible = ref(true)

const toggleVisibility = () => {
    isVisible.value = !isVisible.value
}

const comments = ref([])
const loading = ref(false)
const error = ref(null)

const editingId = ref(null)
const editText = ref('')
const replyingId = ref(null)
const replyText = ref('')
const newText = ref('')

const fetchComments = async () => {
    loading.value = true
    try {
        const { data } = await axios.get('/api/comments', {
            params: {
                commentable_type: String(props.commentableType),
                commentable_id: Number(props.commentableId)
            }
        })
        comments.value = data
    } catch (err) {
        console.error(t('commentErrorLoading'), err.response || err)
        if (err.response?.data?.message) {
            error.value = `Ошибка: ${err.response.data.message}`
        } else {
            error.value = t('commentErrorLoading')
        }
    } finally {
        loading.value = false
    }
}

const startEdit = (comment) => {
    editingId.value = comment.id
    editText.value = comment.content
}

const cancelEdit = () => {
    editingId.value = null
    editText.value = ''
}

const saveEdit = async () => {
    try {
        await axios.put(`/api/comments/${editingId.value}`, { content: editText.value })
        cancelEdit()
        await fetchComments()
    } catch (e) {
        alert(t('robotError'))
    }
}

const removeComment = async (id) => {
    if (confirm(t('commentDelete'))) {
        try {
            await axios.delete(`/api/comments/${id}`)
            await fetchComments()
        } catch (e) {
            alert(t('commentDeleteError'))
        }
    }
}

const startReply = (id) => {
    replyingId.value = id
    replyText.value = ''
}

const cancelReply = () => {
    replyingId.value = null
    replyText.value = ''
}

const sendReply = async (parentId) => {
    try {
        await axios.post('/api/comments', {
            commentable_type: props.commentableType,
            commentable_id: props.commentableId,
            parent_id: parentId,
            content: replyText.value
        })
        cancelReply()
        await fetchComments()
    } catch (e) {
        alert(t('commentErrorResponse'))
    }
}

const sendNew = async () => {
    if (!newText.value.trim()) return
    try {
        await axios.post('/api/comments', {
            commentable_type: props.commentableType,
            commentable_id: props.commentableId,
            content: newText.value
        })
        newText.value = ''
        await fetchComments()
    } catch (e) {
        if (e.response && e.response.data && e.response.data.errors) {
            console.error('Validation errors:', e.response.data.errors)
            alert(Object.values(e.response.data.errors).join('\n'))
        } else {
            console.error(t('commentErrorSending'), e)
            alert(t('commentErrorAdding'))
        }
    }
}

onMounted(fetchComments)
</script>

<template>
    <div class="mt-4">
        <h3 class="mb-2 flex items-center justify-center
                   text-center cursor-pointer select-none"
            @click="toggleVisibility">
            <svg class="w-3 h-3 fill-current shrink-0 text-black dark:text-white"
                 viewBox="0 0 16 16">
                <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"></path>
            </svg>
            <span class="mx-2 border-b dashed border-gray-400
                         font-semibold text-md text-black dark:text-white
                         hover:text-red-500 dark:hover:text-yellow-300">
                {{ t('comments') }}
            </span>
            <span class="text-sm text-red-500 dark:text-yellow-300">
                {{ isVisible ? '▲' : '▼' }}
            </span>
        </h3>

        <div v-if="isVisible">
            <div v-if="loading" class="text-sm text-gray-500">{{ t('uploadingComments') }}</div>
            <div v-if="error" class="text-red-500">{{ error }}</div>

            <div v-for="comment in comments" :key="comment.id"
                 class="border p-3 rounded bg-gray-50 dark:bg-slate-800">

                <!-- Автор -->
                <div class="flex justify-between items-center text-sm font-semibold">
                    <span class="text-blue-600 dark:text-blue-300">{{ comment.user.name }}</span>
                    <div class="flex space-x-2 text-xs">
                        <button @click="startReply(comment.id)" class="text-blue-500">
                            {{ t('reply') }}
                        </button>
                        <template v-if="authUser && authUser.id === comment.user.id">
                            <button @click="startEdit(comment)" class="text-green-500">
                                {{ t('edit') }}
                            </button>
                            <button @click="removeComment(comment.id)" class="text-red-500">
                                {{ t('delete') }}
                            </button>
                        </template>
                    </div>
                </div>

                <!-- Редактируемое сообщение -->
                <div v-if="editingId === comment.id" class="mt-2 space-y-1">
                    <textarea v-model="editText" class="w-full border rounded p-1 text-sm" />
                    <div class="space-x-2">
                        <button @click="saveEdit" class="text-green-600">
                            {{ t('save') }}
                        </button>
                        <button @click="cancelEdit" class="text-gray-500">
                            {{ t('cancel') }}
                        </button>
                    </div>
                </div>
                <div v-else class="text-sm text-gray-800 dark:text-gray-200">
                    {{ comment.content }}
                </div>

                <!-- Ответ -->
                <div v-if="replyingId === comment.id" class="mt-2">
                    <textarea v-model="replyText"
                              class="w-full border rounded p-1 text-sm"
                              :placeholder="t('commentYourAnswer')" />
                    <div class="space-x-2 mt-1">
                        <button @click="sendReply(comment.id)" class="text-blue-600">
                            {{ t('send') }}
                        </button>
                        <button @click="cancelReply" class="text-gray-500">
                            {{ t('cancel') }}
                        </button>
                    </div>
                </div>

                <!-- Вложенные ответы -->
                <div v-if="comment.replies?.length"
                     class="mt-3 pl-4 border-l-2 border-gray-400 space-y-2">
                    <div v-for="reply in comment.replies" :key="reply.id">
                        <div class="text-xs font-semibold text-purple-600 dark:text-purple-300">
                            {{ reply.user.name }}
                        </div>

                        <!-- Редактируемый ответ -->
                        <div v-if="editingId === reply.id">
                            <textarea v-model="editText"
                                      class="w-full px-2 py-0.5 rounded text-sm
                                             border border-gray-400
                                             bg-slate-100 dark:bg-slate-700
                                             text-black dark:text-white" />
                            <div class="flex justify-end space-x-2 mt-1">
                                <button
                                    @click="saveEdit"
                                    class="border border-gray-600 dark:border-gray-300
                                           text-xs text-black dark:text-slate-100
                                           hover:text-white dark:hover:text-white
                                           hover:bg-blue-600 dark:hover:bg-blue-900
                                           transition-colors duration-200 ease-in-out
                                           rounded-sm px-2 py-0.5 font-semibold">
                                    {{ t('save') }}
                                </button>
                                <button
                                    @click="cancelEdit"
                                    class="border border-gray-600 dark:border-gray-300
                                           text-xs text-black dark:text-slate-100
                                           hover:text-white dark:hover:text-white
                                           hover:bg-gray-600 dark:hover:bg-black
                                           transition-colors duration-200 ease-in-out
                                           rounded-sm px-2 py-0.5 font-semibold">
                                    {{ t('cancel') }}
                                </button>
                            </div>
                        </div>
                        <div v-else class="text-sm text-gray-700 dark:text-gray-200">
                            {{ reply.content }}
                            <template v-if="authUser && authUser.id === reply.user.id">
                                <button class="mr-2 font-semibold hover:opacity-75
                                               text-xs text-teal-700 dark:text-teal-300
                                               border-b border-dashed
                                               border-teal-700 dark:border-teal-300"
                                        :title="t('edit')"
                                        @click="startEdit(reply)">
                                    {{ t('edit') }}
                                </button>
                                <button class="font-semibold hover:opacity-75
                                               text-xs text-red-600 dark:text-red-300
                                               border-b border-dashed
                                               border-red-600 dark:border-red-300"
                                        :title="t('delete')"
                                        @click="removeComment(reply.id)">
                                    {{ t('delete') }}
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Форма нового комментария -->
            <div v-if="authUser" class="mt-4 border-t pt-2">
                <h4 class="font-semibold mb-2 text-sm text-gray-800 dark:text-gray-200">
                    {{ t('commentLeave') }}
                </h4>
                <textarea v-model="newText"
                          class="w-full px-2 py-0.5 rounded text-sm
                                 border border-gray-400
                                 bg-slate-100 dark:bg-slate-700
                                 text-black dark:text-white"
                          :placeholder="t('commentYour')" />
                <div class="mt-1 flex items-center justify-end">
                    <button
                        @click="sendNew"
                        class="border border-gray-600 dark:border-gray-300
                               text-xs text-black dark:text-slate-100
                               hover:text-white dark:hover:text-white
                               hover:bg-blue-600 dark:hover:bg-blue-900
                               transition-colors duration-200 ease-in-out
                               rounded-sm px-2 py-0.5 font-semibold">
                        {{ t('send') }}
                    </button>
                </div>
            </div>
            <div v-else class="text-sm text-gray-500 mt-4">
                {{ t('commentLogin') }}
            </div>
        </div>
    </div>
</template>
