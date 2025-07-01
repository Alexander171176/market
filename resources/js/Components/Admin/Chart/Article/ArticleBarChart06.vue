<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import '@/utils/ChartjsConfig';
import { tailwindConfig } from '@/utils/Utils'

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

export default {
    name: 'ArticleBarChart06',
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

        onMounted(() => {
            const ctx = canvas.value;
            const data = {
                labels: props.articles.map(article => article.id.toString()), // Используем id статей
                datasets: [
                    {
                        label: 'Views',
                        data: props.articles.map(article => article.views),
                        backgroundColor: tailwindConfig().theme.colors.blue[500],
                        borderColor: tailwindConfig().theme.colors.blue[700],
                        borderWidth: 1,
                    },
                ],
            };

            chart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',
                    layout: {
                        padding: {
                            top: 12,
                            bottom: 16,
                            left: 72,
                            right: 20,
                        },
                    },
                    scales: {
                        y: {
                            grid: {
                                display: false,
                                drawBorder: false,
                                drawTicks: false,
                            },
                            ticks: {
                                display: true,
                            },
                        },
                        x: {
                            grid: {
                                drawBorder: false,
                            },
                            ticks: {
                                stepSize: 10, // Шаг между значениями на оси X
                                maxTicksLimit: 6, // Ограничение количества меток
                                align: 'end',
                                callback: value => value,
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
                                label: context => context.parsed.x,
                            },
                        },
                        title: {
                            display: true,
                            text: 'Количество просмотров статей',
                            font: {
                                size: 18,
                            },
                            padding: {
                                top: 10,
                                bottom: 30
                            }
                        }
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
    <div class="px-5 py-4">
        <ul ref="legend" class="flex flex-wrap"></ul>
    </div>
    <div class="grow">
        <h2 class="text-slate-900 dark:text-slate-300 text-center text-xl mb-1">
            Количество просмотров статей
        </h2>
        <div style="height: 400px;">
            <canvas ref="canvas" :width="width" :height="height"></canvas>
        </div>
    </div>
</template>
