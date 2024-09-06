"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const utils_tools = require("../../../../utils/tools.js");
require("../../../../stores/index.js");
const pages_chat_components_chatContainer_useAgent = require("./useAgent.js");
const stores_chatStore = require("../../../../stores/chatStore.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  (_easycom_u_button2 + _easycom_u_image2)();
}
const _easycom_u_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_image = () => "../../../../node-modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  (MsgItem + _easycom_u_button + _easycom_u_image + Send)();
}
const Send = () => "./Send.js";
const MsgItem = () => "./MsgItem.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const showLogo = common_vendor.computed(() => !chatStore.messageList || chatStore.messageList.length == 0);
    const chatStore = stores_chatStore.useChatStore();
    const sendRef = common_vendor.ref();
    const { sendContent, agentPanelRef, switchAgentPanel } = pages_chat_components_chatContainer_useAgent.useAgent(sendRef);
    const beforeSend = async (val) => {
      chatStore.addMessage(val);
      utils_tools.positionDomViewBottom();
    };
    const onError = () => {
      chatStore.updateLastMessage("", "success");
    };
    const endSend = () => {
      chatStore.updateLastMessage("", "success");
    };
    const msgChange = (val) => {
      sendContent.value = val;
      chatStore.updateLastMessage(val);
      utils_tools.positionDomViewBottom();
    };
    let handleStop;
    common_vendor.onMounted(() => {
      var _a;
      console.log("加载");
      handleStop = (_a = sendRef.value) == null ? void 0 : _a.handleStop;
    });
    common_vendor.onUnmounted(() => {
      console.log("卸载");
      endSend();
      handleStop == null ? void 0 : handleStop();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: !showLogo.value
      }, !showLogo.value ? common_vendor.e({
        b: common_vendor.p({
          item: {
            role: "system",
            content: "您好，我是火宝，快来提问试试吧！"
          },
          role: "gpt",
          position: "left"
        }),
        c: common_vendor.f(common_vendor.unref(chatStore).messageList, (item, k0, i0) => {
          return {
            a: item,
            b: "670f4c4d-1-" + i0,
            c: common_vendor.p({
              item,
              position: item.role == "user" ? "right" : "left",
              role: "gpt"
            })
          };
        }),
        d: (_a = sendRef.value) == null ? void 0 : _a.running
      }, ((_b = sendRef.value) == null ? void 0 : _b.running) ? {
        e: common_vendor.o((_c = sendRef.value) == null ? void 0 : _c.handleStop),
        f: common_vendor.p({
          width: "100rpx",
          size: "small",
          shape: "circle"
        })
      } : {}) : {
        g: common_vendor.p({
          src: common_assets._imports_0$1,
          height: "500rpx"
        })
      }, {
        h: common_vendor.sr(sendRef, "670f4c4d-4", {
          "k": "sendRef"
        }),
        i: common_vendor.o(msgChange),
        j: common_vendor.o(beforeSend),
        k: common_vendor.o(endSend),
        l: common_vendor.o(onError),
        m: common_vendor.o(common_vendor.unref(switchAgentPanel))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-670f4c4d"]]);
wx.createComponent(Component);
