import { ref, mergeProps, unref, useSSRContext, withCtx, createVNode, createBlock, openBlock, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { useI18n } from "vue-i18n";
import { Bar } from "vue-chartjs";
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { MarkerType, useVueFlow, VueFlow as VueFlow$1 } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls, ControlButton } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
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
const _sfc_main$3 = {
  __name: "BarChart",
  __ssrInlineRender: true,
  setup(__props) {
    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
    const datacollection = ref({
      labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль"],
      datasets: [
        {
          label: "Дата",
          backgroundColor: "#6c9",
          data: [40, 20, 12, 39, 10, 40, 39]
        }
      ]
    });
    const options = ref({
      responsive: true,
      maintainAspectRatio: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-container" }, _attrs))} data-v-8fa71bfd>`);
      _push(ssrRenderComponent(unref(Bar), {
        data: datacollection.value,
        options: options.value
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Diagram/BarChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BarChart = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-8fa71bfd"]]);
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Блок 1" },
    position: { x: 250, y: 0 },
    class: "light"
  },
  {
    id: "2",
    type: "output",
    data: { label: "Блок 2" },
    position: { x: 100, y: 100 },
    class: "light"
  },
  {
    id: "3",
    data: { label: "Блок 3" },
    position: { x: 400, y: 100 },
    class: "light"
  },
  {
    id: "4",
    data: { label: "Блок 4" },
    position: { x: 150, y: 200 },
    class: "light"
  },
  {
    id: "5",
    type: "output",
    data: { label: "Блок 5" },
    position: { x: 300, y: 300 },
    class: "light"
  }
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    label: "кромка с наконечником стрелы",
    markerEnd: MarkerType.ArrowClosed
  },
  {
    id: "e4-5",
    type: "step",
    source: "4",
    target: "5",
    label: "Оранжевый Блок",
    style: { stroke: "orange" },
    labelBgStyle: { fill: "orange" }
  },
  {
    id: "e3-4",
    type: "smoothstep",
    source: "3",
    target: "4",
    label: "гладкая ступенчатая кромка"
  }
];
const _sfc_main$2 = {
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.name === "reset") {
        _push(`<svg width="16" height="16" viewBox="0 0 32 32"><path d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.name === "update") {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24"><path d="M14 20v-2h2.6l-3.2-3.2l1.425-1.425L18 16.55V14h2v6Zm-8.6 0L4 18.6L16.6 6H14V4h6v6h-2V7.4Zm3.775-9.425L4 5.4L5.4 4l5.175 5.175Z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.name === "sun") {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 17q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287q.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05L4.575 6q-.3-.275-.288-.7q.013-.425.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7q0 .4-.275.7q-.275.3-.687.287q-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712q0-.413.275-.688q.275-.3.688-.287q.412.012.712.287L19.425 18q.3.275.288.7q-.013.425-.288.725q-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688q.012-.412.287-.712L18 4.575q.275-.3.7-.288q.425.013.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275q-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275q.412 0 .687.275q.3.275.288.688q-.013.412-.288.712L6 19.425q-.275.3-.7.287q-.425-.012-.725-.287Z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.name === "moon") {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025q.337.025.662.075q-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613q1.15-.612 1.875-1.637q.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.name === "log") {
        _push(`<svg width="16" height="16" viewBox="0 0 24 24"><path d="M20 19V7H4v12h16m0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16m-7 14v-2h5v2h-5m-3.42-4L5.57 9H8.4l3.3 3.3c.39.39.39 1.03 0 1.42L8.42 17H5.59l3.99-4Z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Diagram/Icon.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "VueFlow",
  __ssrInlineRender: true,
  setup(__props) {
    const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow();
    const nodes = ref(initialNodes);
    const edges = ref(initialEdges);
    const dark = ref(false);
    onInit((vueFlowInstance) => {
      vueFlowInstance.fitView();
    });
    onNodeDragStop(({ event, nodes: nodes2, node }) => {
    });
    onConnect((connection) => {
      addEdges(connection);
    });
    function updatePos() {
      nodes.value = nodes.value.map((node) => {
        return {
          ...node,
          position: {
            x: Math.random() * 400,
            y: Math.random() * 400
          }
        };
      });
    }
    function logToObject() {
      console.log(toObject());
    }
    function resetTransform() {
      setViewport({ x: 0, y: 0, zoom: 1 });
    }
    function toggleDarkMode() {
      dark.value = !dark.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flow-container" }, _attrs))} data-v-6ad0c988>`);
      _push(ssrRenderComponent(unref(VueFlow$1), {
        nodes: nodes.value,
        edges: edges.value,
        class: [{ dark: dark.value }, "basic-flow"],
        "default-viewport": { zoom: 1.5 },
        "min-zoom": 0.2,
        "max-zoom": 4
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Background), {
              "pattern-color": "#aaa",
              gap: 16
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(MiniMap), null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Controls), { position: "top-left" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ControlButton), {
                    title: "Reset Transform",
                    onClick: resetTransform
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, { name: "reset" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, { name: "reset" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ControlButton), {
                    title: "Shuffle Node Positions",
                    onClick: updatePos
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, { name: "update" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, { name: "update" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ControlButton), {
                    title: "Toggle Dark Mode",
                    onClick: toggleDarkMode
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (dark.value) {
                          _push4(ssrRenderComponent(_sfc_main$2, { name: "sun" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(_sfc_main$2, { name: "moon" }, null, _parent4, _scopeId3));
                        }
                      } else {
                        return [
                          dark.value ? (openBlock(), createBlock(_sfc_main$2, {
                            key: 0,
                            name: "sun"
                          })) : (openBlock(), createBlock(_sfc_main$2, {
                            key: 1,
                            name: "moon"
                          }))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(ControlButton), {
                    title: "Log `toObject`",
                    onClick: logToObject
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$2, { name: "log" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$2, { name: "log" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ControlButton), {
                      title: "Reset Transform",
                      onClick: resetTransform
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { name: "reset" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ControlButton), {
                      title: "Shuffle Node Positions",
                      onClick: updatePos
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { name: "update" })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ControlButton), {
                      title: "Toggle Dark Mode",
                      onClick: toggleDarkMode
                    }, {
                      default: withCtx(() => [
                        dark.value ? (openBlock(), createBlock(_sfc_main$2, {
                          key: 0,
                          name: "sun"
                        })) : (openBlock(), createBlock(_sfc_main$2, {
                          key: 1,
                          name: "moon"
                        }))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ControlButton), {
                      title: "Log `toObject`",
                      onClick: logToObject
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$2, { name: "log" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Background), {
                "pattern-color": "#aaa",
                gap: 16
              }),
              createVNode(unref(MiniMap)),
              createVNode(unref(Controls), { position: "top-left" }, {
                default: withCtx(() => [
                  createVNode(unref(ControlButton), {
                    title: "Reset Transform",
                    onClick: resetTransform
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, { name: "reset" })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ControlButton), {
                    title: "Shuffle Node Positions",
                    onClick: updatePos
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, { name: "update" })
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ControlButton), {
                    title: "Toggle Dark Mode",
                    onClick: toggleDarkMode
                  }, {
                    default: withCtx(() => [
                      dark.value ? (openBlock(), createBlock(_sfc_main$2, {
                        key: 0,
                        name: "sun"
                      })) : (openBlock(), createBlock(_sfc_main$2, {
                        key: 1,
                        name: "moon"
                      }))
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ControlButton), {
                    title: "Log `toObject`",
                    onClick: logToObject
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$2, { name: "log" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Diagram/VueFlow.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const VueFlow = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6ad0c988"]]);
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("diagrams")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("diagrams"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("diagrams")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("diagrams")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-1"${_scopeId}></div><div class="bg-gray-100 dark:bg-slate-900 overflow-hidden shadow-xl sm:rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(VueFlow, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(BarChart, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-1" }),
                createVNode("div", { class: "bg-gray-100 dark:bg-slate-900 overflow-hidden shadow-xl sm:rounded-lg" }, [
                  createVNode(VueFlow),
                  createVNode(BarChart)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Diagrams/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
