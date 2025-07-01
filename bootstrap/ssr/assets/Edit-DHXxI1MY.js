import { onMounted, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$c, t as transliterate } from "./MetatagsButton-CP4qur3Q.js";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$1 } from "./DefaultButton-Clq-JXkW.js";
import { _ as _sfc_main$6, a as _sfc_main$8, b as _sfc_main$f } from "./InputText-D7S11vGR.js";
import { _ as _sfc_main$b } from "./ClearMetaButton-CpLxqn4G.js";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$7 } from "./InputNumber-CmHSfZTP.js";
import { _ as _sfc_main$4, a as _sfc_main$a } from "./TinyEditor-DRqLGjxa.js";
import "./CKEditor-4uxDKYle.js";
import { _ as _sfc_main$9 } from "./MetaDescTextarea-HG5ywHg1.js";
import { _ as _sfc_main$5 } from "./InputError-DYghIIUw.js";
import VueMultiselect from "vue-multiselect";
import { _ as _sfc_main$e } from "./MultiImageUpload-CLyjsinp.js";
import { _ as _sfc_main$d } from "./MultiImageEdit-DdDeFkMb.js";
/* empty css                                                                      */
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
    article: { type: Object, required: true },
    sections: Array,
    tags: Array,
    related_articles: { type: Array, default: () => [] }
    // задаём дефолтное значение
  },
  setup(__props) {
    const toast = useToast();
    const { t } = useI18n();
    const props = __props;
    const form = useForm({
      _method: "PUT",
      sort: props.article.sort ?? 0,
      locale: props.article.locale ?? "",
      title: props.article.title ?? "",
      url: props.article.url ?? "",
      short: props.article.short ?? "",
      description: props.article.description ?? "",
      author: props.article.author ?? "",
      published_at: props.article.published_at ?? "",
      views: props.article.views ?? "",
      likes: props.article.likes ?? "",
      meta_title: props.article.meta_title ?? "",
      meta_keywords: props.article.meta_keywords ?? "",
      meta_desc: props.article.meta_desc ?? "",
      activity: Boolean(props.article.activity),
      left: Boolean(props.article.left),
      main: Boolean(props.article.main),
      right: Boolean(props.article.right),
      sections: props.article.sections ?? [],
      tags: props.article.tags ?? [],
      related_articles: props.article.related_articles ?? [],
      deletedImages: []
      // массив для хранения ID удалённых изображений
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
      if (form.published_at) {
        form.published_at = formatDate(form.published_at);
      }
    });
    const existingImages = ref(
      (props.article.images || []).filter((img) => img.url).map((img) => ({
        id: img.id,
        // Если есть WebP-версия, используем её, иначе — оригинальный URL
        url: img.webp_url || img.url,
        order: img.order || 0,
        alt: img.alt || "",
        caption: img.caption || ""
      }))
    );
    const newImages = ref([]);
    const handleExistingImagesUpdate = (images) => {
      existingImages.value = images;
    };
    const handleDeleteExistingImage = (deletedId) => {
      if (!form.deletedImages.includes(deletedId)) {
        form.deletedImages.push(deletedId);
      }
      existingImages.value = existingImages.value.filter((img) => img.id !== deletedId);
    };
    const handleNewImagesUpdate = (images) => {
      newImages.value = images;
    };
    const handleUrlInputFocus = () => {
      if (form.title) {
        form.url = transliterate(form.title.toLowerCase());
      }
    };
    const truncateText = (text, maxLength, addEllipsis = false) => {
      if (text.length <= maxLength)
        return text;
      const truncated = text.substr(0, text.lastIndexOf(" ", maxLength));
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
      if (form.tags && !form.meta_keywords) {
        const tagNames = form.tags.map((tag) => tag.name).join(", ");
        form.meta_keywords = truncateText(tagNames, 200);
      }
      if (form.short && !form.meta_desc) {
        form.meta_desc = truncateText(form.short.replace(/(<([^>]+)>)/gi, ""), 255, true);
      }
    };
    const submitForm = () => {
      form.transform((data) => ({
        ...data,
        activity: data.activity ? 1 : 0,
        left: data.left ? 1 : 0,
        main: data.main ? 1 : 0,
        right: data.right ? 1 : 0,
        images: [
          ...newImages.value.map((img) => ({
            file: img.file,
            order: img.order,
            alt: img.alt,
            caption: img.caption
          })),
          ...existingImages.value.map((img) => ({
            id: img.id,
            order: img.order,
            alt: img.alt,
            caption: img.caption
          }))
        ],
        deletedImages: form.deletedImages
      }));
      form.post(route("admin.articles.update", props.article.id), {
        preserveScroll: true,
        forceFormData: true,
        // Принудительно отправляем как FormData
        onSuccess: (page) => {
          toast.success("Статья успешно обновлена!");
        },
        onError: (errors) => {
          console.error("❌ Ошибка при обновлении статьи:", errors);
          const firstError = errors[Object.keys(errors)[0]];
          toast.error(firstError || "Пожалуйста, проверьте правильность заполнения полей.");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("editArticle")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("editArticle"))}: ${ssrInterpolate(props.article.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("editArticle")) + ": " + toDisplayString(props.article.title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("editArticle")) + ": " + toDisplayString(props.article.title), 1)
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
              href: _ctx.route("admin.articles.index")
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
            _push2(`</div></div><div class="mb-3 flex justify-between flex-col lg:flex-row items-center gap-4"${_scopeId}><div class="flex flex-row items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).left,
              "onUpdate:modelValue": ($event) => unref(form).left = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "left",
              text: unref(t)("left"),
              class: "text-sm h-8 flex items-center"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).main,
              "onUpdate:modelValue": ($event) => unref(form).main = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "main",
              text: unref(t)("main"),
              class: "text-sm h-8 flex items-center"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).right,
              "onUpdate:modelValue": ($event) => unref(form).right = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "right",
              text: unref(t)("right"),
              class: "text-sm h-8 flex items-center"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "sections",
              value: unref(t)("sections"),
              class: "mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VueMultiselect), {
              modelValue: unref(form).sections,
              "onUpdate:modelValue": ($event) => unref(form).sections = $event,
              options: __props.sections,
              multiple: true,
              "close-on-select": true,
              placeholder: unref(t)("select"),
              label: "title",
              "track-by": "title"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, { for: "title" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("postTitle"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("postTitle")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
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
                  _push3(`<span class="text-red-500 dark:text-red-300 font-semibold"${_scopeId2}>*</span> ${ssrInterpolate(unref(t)("postUrl"))}`);
                } else {
                  return [
                    createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                    createTextVNode(" " + toDisplayString(unref(t)("postUrl")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
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
            _push2(ssrRenderComponent(_sfc_main$9, {
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
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              height: 500
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col lg:flex-row sm:justify-between sm:space-x-4"${_scopeId}><div class="flex flex-col lg:flex-row items-center mb-2 lg:mb-0 flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "published_at",
              value: unref(t)("publishedAt"),
              class: "mb-1 lg:mb-0 lg:mr-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "published_at",
              type: "date",
              modelValue: unref(form).published_at,
              "onUpdate:modelValue": ($event) => unref(form).published_at = $event,
              autocomplete: "published_at",
              class: "w-full max-w-56"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-1 sm:mt-0",
              message: unref(form).errors.published_at
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col lg:flex-row items-center mb-2 lg:mb-0 flex-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "author",
              value: unref(t)("postAuthor"),
              class: "w-40 mb-1 lg:mb-0 lg:mr-2"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "author",
              type: "text",
              modelValue: unref(form).author,
              "onUpdate:modelValue": ($event) => unref(form).author = $event,
              autocomplete: "author",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-1 sm:mt-0",
              message: unref(form).errors.author
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "tags",
              value: unref(t)("tags"),
              class: "mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VueMultiselect), {
              modelValue: unref(form).tags,
              "onUpdate:modelValue": ($event) => unref(form).tags = $event,
              options: __props.tags,
              multiple: true,
              "close-on-select": true,
              placeholder: unref(t)("select"),
              label: "name",
              "track-by": "name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex flex-col items-start"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "related_articles",
              value: unref(t)("relatedArticles"),
              class: "mb-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VueMultiselect), {
              modelValue: unref(form).related_articles,
              "onUpdate:modelValue": ($event) => unref(form).related_articles = $event,
              options: __props.related_articles,
              multiple: true,
              "close-on-select": true,
              placeholder: unref(t)("select"),
              label: "title",
              "track-by": "title"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.related_articles
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3 flex justify-between"${_scopeId}><div class="flex flex-row items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "views",
              value: unref(t)("views"),
              class: "mr-3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "views",
              type: "number",
              modelValue: unref(form).views,
              "onUpdate:modelValue": ($event) => unref(form).views = $event,
              autocomplete: "views"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.views
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-row items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "likes",
              value: unref(t)("likes"),
              class: "mr-3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$7, {
              id: "likes",
              type: "number",
              modelValue: unref(form).likes,
              "onUpdate:modelValue": ($event) => unref(form).likes = $event,
              autocomplete: "likes"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.likes
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3 flex flex-col items-start"${_scopeId}><div class="flex justify-between w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              for: "meta_title",
              value: unref(t)("metaTitle")
            }, null, _parent2, _scopeId));
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).meta_title.length)} / 160 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              id: "meta_title",
              type: "text",
              modelValue: unref(form).meta_title,
              "onUpdate:modelValue": ($event) => unref(form).meta_title = $event,
              maxlength: "160",
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
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).meta_keywords.length)} / 255 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
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
            _push2(`<div class="text-md text-gray-900 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(unref(form).meta_desc.length)} / 200 ${ssrInterpolate(unref(t)("characters"))}</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$9, {
              modelValue: unref(form).meta_desc,
              "onUpdate:modelValue": ($event) => unref(form).meta_desc = $event,
              maxlength: "200",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.meta_desc
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-end mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
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
            _push2(ssrRenderComponent(_sfc_main$c, { onClick: generateMetaFields }, {
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
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$d, {
              images: existingImages.value,
              "onUpdate:images": handleExistingImagesUpdate,
              onDeleteImage: handleDeleteExistingImage
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$e, { "onUpdate:images": handleNewImagesUpdate }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center justify-center mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: _ctx.route("admin.articles.index"),
              class: "mb-3"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 fill-current text-slate-100 shrink-0 mr-2" viewBox="0 0 16 16"${_scopeId2}><path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c-.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2 .8-6.4z"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                      viewBox: "0 0 16 16"
                    }, [
                      createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c-.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2 .8-6.4z" })
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
            _push2(ssrRenderComponent(_sfc_main$f, {
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
                      href: _ctx.route("admin.articles.index")
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
                    createVNode("div", { class: "mb-3 flex justify-between flex-col lg:flex-row items-center gap-4" }, [
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).left,
                          "onUpdate:modelValue": ($event) => unref(form).left = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          for: "left",
                          text: unref(t)("left"),
                          class: "text-sm h-8 flex items-center"
                        }, null, 8, ["text"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).main,
                          "onUpdate:modelValue": ($event) => unref(form).main = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          for: "main",
                          text: unref(t)("main"),
                          class: "text-sm h-8 flex items-center"
                        }, null, 8, ["text"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center gap-2" }, [
                        createVNode(_sfc_main$2, {
                          modelValue: unref(form).right,
                          "onUpdate:modelValue": ($event) => unref(form).right = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          for: "right",
                          text: unref(t)("right"),
                          class: "text-sm h-8 flex items-center"
                        }, null, 8, ["text"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, {
                        for: "sections",
                        value: unref(t)("sections"),
                        class: "mb-1"
                      }, null, 8, ["value"]),
                      createVNode(unref(VueMultiselect), {
                        modelValue: unref(form).sections,
                        "onUpdate:modelValue": ($event) => unref(form).sections = $event,
                        options: __props.sections,
                        multiple: true,
                        "close-on-select": true,
                        placeholder: unref(t)("select"),
                        label: "title",
                        "track-by": "title"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, { for: "title" }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "text-red-500 dark:text-red-300 font-semibold" }, "*"),
                          createTextVNode(" " + toDisplayString(unref(t)("postTitle")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$8, {
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
                          createTextVNode(" " + toDisplayString(unref(t)("postUrl")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_sfc_main$8, {
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
                      createVNode(_sfc_main$9, {
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
                      createVNode(_sfc_main$a, {
                        modelValue: unref(form).description,
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        height: 500
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.description
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col lg:flex-row sm:justify-between sm:space-x-4" }, [
                      createVNode("div", { class: "flex flex-col lg:flex-row items-center mb-2 lg:mb-0 flex-1" }, [
                        createVNode(_sfc_main$6, {
                          for: "published_at",
                          value: unref(t)("publishedAt"),
                          class: "mb-1 lg:mb-0 lg:mr-2"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$8, {
                          id: "published_at",
                          type: "date",
                          modelValue: unref(form).published_at,
                          "onUpdate:modelValue": ($event) => unref(form).published_at = $event,
                          autocomplete: "published_at",
                          class: "w-full max-w-56"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-1 sm:mt-0",
                          message: unref(form).errors.published_at
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-col lg:flex-row items-center mb-2 lg:mb-0 flex-1" }, [
                        createVNode(_sfc_main$6, {
                          for: "author",
                          value: unref(t)("postAuthor"),
                          class: "w-40 mb-1 lg:mb-0 lg:mr-2"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$8, {
                          id: "author",
                          type: "text",
                          modelValue: unref(form).author,
                          "onUpdate:modelValue": ($event) => unref(form).author = $event,
                          autocomplete: "author",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-1 sm:mt-0",
                          message: unref(form).errors.author
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, {
                        for: "tags",
                        value: unref(t)("tags"),
                        class: "mb-1"
                      }, null, 8, ["value"]),
                      createVNode(unref(VueMultiselect), {
                        modelValue: unref(form).tags,
                        "onUpdate:modelValue": ($event) => unref(form).tags = $event,
                        options: __props.tags,
                        multiple: true,
                        "close-on-select": true,
                        placeholder: unref(t)("select"),
                        label: "name",
                        "track-by": "name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode(_sfc_main$6, {
                        for: "related_articles",
                        value: unref(t)("relatedArticles"),
                        class: "mb-1"
                      }, null, 8, ["value"]),
                      createVNode(unref(VueMultiselect), {
                        modelValue: unref(form).related_articles,
                        "onUpdate:modelValue": ($event) => unref(form).related_articles = $event,
                        options: __props.related_articles,
                        multiple: true,
                        "close-on-select": true,
                        placeholder: unref(t)("select"),
                        label: "title",
                        "track-by": "title"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.related_articles
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mb-3 flex justify-between" }, [
                      createVNode("div", { class: "flex flex-row items-center" }, [
                        createVNode(_sfc_main$6, {
                          for: "views",
                          value: unref(t)("views"),
                          class: "mr-3"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$7, {
                          id: "views",
                          type: "number",
                          modelValue: unref(form).views,
                          "onUpdate:modelValue": ($event) => unref(form).views = $event,
                          autocomplete: "views"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.views
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex flex-row items-center" }, [
                        createVNode(_sfc_main$6, {
                          for: "likes",
                          value: unref(t)("likes"),
                          class: "mr-3"
                        }, null, 8, ["value"]),
                        createVNode(_sfc_main$7, {
                          id: "likes",
                          type: "number",
                          modelValue: unref(form).likes,
                          "onUpdate:modelValue": ($event) => unref(form).likes = $event,
                          autocomplete: "likes"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.likes
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mb-3 flex flex-col items-start" }, [
                      createVNode("div", { class: "flex justify-between w-full" }, [
                        createVNode(_sfc_main$6, {
                          for: "meta_title",
                          value: unref(t)("metaTitle")
                        }, null, 8, ["value"]),
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).meta_title.length) + " / 160 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$8, {
                        id: "meta_title",
                        type: "text",
                        modelValue: unref(form).meta_title,
                        "onUpdate:modelValue": ($event) => unref(form).meta_title = $event,
                        maxlength: "160",
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
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).meta_keywords.length) + " / 255 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$8, {
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
                        createVNode("div", { class: "text-md text-gray-900 dark:text-gray-400 mt-1" }, toDisplayString(unref(form).meta_desc.length) + " / 200 " + toDisplayString(unref(t)("characters")), 1)
                      ]),
                      createVNode(_sfc_main$9, {
                        modelValue: unref(form).meta_desc,
                        "onUpdate:modelValue": ($event) => unref(form).meta_desc = $event,
                        maxlength: "200",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_sfc_main$5, {
                        class: "mt-2",
                        message: unref(form).errors.meta_desc
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "flex justify-end mt-4" }, [
                      createVNode(_sfc_main$b, {
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
                      createVNode(_sfc_main$c, {
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
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$d, {
                        images: existingImages.value,
                        "onUpdate:images": handleExistingImagesUpdate,
                        onDeleteImage: handleDeleteExistingImage
                      }, null, 8, ["images"])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(_sfc_main$e, { "onUpdate:images": handleNewImagesUpdate })
                    ]),
                    createVNode("div", { class: "flex items-center justify-center mt-4" }, [
                      createVNode(_sfc_main$1, {
                        href: _ctx.route("admin.articles.index"),
                        class: "mb-3"
                      }, {
                        icon: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 fill-current text-slate-100 shrink-0 mr-2",
                            viewBox: "0 0 16 16"
                          }, [
                            createVNode("path", { d: "M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c-.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2 .8-6.4z" })
                          ]))
                        ]),
                        default: withCtx(() => [
                          createTextVNode(" " + toDisplayString(unref(t)("back")), 1)
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(_sfc_main$f, {
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
                      }, 8, ["disabled", "class"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Articles/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
