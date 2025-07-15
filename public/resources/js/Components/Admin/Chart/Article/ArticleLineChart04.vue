<script>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import {
    Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip
} from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip)

export default {
    name: 'ArticleLineChart04',
    props: ['articles', 'width', 'height'],
    setup(props) {
        const canvas = ref(null)
        let chart = null

        const chartData = computed(() => {
            const sortedArticles = [...props.articles].sort((a, b) => a.id - b.id);
            const labels = sortedArticles.map(article => `ID: ${article.id}`);
            const viewsData = sortedArticles.map(article => article.views);

            return {
                labels,
                datasets: [
                    {
                        label: 'Просмотры',
                        data: viewsData,
                        fill: true,
                        backgroundColor: tailwindConfig().theme.colors.blue[100],
                        borderColor: tailwindConfig().theme.colors.blue[500],
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[700],
                    }
                ],
            }
        })

        const createChart = async () => {
            await nextTick()

            if (!canvas.value) {
                console.error('Canvas element not found')
                return
            }

            const ctx = canvas.value.getContext('2d')
            if (!ctx) {
                console.error('Не удается получить 2D-контекст с canvas')
                return
            }

            if (chart) {
                chart.destroy()
            }

            // console.log('Создание диаграммы с данными:', chartData.value)

            chart = new Chart(ctx, {
                type: 'line',
                data: chartData.value,
                options: {
                    chartArea: {
                        backgroundColor: tailwindConfig().theme.colors.slate[50],
                    },
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                        },
                    },
                    scales: {
                        x: {
                            type: 'category',
                            grid: {
                                display: false,
                                drawBorder: false,
                            },
                            title: {
                                display: true,
                                text: 'ID статей',
                            },
                            ticks: {
                                autoSkipPadding: 48,
                                maxRotation: 0,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                            },
                            title: {
                                display: true,
                                text: 'Просмотры',
                            },
                            ticks: {
                                maxTicksLimit: 10,
                                callback: (value) => value,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                title: (context) => `ID: ${context[0].label}`,
                                label: (context) => `Просмотры: ${context.parsed.y}`,
                            },
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    maintainAspectRatio: false,
                },
            })
        }

        onMounted(() => {
            createChart()
        })

        watch(chartData, () => {
            createChart()
        })

        onUnmounted(() => {
            if (chart) {
                chart.destroy()
            }
        })

        return {
            canvas,
        }
    }
}
</script>

<template>
    <div class="chart-container">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>

<style scoped>
.chart-container {
    max-height: 400px; /* Ограничение по высоте */
}
.chart-canvas {
    width: 100%;
    height: 100%;
}
</style>
