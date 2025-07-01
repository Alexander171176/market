import { ref, computed, onMounted, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import draggable from "vuedraggable";
import axios from "axios";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import TitlePage from "./TitlePage-ILwiTLty.js";
import _sfc_main$3 from "./SearchInput-D_wKasxG.js";
import _sfc_main$4 from "./CountTable-DeGQ-zYO.js";
import _sfc_main$2 from "./EditBlockModal-DYdP4LkV.js";
import _sfc_main$6 from "./ActionButton-BnhQ37wS.js";
import _sfc_main$5 from "./ActivityToggle-DUJuDzzF.js";
import _sfc_main$1 from "./PrimaryButton-ILA-nA-V.js";
import _sfc_main$8 from "./Pagination-DympfoKo.js";
import _sfc_main$7 from "./ItemsPerPageSelect-DgrzqqaC.js";
import _sfc_main$9 from "./SortSelect-BLWt2BOe.js";
import _sfc_main$a from "./SamplePlugin-DhAM7sVc.js";
import { useI18n } from "vue-i18n";
import "@inertiajs/vue3";
import "vue-toastification";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
import "./CloseIconButton-BYqsdd_Q.js";
import "./LabelInput-BaQuE6Kg.js";
import "./InputText-C0W1G6RK.js";
import "./DescriptionTextarea-CkxBdvIU.js";
import "./CancelButton-NNew7dhD.js";
import "./LabelCheckbox-CbOmZm7Q.js";
import "./ActivityCheckbox-g5mMgvhJ.js";
import "./InputNumber-CoBO-NzH.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    pluginName: { type: String, required: true },
    id: { type: Number, default: 0 }
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const isAdmin = ref(window.location.pathname.includes("/admin"));
    const isActive = ref(false);
    const showEditModal = ref(false);
    const isEdit = ref(false);
    const selectedBlock = ref(null);
    const blocks = ref([]);
    const searchQuery = ref("");
    const sortParam = ref("id");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const fetchBlocks = async () => {
      var _a;
      try {
        const response = await axios.get(`/api/admin/plugins/${props.pluginName}/blocks`);
        blocks.value = response.data;
      } catch (error) {
        console.error("Ошибка при получении блоков:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
      }
    };
    const createPluginTable = async () => {
      var _a;
      try {
        const response = await axios.post("/api/admin/plugins/create-table", {
          pluginName: props.pluginName,
          fields: [
            { name: "links", type: "text" },
            { name: "svg_blocks", type: "text" },
            { name: "title", type: "text" },
            { name: "paragraph", type: "text" },
            { name: "sort", type: "integer" },
            { name: "activity", type: "boolean" }
          ],
          initialData: []
        });
        console.log(response.data.message);
      } catch (error) {
        console.error("Ошибка при создании таблицы:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
      }
    };
    const checkPluginActivity = async () => {
      var _a;
      try {
        await createPluginTable();
        await fetchBlocks();
        const response = await axios.get(`/api/admin/plugins/active`);
        const activePlugins = response.data;
        isActive.value = activePlugins.some((plugin) => plugin.name === props.pluginName);
      } catch (error) {
        console.error("Ошибка при проверке активности плагина:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
      }
    };
    const openCreateModal = () => {
      selectedBlock.value = { links: "", svg_blocks: "", title: "", paragraph: "" };
      isEdit.value = false;
      showEditModal.value = true;
    };
    const editBlock = (block) => {
      selectedBlock.value = { ...block };
      isEdit.value = true;
      showEditModal.value = true;
    };
    const deleteBlock = async (id) => {
      var _a;
      try {
        await axios.delete(`/api/admin/plugins/${props.pluginName}/blocks/${id}`);
        await fetchBlocks();
      } catch (error) {
        console.error("Ошибка при удалении блока:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
      }
    };
    const recalculateSort = () => {
      paginatedBlocks.value.forEach((block, index) => {
        axios.put(`/api/admin/plugins/${props.pluginName}/blocks/${block.id}/sort`, { sort: index + 1 }).catch((error) => {
          var _a;
          return console.error("Ошибка сортировки блока:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
        });
      });
    };
    const toggleActivity = async (block) => {
      var _a;
      try {
        await axios.put(`/api/admin/plugins/${props.pluginName}/blocks/${block.id}/activity`, { activity: !block.activity });
        block.activity = !block.activity;
      } catch (error) {
        console.error("Ошибка обновления активности:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
      }
    };
    const sortBlocks = (blocks2) => {
      if (sortParam.value === "activity")
        return blocks2.filter((b) => b.activity);
      if (sortParam.value === "inactive")
        return blocks2.filter((b) => !b.activity);
      return blocks2.slice().sort((a, b) => a[sortParam.value] > b[sortParam.value] ? 1 : -1);
    };
    const filteredBlocks = computed(() => {
      let result = blocks.value;
      if (searchQuery.value) {
        result = result.filter((b) => b.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
      }
      return sortBlocks(result);
    });
    const paginatedBlocks = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredBlocks.value.slice(start, start + itemsPerPage.value);
    });
    const totalBlocks = computed(() => blocks.value.length);
    onMounted(() => {
      checkPluginActivity();
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (isAdmin.value) {
        _push(ssrRenderComponent(AdminLayout, mergeProps({
          title: props.pluginName
        }, _attrs), {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(TitlePage, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(props.pluginName)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(props.pluginName), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(TitlePage, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(props.pluginName), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, { onClick: openCreateModal }, {
                icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16"${_scopeId2}><path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 fill-current opacity-50 shrink-0",
                        viewBox: "0 0 16 16"
                      }, [
                        createVNode("path", { d: "M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" })
                      ]))
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` ${ssrInterpolate(unref(t)("add"))}`);
                  } else {
                    return [
                      createTextVNode(" " + toDisplayString(unref(t)("add")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                block: selectedBlock.value,
                show: showEditModal.value,
                isEdit: isEdit.value,
                pluginName: props.pluginName,
                onClose: ($event) => showEditModal.value = false,
                onUpdate: fetchBlocks
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("searchByName")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(totalBlocks.value)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(totalBlocks.value), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (paginatedBlocks.value.length) {
                _push2(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"${_scopeId}><thead class="text-md font-semibold uppercase bg-slate-200 dark:bg-cyan-900"${_scopeId}><tr${_scopeId}><th class="px-2 py-3"${_scopeId}>ID</th><th class="px-2 py-3"${_scopeId}>Ссылка</th><th class="px-2 py-3"${_scopeId}>SVG</th><th class="px-2 py-3"${_scopeId}>Заголовок</th><th class="px-2 py-3"${_scopeId}>Действия</th></tr></thead>`);
                _push2(ssrRenderComponent(unref(draggable), {
                  tag: "tbody",
                  list: paginatedBlocks.value,
                  onEnd: recalculateSort,
                  itemKey: "id"
                }, {
                  item: withCtx(({ element: block }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<tr class="border-b hover:bg-slate-100 dark:hover:bg-cyan-800"${_scopeId2}><td class="px-2 py-1 text-center"${_scopeId2}>${ssrInterpolate(block.id)}</td><td class="px-2 py-1 text-left text-blue-600 dark:text-violet-200"${_scopeId2}>${ssrInterpolate(block.links)}</td><td class="px-2 py-1 text-left"${_scopeId2}>${block.svg_blocks ?? ""}</td><td class="px-2 py-1 text-left"${_scopeId2}>${ssrInterpolate(block.title)}</td><td class="px-2 py-1 flex justify-center space-x-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$5, {
                        isActive: block.activity,
                        onToggleActivity: ($event) => toggleActivity(block),
                        title: block.activity ? unref(t)("enabled") : unref(t)("disabled")
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_sfc_main$6, {
                        action: "edit",
                        title: "Редактировать",
                        onClick: ($event) => editBlock(block)
                      }, {
                        icon: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg class="w-4 h-4 fill-current text-sky-500 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-100 shrink-0" viewBox="0 0 16 16"${_scopeId3}><path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"${_scopeId3}></path></svg>`);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 fill-current text-sky-500 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-100 shrink-0",
                                viewBox: "0 0 16 16"
                              }, [
                                createVNode("path", { d: "M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" })
                              ]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_sfc_main$6, {
                        action: "delete",
                        title: "Удалить",
                        onClick: ($event) => deleteBlock(block.id)
                      }, {
                        icon: withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<svg class="w-4 h-4 fill-current text-rose-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-100 shrink-0" viewBox="0 0 16 16"${_scopeId3}><path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z"${_scopeId3}></path></svg>`);
                          } else {
                            return [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 fill-current text-rose-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-100 shrink-0",
                                viewBox: "0 0 16 16"
                              }, [
                                createVNode("path", { d: "M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" })
                              ]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</td></tr>`);
                    } else {
                      return [
                        createVNode("tr", { class: "border-b hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                          createVNode("td", { class: "px-2 py-1 text-center" }, toDisplayString(block.id), 1),
                          createVNode("td", { class: "px-2 py-1 text-left text-blue-600 dark:text-violet-200" }, toDisplayString(block.links), 1),
                          createVNode("td", {
                            class: "px-2 py-1 text-left",
                            innerHTML: block.svg_blocks
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", { class: "px-2 py-1 text-left" }, toDisplayString(block.title), 1),
                          createVNode("td", { class: "px-2 py-1 flex justify-center space-x-2" }, [
                            createVNode(_sfc_main$5, {
                              isActive: block.activity,
                              onToggleActivity: ($event) => toggleActivity(block),
                              title: block.activity ? unref(t)("enabled") : unref(t)("disabled")
                            }, null, 8, ["isActive", "onToggleActivity", "title"]),
                            createVNode(_sfc_main$6, {
                              action: "edit",
                              title: "Редактировать",
                              onClick: ($event) => editBlock(block)
                            }, {
                              icon: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  class: "w-4 h-4 fill-current text-sky-500 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-100 shrink-0",
                                  viewBox: "0 0 16 16"
                                }, [
                                  createVNode("path", { d: "M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" })
                                ]))
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(_sfc_main$6, {
                              action: "delete",
                              title: "Удалить",
                              onClick: ($event) => deleteBlock(block.id)
                            }, {
                              icon: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  class: "w-4 h-4 fill-current text-rose-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-100 shrink-0",
                                  viewBox: "0 0 16 16"
                                }, [
                                  createVNode("path", { d: "M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" })
                                ]))
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</table>`);
              } else {
                _push2(`<div class="p-5 text-center text-slate-700 dark:text-slate-100"${_scopeId}>${ssrInterpolate(unref(t)("noData"))}</div>`);
              }
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$8, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredBlocks.value.length,
                "onUpdate:currentPage": ($event) => currentPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$9, {
                sortParam: sortParam.value,
                "onUpdate:sortParam": (val) => sortParam.value = val
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                  createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg" }, [
                    createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                      createVNode(_sfc_main$1, { onClick: openCreateModal }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current opacity-50 shrink-0",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("add")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_sfc_main$2, {
                      block: selectedBlock.value,
                      show: showEditModal.value,
                      isEdit: isEdit.value,
                      pluginName: props.pluginName,
                      onClose: ($event) => showEditModal.value = false,
                      onUpdate: fetchBlocks
                    }, null, 8, ["block", "show", "isEdit", "pluginName", "onClose"]),
                    createVNode(_sfc_main$3, {
                      modelValue: searchQuery.value,
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      placeholder: unref(t)("searchByName")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_sfc_main$4, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(totalBlocks.value), 1)
                      ]),
                      _: 1
                    }),
                    paginatedBlocks.value.length ? (openBlock(), createBlock("table", {
                      key: 0,
                      class: "table-auto w-full text-slate-700 dark:text-slate-100"
                    }, [
                      createVNode("thead", { class: "text-md font-semibold uppercase bg-slate-200 dark:bg-cyan-900" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-2 py-3" }, "ID"),
                          createVNode("th", { class: "px-2 py-3" }, "Ссылка"),
                          createVNode("th", { class: "px-2 py-3" }, "SVG"),
                          createVNode("th", { class: "px-2 py-3" }, "Заголовок"),
                          createVNode("th", { class: "px-2 py-3" }, "Действия")
                        ])
                      ]),
                      createVNode(unref(draggable), {
                        tag: "tbody",
                        list: paginatedBlocks.value,
                        onEnd: recalculateSort,
                        itemKey: "id"
                      }, {
                        item: withCtx(({ element: block }) => [
                          createVNode("tr", { class: "border-b hover:bg-slate-100 dark:hover:bg-cyan-800" }, [
                            createVNode("td", { class: "px-2 py-1 text-center" }, toDisplayString(block.id), 1),
                            createVNode("td", { class: "px-2 py-1 text-left text-blue-600 dark:text-violet-200" }, toDisplayString(block.links), 1),
                            createVNode("td", {
                              class: "px-2 py-1 text-left",
                              innerHTML: block.svg_blocks
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", { class: "px-2 py-1 text-left" }, toDisplayString(block.title), 1),
                            createVNode("td", { class: "px-2 py-1 flex justify-center space-x-2" }, [
                              createVNode(_sfc_main$5, {
                                isActive: block.activity,
                                onToggleActivity: ($event) => toggleActivity(block),
                                title: block.activity ? unref(t)("enabled") : unref(t)("disabled")
                              }, null, 8, ["isActive", "onToggleActivity", "title"]),
                              createVNode(_sfc_main$6, {
                                action: "edit",
                                title: "Редактировать",
                                onClick: ($event) => editBlock(block)
                              }, {
                                icon: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 fill-current text-sky-500 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-100 shrink-0",
                                    viewBox: "0 0 16 16"
                                  }, [
                                    createVNode("path", { d: "M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" })
                                  ]))
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              createVNode(_sfc_main$6, {
                                action: "delete",
                                title: "Удалить",
                                onClick: ($event) => deleteBlock(block.id)
                              }, {
                                icon: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 fill-current text-rose-400 hover:text-rose-500 dark:text-red-300 dark:hover:text-red-100 shrink-0",
                                    viewBox: "0 0 16 16"
                                  }, [
                                    createVNode("path", { d: "M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" })
                                  ]))
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["list"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "p-5 text-center text-slate-700 dark:text-slate-100"
                    }, toDisplayString(unref(t)("noData")), 1)),
                    createVNode("div", { class: "flex justify-between items-center flex-col md:flex-row" }, [
                      createVNode(_sfc_main$7, {
                        "items-per-page": itemsPerPage.value,
                        "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                      }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                      createVNode(_sfc_main$8, {
                        "current-page": currentPage.value,
                        "items-per-page": itemsPerPage.value,
                        "total-items": filteredBlocks.value.length,
                        "onUpdate:currentPage": ($event) => currentPage.value = $event
                      }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage"]),
                      createVNode(_sfc_main$9, {
                        sortParam: sortParam.value,
                        "onUpdate:sortParam": (val) => sortParam.value = val
                      }, null, 8, ["sortParam", "onUpdate:sortParam"])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (isActive.value) {
        _push(ssrRenderComponent(_sfc_main$a, mergeProps({
          pluginName: props.pluginName,
          isActive: isActive.value,
          id: __props.id,
          blocks: blocks.value
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Plugins/SamplePlugin/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
