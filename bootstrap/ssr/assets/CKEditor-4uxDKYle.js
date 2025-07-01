import { unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { component } from "@mayasabha/ckeditor4-vue3";
const _sfc_main = {
  __name: "CKEditor",
  __ssrInlineRender: true,
  setup(__props) {
    const editorConfig = {
      height: "300px",
      toolbar: [
        { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
        { name: "Scayt", items: ["Scayt"] },
        { name: "links", items: ["Link", "Unlink", "Anchor"] },
        { name: "insert", items: ["Image", "Table", "HorizontalRule", "Smiley", "SpecialChar", "PageBreak"] },
        { name: "tools", items: ["Maximize", "ShowBlocks"] },
        { name: "document", items: ["Source", "-", "NewPage", "Preview", "-", "Templates"] },
        "/",
        {
          name: "basicstyles",
          items: ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "RemoveFormat"]
        },
        {
          name: "paragraph",
          items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent", "-", "Blockquote", "CreateDiv", "-", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "-", "BidiLtr", "BidiRtl"]
        },
        { name: "editing", items: ["Find", "Replace", "-", "SelectAll", "-"] },
        { name: "styles", items: ["Format", "Styles", "Font", "FontSize", "TextColor", "BGColor"] }
      ],
      language: "ru",
      extraPlugins: "uploadimage,uploadfile,image2,filebrowser,clipboard,pastefromword,pastetext",
      removePlugins: "image,easyimage",
      filebrowserBrowseUrl: "/laravel-filemanager?type=Files",
      filebrowserImageBrowseUrl: "/laravel-filemanager?type=Images",
      filebrowserUploadUrl: "/laravel-filemanager/upload?type=Files&_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
      filebrowserImageUploadUrl: "/laravel-filemanager/upload?type=Images&_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
      uploadUrl: "/laravel-filemanager/upload?type=Images&_token=" + document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
      clipboard_handleImages: false
      // Отключить обработку изображений из буфера обмена
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(component), mergeProps({ config: editorConfig }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/CKEditor/CKEditor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
