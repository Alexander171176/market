<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import {
    Chart, LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip,
} from 'chart.js';

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);

export default {
    name: 'ArticleLineChart01',
    props: ['articles', 'width', 'height'],
    setup(props) {
        const canvas = ref(null);
        let chart = null;

        const processArticles = () => {
            if (!props.articles || props.articles.length === 0) {
                return {
                    labels: [],
                    datasets: []
                };
            }

            // Сортировка статей по ID
            const sortedArticles = props.articles.sort((a, b) => a.id - b.id);

            const labels = sortedArticles.map(article => `ID: ${article.id}`);
            const viewsData = sortedArticles.map(article => article.views);
            const likesData = sortedArticles.map(article => article.likes);

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
                    },
                    {
                        label: 'Лайки',
                        data: likesData,
                        fill: true,
                        backgroundColor: tailwindConfig().theme.colors.green[100],
                        borderColor: tailwindConfig().theme.colors.green[500],
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
                        pointBorderColor: '#fff',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: tailwindConfig().theme.colors.green[700],
                    }
                ],
            };
        };

        const initializeChart = () => {
            if (!canvas.value) {
                return;
            }

            const ctx = canvas.value;
            const data = processArticles();

            if (!data.labels.length) {
                return;
            }

            chart = new Chart(ctx, {
                type: 'line',
                data,
                options: {
                    chartArea: {
                        backgroundColor: tailwindConfig().theme.colors.slate[50],
                    },
                    layout: {
                        padding: 20,
                    },
                    scales: {
                        y: {
                            display: true,
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Просмотры',
                            },
                        },
                        x: {
                            type: 'category',
                            display: true,
                            title: {
                                display: true,
                                text: 'Лайки',
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title: (context) => context[0].label,
                                label: (context) => context.parsed.y,
                            },
                        },
                        legend: {
                            display: true,
                        },
                    },
                    interaction: {
                        intersect: false,
                        mode: 'nearest',
                    },
                    maintainAspectRatio: false,
                    resizeDelay: 200,
                },
            });
        };

        onMounted(() => {
            initializeChart();
        });

        onUnmounted(() => {
            if (chart) {
                chart.destroy();
            }
        });

        watch(() => props.articles, () => {
            if (chart) {
                const data = processArticles();
                chart.data = data;
                chart.update();
            } else {
                initializeChart();
            }
        });

        return {
            canvas,
        };
    },
};
</script>

<template>
    <canvas ref="canvas" :width="width" :height="height" class="chart-canvas"></canvas>
</template>

<style scoped>
.chart-canvas {
    max-height: 400px; /* Ограничение по высоте */
}
</style>
