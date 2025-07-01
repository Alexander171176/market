import { shallowRef, onMounted, watch, createVNode, resolveDynamicComponent, mergeProps, defineAsyncComponent, useSSRContext } from "vue";
import { ssrRenderVNode } from "vue/server-renderer";
import axios from "axios";
import _sfc_main$1 from "./Maintenance-Clt42Tgk.js";
import "@vueuse/head";
import "vue-i18n";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean,
    template: String,
    laravelVersion: String,
    phpVersion: String
  },
  setup(__props) {
    const props = __props;
    const importTemplates = () => {
      const context = /* @__PURE__ */ Object.assign({});
      const components2 = {};
      for (const path in context) {
        const templateName = path.split("/")[5];
        components2[templateName] = defineAsyncComponent(context[path]);
      }
      return components2;
    };
    const components = importTemplates();
    const downtimeSite = shallowRef(false);
    const currentComponent = shallowRef(null);
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/settings/downtimeSite");
        downtimeSite.value = response.data.value === "true";
      } catch (error) {
        console.error("Ошибка при получении настроек:", error);
      } finally {
        updateComponent();
      }
    };
    const updateComponent = () => {
      if (downtimeSite.value) {
        currentComponent.value = _sfc_main$1;
      } else {
        const template = props.template || "Default";
        currentComponent.value = components[template] || components["Default"];
      }
    };
    onMounted(() => {
      fetchSettings();
    });
    watch(downtimeSite, (newValue) => {
      updateComponent();
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(currentComponent.value), mergeProps(props, _attrs), null), _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
