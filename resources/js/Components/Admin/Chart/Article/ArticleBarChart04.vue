<script setup>
import { ref, onMounted, onUnmounted, watch, computed, defineProps } from 'vue'
import {
    Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend,
} from 'chart.js'
import 'chartjs-adapter-moment'

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig, formatThousands } from '@/utils/Utils'

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
const legend = ref(null)
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

const sortedArticles = computed(() => {
    return props.articles.slice().sort((a, b) => a.id - b.id);
});

const articleChartData = computed(() => {
    const colors = getRandomColorsArray(sortedArticles.value.length);
    return {
        labels: sortedArticles.value.map(article => `${article.id}: ${article.views}`), // Используем ID статей и количество просмотров как метки
        datasets: [
            {
                label: 'Просмотры статей',
                data: sortedArticles.value.map(article => article.views), // Количество просмотров
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
            indexAxis: 'y',
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
                    type: 'category',
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                    },
                    ticks: {
                        maxTicksLimit: 3,
                        align: 'end',
                        callback: (value) => formatThousands(value),
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: () => false, // Disable tooltip title
                        label: (context) => formatThousands(context.parsed.x),
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
                    li.style.marginRight = tailwindConfig().theme.margin[4]
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
    // console.log('ArticleBarChart04 data:', articleChartData.value)
    createChart()
})

watch(articleChartData, (newData) => {
    if (chart) {
        chart.data = newData
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
    <div class="px-5 py-4">
        <ul ref="legend" class="flex flex-wrap"></ul>
    </div>
    <div class="grow">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>
