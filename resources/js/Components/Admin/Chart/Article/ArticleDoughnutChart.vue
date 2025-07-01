<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart, DoughnutController, ArcElement, TimeScale, Tooltip } from 'chart.js';
import 'chartjs-adapter-moment';
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils'

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);

export default {
    name: 'ArticleDoughnutChart',
    props: {
        articles: {
            type: Array,
            required: true,
        },
        width: {
            type: Number,
            default: 600,
        },
        height: {
            type: Number,
            default: 400,
        },
    },
    setup(props) {
        const canvas = ref(null);
        const legend = ref(null);
        let chart = null;

        // Функция для генерации цвета на основе значения
        const generateColor = (value, min, max) => {
            const ratio = (value - min) / (max - min);
            const hue = (1 - ratio) * 240; // от синего (240 градусов) к красному (0 градусов)
            return `hsl(${hue}, 100%, 50%)`;
        };

        onMounted(() => {
            const ctx = canvas.value;
            const sortedArticles = props.articles.sort((a, b) => a.views - b.views);
            const minViews = Math.min(...sortedArticles.map(article => article.views));
            const maxViews = Math.max(...sortedArticles.map(article => article.views));

            const data = {
                labels: sortedArticles.map(article => `ID:${article.id} ${article.title}`),
                datasets: [
                    {
                        label: 'Просмотры',
                        data: sortedArticles.map(article => article.views),
                        backgroundColor: sortedArticles.map(article => generateColor(article.views, minViews, maxViews)),
                        borderWidth: 1,
                    },
                ],
            };

            chart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    cutout: '80%',
                    layout: {
                        padding: 24,
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const article = sortedArticles[context.dataIndex];
                                    return `ID:${article.id} ${article.title}: ${article.views} просмотры`;
                                },
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
                        // Remove old legend items
                        while (ul.firstChild) {
                            ul.firstChild.remove();
                        }
                        // Reuse the built-in legendItems generator
                        const items = c.options.plugins.legend.labels.generateLabels(c);
                        items.forEach((item, index) => {
                            const li = document.createElement('li');
                            li.style.margin = tailwindConfig().theme.margin[1];
                            // Button element
                            const button = document.createElement('button');
                            button.classList.add('btn-xs');
                            button.style.backgroundColor = tailwindConfig().theme.colors.white;
                            button.style.borderWidth = tailwindConfig().theme.borderWidth[1];
                            button.style.borderColor = tailwindConfig().theme.colors.slate[200];
                            button.style.color = tailwindConfig().theme.colors.slate[500];
                            button.style.boxShadow = tailwindConfig().theme.boxShadow.md;
                            button.style.opacity = item.hidden ? '.3' : '';
                            button.onclick = () => {
                                c.toggleDataVisibility(item.index, !item.index);
                                c.update();
                            };
                            // Color box
                            const box = document.createElement('span');
                            box.style.display = 'block';
                            box.style.width = tailwindConfig().theme.width[2];
                            box.style.height = tailwindConfig().theme.height[2];
                            box.style.backgroundColor = item.fillStyle;
                            box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
                            box.style.marginRight = tailwindConfig().theme.margin[1];
                            box.style.pointerEvents = 'none';
                            // Label
                            const label = document.createElement('span');
                            label.style.display = 'flex';
                            label.style.alignItems = 'center';
                            const labelText = document.createTextNode(`${item.text} [${sortedArticles[index].views} просмотры]`);
                            label.appendChild(labelText);
                            li.appendChild(button);
                            button.appendChild(box);
                            button.appendChild(label);
                            ul.appendChild(li);
                        });
                    },
                }],
            });
        });

        onUnmounted(() => {
            if (chart) {
                chart.destroy();
            }
        });

        return {
            canvas,
            legend,
        };
    },
};
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
