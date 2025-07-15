<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps } from 'vue';
import {
    Chart, LineController, LineElement, Filler, PointElement,
    LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js';

import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const props = defineProps({
    articles: {
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

const processArticles = () => {
    if (!props.articles || props.articles.length === 0) {
        return {
            labels: [],
            datasets: []
        };
    }

    const sorted = [...props.articles].sort((a, b) => a.id - b.id);
    const labels = sorted.map(a => `ID: ${a.id}`);
    const views = sorted.map(a => a.views || 0);
    const likes = sorted.map(a => a.likes || 0);

    return {
        labels,
        datasets: [
            {
                label: 'Просмотры',
                data: views,
                fill: false,
                borderColor: tailwindConfig().theme.colors.blue[500],
                backgroundColor: tailwindConfig().theme.colors.blue[100],
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: tailwindConfig().theme.colors.blue[500]
            },
            {
                label: 'Лайки',
                data: likes,
                fill: false,
                borderColor: tailwindConfig().theme.colors.green[500],
                backgroundColor: tailwindConfig().theme.colors.green[100],
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: tailwindConfig().theme.colors.green[500]
            }
        ]
    };
};

const createChart = () => {
    if (!canvas.value) return;

    const ctx = canvas.value;
    const data = processArticles();

    if (!data.labels.length) return;

    chart = new Chart(ctx, {
        type: 'line',
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 20
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Значение'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'ID статьи'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}`
                    }
                }
            }
        }
    });
};

onMounted(createChart);
onUnmounted(() => chart && chart.destroy());
watch(() => props.articles, () => {
    if (chart) {
        chart.data = processArticles();
        chart.update();
    } else {
        createChart();
    }
});
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
