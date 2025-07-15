<script setup>
import { ref, onMounted, watch, onUnmounted, defineProps } from 'vue';
import {
    Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js';

import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps({
    rubrics: {
        type: Array,
        default: () => []
    },
    width: {
        type: [Number, String],
        default: 600
    },
    height: {
        type: [Number, String],
        default: 400
    }
});

const canvas = ref(null);
let chart = null;

const createChart = () => {
    if (!canvas.value || !props.rubrics.length) return;

    if (chart) chart.destroy();

    const labels = props.rubrics.map(r => r.name);
    const values = props.rubrics.map(r => r.value);

    chart = new Chart(canvas.value, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Просмотры по рубрикам',
                    data: values,
                    backgroundColor: tailwindConfig().theme.colors.blue[400],
                    borderRadius: 6,
                    barThickness: 28
                }
            ]
        },
        options: {
            layout: {
                padding: 20,
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Просмотры'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Рубрики'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: ctx => `Просмотры: ${ctx.raw}`
                    }
                }
            },
            maintainAspectRatio: false,
            resizeDelay: 200,
        }
    });
};

onMounted(createChart);
onUnmounted(() => chart && chart.destroy());

watch(() => props.rubrics, createChart);
</script>

<template>
    <div class="grow">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>

<style scoped>
canvas {
    max-height: 400px;
}
</style>
