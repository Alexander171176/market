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

const totalLikes = computed(() => props.articles.reduce((acc, article) => acc + article.likes, 0));

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
    const sortedArticles = [...props.articles].sort((a, b) => a.id - b.id);
    return {
        labels: sortedArticles.map(article => `${article.id}: ${article.likes}`), // Используем ID статей и количество лайков как метки
        datasets: [
            {
                label: 'Лайки статей',
                data: sortedArticles.map(article => article.likes), // Количество лайков
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
                    ticks: {
                        maxTicksLimit: 5,
                        callback: (value) => formatThousands(value),
                    },
                },
                x: {
                    type: 'category',
                    grid: {
                        display: false,
                        drawBorder: false,
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
                        label: (context) => formatThousands(context.parsed.y),
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
    // console.log('ArticleBarChartLikes05 data:', articleChartData.value)
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
    <div class="px-5 py-3">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex items-center">
                <div class="text-3xl font-bold text-slate-800 mr-2">{{ totalLikes }}</div>
                <div class="text-sm">Total Likes</div>
            </div>
            <div class="grow ml-2">
                <ul ref="legend" class="flex flex-wrap justify-end"></ul>
            </div>
        </div>
    </div>
    <div class="grow">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>
