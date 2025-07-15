<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import {
    Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig, formatValue } from '@/utils/Utils'

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip)

export default {
    name: 'ArticleRealtimeChart',
    props: ['articles', 'width', 'height'],
    setup(props) {
        const canvas = ref(null)
        const chartValue = ref(null)
        const chartDeviation = ref(null)
        let chart = null

        const processArticles = () => {
            const labels = props.articles.map(article => new Date(article.created_at))
            const data = props.articles.map(article => article.views)

            return {
                labels,
                datasets: [
                    {
                        label: 'Просмотры',
                        data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                    },
                ],
            }
        }

        const handleHeaderValues = (data, chartValue, chartDeviation) => {
            const currentValue = data.datasets[0].data[data.datasets[0].data.length - 1]
            const previousValue = data.datasets[0].data[data.datasets[0].data.length - 2]
            const diff = ((currentValue - previousValue) / previousValue) * 100
            chartValue.value.innerHTML = currentValue
            chartDeviation.value.style.backgroundColor = diff < 0 ? tailwindConfig().theme.colors.amber[500] : tailwindConfig().theme.colors.emerald[500]
            chartDeviation.value.innerHTML = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}%`
        }

        const initializeChart = () => {
            const ctx = canvas.value
            const data = processArticles()
            chart = new Chart(ctx, {
                type: 'line',
                data,
                options: {
                    layout: {
                        padding: 20,
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                            },
                            suggestedMin: 0,
                            suggestedMax: 100, // Update these values based on your data range
                            ticks: {
                                maxTicksLimit: 5,
                                callback: (value) => formatValue(value),
                            },
                        },
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute', // Adjust the unit as per your requirement
                                tooltipFormat: 'MMM DD, H:mm:ss a',
                                displayFormats: {
                                    minute: 'H:mm:ss',
                                },
                            },
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
                            display: false,
                        },
                        tooltip: {
                            titleFont: {
                                weight: '600',
                            },
                            callbacks: {
                                label: (context) => formatValue(context.parsed.y),
                            },
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    animation: false,
                    maintainAspectRatio: false,
                    resizeDelay: 200,
                },
            })
            handleHeaderValues(data, chartValue, chartDeviation)
        }

        onMounted(() => {
            initializeChart()
        })

        onUnmounted(() => {
            if (chart) {
                chart.destroy()
            }
        })

        watch(
            () => props.articles,
            () => {
                if (chart) {
                    const data = processArticles()
                    chart.data = data
                    chart.update()
                    handleHeaderValues(data, chartValue, chartDeviation)
                }
            }
        )

        return {
            canvas,
            chartValue,
            chartDeviation,
        }
    }
}
</script>

<template>
    <div class="px-5 py-3">
        <div class="flex items-start">
            <div class="text-3xl font-bold text-slate-800 mr-2 tabular-nums">
                <span ref="chartValue">57.81</span>
            </div>
            <div ref="chartDeviation" class="text-sm font-semibold text-white px-1.5 rounded-full"></div>
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
