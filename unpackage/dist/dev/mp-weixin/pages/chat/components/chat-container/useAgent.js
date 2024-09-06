"use strict";
const common_vendor = require("../../../../common/vendor.js");
require("../../../../stores/index.js");
const stores_chatStore = require("../../../../stores/chatStore.js");
const useAgent = (sendRef) => {
  const agentPanelRef = common_vendor.ref();
  const sendContent = common_vendor.ref("");
  const chatStore = stores_chatStore.useChatStore();
  common_vendor.watch(
    () => {
      var _a;
      return (_a = sendRef.value) == null ? void 0 : _a.sendContent;
    },
    (newVal) => {
      console.log("useCommand", newVal);
      if (newVal === "@") {
        showAgent();
      }
    }
  );
  common_vendor.watch(
    () => chatStore.agent,
    (newVal) => {
      var _a;
      if (((_a = sendRef.value) == null ? void 0 : _a.sendContent) === "@" && newVal) {
        sendRef.value.sendContent = "";
        sendRef.value.handleFocus();
      }
    },
    { deep: true }
  );
  const showAgent = () => {
    var _a;
    (_a = agentPanelRef.value) == null ? void 0 : _a.show();
  };
  const switchAgentPanel = () => {
    var _a;
    (_a = agentPanelRef.value) == null ? void 0 : _a.switchShow();
  };
  return { switchAgentPanel, sendContent, agentPanelRef };
};
exports.useAgent = useAgent;
