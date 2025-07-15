<script>
import {ref, onMounted, onUnmounted, watch, computed} from 'vue'
import {
    Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js'

// Import utilities
import '@/utils/ChartjsConfig';
import {tailwindConfig} from '@/utils/Utils'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

export default {
    name: 'ArticleLineChart02',
    props: ['articles', 'width', 'height'],
    setup(props) {
        const canvas = ref(null)
        const legend = ref(null)
        let chart = null

        const sortedArticles = computed(() => {
            return [...props.articles].sort((a, b) => a.id - b.id)
        })

        const randomColor = () => {
            const r = Math.floor(Math.random() * 255)
            const g = Math.floor(Math.random() * 255)
            const b = Math.floor(Math.random() * 255)
            return `rgba(${r}, ${g}, ${b}, 0.7)`
        }

        const viewsColor = ref(randomColor())
        const likesColor = ref(randomColor())

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
                        backgroundColor: viewsColor.value,
                        borderColor: viewsColor.value,
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: viewsColor.value,
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: viewsColor.value,
                    },
                    {
                        label: 'Лайки',
                        data: likesData,
                        fill: true,
                        backgroundColor: likesColor.value,
                        borderColor: likesColor.value,
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: likesColor.value,
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: likesColor.value,
                    }
                ],
            }
        })

        const totalViews = computed(() => {
            return sortedArticles.value.reduce((acc, article) => acc + article.views, 0)
        })

        const totalLikes = computed(() => {
            return sortedArticles.value.reduce((acc, article) => acc + article.likes, 0)
        })

        const totalArticles = computed(() => {
            return sortedArticles.value.length
        })

        const differenceLabel = computed(() => {
            const difference = totalViews.value - totalLikes.value
            const percentage = ((difference / totalViews.value) * 100).toFixed(2)
            return `${difference} (${percentage}%)`
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
                        padding: 20,
                    },
                    scales: {
                        y: {
                            grid: {
                                drawBorder: false,
                                beginAtZero: true,
                            },
                            ticks: {
                                maxTicksLimit: 5,
                                callback: (value) => value,
                                title: {
                                    display: true,
                                    text: 'Просмотры',
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
                                    text: 'ID Статьи',
                                },
                            },
                        },
                    },
                    plugins: {
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
                        tooltip: {
                            callbacks: {
                                title: (context) => context[0].label,
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
            totalViews,
            totalArticles,
            differenceLabel,
        }
    }
}
</script>

<template>
    <div class="px-5 py-3">
        <div class="flex flex-wrap justify-between items-end">
            <div class="flex items-start">
                <div class="text-3xl font-bold text-slate-800 mr-2">{{ totalArticles }}</div>
                <div class="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full">{{ differenceLabel }}</div>
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
