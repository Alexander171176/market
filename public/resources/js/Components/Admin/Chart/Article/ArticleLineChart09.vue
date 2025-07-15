<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import {
    Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

export default {
    name: 'ArticleLineChart09',
    props: ['articles', 'width', 'height'],
    setup(props) {

        const canvas = ref(null)
        const legend = ref(null)
        let chart = null

        const sortedArticles = computed(() => {
            return [...props.articles].sort((a, b) => a.id - b.id)
        })

        const chartData = computed(() => {
            const labels = sortedArticles.value.map(article => article.created_at)
            const viewsData = sortedArticles.value.map(article => article.views)
            const likesData = sortedArticles.value.map(article => article.likes)

            return {
                labels,
                datasets: [
                    {
                        label: 'Просмотры',
                        data: viewsData,
                        fill: true,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1.5,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
                    },
                    {
                        label: 'Лайки',
                        data: likesData,
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1.5,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
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
                                callback: (value) => value.toString(), // Убираем символы валюты
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
                                align: 'end',
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
                            display: true,
                            labels: {
                                generateLabels(chart) {
                                    const datasets = chart.data.datasets
                                    return datasets.map((dataset, i) => ({
                                        text: dataset.label,
                                        fillStyle: dataset.backgroundColor,
                                        hidden: !chart.isDatasetVisible(i),
                                        datasetIndex: i,
                                    }))
                                }
                            }
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    maintainAspectRatio: false,
                },
                plugins: [{
                    id: 'htmlLegend',
                    afterUpdate(c, args, options) {
                        const ul = legend.value
                        if (!ul) return
                        // Remove old legend items
                        while (ul.firstChild) {
                            ul.firstChild.remove()
                        }
                        // Reuse the built-in legendItems generator
                        const items = c.options.plugins.legend.labels.generateLabels(c)
                        items.forEach((item) => {
                            const li = document.createElement('li')
                            li.style.marginLeft = tailwindConfig().theme.margin[3]
                            // Button element
                            const button = document.createElement('button')
                            button.style.display = 'inline-flex'
                            button.style.alignItems = 'center'
                            button.style.opacity = item.hidden ? '.3' : ''
                            button.onclick = () => {
                                c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex))
                                c.update()
                            }
                            // Color box
                            const box = document.createElement('span')
                            box.style.display = 'block'
                            box.style.width = tailwindConfig().theme.width[3]
                            box.style.height = tailwindConfig().theme.height[3]
                            box.style.borderRadius = tailwindConfig().theme.borderRadius.full
                            box.style.marginRight = tailwindConfig().theme.margin[2]
                            box.style.borderWidth = '3px'
                            box.style.borderColor = item.fillStyle
                            box.style.pointerEvents = 'none'
                            // Label
                            const label = document.createElement('span')
                            label.style.color = tailwindConfig().theme.colors.slate[500]
                            label.style.fontSize = tailwindConfig().theme.fontSize.sm[0]
                            label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight
                            const labelText = document.createTextNode(item.text)
                            label.appendChild(labelText)
                            li.appendChild(button)
                            button.appendChild(box)
                            button.appendChild(label)
                            ul.appendChild(li)
                        })
                    },
                }],
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
            legend,
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
