import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$d, t as transliterate } from "./MetatagsButton-CP4qur3Q.js";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$1 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$5 } from "./InputError-DYghIIUw.js";
import { _ as _sfc_main$8 } from "./DescriptionTextarea-CCbLZPGT.js";
import { _ as _sfc_main$a } from "./MetaDescTextarea-HG5ywHg1.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$7 } from "./InputNumber-CmHSfZTP.js";
import { _ as _sfc_main$6, a as _sfc_main$9, b as _sfc_main$e } from "./InputText-D7S11vGR.js";
import "./CKEditor-4uxDKYle.js";
import { _ as _sfc_main$4, a as _sfc_main$b } from "./TinyEditor-DRqLGjxa.js";
import { _ as _sfc_main$c } from "./ClearMetaButton-CpLxqn4G.js";
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
import "@mayasabha/ckeditor4-vue3";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    rubric: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const { t } = useI18n();
    const toast = useToast();
    const props = __props;
    const form = useForm({
      _method: "PUT",
      sort: props.rubric.sort ?? 0,
      icon: props.rubric.icon ?? "",
      locale: props.rubric.locale ?? "",
      title: props.rubric.title ?? "",
      url: props.rubric.url ?? "",
      short: props.rubric.short ?? "",
      description: props.rubric.description ?? "",
      meta_title: props.rubric.meta_title ?? "",
      meta_keywords: props.rubric.meta_keywords ?? "",
      meta_desc: props.rubric.meta_desc ?? "",
      activity: Boolean(props.rubric.activity ?? false)
    });
    const handleUrlInputFocus = () => {
      if (form.title) {
        form.url = transliterate(form.title.toLowerCase());
      }
    };
    const truncateText = (text, maxLength, addEllipsis = false) => {
      if (!text || text.length <= maxLength)
        return text || "";
      const lastSpaceIndex = text.lastIndexOf(" ", maxLength);
      const truncated = lastSpaceIndex > 0 ? text.substr(0, lastSpaceIndex) : text.substr(0, maxLength);
      return addEllipsis ? `${truncated}...` : truncated;
    };
    const clearMetaFields = () => {
      form.meta_title = "";
      form.meta_keywords = "";
      form.meta_desc = "";
    };
    const generateMetaFields = () => {
      if (form.title && !form.meta_title) {
        form.meta_title = truncateText(form.title, 160);
      }
      if (!form.meta_keywords && form.short) {
        let text = form.short.replace(/(<([^>]+)>)/gi, "");
        text = text.replace(/[.,!?;:()\[\]{}"'«»]/g, "");
        const words = text.split(/\s+/).filter((word) => word && word.length >= 3).map((word) => word.toLowerCase()).filter((value, index, self) => self.indexOf(value) === index);
        const keywords = words.join(", ");
        form.meta_keywords = truncateText(keywords, 255);
      }
      if (form.short && !form.meta_desc) {
        const descText = form.short.replace(/(<([^>]+)>)/gi, "");
        form.meta_desc = truncateText(descText, 200, true);
      }
    };
    const submitForm = async () => {
      form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0
      }));
      form.post(route("admin.rubrics.update", props.rubric.id), {
        errorBag: "editRubric",
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Рубрика успешно обновлена!");
        },
        onError: (errors) => {
          const firstError = errors[Object.keys(errors)[0]];
          toast.error(firstError || "Пожалуйста, проверьте правильность заполнения полей.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("editRubric")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("editRubric"))}: ${ssrInterpolate(props.rubric.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("editRubric")) + ": " + toDisplayString(props.rubric.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("editRubric")) + ": " + toDisplayString(props.rubric.title), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-between sm:items-center mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.rubrics.index")
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).activity,
              "onUpdate:modelValue": ($event) => unref(form).activity = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "activity",
              text: unref(t)("activity"),
              class: "text-sm h-8 flex items-center"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2 w-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              modelValue: unref(form).locale,
              "onUpdate:modelValue": ($event) => unref(form).locale = $event,
              errorMessage: unref(form).errors.locale
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.locale
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}><div class="h-8 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "sort",
              value: unref(t)("sort"),
              class: "text-sm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "sort",
              type: "number",
              modelValue: unref(form).sort,
              "onUpdate:modelValue": ($event) => unref(form).sort = $event,
              autocomplete: "sort",
              class: "w-full lg:w-28"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2 lg:mt-0",
              message: unref(form).errors.sort
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "icon",
              value: unref(t)("svg")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              modelValue: unref(form).icon,
              "onUpdate:modelValue": ($event) => unref(form).icon = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.icon
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { for: "title" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("rubricTitle"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("rubricTitle")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "title",
              type: "text",
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              required: "",
              autocomplete: "title"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.title
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { for: "url" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("rubricUrl"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("rubricUrl")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "url",
              type: "text",
              modelValue: unref(form).url,
              "onUpdate:modelValue": ($event) => unref(form).url = $event,
              required: "",
              autocomplete: "url",
              onFocus: handleUrlInputFocus
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.url
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "short",
              value: unref(t)("shortDescription")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).short.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(form).short,
              "onUpdate:modelValue": ($event) => unref(form).short = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.short
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "description",
              value: unref(t)("description")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              height: 500
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "meta_title",
              value: unref(t)("metaTitle")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-xs text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).meta_title.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "meta_title",
              type: "text",
              modelValue: unref(form).meta_title,
              "onUpdate:modelValue": ($event) => unref(form).meta_title = $event,
              maxlength: "255",
              autocomplete: "url"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.meta_title
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "meta_keywords",
              value: unref(t)("metaKeywords")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-xs text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).meta_keywords.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "meta_keywords",
              type: "text",
              modelValue: unref(form).meta_keywords,
              "onUpdate:modelValue": ($event) => unref(form).meta_keywords = $event,
              maxlength: "255",
              autocomplete: "url"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.meta_keywords
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "meta_desc",
              value: unref(t)("metaDescription")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-xs text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).meta_desc.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(form).meta_desc,
              "onUpdate:modelValue": ($event) => unref(form).meta_desc = $event,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.meta_desc
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$c, {
              onClear: clearMetaFields,
              class: "mr-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-gray-500 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5V7h6v2z"${_scopeId2}></path></svg> ${ssrInterpolate(unref(t)("clearMetaFields"))}`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-gray-500 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5V7h6v2z" })
                    ])),
                    createTextVNode(" " + toDisplayString(unref(t)("clearMetaFields")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$d, { onClick: generateMetaFields }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-600 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-600 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z" })
                    ]))
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ${ssrInterpolate(unref(t)("generateMetaTags"))}`);
                } else {
                  return [
                    createTextVNode(" " + toDisplayString(unref(t)("generateMetaTags")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.rubrics.index"),
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
                    createVNode(_sfc_main$1, {
                      href: _ctx.route("admin.rubrics.index")
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
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    enctype: "multipart/form-data",
                    class: "p-3 w-full"
                  }, [
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).activity,
                          "onUpdate:modelValue": ($event) => unref(form).activity = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          for: "activity",
                          text: unref(t)("activity"),
                          class: "text-sm h-8 flex items-center"
                        }, null, 8, ["text"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2 w-auto" }, [
                        createVNode(_sfc_main$4, {
                          modelValue: unref(form).locale,
                          "onUpdate:modelValue": ($event) => unref(form).locale = $event,
                          errorMessage: unref(form).errors.locale
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "errorMessage"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.locale
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode("div", { class: "h-8 flex items-center" }, [
                          createVNode(_sfc_main$6, {
                            for: "sort",
                            value: unref(t)("sort"),
                            class: "text-sm"
                          }, null, 8, ["value"])
                        ]),
                        createVNode(_sfc_main$7, {
                          id: "sort",
                          type: "number",
                          modelValue: unref(form).sort,
                          "onUpdate:modelValue": ($event) => unref(form).sort = $event,
                          autocomplete: "sort",
                          class: "w-full lg:w-28"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2 lg:mt-0",
                          message: unref(form).errors.sort
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, {
                        for: "icon",
                        value: unref(t)("svg")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$8, {
                        modelValue: unref(form).icon,
                        "onUpdate:modelValue": ($event) => unref(form).icon = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.icon
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, { for: "title" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                          createTextVNode(" " + toDisplayString(unref(t)("rubricTitle")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$9, {
                        id: "title",
                        type: "text",
                        modelValue: unref(form).title,
                        "onUpdate:modelValue": ($event) => unref(form).title = $event,
                        required: "",
                        autocomplete: "title"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.title
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, { for: "url" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                          createTextVNode(" " + toDisplayString(unref(t)("rubricUrl")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$9, {
                        id: "url",
                        type: "text",
                        modelValue: unref(form).url,
                        "onUpdate:modelValue": ($event) => unref(form).url = $event,
                        required: "",
                        autocomplete: "url",
                        onFocus: handleUrlInputFocus
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.url
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, {
                          for: "short",
                          value: unref(t)("shortDescription")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).short.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$a, {
                        modelValue: unref(form).short,
                        "onUpdate:modelValue": ($event) => unref(form).short = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.short
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, {
                        for: "description",
                        value: unref(t)("description")
                      }, null, 8, ["value"]),
                      createVNode(_sfc_main$b, {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        height: 500
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.description
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, {
                          for: "meta_title",
                          value: unref(t)("metaTitle")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-xs text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).meta_title.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$9, {
                        id: "meta_title",
                        type: "text",
                        modelValue: unref(form).meta_title,
                        "onUpdate:modelValue": ($event) => unref(form).meta_title = $event,
                        maxlength: "255",
                        autocomplete: "url"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.meta_title
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, {
                          for: "meta_keywords",
                          value: unref(t)("metaKeywords")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-xs text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).meta_keywords.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$9, {
                        id: "meta_keywords",
                        type: "text",
                        modelValue: unref(form).meta_keywords,
                        "onUpdate:modelValue": ($event) => unref(form).meta_keywords = $event,
                        maxlength: "255",
                        autocomplete: "url"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.meta_keywords
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, {
                          for: "meta_desc",
                          value: unref(t)("metaDescription")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-xs text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).meta_desc.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$a, {
                        modelValue: unref(form).meta_desc,
                        "onUpdate:modelValue": ($event) => unref(form).meta_desc = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.meta_desc
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "flex justify-end mt-4" }, [
                      createVNode(_sfc_main$c, {
                        onClear: clearMetaFields,
                        class: "mr-4"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-gray-500 shrink-0 mr-2",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9H5V7h6v2z" })
                          ])),
                          createTextVNode(" " + toDisplayString(unref(t)("clearMetaFields")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$d, {
                        onClick: withModifiers(generateMetaFields, ["prevent"])
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-600 shrink-0 mr-2",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M13 7h2v6a1 1 0 01-1 1H4v2l-4-3 4-3v2h9V7zM3 9H1V3a1 1 0 011-1h10V0l4 3-4 3V4H3v5z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("generateMetaTags")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                      createVNode(_sfc_main$1, {
                        href: _ctx.route("admin.rubrics.index"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Rubrics/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
