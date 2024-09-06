"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_imageClear_useClear = require("./useClear.js");
if (!Array) {
  const _easycom_u__image2 = common_vendor.resolveComponent("u--image");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u__image2 + _easycom_u_button2)();
}
const _easycom_u__image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u__image + _easycom_u_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { customStyle, sourceImage, imageUrl, uploadImage, generate } = pages_imageClear_useClear.useClear();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(sourceImage).url && !common_vendor.unref(imageUrl)
      }, !common_vendor.unref(sourceImage).url && !common_vendor.unref(imageUrl) ? {
        b: common_vendor.p({
          src: "https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/outputs/201b7bc3-c183-472c-a4bf-c8c7c2127661_0.png",
          height: "700rpx",
          width: "700rpx",
          radius: "10"
        })
      } : {}, {
        c: !common_vendor.unref(imageUrl) && common_vendor.unref(sourceImage).url
      }, !common_vendor.unref(imageUrl) && common_vendor.unref(sourceImage).url ? {
        d: common_vendor.p({
          src: common_vendor.unref(sourceImage).url,
          height: "700rpx",
          width: "700rpx",
          radius: "10"
        })
      } : {}, {
        e: common_vendor.unref(imageUrl)
      }, common_vendor.unref(imageUrl) ? {
        f: common_vendor.p({
          src: common_vendor.unref(imageUrl),
          height: "700rpx",
          width: "700rpx",
          radius: "10"
        })
      } : {}, {
        g: common_vendor.unref(sourceImage).url
      }, common_vendor.unref(sourceImage).url ? {
        h: common_vendor.o(common_vendor.unref(generate)),
        i: common_vendor.p({
          customStyle: common_vendor.unref(customStyle),
          text: "一键清晰"
        })
      } : {
        j: common_vendor.o(common_vendor.unref(uploadImage)),
        k: common_vendor.p({
          customStyle: common_vendor.unref(customStyle),
          text: "点击上传"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29773fa1"]]);
wx.createPage(MiniProgramPage);
