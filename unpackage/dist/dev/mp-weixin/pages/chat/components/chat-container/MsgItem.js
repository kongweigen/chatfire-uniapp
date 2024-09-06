"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
require("../../../../stores/index.js");
const utils_tools = require("../../../../utils/tools.js");
const stores_userStore = require("../../../../stores/userStore.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _component_NSpin = common_vendor.resolveComponent("NSpin");
  const _component_SvgIcon = common_vendor.resolveComponent("SvgIcon");
  (_easycom_u_image2 + _component_NSpin + _component_SvgIcon)();
}
const _easycom_u_image = () => "../../../../node-modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  _easycom_u_image();
}
const _sfc_main = {
  __name: "MsgItem",
  props: {
    item: {
      type: Object,
      default: () => {
      }
    },
    role: String,
    position: String
  },
  emits: ["stop-stream", "on-refresh"],
  setup(__props, { emit: __emit }) {
    const md = common_vendor.MarkdownIt({
      html: false,
      // 在源码中启用 HTML 标签
      linkify: true,
      // 将类似 URL 的文本自动转换为链接。
      typographer: true,
      // 启用一些语言中立的替换 + 引号美化
      highlight: function(str, lang) {
        const html = common_vendor.HighlightJS.highlightAuto(str).value;
        const val = `<pre class="code-body">
        <code class="hljs">${html}</code>
      </pre>`;
        return val;
      }
    });
    const props = __props;
    stores_userStore.useUserStore();
    const contentHtml = common_vendor.computed(() => {
      const val = props.item.userContent || props.item.content;
      return md.render(val);
    });
    const status = common_vendor.computed(() => props.item.status);
    const handlerAction = (type) => {
      const val = props.item.userContent || props.item.content;
      if (type == "copy") {
        utils_tools.copy(val);
        $message.success("复制成功");
      } else {
        $message.success("感谢你的反馈");
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.position == "left"
      }, __props.position == "left" ? common_vendor.e({
        b: common_vendor.p({
          width: "40rpx",
          height: "40rpx",
          src: common_assets._imports_0$1
        }),
        c: contentHtml.value,
        d: status.value == "loading"
      }, status.value == "loading" ? {
        e: common_vendor.p({
          size: 15
        })
      } : {}, {
        f: common_vendor.o(($event) => handlerAction("copy")),
        g: common_vendor.p({
          width: 15,
          height: 15,
          hover: true,
          icon: "icon-park-outline:copy"
        }),
        h: common_vendor.o(handlerAction),
        i: common_vendor.p({
          width: 15,
          height: 15,
          hover: true,
          icon: "bx:like"
        }),
        j: common_vendor.o(handlerAction),
        k: common_vendor.p({
          width: 15,
          height: 15,
          hover: true,
          icon: "bx:dislike"
        })
      }) : {}, {
        l: __props.position == "right"
      }, __props.position == "right" ? {
        m: contentHtml.value,
        n: common_vendor.p({
          width: "40rpx",
          height: "40rpx",
          src: common_assets._imports_0$1
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7837332f"]]);
wx.createComponent(Component);
