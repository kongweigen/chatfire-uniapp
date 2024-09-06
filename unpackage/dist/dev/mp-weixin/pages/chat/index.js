"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  ChatContainer();
}
const ChatContainer = () => "./components/chat-container/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5a559478"]]);
wx.createPage(MiniProgramPage);
