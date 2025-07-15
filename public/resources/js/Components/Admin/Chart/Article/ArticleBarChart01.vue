<script setup>
import { ref, onMounted, onUnmounted, watch, computed, defineProps } from 'vue';
import {
    Chart, BarController, BarElement, LinearScale, TimeScale, CategoryScale, Tooltip, Legend
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils';

Chart.register(BarController, BarElement, LinearScale, TimeScale, CategoryScale, Tooltip, Legend);

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

const canvas = ref(null);
const legend = ref(null);
let chart = null;

const articleChartData = computed(() => {
    const createdData = props.articles.map(article => ({
        x: new Date(article.created_at),
        y: 1
    }));
    const updatedData = props.articles.map(article => ({
        x: new Date(article.updated_at),
        y: 1
    }));

    const aggregatedData = (data) => {
        const counts = data.reduce((acc, { x }) => {
            const date = x.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date]++;
            return acc;
        }, {});

        return Object.keys(counts).map(date => ({
            x: date,
            y: counts[date]
        }));
    };

    return {
        datasets: [
            {
                label: 'Дата создания',
                data: aggregatedData(createdData),
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Дата изменения',
                data: aggregatedData(updatedData),
                backgroundColor: 'rgba(153, 102, 255, 0.7)',
                borderColor: 'rgba(153, 102, 255, 1)',
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
                    },
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MMM D',
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        generateLabels(chart) {
                            const datasets = chart.data.datasets;
                            return datasets.map((dataset, i) => ({
                                text: dataset.label === 'Дата создания' ? 'Создание статей' : 'Изменение статей',
                                fillStyle: dataset.backgroundColor,
                                hidden: !chart.isDatasetVisible(i),
                                datasetIndex: i
                            }));
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        title: (context) => context[0].label,
                        label: (context) => `Количество: ${context.raw.y}`,
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
                const ul = legend.value;
                if (!ul) return;
                while (ul.firstChild) {
                    ul.firstChild.remove();
                }
                const items = c.options.plugins.legend.labels.generateLabels(c);
                items.forEach((item) => {
                    const li = document.createElement('li');
                    li.style.marginRight = tailwindConfig().theme.margin[4];
                    const button = document.createElement('button');
                    button.style.display = 'inline-flex';
                    button.style.alignItems = 'center';
                    button.style.opacity = item.hidden ? '.3' : '';
                    button.onclick = () => {
                        c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex));
                        c.update();
                    };
                    const box = document.createElement('span');
                    box.style.display = 'block';
                    box.style.width = tailwindConfig().theme.width[3];
                    box.style.height = tailwindConfig().theme.height[3];
                    box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
                    box.style.marginRight = tailwindConfig().theme.margin[2];
                    box.style.borderWidth = '3px';
                    box.style.borderColor = item.fillStyle;
                    box.style.pointerEvents = 'none';
                    const labelContainer = document.createElement('span');
                    labelContainer.style.display = 'flex';
                    labelContainer.style.alignItems = 'center';
                    const value = document.createElement('span');
                    value.style.color = tailwindConfig().theme.colors.slate[800];
                    value.style.fontSize = tailwindConfig().theme.fontSize['3xl'][0];
                    value.style.lineHeight = tailwindConfig().theme.fontSize['3xl'][1].lineHeight;
                    value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
                    value.style.marginRight = tailwindConfig().theme.margin[2];
                    value.style.pointerEvents = 'none';
                    const label = document.createElement('span');
                    label.style.color = tailwindConfig().theme.colors.slate[500];
                    label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
                    label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
                    const theValue = c.data.datasets[item.datasetIndex].data.reduce((a, b) => a + b.y, 0);
                    const valueText = document.createTextNode(theValue);
                    const labelText = document.createTextNode(item.text);
                    value.appendChild(valueText);
                    label.appendChild(labelText);
                    li.appendChild(button);
                    button.appendChild(box);
                    button.appendChild(labelContainer);
                    labelContainer.appendChild(value);
                    labelContainer.appendChild(label);
                    ul.appendChild(li);
                });
            },
        }],
    });
};

onMounted(() => {
    // console.log('ArticleBarChart01 data:', articleChartData.value)
    createChart();
});

watch(articleChartData, (newData) => {
    createChart();
});

onUnmounted(() => {
    if (chart) {
        chart.destroy();
    }
});
</script>

<template>
    <div class="px-5 py-3">
        <ul ref="legend" class="flex flex-wrap"></ul>
    </div>
    <div class="grow">
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
</template>
