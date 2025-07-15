import { mergeProps, unref, useSSRContext, onMounted, onUnmounted, ref, watch, computed, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderStyle } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { A as AdminLayout } from "./AdminLayout-BWXXEX-Y.js";
import { T as TitlePage } from "./TitlePage-CEWud3f4.js";
import { _ as _sfc_main$5, a as _sfc_main$8, b as _sfc_main$b } from "./CountTable-f38CJ74P.js";
import { _ as _sfc_main$7, a as _sfc_main$9, b as _sfc_main$a } from "./SearchInput-CRP4iAYT.js";
import { _ as _sfc_main$6 } from "./BulkActionSelect-Ca2QmpUS.js";
import { _ as _sfc_main$4 } from "./ActivityToggle-BO_B69au.js";
import axios from "axios";
import "vue-toastification";
import "./ScrollButtons-DpnzINGM.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ResponsiveNavLink-DqF2K04_.js";
import "@vueuse/core";
import "vuedraggable";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@inertiajs/inertia";
import "./LocaleSelectOption-D2q2yRl9.js";
import "./auth-image-CfsIGyOn.js";
import "vue-smooth-dnd";
const _sfc_main$3 = {
  __name: "SortSelect",
  __ssrInlineRender: true,
  props: {
    sortParam: String
  },
  emits: ["update:sortParam"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center h-fit sm:mr-4 mt-2 mb-2" }, _attrs))}><label for="sortParam" class="hidden lg:block sm:mr-2 tracking-wider text-sm font-semibold text-slate-600 dark:text-slate-100">${ssrInterpolate(unref(t)("sort"))}</label><select id="sortParam"${ssrRenderAttr("value", __props.sortParam)} class="w-auto px-3 py-0.5 form-select bg-white dark:bg-gray-200 text-gray-600 dark:text-gray-900 border border-slate-400 dark:border-slate-600 rounded-sm shadow-sm"><option value="idDesc">${ssrInterpolate(unref(t)("idDesc"))}</option><option value="idAsc">${ssrInterpolate(unref(t)("idAsc"))}</option><option value="activity">${ssrInterpolate(unref(t)("active"))}</option><option value="inactive">${ssrInterpolate(unref(t)("inactive"))}</option><option value="status">${ssrInterpolate(unref(t)("passedModeration"))}</option><option value="instatus">${ssrInterpolate(unref(t)("notPassModeration"))}</option><option value="user">${ssrInterpolate(unref(t)("users"))}</option></select></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Comment/Sort/SortSelect.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "CommentTable",
  __ssrInlineRender: true,
  props: {
    comments: Array,
    selectedComments: Array
  },
  emits: ["toggle-activity", "edit", "delete", "toggle-select", "view-details", "approve-comment"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-700 shadow-lg rounded-sm border border-slate-200 dark:border-slate-600 relative" }, _attrs))}><div class="overflow-x-auto">`);
      if (__props.comments.length > 0) {
        _push(`<table class="table-auto w-full text-slate-700 dark:text-slate-100"><thead class="text-sm uppercase bg-slate-200 dark:bg-cyan-900 border border-solid border-gray-300 dark:border-gray-700"><tr><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px"><div class="font-medium text-center">${ssrInterpolate(unref(t)("id"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("userName"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-left">${ssrInterpolate(unref(t)("comment"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-medium text-end">${ssrInterpolate(unref(t)("actions"))}</div></th><th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"><div class="font-semibold text-center"><input type="checkbox"></div></th></tr></thead><tbody><!--[-->`);
        ssrRenderList(__props.comments, (comment) => {
          _push(`<tr class="text-sm font-semibold border-b-2 hover:bg-slate-100 dark:hover:bg-cyan-800"><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"><div class="text-center">${ssrInterpolate(comment.id)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"><div class="text-left text-yellow-500 dark:text-rose-200">${ssrInterpolate(comment.user.name)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"><div class="text-left text-blue-600 dark:text-violet-200">${ssrInterpolate(comment.content)}</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"><div class="flex justify-end space-x-2">`);
          if (!comment.status) {
            _push(`<button${ssrRenderAttr("title", unref(t)("approve"))} class="flex items-center py-1 px-1 rounded border border-slate-300 hover:border-teal-500 dark:border-teal-300 dark:hover:border-teal-100"><svg class="w-4 h-4 shrink-0 fill-current text-teal-500 mx-1" viewBox="0 0 16 16"><path d="M14.14 9.585h-.002a2.5 2.5 0 0 1-2 4.547 6.91 6.91 0 0 1-6.9 1.165 4.436 4.436 0 0 0 1.343-1.682c.365.087.738.132 1.113.135a4.906 4.906 0 0 0 2.924-.971 2.5 2.5 0 0 1 3.522-3.194Zm-4.015-7.397a7.023 7.023 0 0 1 4.47 5.396 4.5 4.5 0 0 0-1.7-.334c-.15.002-.299.012-.447.03a5.027 5.027 0 0 0-2.723-3.078 2.5 2.5 0 1 1 .4-2.014ZM4.663 10.5a2.5 2.5 0 1 1-3.859-.584 6.888 6.888 0 0 1-.11-1.166c0-2.095.94-4.08 2.56-5.407.093.727.364 1.419.788 2.016A4.97 4.97 0 0 0 2.694 8.75c.003.173.015.345.037.516A2.49 2.49 0 0 1 4.663 10.5Z"></path></svg></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button${ssrRenderAttr("title", unref(t)("view"))} class="flex items-center py-1 px-1 rounded border border-slate-300 hover:border-blue-500 dark:border-blue-300 dark:hover:border-blue-100"><svg class="w-4 h-4 shrink-0 fill-current text-blue-500 mx-1" viewBox="0 0 16 16"><path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z"></path></svg></button>`);
          _push(ssrRenderComponent(_sfc_main$4, {
            isActive: comment.activity,
            onToggleActivity: ($event) => _ctx.$emit("toggle-activity", comment),
            title: comment.activity ? unref(t)("enabled") : unref(t)("disabled")
          }, null, _parent));
          _push(ssrRenderComponent(_sfc_main$5, {
            onClick: ($event) => _ctx.$emit("delete", comment.id)
          }, null, _parent));
          _push(`</div></td><td class="px-2 first:pl-5 last:pr-5 py-1 whitespace-nowrap"><div class="text-center"><input type="checkbox"${ssrIncludeBooleanAttr(__props.selectedComments.includes(comment.id)) ? " checked" : ""}></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<div class="p-5 text-center text-slate-700 dark:text-slate-100">${ssrInterpolate(unref(t)("noData"))}</div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Comment/Table/CommentTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CommentDetailsModal",
  __ssrInlineRender: true,
  props: {
    show: Boolean,
    comment: Object
    // Предполагается, что в этом объекте есть данные о пользователе, такие как user.name
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const emits = __emit;
    const closeModal = () => {
      emits("close");
    };
    const closeOnEscape = (e) => {
      if (e.key === "Escape" && props.show) {
        closeModal();
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b, _c, _d;
        _push2(`<div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto" scroll-region><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="fixed inset-0 transform transition-all"><div class="absolute inset-0 bg-slate-800 opacity-25"></div></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-xl transform transition-all max-w-lg w-full max-h-full sm:w-full sm:mx-auto relative overflow-y-auto"><button class="absolute top-0 right-1 m-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-red-400 dark:text-gray-300 dark:hover:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="px-3 py-1"><h3 class="text-center text-md font-semibold text-gray-900 dark:text-gray-100 pb-1 border-dashed border-b border-slate-400">${ssrInterpolate(unref(t)("commentDetails"))} - ${ssrInterpolate(unref(t)("id"))}: ${ssrInterpolate((_a = __props.comment) == null ? void 0 : _a.id)}</h3>`);
        if ((_b = __props.comment) == null ? void 0 : _b.user) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("userCommented"))}</span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.user.name)}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        if ((_c = __props.comment) == null ? void 0 : _c.article) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("commentedArticle"))}</span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.article.title)}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        if ((_d = __props.comment) == null ? void 0 : _d.rubric) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("commentedRubric"))}</span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.rubric.title)}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.comment) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("comment"))}: </span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.content)}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.comment) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("status"))}: </span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.status ? unref(t)("moderationPassed") : unref(t)("underModeration"))}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.comment) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("activity"))}: </span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.activity ? unref(t)("active") : unref(t)("inactive"))}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.comment) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("createdAt"))}: </span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.created_at)}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.comment) {
          _push2(`<div class="my-2"><span class="font-semibold text-sm text-violet-700 dark:text-rose-300">${ssrInterpolate(unref(t)("updatedAt"))}: </span><p class="font-semibold italic text-sm text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.comment.updated_at)}</p></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="my-1 sm:flex sm:flex-row-reverse space-x-2"><button type="button" class="flex justify-center items-center float-right rounded-md border border-transparent shadow-sm px-3 py-0 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg><span class="ml-2">${ssrInterpolate(unref(t)("close"))}</span></button></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Comment/Modal/CommentDetailsModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: ["comments", "commentsCount", "adminCountComments", "adminSortComments"],
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    const form = useForm({});
    const itemsPerPage = ref(props.adminCountComments);
    watch(itemsPerPage, (newVal) => {
      axios.put(route("settings.updateAdminCountComments"), { value: newVal.toString() }).then((response) => {
      }).catch((error) => {
        console.error("Ошибка обновления настройки:", error.response.data);
      });
    });
    const sortParam = ref(props.adminSortComments);
    watch(sortParam, (newVal) => {
      axios.put(route("settings.updateAdminSortComments"), { value: newVal }).then((response) => {
      }).catch((error) => {
        console.error("Ошибка обновления сортировки:", error.response.data);
      });
    });
    const showCommentDetailsModal = ref(false);
    const commentDetails = ref(null);
    const viewCommentDetails = (comment) => {
      commentDetails.value = comment;
      showCommentDetailsModal.value = true;
    };
    const closeCommentDetailsModal = () => {
      showCommentDetailsModal.value = false;
    };
    const showConfirmDeleteModal = ref(false);
    const commentToDeleteId = ref(null);
    const confirmDelete = (id) => {
      commentToDeleteId.value = id;
      showConfirmDeleteModal.value = true;
    };
    const closeModal = () => {
      showConfirmDeleteModal.value = false;
    };
    const deleteComment = () => {
      if (commentToDeleteId.value !== null) {
        form.delete(route("comments.destroy", commentToDeleteId.value), {
          onSuccess: () => closeModal()
        });
      }
    };
    const toggleActivity = (comment) => {
      const newActivity = !comment.activity;
      axios.put(route("comments.updateActivity", comment.id), { activity: newActivity }).then((response) => {
        comment.activity = newActivity;
        if (response.data.reload) {
          window.location.reload();
        }
      }).catch((error) => {
        var _a;
        console.error(((_a = error.response) == null ? void 0 : _a.data) || error.message);
      });
    };
    const currentPage = ref(1);
    const searchQuery = ref("");
    const sortComments = (comments) => {
      if (sortParam.value === "idAsc") {
        return comments.slice().sort((a, b) => a.id - b.id);
      }
      if (sortParam.value === "idDesc") {
        return comments.slice().sort((a, b) => b.id - a.id);
      }
      if (sortParam.value === "activity") {
        return comments.filter((comment) => comment.activity);
      }
      if (sortParam.value === "inactive") {
        return comments.filter((comment) => !comment.activity);
      }
      if (sortParam.value === "status") {
        return comments.filter((comment) => comment.status);
      }
      if (sortParam.value === "instatus") {
        return comments.filter((comment) => !comment.status);
      }
      if (sortParam.value === "user") {
        return comments.slice().sort((a, b) => {
          return a.user.name.localeCompare(b.user.name);
        });
      }
      return comments.slice().sort((a, b) => {
        if (a[sortParam.value] < b[sortParam.value])
          return -1;
        if (a[sortParam.value] > b[sortParam.value])
          return 1;
        return 0;
      });
    };
    const filteredComments = computed(() => {
      let filtered = props.comments;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (comment) => comment.content.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return sortComments(filtered);
    });
    const paginatedComments = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredComments.value.slice(start, start + itemsPerPage.value);
    });
    computed(() => Math.ceil(filteredComments.value.length / itemsPerPage.value));
    const selectedComments = ref([]);
    const toggleAll = (event) => {
      const isChecked = event.target.checked;
      selectedComments.value = isChecked ? paginatedComments.value.map((comment) => comment.id) : [];
    };
    const toggleSelectComment = (commentId) => {
      const index = selectedComments.value.indexOf(commentId);
      if (index > -1) {
        selectedComments.value.splice(index, 1);
      } else {
        selectedComments.value.push(commentId);
      }
    };
    const bulkToggleActivity = (newActivity) => {
      selectedComments.value.forEach((commentId) => {
        axios.put(route("comments.updateActivity", commentId), { activity: newActivity }).then((response) => {
          if (response.data.reload) {
            window.location.reload();
          }
        }).catch((error) => {
          var _a;
          console.error(((_a = error.response) == null ? void 0 : _a.data) || error.message);
        });
      });
    };
    const bulkDelete = () => {
      axios.delete(route("comments.bulkDestroy"), { data: { ids: selectedComments.value } }).then((response) => {
        selectedComments.value = [];
        if (response.data.reload) {
          window.location.reload();
        }
      }).catch((error) => {
        console.error(error.response.data);
      });
    };
    const handleBulkAction = (event) => {
      const action = event.target.value;
      if (action === "selectAll") {
        paginatedComments.value.forEach((comment) => {
          if (!selectedComments.value.includes(comment.id)) {
            selectedComments.value.push(comment.id);
          }
        });
      } else if (action === "deselectAll") {
        selectedComments.value = [];
      } else if (action === "activate") {
        bulkToggleActivity(true);
      } else if (action === "deactivate") {
        bulkToggleActivity(false);
      } else if (action === "delete") {
        bulkDelete();
      }
      event.target.value = "";
    };
    const approveComment = (commentId) => {
      axios.put(route("comments.approve", commentId)).then((response) => {
        const comment = props.comments.find((c) => c.id === commentId);
        if (comment) {
          comment.status = true;
        }
      }).catch((error) => {
        console.error(error);
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, mergeProps({
        title: unref(t)("comments")
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(TitlePage, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("comments"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("comments")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(TitlePage, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("comments")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto"${_scopeId}><div class="p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95"${_scopeId}><div class="sm:flex sm:justify-end sm:items-center mb-2"${_scopeId}>`);
            if (__props.commentsCount) {
              _push2(ssrRenderComponent(_sfc_main$6, { onChange: handleBulkAction }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.commentsCount) {
              _push2(ssrRenderComponent(_sfc_main$7, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: unref(t)("search")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.commentsCount) {
              _push2(ssrRenderComponent(_sfc_main$8, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.commentsCount)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.commentsCount), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              comments: paginatedComments.value,
              "selected-comments": selectedComments.value,
              onToggleActivity: toggleActivity,
              onDelete: confirmDelete,
              onToggleSelect: toggleSelectComment,
              onToggleAll: toggleAll,
              onViewDetails: viewCommentDetails,
              onApproveComment: approveComment
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              show: showCommentDetailsModal.value,
              comment: commentDetails.value,
              onClose: closeCommentDetailsModal
            }, null, _parent2, _scopeId));
            if (__props.commentsCount) {
              _push2(`<div class="flex justify-between items-center flex-col md:flex-row my-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$9, {
                "items-per-page": itemsPerPage.value,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$a, {
                "current-page": currentPage.value,
                "items-per-page": itemsPerPage.value,
                "total-items": filteredComments.value.length,
                "onUpdate:currentPage": ($event) => currentPage.value = $event,
                "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                sortParam: sortParam.value,
                "onUpdate:sortParam": (val) => sortParam.value = val
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              show: showConfirmDeleteModal.value,
              onClose: closeModal,
              onCancel: closeModal,
              onConfirm: deleteComment,
              cancelText: unref(t)("cancel"),
              confirmText: unref(t)("yesDelete")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "px-4 sm:px-6 lg:px-8 py-8 w-full max-w-12xl mx-auto" }, [
                createVNode("div", { class: "p-4 bg-slate-50 dark:bg-slate-700 border border-blue-400 dark:border-blue-200 overflow-hidden shadow-lg shadow-gray-500 dark:shadow-slate-400 bg-opacity-95 dark:bg-opacity-95" }, [
                  createVNode("div", { class: "sm:flex sm:justify-end sm:items-center mb-2" }, [
                    __props.commentsCount ? (openBlock(), createBlock(_sfc_main$6, {
                      key: 0,
                      onChange: handleBulkAction
                    })) : createCommentVNode("", true)
                  ]),
                  __props.commentsCount ? (openBlock(), createBlock(_sfc_main$7, {
                    key: 0,
                    modelValue: searchQuery.value,
                    "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                    placeholder: unref(t)("search")
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])) : createCommentVNode("", true),
                  __props.commentsCount ? (openBlock(), createBlock(_sfc_main$8, { key: 1 }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.commentsCount), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$2, {
                    comments: paginatedComments.value,
                    "selected-comments": selectedComments.value,
                    onToggleActivity: toggleActivity,
                    onDelete: confirmDelete,
                    onToggleSelect: toggleSelectComment,
                    onToggleAll: toggleAll,
                    onViewDetails: viewCommentDetails,
                    onApproveComment: approveComment
                  }, null, 8, ["comments", "selected-comments"]),
                  createVNode(_sfc_main$1, {
                    show: showCommentDetailsModal.value,
                    comment: commentDetails.value,
                    onClose: closeCommentDetailsModal
                  }, null, 8, ["show", "comment"]),
                  __props.commentsCount ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "flex justify-between items-center flex-col md:flex-row my-1"
                  }, [
                    createVNode(_sfc_main$9, {
                      "items-per-page": itemsPerPage.value,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["items-per-page", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$a, {
                      "current-page": currentPage.value,
                      "items-per-page": itemsPerPage.value,
                      "total-items": filteredComments.value.length,
                      "onUpdate:currentPage": ($event) => currentPage.value = $event,
                      "onUpdate:itemsPerPage": ($event) => itemsPerPage.value = $event
                    }, null, 8, ["current-page", "items-per-page", "total-items", "onUpdate:currentPage", "onUpdate:itemsPerPage"]),
                    createVNode(_sfc_main$3, {
                      sortParam: sortParam.value,
                      "onUpdate:sortParam": (val) => sortParam.value = val
                    }, null, 8, ["sortParam", "onUpdate:sortParam"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$b, {
                show: showConfirmDeleteModal.value,
                onClose: closeModal,
                onCancel: closeModal,
                onConfirm: deleteComment,
                cancelText: unref(t)("cancel"),
                confirmText: unref(t)("yesDelete")
              }, null, 8, ["show", "cancelText", "confirmText"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Comments/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
