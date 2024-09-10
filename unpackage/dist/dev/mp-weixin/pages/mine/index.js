"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_mine_useMine = require("./useMine.js");
if (!Array) {
  const _easycom_u___input2 = common_vendor.resolveComponent("u---input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u___input2 + _easycom_u_button2)();
}
const _easycom_u___input = () => "../../node-modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u___input + _easycom_u_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { loginCode, login } = pages_mine_useMine.useMine();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(loginCode) ? loginCode.value = $event : null),
        b: common_vendor.p({
          modelValue: common_vendor.unref(loginCode)
        }),
        c: common_vendor.o(common_vendor.unref(login))
      };
    };
  }
};
wx.createPage(_sfc_main);
