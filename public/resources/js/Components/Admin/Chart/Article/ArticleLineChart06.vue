<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import {
    Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip
} from 'chart.js'

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig, formatValue } from '@/utils/Utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip)

export default {
    name: 'ArticleLineChart06',
    props: ['articles', 'width', 'height'],
    setup(props) {
        const canvas = ref(null)
        let chart = null

        const sortedArticles = computed(() => {
            return [...props.articles].sort((a, b) => a.id - b.id)
        })

        const chartData = computed(() => {
            const labels = sortedArticles.value.map(article => `ID: ${article.id}`)
            const viewsData = sortedArticles.value.map(article => article.views)
            const likesData = sortedArticles.value.map(article => article.likes)

            return {
                labels,
                datasets: [
                    {
                        label: 'Просмотры',
                        data: viewsData,
                        fill: true,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1.5,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                    },
                    {
                        label: 'Лайки',
                        data: likesData,
                        fill: true,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1.5,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
                    }
                ],
            }
        })

        const totalArticles = computed(() => {
            return sortedArticles.value.length
        })

        const createChart = () => {
            if (chart) {
                chart.destroy()
            }

            const ctx = canvas.value
            chart = new Chart(ctx, {
                type: 'line',
                data: chartData.value,
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
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                                callback: (value) => formatValue(value),
                                title: {
                                    display: true,
                                    text: 'Лайки',
                                },
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
                                title: {
                                    display: true,
                                    text: 'Просмотры',
                                },
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: (context) => `ID: ${sortedArticles.value[context[0].dataIndex].id}`,
                                label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
                            },
                        },
                        legend: {
                            display: false,
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    maintainAspectRatio: false,
                    resizeDelay: 200,
                },
            })
        }

        onMounted(() => {
            createChart()
        })

        watch(chartData, (newData) => {
            createChart()
        })

        onUnmounted(() => {
            if (chart) {
                chart.destroy()
            }
        })

        return {
            canvas,
            totalArticles,
        }
    }
}
</script>

<template>
    <div class="px-5 py-3">
        <div class="flex flex-wrap justify-between items-end">
            <div class="flex items-center">
                <div class="text-sm"><span class="font-medium text-slate-800">Количество статей: </span>{{ totalArticles }}</div>
            </div>
            <div class="grow ml-2 mb-1">
                <ul ref="legend" class="flex flex-wrap justify-end"></ul>
            </div>
        </div>
    </div>
    <div class="grow">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>

<style scoped>
.chart-canvas {
    max-height: 400px; /* Ограничение по высоте */
}
</style>
