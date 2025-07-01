<template>
    <div class="chart-container">
        <Bar :data="datacollection" :options="options" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const datacollection = ref({
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
    datasets: [
        {
            label: 'Дата',
            backgroundColor: '#6c9',
            data: [40, 20, 12, 39, 10, 40, 39]
        }
    ]
});

const options = ref({
    responsive: true,
    maintainAspectRatio: false
});
</script>

<style scoped>
.chart-container {
    position: relative;
    margin: auto;
    height: 40vh;
    width: 80vw;
}
</style>
