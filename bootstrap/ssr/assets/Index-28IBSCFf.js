import { ref, watch, onMounted, mergeProps, unref, withCtx, createVNode, withDirectives, toDisplayString, vModelSelect, createBlock, openBlock, Fragment, renderList, vModelCheckbox, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { useI18n } from "vue-i18n";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Packer, TableRow, TableCell, Paragraph, TextRun, Document, Table, PageOrientation, WidthType } from "docx";
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
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const reportType = ref("rubrics");
    const items = ref([]);
    const selectedFields = ref([]);
    const currentDate = (/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU");
    const currentDateTime = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-");
    const fetchData = async () => {
      try {
        const response = await fetch(`/admin/reports?type=${reportType.value}`, {
          headers: { "Accept": "application/json" }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        items.value = data.data;
        if (data.data.length > 0) {
          selectedFields.value = Object.keys(data.data[0]);
        }
      } catch (error) {
        console.error("Не удалось получить данные:", error);
      }
    };
    watch(reportType, fetchData);
    onMounted(fetchData);
    const formatData = (data) => {
      return data.map((item) => {
        const newItem = {};
        selectedFields.value.forEach((field) => {
          if (field === "rubrics" && Array.isArray(item[field])) {
            newItem[field] = item[field].map((rubric) => rubric.title).join(", ");
          } else if (field === "sections" && Array.isArray(item[field])) {
            newItem[field] = item[field].map((section) => section.title).join(", ");
          } else if (field === "articles" && Array.isArray(item[field])) {
            newItem[field] = item[field].map((article) => article.title).join(", ");
          } else {
            newItem[field] = item[field];
          }
        });
        if (typeof newItem.activity === "boolean") {
          newItem.activity = newItem.activity ? "true" : "false";
        }
        return newItem;
      });
    };
    const downloadReport = (format) => {
      switch (format) {
        case "csv":
          downloadCSV();
          break;
        case "xls":
          downloadXLS();
          break;
        case "pdf":
          downloadPDF();
          break;
        case "zip":
          downloadZIP();
          break;
        case "docx":
          downloadDOCX();
          break;
      }
    };
    const downloadCSV = () => {
      const formattedData = formatData(items.value);
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob(["\uFEFF" + csvOutput], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `reports_${reportType.value}_${currentDateTime}.csv`);
    };
    const downloadXLS = () => {
      const formattedData = formatData(items.value);
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      const xlsOutput = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([xlsOutput], { type: "application/octet-stream" });
      saveAs(blob, `reports_${reportType.value}_${currentDateTime}.xlsx`);
    };
    const downloadPDF = () => {
      const formattedData = formatData(items.value);
      const tableHeaders = selectedFields.value.map((field) => `<th style="padding: 5px; border: 1px solid black;">${field}</th>`).join("");
      const tableRows = formattedData.map((item) => {
        const row = selectedFields.value.map((field) => `<td style="padding: 5px; padding-bottom: 10px; border: 1px solid black;">${item[field]}</td>`).join("");
        return `<tr>${row}</tr>`;
      }).join("");
      const htmlContent = `
    <html>
      <head>
        <style>
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 5px; border: 1px solid black; vertical-align: top; }
          h1 { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>Отчёт: ${reportType.value === "rubrics" ? "Рубрики" : reportType.value === "sections" ? "Секции" : "Статьи"} - ${currentDate}</h1>
        <table>
          <thead><tr>${tableHeaders}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;
      const options = {
        margin: 0.5,
        filename: `reports_${reportType.value}_${currentDateTime}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, logging: true, letterRendering: true, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" }
      };
      html2pdf().from(htmlContent).set(options).save();
    };
    const downloadZIP = async () => {
      const zip = new JSZip();
      const formattedData = formatData(items.value);
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
      const csvBlob = new Blob(["\uFEFF" + csvOutput], { type: "text/csv;charset=utf-8;" });
      zip.file(`reports_${reportType.value}_${currentDateTime}.csv`, csvBlob);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      const xlsOutput = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const xlsBlob = new Blob([xlsOutput], { type: "application/octet-stream" });
      zip.file(`reports_${reportType.value}_${currentDateTime}.xlsx`, xlsBlob);
      const element = document.querySelector("#reportContent");
      const pdfOptions = {
        margin: 0.5,
        filename: `reports_${reportType.value}_${currentDateTime}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, logging: true, letterRendering: true, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" }
      };
      const pdfBlob = await html2pdf().from(element).set(pdfOptions).output("blob");
      zip.file(`reports_${reportType.value}_${currentDateTime}.pdf`, pdfBlob);
      const doc = createDOCX();
      const docBlob = await Packer.toBlob(doc);
      zip.file(`reports_${reportType.value}_${currentDateTime}.docx`, docBlob);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `reports_${reportType.value}_${currentDateTime}.zip`);
    };
    const downloadDOCX = () => {
      const doc = createDOCX();
      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `reports_${reportType.value}_${currentDateTime}.docx`);
      });
    };
    const createDOCX = () => {
      const formattedData = formatData(items.value);
      const tableRows = [
        new TableRow({
          children: selectedFields.value.map((key) => new TableCell({
            children: [new Paragraph({
              children: [new TextRun(key)],
              spacing: { after: 200 }
            })]
          }))
        })
      ];
      formattedData.forEach((item) => {
        const row = new TableRow({
          children: selectedFields.value.map((key) => new TableCell({
            children: [new Paragraph({
              children: [new TextRun(String(item[key]))],
              spacing: { after: 200 }
            })]
          }))
        });
        tableRows.push(row);
      });
      return new Document({
        sections: [
          {
            properties: { page: { size: { orientation: PageOrientation.LANDSCAPE } } },
            children: [
              new Paragraph({
                text: `Отчёт: ${reportType.value === "rubrics" ? "Рубрики" : reportType.value === "sections" ? "Секции" : "Статьи"} - ${currentDate}`,
                heading: "Heading1",
                spacing: { after: 400 }
              }),
              new Table({
                rows: tableRows,
                width: { size: 100, type: WidthType.PERCENTAGE }
              })
            ]
          }
        ]
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("reports")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("reports"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("reports")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("reports")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" data-v-67060381${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-4 p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" data-v-67060381${_scopeId}><div data-v-67060381${_scopeId}><label for="reportType" class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-v-67060381${_scopeId}>${ssrInterpolate(unref(t)("selectReportType"))}</label><select id="reportType" class="mt-1 block w-full py-1 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" data-v-67060381${_scopeId}><option value="rubrics" data-v-67060381${ssrIncludeBooleanAttr(Array.isArray(reportType.value) ? ssrLooseContain(reportType.value, "rubrics") : ssrLooseEqual(reportType.value, "rubrics")) ? " selected" : ""}${_scopeId}>Рубрики</option><option value="articles" data-v-67060381${ssrIncludeBooleanAttr(Array.isArray(reportType.value) ? ssrLooseContain(reportType.value, "articles") : ssrLooseEqual(reportType.value, "articles")) ? " selected" : ""}${_scopeId}>Статьи</option><option value="sections" data-v-67060381${ssrIncludeBooleanAttr(Array.isArray(reportType.value) ? ssrLooseContain(reportType.value, "sections") : ssrLooseEqual(reportType.value, "sections")) ? " selected" : ""}${_scopeId}>Секции</option></select></div><div class="mt-4 sm:mt-0 sm:ml-4" data-v-67060381${_scopeId}><button class="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700" data-v-67060381${_scopeId}> CSV </button><button class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700" data-v-67060381${_scopeId}> Excel </button><button class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700" data-v-67060381${_scopeId}> Word </button><button class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700" data-v-67060381${_scopeId}> PDF </button><button class="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700" data-v-67060381${_scopeId}> ZIP </button></div></div><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" data-v-67060381${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300" data-v-67060381${_scopeId}>${ssrInterpolate(unref(t)("selectFieldsPrint"))}</label><div class="mt-2 grid grid-cols-4 gap-2" data-v-67060381${_scopeId}><!--[-->`);
            ssrRenderList(items.value[0], (value, key) => {
              _push2(`<div data-v-67060381${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(selectedFields.value) ? ssrLooseContain(selectedFields.value, key) : selectedFields.value) ? " checked" : ""}${ssrRenderAttr("value", key)} class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" data-v-67060381${_scopeId}><span class="ml-2 text-gray-700 dark:text-gray-300" data-v-67060381${_scopeId}>${ssrInterpolate(key)}</span></div>`);
            });
            _push2(`<!--]--></div></div><div id="reportContent" class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95 text-xs" data-v-67060381${_scopeId}><h1 class="text-md font-semibold mb-4 dark:text-white" data-v-67060381${_scopeId}>${ssrInterpolate(unref(t)("report"))} ${ssrInterpolate(reportType.value === "rubrics" ? "Рубрики" : reportType.value === "sections" ? "Секции" : "Статьи")} - ${ssrInterpolate(unref(currentDate))}</h1><div class="overflow-x-auto mb-2" data-v-67060381${_scopeId}><div class="h-2" data-v-67060381${_scopeId}></div></div><div class="overflow-x-auto" data-v-67060381${_scopeId}><table class="min-w-full bg-white dark:bg-gray-800 dark:text-white text-xxs" data-v-67060381${_scopeId}><thead data-v-67060381${_scopeId}><tr class="dark:text-slate-700" data-v-67060381${_scopeId}><!--[-->`);
            ssrRenderList(selectedFields.value, (key) => {
              _push2(`<th class="px-4 py-1 dark:bg-gray-900 dark:text-white" data-v-67060381${_scopeId}>${ssrInterpolate(key)}</th>`);
            });
            _push2(`<!--]--></tr></thead><tbody data-v-67060381${_scopeId}><!--[-->`);
            ssrRenderList(items.value, (item) => {
              _push2(`<tr class="bg-white dark:bg-gray-800 border-b dark:border-gray-700" data-v-67060381${_scopeId}><!--[-->`);
              ssrRenderList(selectedFields.value, (key) => {
                _push2(`<td class="${ssrRenderClass([{ "truncate": key === "url" || key === "image_url" }, "px-4 py-1"])}" data-v-67060381${_scopeId}>${ssrInterpolate(item[key])}</td>`);
              });
              _push2(`<!--]--></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="overflow-x-auto mt-2" data-v-67060381${_scopeId}><div class="h-2" data-v-67060381${_scopeId}></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-4 p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", null, [
                    createVNode("label", {
                      for: "reportType",
                      class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                    }, toDisplayString(unref(t)("selectReportType")), 1),
                    withDirectives(createVNode("select", {
                      id: "reportType",
                      "onUpdate:modelValue": ($event) => reportType.value = $event,
                      class: "mt-1 block w-full py-1 px-3 border border-gray-300 bg-white dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    }, [
                      createVNode("option", { value: "rubrics" }, "Рубрики"),
                      createVNode("option", { value: "articles" }, "Статьи"),
                      createVNode("option", { value: "sections" }, "Секции")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, reportType.value]
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 sm:mt-0 sm:ml-4" }, [
                    createVNode("button", {
                      onClick: ($event) => downloadReport("csv"),
                      class: "inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    }, " CSV ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => downloadReport("xls"),
                      class: "ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    }, " Excel ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => downloadReport("docx"),
                      class: "ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    }, " Word ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => downloadReport("pdf"),
                      class: "ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    }, " PDF ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => downloadReport("zip"),
                      class: "ml-2 inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700"
                    }, " ZIP ", 8, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" }, toDisplayString(unref(t)("selectFieldsPrint")), 1),
                  createVNode("div", { class: "mt-2 grid grid-cols-4 gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(items.value[0], (value, key) => {
                      return openBlock(), createBlock("div", { key }, [
                        withDirectives(createVNode("input", {
                          type: "checkbox",
                          "onUpdate:modelValue": ($event) => selectedFields.value = $event,
                          value: key,
                          class: "form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        }, null, 8, ["onUpdate:modelValue", "value"]), [
                          [vModelCheckbox, selectedFields.value]
                        ]),
                        createVNode("span", { class: "ml-2 text-gray-700 dark:text-gray-300" }, toDisplayString(key), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", {
                  ref: "reportContent",
                  id: "reportContent",
                  class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95 text-xs"
                }, [
                  createVNode("h1", { class: "text-md font-semibold mb-4 dark:text-white" }, toDisplayString(unref(t)("report")) + " " + toDisplayString(reportType.value === "rubrics" ? "Рубрики" : reportType.value === "sections" ? "Секции" : "Статьи") + " - " + toDisplayString(unref(currentDate)), 1),
                  createVNode("div", { class: "overflow-x-auto mb-2" }, [
                    createVNode("div", { class: "h-2" })
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full bg-white dark:bg-gray-800 dark:text-white text-xxs" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "dark:text-slate-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(selectedFields.value, (key) => {
                            return openBlock(), createBlock("th", {
                              key,
                              class: "px-4 py-1 dark:bg-gray-900 dark:text-white"
                            }, toDisplayString(key), 1);
                          }), 128))
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "bg-white dark:bg-gray-800 border-b dark:border-gray-700"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(selectedFields.value, (key) => {
                              return openBlock(), createBlock("td", {
                                key,
                                class: [{ "truncate": key === "url" || key === "image_url" }, "px-4 py-1"]
                              }, toDisplayString(item[key]), 3);
                            }), 128))
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto mt-2" }, [
                    createVNode("div", { class: "h-2" })
                  ])
                ], 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Reports/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-67060381"]]);
export {
  Index as default
};
