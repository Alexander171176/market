<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollContainer = ref(null)
const showScrollToTop = ref(false)
const showScrollToBottom = ref(true)
let scrollInterval = null

const findScrollContainer = () => {
    let parent = document.querySelector('main')
    while (parent && getComputedStyle(parent).overflowY !== 'auto') {
        parent = parent.parentElement
    }
    return parent || window
}

const startScroll = (direction) => {
    const scrollStep = direction === 'down' ? 20 : -20
    scrollInterval = setInterval(() => {
        if (scrollContainer.value === window) {
            window.scrollBy({ top: scrollStep, behavior: 'auto' })
        } else {
            scrollContainer.value.scrollTop += scrollStep
        }
    }, 16)
}

const stopScroll = () => {
    clearInterval(scrollInterval)
}

const handleScroll = () => {
    let scrollTop, scrollHeight, clientHeight

    if (scrollContainer.value === window) {
        scrollTop = window.scrollY
        scrollHeight = document.documentElement.scrollHeight
        clientHeight = window.innerHeight
    } else {
        scrollTop = scrollContainer.value.scrollTop
        scrollHeight = scrollContainer.value.scrollHeight
        clientHeight = scrollContainer.value.clientHeight
    }

    showScrollToTop.value = scrollTop > 0
    showScrollToBottom.value = scrollTop + clientHeight < scrollHeight
}

onMounted(() => {
    scrollContainer.value = findScrollContainer()

    const container = scrollContainer.value === window
        ? window
        : scrollContainer.value

    container.addEventListener('scroll', handleScroll)
    handleScroll()
})

onUnmounted(() => {
    const container = scrollContainer.value === window
        ? window
        : scrollContainer.value

    container.removeEventListener('scroll', handleScroll)
    clearInterval(scrollInterval)
})
</script>

<template>
    <div class="fixed right-5 bottom-16 flex flex-col space-y-2 z-50">
        <button
            v-show="showScrollToTop"
            @mousedown="startScroll('up')"
            @mouseup="stopScroll"
            @mouseleave="stopScroll"
            @touchstart="startScroll('up')"
            @touchend="stopScroll"
            class="scroll-button"
        >
            ↑
        </button>
        <button
            v-show="showScrollToBottom"
            @mousedown="startScroll('down')"
            @mouseup="stopScroll"
            @mouseleave="stopScroll"
            @touchstart="startScroll('down')"
            @touchend="stopScroll"
            class="scroll-button"
        >
            ↓
        </button>
    </div>
</template>

<style scoped>
.scroll-button {
    background-color: #333;
    color: white;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid gray;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
    opacity: 0.7;
    cursor: pointer;
    border-radius: 0.25rem;
}

.scroll-button:hover {
    opacity: 1;
}
</style>
