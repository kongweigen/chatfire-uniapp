"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  (_easycom_u_image2 + _easycom_u_input2)();
}
const _easycom_u_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_input)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const sendContent = common_vendor.ref("");
    const submit = () => {
      common_vendor.index.navigateTo({
        url: `/pages/chat-detail/index?text=${sendContent.value}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: common_assets._imports_0$1,
          height: "500rpx"
        }),
        b: common_vendor.p({
          width: "50rpx",
          height: "50rpx",
          src: common_assets._imports_0$2
        }),
        c: common_vendor.o(submit),
        d: common_vendor.sr("inputInstRef", "5a559478-1"),
        e: common_vendor.o(($event) => sendContent.value = $event),
        f: common_vendor.p({
          border: "none",
          placeholder: "请传递你的想法",
          modelValue: sendContent.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a559478"]]);
wx.createPage(MiniProgramPage);
