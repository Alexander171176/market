<script setup>
const bgImage = new URL('../../../../images/desktop.jpg', import.meta.url).href;
</script>

<template>
    <div
        class="fixed inset-0 z-0 bg-cover bg-center animate-auth-background"
        :style="{ backgroundImage: `url(${bgImage})` }"
        aria-hidden="true"
    ></div>
</template>

<style scoped>
@keyframes authBackgroundPan {
    0% {
        background-position: center center;
    }
    50% {
        background-position: center 40%;
    }
    100% {
        background-position: center center;
    }
}

.animate-auth-background {
    animation: authBackgroundPan 20s ease-in-out infinite;
}
</style>
