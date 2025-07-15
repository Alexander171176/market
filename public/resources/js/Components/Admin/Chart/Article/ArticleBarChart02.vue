<script setup>
import { ref, onMounted, onUnmounted, watch, computed, defineProps } from 'vue'
import {
    Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils'

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend)

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

const canvas = ref(null)
let chart = null

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.7; // Прозрачность 0.7
    return `rgba(${r},${g},${b},${a})`;
}

const getRandomColorsArray = (length) => {
    return Array.from({ length }, getRandomColor);
}

const articleChartData = computed(() => {
    const colors = getRandomColorsArray(props.articles.length);
    return {
        labels: props.articles.map(article => `ID: ${article.id}`), // Используем ID статей как метки
        datasets: [
            {
                label: 'Просмотры статей',
                data: props.articles.map(article => article.views), // Количество просмотров
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };
});

const createChart = () => {
    if (chart) {
        chart.destroy();
    }

    const ctx = canvas.value;
    chart = new Chart(ctx, {
        type: 'bar',
        data: articleChartData.value,
        options: {
            layout: {
                padding: {
                    top: 12,
                    bottom: 16,
                    left: 20,
                    right: 20,
                },
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                    },
                    beginAtZero: true,
                    ticks: {
                        maxTicksLimit: 5,
                        callback: (value) => value, // Убираем форматирование денежных единиц
                    },
                },
                x: {
                    type: 'category',
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        autoSkipPadding: 48,
                        maxRotation: 0,
                    },
                },
            },
            plugins: {
                legend: {
                    display: true, // Отображаем легенду
                },
                tooltip: {
                    callbacks: {
                        title: () => false, // Disable tooltip title
                        label: (context) => context.parsed.y,
                    },
                },
            },
            interaction: {
                intersect: false,
                mode: 'nearest',
            },
            animation: {
                duration: 200,
            },
            maintainAspectRatio: false,
            resizeDelay: 200,
        },
    })
}

onMounted(() => {
    // console.log('ArticleBarChart02 data:', articleChartData.value)
    createChart()
})

watch(() => props.articles, (newData) => {
    if (chart) {
        chart.data = articleChartData.value
        chart.update()
    }
})

onUnmounted(() => {
    if (chart) {
        chart.destroy()
    }
})

</script>

<template>
    <div class="chart-container">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 400px;
    overflow: hidden;
}
</style>
