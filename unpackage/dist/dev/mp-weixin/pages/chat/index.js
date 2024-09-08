"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_chat_useChat = require("./useChat.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_icon2 + _easycom_u_navbar2 + _easycom_u_image2 + _easycom_u_input2 + _easycom_u_popup2)();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_navbar + _easycom_u_image + _easycom_u_input + History + _easycom_u_popup)();
}
const History = () => "./history/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { historyShow, sendContent, list, submit, navLeftClick } = pages_chat_useChat.useChat();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(common_vendor.unref(navLeftClick)),
        b: common_vendor.p({
          name: "list",
          size: "25"
        }),
        c: common_vendor.o(_ctx.rightClick),
        d: common_vendor.p({
          title: "火宝 AI"
        }),
        e: common_assets._imports_0$1,
        f: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item),
            c: common_vendor.o(($event) => common_vendor.unref(submit)(item))
          };
        }),
        g: common_vendor.p({
          width: "50rpx",
          height: "50rpx",
          src: common_assets._imports_0$2
        }),
        h: common_vendor.o(($event) => common_vendor.unref(submit)(null)),
        i: common_vendor.sr("inputInstRef", "5a559478-2"),
        j: common_vendor.o(($event) => common_vendor.isRef(sendContent) ? sendContent.value = $event : null),
        k: common_vendor.p({
          border: "none",
          placeholder: "请传递你的想法",
          modelValue: common_vendor.unref(sendContent)
        }),
        l: common_vendor.o(($event) => historyShow.value = _ctx.CSSFontPaletteValuesRule),
        m: common_vendor.p({
          show: common_vendor.unref(historyShow),
          mode: "left",
          safeAreaInsetTop: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a559478"]]);
wx.createPage(MiniProgramPage);
