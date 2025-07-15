<script setup>
import {ref, onMounted, onUnmounted} from 'vue';

const time = ref('');
const date = ref('');

const week = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

const updateTime = () => {
    const cd = new Date();
    time.value = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    date.value = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

const zeroPadding = (num, digit) => {
    let zero = '';
    for (let i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
};

let timerID;

onMounted(() => {
    updateTime();
    timerID = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    clearInterval(timerID);
});
</script>

<template>
    <div id="clock"
         class="relative h-fit px-1 ml-1
                hidden lg:block rounded
                bg-slate-200 dark:bg-slate-700
                border border-slate-400
                transform -text-center
                font-mono font-semibold">
        <p>
            <span class="date text-sm mr-2 text-teal-500 dark:text-cyan-100">{{ date }}</span>
            <span class="time text-md text-center text-slate-500 dark:text-cyan-100">{{ time }}</span>
        </p>
    </div>
</template>

<style scoped>
.time, .date {
    text-shadow: 0 0 10px rgba(153, 204, 255, 1),  0 0 10px rgba(153, 204, 255, 0);
}
</style>
