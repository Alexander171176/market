import { useSSRContext, ref, computed, onMounted, watch, onUnmounted, mergeProps, nextTick, unref, withCtx, createVNode, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttr, ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import "chartjs-adapter-moment";
import { Chart, Tooltip, BarController, BarElement, LinearScale, TimeScale, CategoryScale, Legend, DoughnutController, ArcElement, LineController, LineElement, Filler, PointElement, PieController, PolarAreaController, RadialLinearScale } from "chart.js";
import resolveConfig from "tailwindcss/resolveConfig.js";
import defaultTheme from "tailwindcss/defaultTheme.js";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "vue-toastification";
import "./ScrollButtons-DpnzINGM.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "axios";
import "vuedraggable";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
const tailwindConfigFile = {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./vendor/laravel/jetstream/**/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.vue"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        inter: ["Inter", "sans-serif"]
      },
      boxShadow: {
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)"
      },
      outline: {
        blue: "2px solid rgba(0, 112, 244, 0.5)"
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }]
      },
      screens: {
        xs: "480px"
      },
      borderWidth: {
        3: "3px"
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        72: "18rem",
        80: "20rem"
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem"
      },
      zIndex: {
        60: "60"
      }
    }
  },
  plugins: [forms, typography]
};
const tailwindConfig = () => {
  return resolveConfig(tailwindConfigFile);
};
const formatValue = (value) => Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumSignificantDigits: 3,
  notation: "compact"
}).format(value);
Chart.register(Tooltip);
const getLabelColor = () => {
  return document.documentElement.classList.contains("dark") ? tailwindConfig().theme.colors.slate[100] : tailwindConfig().theme.colors.slate[400];
};
const updateChartColors = () => {
  Chart.defaults.color = getLabelColor();
  Chart.defaults.scale.grid.color = document.documentElement.classList.contains("dark") ? tailwindConfig().theme.colors.slate[700] : tailwindConfig().theme.colors.slate[100];
};
updateChartColors();
const observer = new MutationObserver(() => {
  updateChartColors();
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
observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = "500";
Chart.defaults.plugins.tooltip.titleColor = tailwindConfig().theme.colors.slate[800];
Chart.defaults.plugins.tooltip.bodyColor = tailwindConfig().theme.colors.slate[800];
Chart.defaults.plugins.tooltip.backgroundColor = tailwindConfig().theme.colors.white;
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.borderColor = tailwindConfig().theme.colors.slate[200];
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = "nearest";
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = "nearest";
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
Chart.defaults.plugins.tooltip.padding = 8;
Chart.register({
  id: "chartAreaPlugin",
  beforeDraw: (chart) => {
    if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
      const ctx = chart.canvas.getContext("2d");
      const { chartArea } = chart;
      if (chartArea) {
        ctx.save();
        ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
        ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        ctx.restore();
      }
    }
  }
});
const _sfc_main$n = {
  setup(__props) {
    Chart.register(BarController, BarElement, LinearScale, TimeScale, CategoryScale, Tooltip, Legend);
    const props = __props;
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    const rubricChartData = computed(() => {
      const createdData = props.rubrics.map((rubric) => ({
        x: new Date(rubric.created_at),
        y: 1
      }));
      const updatedData = props.rubrics.map((rubric) => ({
        x: new Date(rubric.updated_at),
        y: 1
      }));
      const aggregatedData = (data) => {
        const counts = data.reduce((acc, { x }) => {
          const date = x.toISOString().split("T")[0];
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        }, {});
        return Object.keys(counts).map((date) => ({
          x: date,
          y: counts[date]
        }));
      };
      return {
        datasets: [
          {
            label: "Дата создания",
            data: aggregatedData(createdData),
            backgroundColor: "rgba(255, 159, 64, 0.7)",
            // Новый цвет
            borderColor: "rgba(255, 159, 64, 1)",
            // Новый цвет
            borderWidth: 1
          },
          {
            label: "Дата изменения",
            data: aggregatedData(updatedData),
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            // Новый цвет
            borderColor: "rgba(54, 162, 235, 1)",
            // Новый цвет
            borderWidth: 1
          }
        ]
      };
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "bar",
        data: rubricChartData.value,
        options: {
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 20,
              right: 20
            }
          },
          scales: {
            y: {
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 5
              }
            },
            x: {
              type: "time",
              time: {
                unit: "day",
                displayFormats: {
                  day: "MMM D"
                }
              },
              grid: {
                display: false,
                drawBorder: false
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                generateLabels(chart2) {
                  const datasets = chart2.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label === "Дата создания" ? "Создание рубрик" : "Изменение рубрик",
                    fillStyle: dataset.backgroundColor,
                    hidden: !chart2.isDatasetVisible(i),
                    datasetIndex: i
                  }));
                }
              }
            },
            tooltip: {
              callbacks: {
                title: (context) => context[0].label,
                label: (context) => `Количество: ${context.raw.y}`
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.marginRight = tailwindConfig().theme.margin[4];
              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex));
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle;
              box.style.pointerEvents = "none";
              const labelContainer = document.createElement("span");
              labelContainer.style.display = "flex";
              labelContainer.style.alignItems = "center";
              const value = document.createElement("span");
              value.style.color = tailwindConfig().theme.colors.slate[800];
              value.style.fontSize = tailwindConfig().theme.fontSize["3xl"][0];
              value.style.lineHeight = tailwindConfig().theme.fontSize["3xl"][1].lineHeight;
              value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
              value.style.marginRight = tailwindConfig().theme.margin[2];
              value.style.pointerEvents = "none";
              const label = document.createElement("span");
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
          }
        }]
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(rubricChartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="px-5 py-3" data-v-c7ea8de2><ul class="flex flex-wrap" data-v-c7ea8de2></ul></div><div class="grow" data-v-c7ea8de2><canvas${ssrRenderAttr("width", __props.width)}${ssrRenderAttr("height", __props.height)} data-v-c7ea8de2></canvas></div><!--]-->`);
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Rubric/RubricBarChart01.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = {
  setup(__props) {
    Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);
    const props = __props;
    const canvas = ref(null);
    let chart = null;
    const getRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = 0.7;
      return `rgba(${r},${g},${b},${a})`;
    };
    const getRandomColorsArray = (length) => {
      return Array.from({ length }, getRandomColor);
    };
    const articleChartData = computed(() => {
      const colors = getRandomColorsArray(props.articles.length);
      return {
        labels: props.articles.map((article) => `ID: ${article.id}`),
        // Используем ID статей как метки
        datasets: [
          {
            label: "Просмотры статей",
            data: props.articles.map((article) => article.views),
            // Количество просмотров
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      };
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "bar",
        data: articleChartData.value,
        options: {
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 20,
              right: 20
            }
          },
          scales: {
            y: {
              grid: {
                drawBorder: false
              },
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 5,
                callback: (value) => value
                // Убираем форматирование денежных единиц
              }
            },
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0
              }
            }
          },
          plugins: {
            legend: {
              display: true
              // Отображаем легенду
            },
            tooltip: {
              callbacks: {
                title: () => false,
                // Disable tooltip title
                label: (context) => context.parsed.y
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 200
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(() => props.articles, (newData) => {
      if (chart) {
        chart.data = articleChartData.value;
        chart.update();
      }
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-container" }, _attrs))} data-v-6c982aae><canvas${ssrRenderAttr("width", __props.width)}${ssrRenderAttr("height", __props.height)} data-v-6c982aae></canvas></div>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleBarChart02.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = {
  setup(__props) {
    Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);
    const props = __props;
    const canvas = ref(null);
    let chart = null;
    const getRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = 0.7;
      return `rgba(${r},${g},${b},${a})`;
    };
    const getRandomColorsArray = (length) => {
      return Array.from({ length }, getRandomColor);
    };
    const rubricChartData = computed(() => {
      const sortedRubrics = [...props.rubrics].sort((a, b) => a.id - b.id);
      const colors = getRandomColorsArray(sortedRubrics.length);
      return {
        labels: sortedRubrics.map((rubric) => `ID: ${rubric.id}`),
        // Используем ID рубрик как метки
        datasets: [
          {
            label: "Количество статей",
            data: sortedRubrics.map((rubric) => rubric.articles_count),
            // Количество статей в рубрике
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      };
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "bar",
        data: rubricChartData.value,
        options: {
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 20,
              right: 20
            }
          },
          scales: {
            y: {
              grid: {
                drawBorder: false
              },
              beginAtZero: true,
              ticks: {
                maxTicksLimit: 5,
                callback: (value) => value
                // Убираем форматирование денежных единиц
              }
            },
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0
              }
            }
          },
          plugins: {
            legend: {
              display: true
              // Отображаем легенду
            },
            tooltip: {
              callbacks: {
                title: () => false,
                // Disable tooltip title
                label: (context) => context.parsed.y
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 200
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(() => props.rubrics, (newData) => {
      if (chart) {
        chart.data = rubricChartData.value;
        chart.update();
      }
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-container" }, _attrs))} data-v-f0b65188><canvas${ssrRenderAttr("width", __props.width)}${ssrRenderAttr("height", __props.height)} data-v-f0b65188></canvas></div>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Rubric/RubricBarChart02.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);
const _sfc_main$k = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    onMounted(() => {
      const ctx = canvas.value;
      const data = {
        labels: props.articles.map((article) => article.id.toString()),
        // Используем id статей
        datasets: [
          {
            label: "Views",
            data: props.articles.map((article) => article.views),
            backgroundColor: tailwindConfig().theme.colors.blue[500],
            borderColor: tailwindConfig().theme.colors.blue[700],
            borderWidth: 1
          }
        ]
      };
      chart = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          indexAxis: "y",
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 72,
              right: 20
            }
          },
          scales: {
            y: {
              grid: {
                display: false,
                drawBorder: false,
                drawTicks: false
              },
              ticks: {
                display: true
              }
            },
            x: {
              grid: {
                drawBorder: false
              },
              ticks: {
                stepSize: 10,
                // Шаг между значениями на оси X
                maxTicksLimit: 6,
                // Ограничение количества меток
                align: "end",
                callback: (value) => value
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: () => false,
                // Disable tooltip title
                label: (context) => context.parsed.x
              }
            },
            title: {
              display: true,
              text: "Количество просмотров статей",
              font: {
                size: 18
              },
              padding: {
                top: 10,
                bottom: 30
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleBarChart06.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);
const _sfc_main$j = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    onMounted(() => {
      const ctx = canvas.value;
      const data = {
        labels: props.articles.map((article) => article.id.toString()),
        // Используем id статей
        datasets: [
          {
            label: "Likes",
            data: props.articles.map((article) => article.likes),
            backgroundColor: tailwindConfig().theme.colors.green[500],
            borderColor: tailwindConfig().theme.colors.green[700],
            borderWidth: 1
          }
        ]
      };
      chart = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          indexAxis: "y",
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 72,
              right: 20
            }
          },
          scales: {
            y: {
              grid: {
                display: false,
                drawBorder: false,
                drawTicks: false
              },
              ticks: {
                display: true
              }
            },
            x: {
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 6,
                // Увеличено количество меток
                align: "end",
                callback: (value) => Math.round(value / 10) * 10
                // Разница чисел в десятки
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: () => false,
                // Disable tooltip title
                label: (context) => context.parsed.x
              }
            },
            title: {
              display: true,
              text: "Количество лайков статей",
              font: {
                size: 18
              },
              padding: {
                top: 10,
                bottom: 30
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleBarChartLikes06.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);
const _sfc_main$i = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    onMounted(() => {
      const ctx = canvas.value;
      const sortedRubrics = props.rubrics.slice().sort((a, b) => a.id - b.id);
      const data = {
        labels: sortedRubrics.map((rubric) => `${rubric.id}: ${rubric.title}`),
        datasets: [
          {
            label: "Количество статей",
            data: sortedRubrics.map((rubric) => rubric.articles_count),
            backgroundColor: tailwindConfig().theme.colors.purple[500],
            borderColor: tailwindConfig().theme.colors.purple[700],
            borderWidth: 1,
            barThickness: 10
            // Устанавливаем толщину столбцов
          }
        ]
      };
      chart = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          indexAxis: "y",
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 72,
              right: 20
            }
          },
          scales: {
            y: {
              grid: {
                display: false,
                drawBorder: false,
                drawTicks: false
              },
              ticks: {
                display: true
              }
            },
            x: {
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 6,
                // Увеличено количество меток
                align: "end",
                callback: (value) => Math.round(value / 10) * 10
                // Разница чисел в десятки
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: () => false,
                // Disable tooltip title
                label: (context) => context.parsed.x
              }
            },
            title: {
              display: true,
              text: "Количество статей в рубриках",
              font: {
                size: 18
              },
              padding: {
                top: 10,
                bottom: 30
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Rubric/RubricBarChart06.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);
const _sfc_main$h = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    const generateColor = (value, min, max) => {
      const ratio = (value - min) / (max - min);
      const hue = (1 - ratio) * 240;
      return `hsl(${hue}, 100%, 50%)`;
    };
    onMounted(() => {
      const ctx = canvas.value;
      const sortedArticles = props.articles.sort((a, b) => a.views - b.views);
      const minViews = Math.min(...sortedArticles.map((article) => article.views));
      const maxViews = Math.max(...sortedArticles.map((article) => article.views));
      const data = {
        labels: sortedArticles.map((article) => `ID:${article.id} ${article.title}`),
        datasets: [
          {
            label: "Просмотры",
            data: sortedArticles.map((article) => article.views),
            backgroundColor: sortedArticles.map((article) => generateColor(article.views, minViews, maxViews)),
            borderWidth: 1
          }
        ]
      };
      chart = new Chart(ctx, {
        type: "doughnut",
        data,
        options: {
          cutout: "80%",
          layout: {
            padding: 24
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const article = sortedArticles[context.dataIndex];
                  return `ID:${article.id} ${article.title}: ${article.views} просмотры`;
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item, index) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1];
              const button = document.createElement("button");
              button.classList.add("btn-xs");
              button.style.backgroundColor = tailwindConfig().theme.colors.white;
              button.style.borderWidth = tailwindConfig().theme.borderWidth[1];
              button.style.borderColor = tailwindConfig().theme.colors.slate[200];
              button.style.color = tailwindConfig().theme.colors.slate[500];
              button.style.boxShadow = tailwindConfig().theme.boxShadow.md;
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.toggleDataVisibility(item.index, !item.index);
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = "none";
              const label = document.createElement("span");
              label.style.display = "flex";
              label.style.alignItems = "center";
              const labelText = document.createTextNode(`${item.text} [${sortedArticles[index].views} просмотры]`);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }]
      });
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleDoughnutChart.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);
const _sfc_main$g = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    onMounted(() => {
      try {
        const ctx = canvas.value;
        const sortedRubrics = [...props.rubrics].sort((a, b) => a.articles_count - b.articles_count);
        const generateColor = (value, min, max) => {
          const ratio = (value - min) / (max - min);
          const r = Math.floor(255 * ratio);
          const g = Math.floor(255 * (1 - ratio));
          const b = Math.floor(255 * (1 - ratio));
          return `rgb(${r}, ${g}, ${b})`;
        };
        const minArticlesCount = Math.min(...sortedRubrics.map((rubric) => rubric.articles_count));
        const maxArticlesCount = Math.max(...sortedRubrics.map((rubric) => rubric.articles_count));
        const backgroundColors = sortedRubrics.map((rubric) => generateColor(rubric.articles_count, minArticlesCount, maxArticlesCount));
        const data = {
          labels: sortedRubrics.map((rubric) => `${rubric.id}: ${rubric.title}`),
          datasets: [
            {
              label: "Количество статей",
              data: sortedRubrics.map((rubric) => rubric.articles_count),
              backgroundColor: backgroundColors,
              borderWidth: 1
            }
          ]
        };
        chart = new Chart(ctx, {
          type: "doughnut",
          data,
          options: {
            cutout: "80%",
            layout: {
              padding: 24
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const rubric = sortedRubrics[context.dataIndex];
                    return `ID:${rubric.id} Количество статей: ${rubric.articles_count}`;
                  }
                }
              }
            },
            interaction: {
              intersect: false,
              mode: "nearest"
            },
            animation: {
              duration: 500
            },
            maintainAspectRatio: false,
            resizeDelay: 200
          },
          plugins: [{
            id: "htmlLegend",
            afterUpdate(c, args, options) {
              const ul = legend.value;
              if (!ul)
                return;
              while (ul.firstChild) {
                ul.firstChild.remove();
              }
              const items = c.options.plugins.legend.labels.generateLabels(c);
              items.forEach((item, index) => {
                const li = document.createElement("li");
                li.style.margin = tailwindConfig().theme.margin[1];
                const button = document.createElement("button");
                button.classList.add("btn-xs");
                button.style.backgroundColor = tailwindConfig().theme.colors.white;
                button.style.borderWidth = tailwindConfig().theme.borderWidth[1];
                button.style.borderColor = tailwindConfig().theme.colors.slate[200];
                button.style.color = tailwindConfig().theme.colors.slate[500];
                button.style.boxShadow = tailwindConfig().theme.boxShadow.md;
                button.style.opacity = item.hidden ? ".3" : "";
                button.onclick = () => {
                  c.toggleDataVisibility(item.index, !item.index);
                  c.update();
                };
                const box = document.createElement("span");
                box.style.display = "block";
                box.style.width = tailwindConfig().theme.width[2];
                box.style.height = tailwindConfig().theme.height[2];
                box.style.backgroundColor = item.fillStyle;
                box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
                box.style.marginRight = tailwindConfig().theme.margin[1];
                box.style.pointerEvents = "none";
                const label = document.createElement("span");
                label.style.display = "flex";
                label.style.alignItems = "center";
                const labelText = document.createTextNode(`${item.text} [${sortedRubrics[index].articles_count}]`);
                label.appendChild(labelText);
                li.appendChild(button);
                button.appendChild(box);
                button.appendChild(label);
                ul.appendChild(li);
              });
            }
          }]
        });
      } catch (error) {
        console.error("Ошибка при монтаже RubricDoughnutChart:", error);
      }
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Rubric/RubricDoughnutChart.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);
const _sfc_main$f = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    onMounted(() => {
      const ctx = canvas.value;
      const sortedArticles = [...props.articles].sort((a, b) => a.likes - b.likes);
      const colors = [
        tailwindConfig().theme.colors.blue[500],
        tailwindConfig().theme.colors.green[500],
        tailwindConfig().theme.colors.yellow[500],
        tailwindConfig().theme.colors.orange[500],
        tailwindConfig().theme.colors.red[500]
      ];
      const backgroundColors = sortedArticles.map((article) => {
        const maxLikes = Math.max(...sortedArticles.map((a) => a.likes));
        const colorIndex = Math.floor(article.likes / maxLikes * (colors.length - 1));
        return colors[colorIndex];
      });
      const data = {
        labels: sortedArticles.map((article) => `${article.id}: ${article.title}`),
        datasets: [
          {
            label: "Лайки",
            data: sortedArticles.map((article) => article.likes),
            backgroundColor: backgroundColors,
            borderWidth: 1
          }
        ]
      };
      chart = new Chart(ctx, {
        type: "doughnut",
        data,
        options: {
          cutout: "80%",
          layout: {
            padding: 24
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const article = sortedArticles[context.dataIndex];
                  return `ID:${article.id} Лайки: ${article.likes}`;
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item, index) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1];
              const button = document.createElement("button");
              button.classList.add("btn-xs");
              button.style.backgroundColor = tailwindConfig().theme.colors.white;
              button.style.borderWidth = tailwindConfig().theme.borderWidth[1];
              button.style.borderColor = tailwindConfig().theme.colors.slate[200];
              button.style.color = tailwindConfig().theme.colors.slate[500];
              button.style.boxShadow = tailwindConfig().theme.boxShadow.md;
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.toggleDataVisibility(item.index, !item.index);
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = "none";
              const label = document.createElement("span");
              label.style.display = "flex";
              label.style.alignItems = "center";
              const labelText = document.createTextNode(`${item.text} [${sortedArticles[index].likes}]`);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }]
      });
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleDoughnutChartLikes.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);
const _sfc_main$e = {
  name: "ArticleLineChart01",
  props: ["articles", "width", "height"],
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
      const sortedArticles = props.articles.sort((a, b) => a.id - b.id);
      const labels = sortedArticles.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.map((article) => article.views);
      const likesData = sortedArticles.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: true,
            backgroundColor: tailwindConfig().theme.colors.blue[100],
            borderColor: tailwindConfig().theme.colors.blue[500],
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[700]
          },
          {
            label: "Лайки",
            data: likesData,
            fill: true,
            backgroundColor: tailwindConfig().theme.colors.green[100],
            borderColor: tailwindConfig().theme.colors.green[500],
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.green[500],
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: tailwindConfig().theme.colors.green[700]
          }
        ]
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
        type: "line",
        data,
        options: {
          chartArea: {
            backgroundColor: tailwindConfig().theme.colors.slate[50]
          },
          layout: {
            padding: 20
          },
          scales: {
            y: {
              display: true,
              beginAtZero: true,
              title: {
                display: true,
                text: "Просмотры"
              }
            },
            x: {
              type: "category",
              display: true,
              title: {
                display: true,
                text: "Лайки"
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => context[0].label,
                label: (context) => context.parsed.y
              }
            },
            legend: {
              display: true
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
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
      canvas
    };
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<canvas${ssrRenderAttrs(mergeProps({
    ref: "canvas",
    width: $props.width,
    height: $props.height,
    class: "chart-canvas"
  }, _attrs))} data-v-87d8fa5c></canvas>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart01.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const ArticleLineChart01 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-87d8fa5c"]]);
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
const _sfc_main$d = {
  name: "ArticleLineChart02",
  props: ["articles", "width", "height"],
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const randomColor = () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    };
    const viewsColor = ref(randomColor());
    const likesColor = ref(randomColor());
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.value.map((article) => article.views);
      const likesData = sortedArticles.value.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: true,
            backgroundColor: viewsColor.value,
            borderColor: viewsColor.value,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: viewsColor.value,
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: viewsColor.value
          },
          {
            label: "Лайки",
            data: likesData,
            fill: true,
            backgroundColor: likesColor.value,
            borderColor: likesColor.value,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: likesColor.value,
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: likesColor.value
          }
        ]
      };
    });
    const totalViews = computed(() => {
      return sortedArticles.value.reduce((acc, article) => acc + article.views, 0);
    });
    const totalLikes = computed(() => {
      return sortedArticles.value.reduce((acc, article) => acc + article.likes, 0);
    });
    const totalArticles = computed(() => {
      return sortedArticles.value.length;
    });
    const differenceLabel = computed(() => {
      const difference = totalViews.value - totalLikes.value;
      const percentage = (difference / totalViews.value * 100).toFixed(2);
      return `${difference} (${percentage}%)`;
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          layout: {
            padding: 20
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                beginAtZero: true
              },
              ticks: {
                maxTicksLimit: 5,
                callback: (value) => value,
                title: {
                  display: true,
                  text: "Просмотры"
                }
              }
            },
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                title: {
                  display: true,
                  text: "ID Статьи"
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                generateLabels(chart2) {
                  const datasets = chart2.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    hidden: !chart2.isDatasetVisible(i),
                    datasetIndex: i
                  }));
                }
              }
            },
            tooltip: {
              callbacks: {
                title: (context) => context[0].label,
                label: (context) => context.parsed.y
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.marginLeft = tailwindConfig().theme.margin[3];
              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex));
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle;
              box.style.pointerEvents = "none";
              const label = document.createElement("span");
              label.style.color = tailwindConfig().theme.colors.slate[500];
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }]
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend,
      totalViews,
      totalArticles,
      differenceLabel
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="px-5 py-3" data-v-eea87835><div class="flex flex-wrap justify-between items-end" data-v-eea87835><div class="flex items-start" data-v-eea87835><div class="text-3xl font-bold text-slate-800 mr-2" data-v-eea87835>${ssrInterpolate($setup.totalArticles)}</div><div class="text-sm font-semibold text-white px-1.5 bg-amber-500 rounded-full" data-v-eea87835>${ssrInterpolate($setup.differenceLabel)}</div></div><div class="grow ml-2 mb-1" data-v-eea87835><ul class="flex flex-wrap justify-end" data-v-eea87835></ul></div></div></div><div class="grow" data-v-eea87835><canvas${ssrRenderAttr("width", $props.width)}${ssrRenderAttr("height", $props.height)} data-v-eea87835></canvas></div><!--]-->`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart02.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const ArticleLineChart02 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-eea87835"]]);
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);
const _sfc_main$c = {
  name: "ArticleLineChart03",
  props: ["articles", "width", "height"],
  setup(props) {
    const canvas = ref(null);
    let chart = null;
    const chartData = computed(() => {
      const sortedArticles = [...props.articles].sort((a, b) => a.id - b.id);
      const labels = sortedArticles.map((article) => `ID: ${article.id} - ${article.title}`);
      const viewsData = sortedArticles.map((article) => article.views);
      const likesData = sortedArticles.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: true,
            backgroundColor: "rgba(255, 204, 153, 0.7)",
            // цвет для просмотров
            borderColor: "rgba(255, 204, 153, 1)",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(255, 204, 153, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255, 204, 153, 1)"
          },
          {
            label: "Лайки",
            data: likesData,
            fill: true,
            backgroundColor: "rgba(153, 255, 204, 0.7)",
            // цвет для лайков
            borderColor: "rgba(153, 255, 204, 1)",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(153, 255, 204, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(153, 255, 204, 1)"
          }
        ]
      };
    });
    const createChart = async () => {
      await nextTick();
      if (!canvas.value)
        return;
      const ctx = canvas.value.getContext("2d");
      if (!ctx)
        return;
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          layout: {
            padding: 20
          },
          scales: {
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                title: {
                  display: true,
                  text: "ID и Название"
                }
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 10,
                // Увеличение количества меток
                callback: (value) => value,
                title: {
                  display: true,
                  text: "Лайки"
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              callbacks: {
                title: (context) => context[0].label,
                // Включение отображения title в тултипе
                label: (context) => context.parsed.y
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-container" }, _attrs))} data-v-1861155d><canvas${ssrRenderAttr("width", $props.width)}${ssrRenderAttr("height", $props.height)} data-v-1861155d></canvas></div>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart03.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const ArticleLineChart03 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-1861155d"]]);
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);
const _sfc_main$b = {
  name: "ArticleLineChart04",
  props: ["articles", "width", "height"],
  setup(props) {
    const canvas = ref(null);
    let chart = null;
    const chartData = computed(() => {
      const sortedArticles = [...props.articles].sort((a, b) => a.id - b.id);
      const labels = sortedArticles.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.map((article) => article.views);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: true,
            backgroundColor: tailwindConfig().theme.colors.blue[100],
            borderColor: tailwindConfig().theme.colors.blue[500],
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[700]
          }
        ]
      };
    });
    const createChart = async () => {
      await nextTick();
      if (!canvas.value) {
        console.error("Canvas element not found");
        return;
      }
      const ctx = canvas.value.getContext("2d");
      if (!ctx) {
        console.error("Не удается получить 2D-контекст с canvas");
        return;
      }
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          chartArea: {
            backgroundColor: tailwindConfig().theme.colors.slate[50]
          },
          layout: {
            padding: {
              left: 20,
              right: 20
            }
          },
          scales: {
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              title: {
                display: true,
                text: "ID статей"
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              title: {
                display: true,
                text: "Просмотры"
              },
              ticks: {
                maxTicksLimit: 10,
                callback: (value) => value
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${context[0].label}`,
                label: (context) => `Просмотры: ${context.parsed.y}`
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, () => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-container" }, _attrs))} data-v-27020d5f><canvas${ssrRenderAttr("width", $props.width)}${ssrRenderAttr("height", $props.height)} data-v-27020d5f></canvas></div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart04.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const ArticleLineChart04 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-27020d5f"]]);
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);
const _sfc_main$a = {
  setup(props) {
    const canvas = ref(null);
    let chart = null;
    const chartData = computed(() => {
      const sortedArticles = [...props.articles].sort((a, b) => a.id - b.id);
      const labels = sortedArticles.map((article) => `ID: ${article.id}`);
      sortedArticles.map((article) => article.views);
      const likesData = sortedArticles.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Лайки",
            data: likesData,
            fill: true,
            backgroundColor: tailwindConfig().theme.colors.teal[100],
            borderColor: tailwindConfig().theme.colors.teal[500],
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.teal[500],
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: tailwindConfig().theme.colors.teal[700]
          }
        ]
      };
    });
    const createChart = async () => {
      await nextTick();
      if (!canvas.value) {
        console.error("Canvas element not found");
        return;
      }
      const ctx = canvas.value.getContext("2d");
      if (!ctx) {
        console.error("Не удается получить 2D-контекст с canvas");
        return;
      }
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          chartArea: {
            backgroundColor: tailwindConfig().theme.colors.slate[50]
          },
          layout: {
            padding: {
              left: 20,
              right: 20
            }
          },
          scales: {
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              title: {
                display: true,
                text: "ID статей"
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              title: {
                display: true,
                text: "Лайки"
              },
              ticks: {
                maxTicksLimit: 10,
                callback: (value) => value
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${context[0].label}, Просмотры: ${props.articles[context[0].dataIndex].views}`,
                label: (context) => `Лайки: ${context.parsed.y}`
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, () => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChartLikes04.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);
const _sfc_main$9 = {
  setup(props) {
    const canvas = ref(null);
    let chart = null;
    const chartData = computed(() => {
      const sortedRubrics = [...props.rubrics].sort((a, b) => a.id - b.id);
      const labels = sortedRubrics.map((rubric) => `ID: ${rubric.id}`);
      const articlesCountData = sortedRubrics.map((rubric) => rubric.articles_count);
      return {
        labels,
        datasets: [
          {
            label: "Количество статей",
            data: articlesCountData,
            fill: true,
            backgroundColor: tailwindConfig().theme.colors.green[100],
            borderColor: tailwindConfig().theme.colors.green[500],
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.green[500],
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: tailwindConfig().theme.colors.green[700]
          }
        ]
      };
    });
    const createChart = async () => {
      await nextTick();
      if (!canvas.value) {
        console.error("Canvas element not found");
        return;
      }
      const ctx = canvas.value.getContext("2d");
      if (!ctx) {
        console.error("Не удается получить 2D-контекст с canvas");
        return;
      }
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          chartArea: {
            backgroundColor: tailwindConfig().theme.colors.slate[50]
          },
          layout: {
            padding: {
              left: 20,
              right: 20
            }
          },
          scales: {
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              title: {
                display: true,
                text: "ID рубрик"
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              title: {
                display: true,
                text: "Количество статей"
              },
              ticks: {
                maxTicksLimit: 10,
                callback: (value) => value
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${context[0].label}`,
                label: (context) => `Количество статей: ${context.parsed.y}`
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, () => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Rubric/RubricLineChart04.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
const _sfc_main$8 = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const randomColor = () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    };
    const likesColor = ref(randomColor());
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.value.map((article) => article.views);
      const likesData = sortedArticles.value.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: false,
            borderColor: randomColor(),
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: randomColor(),
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: randomColor(),
            yAxisID: "y-views"
          },
          {
            label: "Лайки",
            data: likesData,
            fill: false,
            borderColor: likesColor.value,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: likesColor.value,
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: likesColor.value,
            yAxisID: "y-likes"
          }
        ]
      };
    });
    const totalArticles = computed(() => {
      return sortedArticles.value.length;
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          layout: {
            padding: 20
          },
          scales: {
            "y-views": {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7,
                callback: (value) => value,
                title: {
                  display: true,
                  text: "Просмотры"
                }
              }
            },
            "y-likes": {
              beginAtZero: true,
              position: "right",
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7,
                callback: (value) => value,
                title: {
                  display: true,
                  text: "Лайки"
                }
              }
            },
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                title: {
                  display: true,
                  text: "ID Статьи"
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                generateLabels(chart2) {
                  const datasets = chart2.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label,
                    fillStyle: dataset.borderColor,
                    hidden: !chart2.isDatasetVisible(i),
                    datasetIndex: i
                  }));
                }
              }
            },
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${sortedArticles.value[context[0].dataIndex].id}`,
                label: (context) => `${context.dataset.label}: ${context.parsed.y}`
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.marginLeft = tailwindConfig().theme.margin[3];
              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex));
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.pointerEvents = "none";
              const label = document.createElement("span");
              label.style.color = tailwindConfig().theme.colors.slate[500];
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }]
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend,
      totalArticles
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart05.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);
const _sfc_main$7 = {
  setup(props) {
    const canvas = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.value.map((article) => article.views);
      const likesData = sortedArticles.value.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)"
          },
          {
            label: "Лайки",
            data: likesData,
            fill: true,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(153, 102, 255, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(153, 102, 255, 1)"
          }
        ]
      };
    });
    const totalArticles = computed(() => {
      return sortedArticles.value.length;
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 20,
              right: 20
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7,
                callback: (value) => formatValue(value),
                title: {
                  display: true,
                  text: "Лайки"
                }
              }
            },
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                title: {
                  display: true,
                  text: "Просмотры"
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${sortedArticles.value[context[0].dataIndex].id}`,
                label: (context) => `${context.dataset.label}: ${context.parsed.y}`
              }
            },
            legend: {
              display: false
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      totalArticles
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart06.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip);
const _sfc_main$6 = {
  setup(props) {
    const canvas = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.value.map((article) => article.views);
      const likesData = sortedArticles.value.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: false,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderWidth: 1.5,
            tension: 0.1,
            pointRadius: 5,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "rgba(54, 162, 235, 1)"
          },
          {
            label: "Лайки",
            data: likesData,
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1.5,
            tension: 0.1,
            pointRadius: 5,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)"
          }
        ]
      };
    });
    const totalArticles = computed(() => {
      return sortedArticles.value.length;
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          layout: {
            padding: {
              top: 16,
              bottom: 24,
              left: 32,
              right: 32
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7,
                callback: (value) => value,
                title: {
                  display: true,
                  text: "Лайки"
                }
              }
            },
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                align: "start",
                title: {
                  display: true,
                  text: "Просмотры"
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${sortedArticles.value[context[0].dataIndex].id}`,
                label: (context) => `${context.dataset.label}: ${context.parsed.y}`
              }
            },
            legend: {
              display: true,
              position: "top",
              labels: {
                boxWidth: 12,
                boxHeight: 12,
                padding: 15,
                generateLabels(chart2) {
                  const datasets = chart2.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label,
                    fillStyle: dataset.borderColor,
                    hidden: !chart2.isDatasetVisible(i),
                    datasetIndex: i
                  }));
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "index"
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      totalArticles
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart07.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);
const _sfc_main$5 = {
  setup(props) {
    const canvas = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => article.created_at);
      const viewsData = sortedArticles.value.map((article) => article.views);
      const likesData = sortedArticles.value.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(54, 162, 235, 1)"
          },
          {
            label: "Лайки",
            data: likesData,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)"
          }
        ]
      };
    });
    const totalArticles = computed(() => {
      return sortedArticles.value.length;
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          layout: {
            padding: {
              top: 16,
              bottom: 16,
              left: 20,
              right: 20
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                drawTicks: false
              },
              ticks: {
                maxTicksLimit: 2,
                display: false
              }
            },
            x: {
              type: "time",
              time: {
                unit: "day",
                // Растягиваем шкалу даты на месяц
                tooltipFormat: "ll",
                displayFormats: {
                  day: "MMM DD"
                  // Формат отображения дней
                }
              },
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                title: {
                  display: true,
                  text: "Дата"
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${sortedArticles.value[context[0].dataIndex].id}`,
                label: (context) => `${context.dataset.label}: ${context.parsed.y}`
              }
            },
            legend: {
              display: false
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false
        }
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      totalArticles
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart08.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip, Legend);
const _sfc_main$4 = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => article.created_at);
      const viewsData = sortedArticles.value.map((article) => article.views);
      const likesData = sortedArticles.value.map((article) => article.likes);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data: viewsData,
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(54, 162, 235, 1)"
          },
          {
            label: "Лайки",
            data: likesData,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255, 99, 132, 1)"
          }
        ]
      };
    });
    const totalArticles = computed(() => {
      return sortedArticles.value.length;
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "line",
        data: chartData.value,
        options: {
          layout: {
            padding: {
              top: 12,
              bottom: 16,
              left: 20,
              right: 20
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 7,
                callback: (value) => value.toString()
                // Убираем символы валюты
              }
            },
            x: {
              type: "category",
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0,
                align: "end"
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => `ID: ${sortedArticles.value[context[0].dataIndex].id}`,
                label: (context) => `${context.dataset.label}: ${context.parsed.y}`
              }
            },
            legend: {
              display: true,
              labels: {
                generateLabels(chart2) {
                  const datasets = chart2.data.datasets;
                  return datasets.map((dataset, i) => ({
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    hidden: !chart2.isDatasetVisible(i),
                    datasetIndex: i
                  }));
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          maintainAspectRatio: false
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.marginLeft = tailwindConfig().theme.margin[3];
              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex));
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle;
              box.style.pointerEvents = "none";
              const label = document.createElement("span");
              label.style.color = tailwindConfig().theme.colors.slate[500];
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }]
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend,
      totalArticles
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleLineChart09.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
Chart.register(PieController, ArcElement, Tooltip);
const _sfc_main$3 = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const randomColor = () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    };
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.value.map((article) => article.views);
      return {
        labels,
        datasets: [
          {
            data: viewsData,
            backgroundColor: viewsData.map(() => randomColor()),
            borderColor: viewsData.map(() => randomColor()),
            borderWidth: 1.5
          }
        ]
      };
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "pie",
        data: chartData.value,
        options: {
          layout: {
            padding: {
              top: 4,
              bottom: 4,
              left: 24,
              right: 24
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context) => `ID: ${sortedArticles.value[context.dataIndex].id}, Просмотры: ${context.raw}`
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 200
          },
          maintainAspectRatio: false
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1.5];
              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.toggleDataVisibility(item.index, !item.index);
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[1.5];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle;
              box.style.pointerEvents = "none";
              const label = document.createElement("span");
              label.style.color = tailwindConfig().theme.colors.slate[500];
              label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
              label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }]
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticlePieChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
Chart.register(PolarAreaController, RadialLinearScale, Tooltip, Legend);
const _sfc_main$2 = {
  setup(props) {
    const canvas = ref(null);
    const legend = ref(null);
    let chart = null;
    const sortedArticles = computed(() => {
      return [...props.articles].sort((a, b) => a.id - b.id);
    });
    const randomColor = () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    };
    const chartData = computed(() => {
      const labels = sortedArticles.value.map((article) => `ID: ${article.id}`);
      const viewsData = sortedArticles.value.map((article) => article.views);
      return {
        labels,
        datasets: [
          {
            data: viewsData,
            backgroundColor: viewsData.map(() => randomColor()),
            borderColor: viewsData.map(() => randomColor()),
            borderWidth: 1.5
          }
        ]
      };
    });
    const createChart = () => {
      if (chart) {
        chart.destroy();
      }
      const ctx = canvas.value;
      chart = new Chart(ctx, {
        type: "polarArea",
        data: chartData.value,
        options: {
          layout: {
            padding: 24
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context) => `ID: ${sortedArticles.value[context.dataIndex].id}, Просмотры: ${context.raw}`
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: {
            duration: 500
          },
          maintainAspectRatio: false,
          resizeDelay: 200
        },
        plugins: [{
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend.value;
            if (!ul)
              return;
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            const items = c.options.plugins.legend.labels.generateLabels(c);
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.margin = tailwindConfig().theme.margin[1];
              const button = document.createElement("button");
              button.classList.add("btn-xs");
              button.style.backgroundColor = tailwindConfig().theme.colors.white;
              button.style.borderWidth = tailwindConfig().theme.borderWidth[1];
              button.style.borderColor = tailwindConfig().theme.colors.slate[200];
              button.style.color = tailwindConfig().theme.colors.slate[500];
              button.style.boxShadow = tailwindConfig().theme.boxShadow.md;
              button.style.opacity = item.hidden ? ".3" : "";
              button.onclick = () => {
                c.toggleDataVisibility(item.index, !item.index);
                c.update();
              };
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[2];
              box.style.height = tailwindConfig().theme.height[2];
              box.style.backgroundColor = item.fillStyle;
              box.style.borderRadius = tailwindConfig().theme.borderRadius.sm;
              box.style.marginRight = tailwindConfig().theme.margin[1];
              box.style.pointerEvents = "none";
              const label = document.createElement("span");
              label.style.display = "flex";
              label.style.alignItems = "center";
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          }
        }]
      });
    };
    onMounted(() => {
      createChart();
    });
    watch(chartData, (newData) => {
      createChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return {
      canvas,
      legend
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticlePolarChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip);
const _sfc_main$1 = {
  setup(props) {
    const canvas = ref(null);
    const chartValue = ref(null);
    const chartDeviation = ref(null);
    let chart = null;
    const processArticles = () => {
      const labels = props.articles.map((article) => new Date(article.created_at));
      const data = props.articles.map((article) => article.views);
      return {
        labels,
        datasets: [
          {
            label: "Просмотры",
            data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)"
          }
        ]
      };
    };
    const handleHeaderValues = (data, chartValue2, chartDeviation2) => {
      const currentValue = data.datasets[0].data[data.datasets[0].data.length - 1];
      const previousValue = data.datasets[0].data[data.datasets[0].data.length - 2];
      const diff = (currentValue - previousValue) / previousValue * 100;
      chartValue2.value.innerHTML = currentValue;
      chartDeviation2.value.style.backgroundColor = diff < 0 ? tailwindConfig().theme.colors.amber[500] : tailwindConfig().theme.colors.emerald[500];
      chartDeviation2.value.innerHTML = `${diff > 0 ? "+" : ""}${diff.toFixed(2)}%`;
    };
    const initializeChart = () => {
      const ctx = canvas.value;
      const data = processArticles();
      chart = new Chart(ctx, {
        type: "line",
        data,
        options: {
          layout: {
            padding: 20
          },
          scales: {
            y: {
              grid: {
                drawBorder: false
              },
              suggestedMin: 0,
              suggestedMax: 100,
              // Update these values based on your data range
              ticks: {
                maxTicksLimit: 5,
                callback: (value) => formatValue(value)
              }
            },
            x: {
              type: "time",
              time: {
                unit: "minute",
                // Adjust the unit as per your requirement
                tooltipFormat: "MMM DD, H:mm:ss a",
                displayFormats: {
                  minute: "H:mm:ss"
                }
              },
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                autoSkipPadding: 48,
                maxRotation: 0
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              titleFont: {
                weight: "600"
              },
              callbacks: {
                label: (context) => formatValue(context.parsed.y)
              }
            }
          },
          interaction: {
            intersect: false,
            mode: "nearest"
          },
          animation: false,
          maintainAspectRatio: false,
          resizeDelay: 200
        }
      });
      handleHeaderValues(data, chartValue, chartDeviation);
    };
    onMounted(() => {
      initializeChart();
    });
    onUnmounted(() => {
      if (chart) {
        chart.destroy();
      }
    });
    watch(
      () => props.articles,
      () => {
        if (chart) {
          const data = processArticles();
          chart.data = data;
          chart.update();
          handleHeaderValues(data, chartValue, chartDeviation);
        }
      }
    );
    return {
      canvas,
      chartValue,
      chartDeviation
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Chart/Article/ArticleRealtimeChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    rubrics: {
      type: Array,
      default: () => []
    },
    articles: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("charts")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("charts"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("charts")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("charts")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}></div>`);
            _push2(ssrRenderComponent(ArticleLineChart01, {
              articles: props.articles,
              width: 600,
              height: 400
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ArticleLineChart02, {
              articles: props.articles,
              width: 600,
              height: 400
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ArticleLineChart03, {
              articles: props.articles,
              width: 600,
              height: 400
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ArticleLineChart04, {
              articles: props.articles,
              width: 600,
              height: 400
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }),
                  createVNode(ArticleLineChart01, {
                    articles: props.articles,
                    width: 600,
                    height: 400
                  }, null, 8, ["articles"]),
                  createVNode(ArticleLineChart02, {
                    articles: props.articles,
                    width: 600,
                    height: 400
                  }, null, 8, ["articles"]),
                  createVNode(ArticleLineChart03, {
                    articles: props.articles,
                    width: 600,
                    height: 400
                  }, null, 8, ["articles"]),
                  createVNode(ArticleLineChart04, {
                    articles: props.articles,
                    width: 600,
                    height: 400
                  }, null, 8, ["articles"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Charts/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
