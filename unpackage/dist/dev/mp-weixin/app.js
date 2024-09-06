"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
const config_request = require("./config/request.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/image-clear/index.js";
  "./pages/image-style/index.js";
  "./pages/chat/index.js";
  "./pages/mine/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const SvgIcon = () => "./components/SvgIcon/index.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.uviewPlus);
  app.use(stores_index.store);
  app.use(SvgIcon);
  config_request.request();
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
