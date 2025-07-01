<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import {
    Chart, PolarAreaController, RadialLinearScale, Tooltip, Legend,
} from 'chart.js'

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils'

Chart.register(PolarAreaController, RadialLinearScale, Tooltip, Legend)

export default {
    name: 'ArticlePolarChart',
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

        const chartData = computed(() => {
            const labels = sortedArticles.value.map(article => `ID: ${article.id}`)
            const viewsData = sortedArticles.value.map(article => article.views)

            return {
                labels,
                datasets: [
                    {
                        data: viewsData,
                        backgroundColor: viewsData.map(() => randomColor()),
                        borderColor: viewsData.map(() => randomColor()),
                        borderWidth: 1.5,
                    },
                ],
            }
        })

        const createChart = () => {
            if (chart) {
                chart.destroy()
            }

            const ctx = canvas.value
            chart = new Chart(ctx, {
                type: 'polarArea',
                data: chartData.value,
                options: {
                    layout: {
                        padding: 24,
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => `ID: ${sortedArticles.value[context.dataIndex].id}, Просмотры: ${context.raw}`,
                            },
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    animation: {
                        duration: 500,
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
                            li.style.margin = tailwindConfig().theme.margin[1]
                            // Button element
                            const button = document.createElement('button')
                            button.classList.add('btn-xs')
                            button.style.backgroundColor = tailwindConfig().theme.colors.white
                            button.style.borderWidth = tailwindConfig().theme.borderWidth[1]
                            button.style.borderColor = tailwindConfig().theme.colors.slate[200]
                            button.style.color = tailwindConfig().theme.colors.slate[500]
                            button.style.boxShadow = tailwindConfig().theme.boxShadow.md
                            button.style.opacity = item.hidden ? '.3' : ''
                            button.onclick = () => {
                                c.toggleDataVisibility(item.index, !item.index)
                                c.update()
                            }
                            // Color box
                            const box = document.createElement('span')
                            box.style.display = 'block'
                            box.style.width = tailwindConfig().theme.width[2]
                            box.style.height = tailwindConfig().theme.height[2]
                            box.style.backgroundColor = item.fillStyle
                            box.style.borderRadius = tailwindConfig().theme.borderRadius.sm
                            box.style.marginRight = tailwindConfig().theme.margin[1]
                            box.style.pointerEvents = 'none'
                            // Label
                            const label = document.createElement('span')
                            label.style.display = 'flex'
                            label.style.alignItems = 'center'
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
        }
    }
}
</script>

<template>
    <div class="grow flex flex-col justify-center">
        <div>
            <canvas ref="canvas" :width="width" :height="height"></canvas>
        </div>
        <div class="px-5 pt-2 pb-6">
            <ul ref="legend" class="flex flex-wrap justify-start -m-1"></ul>
        </div>
    </div>
</template>

<style scoped>
.chart-canvas {
    max-height: 400px; /* Ограничение по высоте */
}
</style>
