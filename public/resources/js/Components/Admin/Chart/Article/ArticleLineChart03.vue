<script>
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import {
    Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip
} from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import '@/utils/ChartjsConfig';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip)

export default {
    name: 'ArticleLineChart03',
    props: ['articles', 'width', 'height'],
    setup(props) {

        const canvas = ref(null)
        let chart = null

        const chartData = computed(() => {
            const sortedArticles = [...props.articles].sort((a, b) => a.id - b.id);
            const labels = sortedArticles.map(article => `ID: ${article.id} - ${article.title}`)
            const viewsData = sortedArticles.map(article => article.views)
            const likesData = sortedArticles.map(article => article.likes)

            return {
                labels,
                datasets: [
                    {
                        label: 'Просмотры',
                        data: viewsData,
                        fill: true,
                        backgroundColor: 'rgba(255, 204, 153, 0.7)', // цвет для просмотров
                        borderColor: 'rgba(255, 204, 153, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(255, 204, 153, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255, 204, 153, 1)',
                    },
                    {
                        label: 'Лайки',
                        data: likesData,
                        fill: true,
                        backgroundColor: 'rgba(153, 255, 204, 0.7)', // цвет для лайков
                        borderColor: 'rgba(153, 255, 204, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(153, 255, 204, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(153, 255, 204, 1)',
                    }
                ],
            }
        })

        const createChart = async () => {
            await nextTick()

            if (!canvas.value) return;

            const ctx = canvas.value.getContext('2d')
            if (!ctx) return

            if (chart) {
                chart.destroy()
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: chartData.value,
                options: {
                    layout: {
                        padding: 20,
                    },
                    scales: {
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
                                    text: 'ID и Название',
                                },
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                            },
                            ticks: {
                                maxTicksLimit: 10, // Увеличение количества меток
                                callback: (value) => value,
                                title: {
                                    display: true,
                                    text: 'Лайки',
                                },
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                        },
                        tooltip: {
                            callbacks: {
                                title: (context) => context[0].label, // Включение отображения title в тултипе
                                label: (context) => context.parsed.y,
                            },
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
