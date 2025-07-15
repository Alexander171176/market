import { mergeProps, unref, useSSRContext, onMounted, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$3 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$8, a as _sfc_main$a, b as _sfc_main$e } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$7 } from "./InputError-DYghIIUw.js";
import { _ as _sfc_main$b } from "./MetaDescTextarea-HG5ywHg1.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$9 } from "./InputNumber-CmHSfZTP.js";
import { _ as _sfc_main$6, a as _sfc_main$c } from "./TinyEditor-DRqLGjxa.js";
import { _ as _sfc_main$d } from "./MultiImageUpload-CLyjsinp.js";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
const _sfc_main$2 = {
  __name: "TypeSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    error: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const options = [
      { value: "boxing_bout", labelKey: "typeSelectBoxingBout" },
      { value: "mma_tournament", labelKey: "typeSelectMmaTournament" },
      { value: "press_conference", labelKey: "typeSelectPressConference" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row items-center gap-2" }, _attrs))}><label for="stance" class="mr-2 font-medium text-sm text-indigo-600 dark:text-sky-500">${ssrInterpolate(unref(t)("type"))}</label><select id="stance"${ssrRenderAttr("value", __props.modelValue)} class="py-0.5 form-select w-auto rounded-sm shadow-sm border-slate-500 dark:bg-slate-800 dark:text-white"><option value="" disabled>${ssrInterpolate(unref(t)("notSelected"))}</option><!--[-->`);
      ssrRenderList(options, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(opt.value === __props.modelValue) ? " selected" : ""} class="${ssrRenderClass({
          "bg-blue-500 text-white": opt.value === __props.modelValue,
          "bg-white text-gray-800 dark:bg-slate-700 dark:text-gray-100": opt.value !== __props.modelValue
        })}">${ssrInterpolate(unref(t)(opt.labelKey))}</option>`);
      });
      _push(`<!--]--></select>`);
      if (__props.error) {
        _push(`<p class="mt-2 text-sm text-red-500">${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Tournament/Select/TypeSelect.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "StatusSelect",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    error: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const options = [
      { value: "scheduled", labelKey: "typeSelectScheduled" },
      { value: "live", labelKey: "statusSelectLive" },
      { value: "completed", labelKey: "statusSelectCompleted" },
      { value: "postponed", labelKey: "statusSelectPostponed" },
      { value: "cancelled", labelKey: "statusSelectCancelled" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-row items-center gap-2" }, _attrs))}><label for="stance" class="mr-2 font-medium text-sm text-indigo-600 dark:text-sky-500">${ssrInterpolate(unref(t)("status"))}</label><select id="stance"${ssrRenderAttr("value", __props.modelValue)} class="py-0.5 form-select w-auto rounded-sm shadow-sm border-slate-500 dark:bg-slate-800 dark:text-white"><option value="" disabled>${ssrInterpolate(unref(t)("notSelected"))}</option><!--[-->`);
      ssrRenderList(options, (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(opt.value === __props.modelValue) ? " selected" : ""} class="${ssrRenderClass({
          "bg-blue-500 text-white": opt.value === __props.modelValue,
          "bg-white text-gray-800 dark:bg-slate-700 dark:text-gray-100": opt.value !== __props.modelValue
        })}">${ssrInterpolate(unref(t)(opt.labelKey))}</option>`);
      });
      _push(`<!--]--></select>`);
      if (__props.error) {
        _push(`<p class="mt-2 text-sm text-red-500">${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Tournament/Select/StatusSelect.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    images: Array
    // Добавляем этот пропс для передачи списка изображений
  },
  setup(__props) {
    const toast = useToast();
    const { t } = useI18n();
    const form = useForm({
      activity: false,
      // Активность
      sort: "0",
      locale: "",
      parent_tournament_id: "",
      // Родительский турнир
      type: null,
      // Тип турнира: boxing_bout, mma_tournament, press_conference
      status: null,
      // Статус
      name: "",
      // Название турнира
      tournament_date_time: "",
      // Дата проведения
      venue: "",
      // Место проведения
      city: "",
      // Город проведения
      country: "",
      // Страна проведения
      short: "",
      // Краткое Описание
      description: "",
      // Описание
      weight_class_name: "",
      // Название весовой категории (например, "Тяжелый вес")
      rounds_scheduled: "0",
      // Количество запланированных раундов
      is_title_fight: false,
      // Является ли поединок титульным
      winner_id: "",
      // указания победителя поединка
      method_of_victory: "",
      // Метод победы (например, "KO", "Submission")
      round_of_finish: "",
      // Раунд, в котором завершился поединок
      time_of_finish: "",
      // Время в раунде завершения поединка (например, "02:35")
      details: "",
      // Дополнительные детали/комментарии к турниру
      is_main_card_event: false,
      // Флаг, указывающий, является ли данная запись "картой" боев (например, главный кард, прелимы)
      images: []
      // Добавляем массив для загруженных изображений
    });
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "";
      const date = new Date(dateStr);
      if (isNaN(date.getTime()))
        return "";
      return date.toISOString().split("T")[0];
    };
    onMounted(() => {
      if (form.tournament_date_time) {
        form.tournament_date_time = formatDate(form.tournament_date_time);
      }
    });
    const submit = () => {
      form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
        is_title_fight: data.is_title_fight ? 1 : 0
      }));
      form.post(route("admin.tournaments.store"), {
        forceFormData: true,
        errorBag: "createTournament",
        preserveScroll: true,
        onSuccess: (response) => {
          toast.success("Турнир успешно создан!");
        },
        onError: (errors) => {
          console.error("❌ Ошибки валидации:", errors);
          const firstError = errors[Object.keys(errors)[0]];
          toast.error(firstError || "Пожалуйста, проверьте правильность заполнения полей.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("addTournament")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("addTournament"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("addTournament")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("addTournament")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("admin.tournaments.index")
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("back"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"${_scopeId}></div></div><form enctype="multipart/form-data" class="p-3 w-full"${_scopeId}><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              modelValue: unref(form).activity,
              "onUpdate:modelValue": ($event) => unref(form).activity = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              for: "activity",
              text: unref(t)("activity"),
              class: "text-sm h-8 flex items-center"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2 w-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              modelValue: unref(form).locale,
              "onUpdate:modelValue": ($event) => unref(form).locale = $event,
              errorMessage: unref(form).errors.locale
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.locale
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "sort",
              value: unref(t)("sort"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "sort",
              type: "number",
              modelValue: unref(form).sort,
              "onUpdate:modelValue": ($event) => unref(form).sort = $event,
              autocomplete: "sort",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.sort
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              modelValue: unref(form).is_title_fight,
              "onUpdate:modelValue": ($event) => unref(form).is_title_fight = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              for: "is_title_fight",
              text: unref(t)("isTitleFight"),
              class: "text-sm h-8 flex items-center"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).type,
              "onUpdate:modelValue": ($event) => unref(form).type = $event,
              error: unref(form).errors.type
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).status,
              "onUpdate:modelValue": ($event) => unref(form).status = $event,
              error: unref(form).errors.status
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center justify-start w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "weight_class_name",
              class: "mt-4 mr-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("weightClassName"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("weightClassName")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mb-3 flex flex-col items-end w-96"${_scopeId}><div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).weight_class_name.length)} / 100 ${ssrInterpolate(unref(t)("characters"))}</div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              id: "weight_class_name",
              type: "text",
              modelValue: unref(form).weight_class_name,
              "onUpdate:modelValue": ($event) => unref(form).weight_class_name = $event,
              maxlength: "100",
              autocomplete: "weight_class_name",
              placeholder: unref(t)("placeholderWeightClassName")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2",
              message: unref(form).errors.weight_class_name
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row items-center justify-end w-full gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "rounds_scheduled",
              value: unref(t)("roundsScheduled"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "rounds_scheduled",
              type: "number",
              modelValue: unref(form).rounds_scheduled,
              "onUpdate:modelValue": ($event) => unref(form).rounds_scheduled = $event,
              autocomplete: "rounds_scheduled",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.rounds_scheduled
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center justify-end w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "country",
              class: "mt-4 mr-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("country"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("country")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mb-3 flex flex-col items-end w-96"${_scopeId}><div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).country.length)} / 100 ${ssrInterpolate(unref(t)("characters"))}</div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              id: "country",
              type: "text",
              modelValue: unref(form).country,
              "onUpdate:modelValue": ($event) => unref(form).country = $event,
              maxlength: "100",
              required: "",
              autocomplete: "country"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2",
              message: unref(form).errors.country
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex flex-row items-center justify-end w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "country",
              class: "mt-4 mr-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("city"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("city")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mb-3 flex flex-col items-end w-96"${_scopeId}><div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).city.length)} / 100 ${ssrInterpolate(unref(t)("characters"))}</div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              id: "city",
              type: "text",
              modelValue: unref(form).city,
              "onUpdate:modelValue": ($event) => unref(form).city = $event,
              maxlength: "100",
              required: "",
              autocomplete: "city"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2",
              message: unref(form).errors.city
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-3 flex flex-col items-start w-full"${_scopeId}><div class="flex justify-start w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "tournament_date_time",
              value: unref(t)("date"),
              class: "mb-1 lg:mb-0 lg:mr-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, {
              id: "tournament_date_time",
              type: "date",
              modelValue: unref(form).tournament_date_time,
              "onUpdate:modelValue": ($event) => unref(form).tournament_date_time = $event,
              autocomplete: "tournament_date_time",
              class: "w-full max-w-56"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-1 sm:mt-0",
              message: unref(form).errors.tournament_date_time
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}></div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, { for: "name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("title"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("title")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).name.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              id: "name",
              type: "text",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              maxlength: "255",
              required: "",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "details",
              value: unref(t)("details")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              modelValue: unref(form).details,
              "onUpdate:modelValue": ($event) => unref(form).details = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2",
              message: unref(form).errors.details
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "short",
              value: unref(t)("shortDescription")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).short.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              modelValue: unref(form).short,
              "onUpdate:modelValue": ($event) => unref(form).short = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2",
              message: unref(form).errors.short
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              for: "description",
              value: unref(t)("description")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$c, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              height: 500
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$d, {
              "onUpdate:images": ($event) => unref(form).images = $event
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: _ctx.route("admin.tournaments.index"),
              class: "mb-3"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("back"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$e, {
              class: ["ms-4 mb-0", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100" viewBox="0 0 16 16"${_scopeId2}><path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("save"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("save")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-between sm:items-center mb-2" }, [
                    createVNode(_sfc_main$3, {
                      href: _ctx.route("admin.tournaments.index")
                    }, {
                      icon: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                          viewBox: "0 0 16 16"
                        }, [
                          createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                        ]))
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", { class: "grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2" })
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    enctype: "multipart/form-data",
                    class: "p-3 w-full"
                  }, [
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$4, {
                          modelValue: unref(form).activity,
                          "onUpdate:modelValue": ($event) => unref(form).activity = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          for: "activity",
                          text: unref(t)("activity"),
                          class: "text-sm h-8 flex items-center"
                        }, null, 8, ["text"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2 w-auto" }, [
                        createVNode(_sfc_main$6, {
                          modelValue: unref(form).locale,
                          "onUpdate:modelValue": ($event) => unref(form).locale = $event,
                          errorMessage: unref(form).errors.locale
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "errorMessage"]),
                        createVNode(_sfc_main$7, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.locale
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$8, {
                            for: "sort",
                            value: unref(t)("sort"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$9, {
                          id: "sort",
                          type: "number",
                          modelValue: unref(form).sort,
                          "onUpdate:modelValue": ($event) => unref(form).sort = $event,
                          autocomplete: "sort",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$7, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.sort
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$4, {
                          modelValue: unref(form).is_title_fight,
                          "onUpdate:modelValue": ($event) => unref(form).is_title_fight = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          for: "is_title_fight",
                          text: unref(t)("isTitleFight"),
                          class: "text-sm h-8 flex items-center"
                        }, null, 8, ["text"])
                      ]),
                      createVNode(_sfc_main$2, {
                        modelValue: unref(form).type,
                        "onUpdate:modelValue": ($event) => unref(form).type = $event,
                        error: unref(form).errors.type
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                      createVNode(_sfc_main$1, {
                        modelValue: unref(form).status,
                        "onUpdate:modelValue": ($event) => unref(form).status = $event,
                        error: unref(form).errors.status
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center justify-start w-full" }, [
                        createVNode(_sfc_main$8, {
                          for: "weight_class_name",
                          class: "mt-4 mr-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("weightClassName")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "mb-3 flex flex-col items-end w-96" }, [
                          createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).weight_class_name.length) + " / 100 " + toDisplayString(unref(t)("characters")), 1),
                          createVNode(_sfc_main$a, {
                            id: "weight_class_name",
                            type: "text",
                            modelValue: unref(form).weight_class_name,
                            "onUpdate:modelValue": ($event) => unref(form).weight_class_name = $event,
                            maxlength: "100",
                            autocomplete: "weight_class_name",
                            placeholder: unref(t)("placeholderWeightClassName")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"]),
                          createVNode(_sfc_main$7, {
                            class: "mt-2",
                            message: unref(form).errors.weight_class_name
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center justify-end w-full gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$8, {
                            for: "rounds_scheduled",
                            value: unref(t)("roundsScheduled"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$9, {
                          id: "rounds_scheduled",
                          type: "number",
                          modelValue: unref(form).rounds_scheduled,
                          "onUpdate:modelValue": ($event) => unref(form).rounds_scheduled = $event,
                          autocomplete: "rounds_scheduled",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$7, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.rounds_scheduled
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center justify-end w-full" }, [
                        createVNode(_sfc_main$8, {
                          for: "country",
                          class: "mt-4 mr-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("country")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "mb-3 flex flex-col items-end w-96" }, [
                          createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).country.length) + " / 100 " + toDisplayString(unref(t)("characters")), 1),
                          createVNode(_sfc_main$a, {
                            id: "country",
                            type: "text",
                            modelValue: unref(form).country,
                            "onUpdate:modelValue": ($event) => unref(form).country = $event,
                            maxlength: "100",
                            required: "",
                            autocomplete: "country"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$7, {
                            class: "mt-2",
                            message: unref(form).errors.country
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center justify-end w-full" }, [
                        createVNode(_sfc_main$8, {
                          for: "country",
                          class: "mt-4 mr-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(t)("city")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "mb-3 flex flex-col items-end w-96" }, [
                          createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).city.length) + " / 100 " + toDisplayString(unref(t)("characters")), 1),
                          createVNode(_sfc_main$a, {
                            id: "city",
                            type: "text",
                            modelValue: unref(form).city,
                            "onUpdate:modelValue": ($event) => unref(form).city = $event,
                            maxlength: "100",
                            required: "",
                            autocomplete: "city"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$7, {
                            class: "mt-2",
                            message: unref(form).errors.city
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "mt-3 flex flex-col items-start w-full" }, [
                        createVNode("div", { class: "flex justify-start w-full" }, [
                          createVNode(_sfc_main$8, {
                            for: "tournament_date_time",
                            value: unref(t)("date"),
                            class: "mb-1 lg:mb-0 lg:mr-2"
                          }, null, 8, ["value"]),
                          createVNode(_sfc_main$a, {
                            id: "tournament_date_time",
                            type: "date",
                            modelValue: unref(form).tournament_date_time,
                            "onUpdate:modelValue": ($event) => unref(form).tournament_date_time = $event,
                            autocomplete: "tournament_date_time",
                            class: "w-full max-w-56"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_sfc_main$7, {
                            class: "mt-1 sm:mt-0",
                            message: unref(form).errors.tournament_date_time
                          }, null, 8, ["message"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$8, { for: "name" }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                            createTextVNode(" " + toDisplayString(unref(t)("title")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).name.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$a, {
                        id: "name",
                        type: "text",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        maxlength: "255",
                        required: "",
                        autocomplete: "name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$7, {
                        class: "mt-2",
                        message: unref(form).errors.name
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$8, {
                        for: "details",
                        value: unref(t)("details")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$b, {
                        modelValue: unref(form).details,
                        "onUpdate:modelValue": ($event) => unref(form).details = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$7, {
                        class: "mt-2",
                        message: unref(form).errors.details
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$8, {
                          for: "short",
                          value: unref(t)("shortDescription")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).short.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$b, {
                        modelValue: unref(form).short,
                        "onUpdate:modelValue": ($event) => unref(form).short = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$7, {
                        class: "mt-2",
                        message: unref(form).errors.short
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$8, {
                        for: "description",
                        value: unref(t)("description")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$c, {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        height: 500
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$7, {
                        class: "mt-2",
                        message: unref(form).errors.description
                      }, null, 8, ["message"])
                    ]),
                    createVNode(_sfc_main$d, {
                      "onUpdate:images": ($event) => unref(form).images = $event
                    }, null, 8, ["onUpdate:images"]),
                    createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                      createVNode(_sfc_main$3, {
                        href: _ctx.route("admin.tournaments.index"),
                        class: "mb-3"
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(_sfc_main$e, {
                        class: ["ms-4 mb-0", { "opacity-25": unref(form).processing }],
                        disabled: unref(form).processing
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-100",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("save")), 1)
                        ]),
                        _: 1
                      }, 8, ["class", "disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Tournaments/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
