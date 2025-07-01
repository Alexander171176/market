import { Chart, Tooltip } from 'chart.js';
import { tailwindConfig } from '@/utils/Utils';

Chart.register(Tooltip);

// Function to get label color based on theme
const getLabelColor = () => {
    return document.documentElement.classList.contains('dark')
        ? tailwindConfig().theme.colors.slate[100] // Color for dark mode
        : tailwindConfig().theme.colors.slate[400]; // Color for light mode
};

// Function to update chart colors
const updateChartColors = () => {
    Chart.defaults.color = getLabelColor();
    Chart.defaults.scale.grid.color = document.documentElement.classList.contains('dark')
        ? tailwindConfig().theme.colors.slate[700] // Grid color for dark mode
        : tailwindConfig().theme.colors.slate[100]; // Grid color for light mode
};

updateChartColors();

// Listen for changes in theme
const observer = new MutationObserver(() => {
    updateChartColors();
    // Update all existing charts
    Object.values(Chart.instances).forEach((instance) => {
        if (instance.options.scales) {
            if (instance.options.scales.x && instance.options.scales.x.ticks) {
                instance.options.scales.x.ticks.color = getLabelColor();
            }
            if (instance.options.scales.y && instance.options.scales.y.ticks) {
                instance.options.scales.y.ticks.color = getLabelColor();
            }
        }
        instance.update();
    });
});

observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = '500';
Chart.defaults.plugins.tooltip.titleColor = tailwindConfig().theme.colors.slate[800];
Chart.defaults.plugins.tooltip.bodyColor = tailwindConfig().theme.colors.slate[800];
Chart.defaults.plugins.tooltip.backgroundColor = tailwindConfig().theme.colors.white;
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.borderColor = tailwindConfig().theme.colors.slate[200];
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = 'nearest';
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
Chart.defaults.plugins.tooltip.padding = 8;

// Register Chart.js plugin to add a bg option for chart area
Chart.register({
    id: 'chartAreaPlugin',
    beforeDraw: (chart) => {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            const ctx = chart.canvas.getContext('2d');
            const { chartArea } = chart;
            if (chartArea) {
                ctx.save();
                ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                ctx.restore();
            }
        }
    },
});
