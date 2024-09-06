"use strict";
const common_vendor = require("../../../../common/vendor.js");
const hooks_useSend = require("../../../../hooks/useSend.js");
require("../../../../stores/index.js");
const stores_chatStore = require("../../../../stores/chatStore.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  (_easycom_u_button2 + _easycom_u_input2)();
}
const _easycom_u_button = () => "../../../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_input = () => "../../../../node-modules/uview-plus/components/u-input/u-input.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_input)();
}
const _sfc_main = {
  __name: "Send",
  emits: ["submit", "change", "on-before", "on-end", "on-error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    common_vendor.ref([]);
    const chatStore = stores_chatStore.useChatStore();
    const { running, content, send, handleStop } = hooks_useSend.useSend();
    const sendContent = common_vendor.ref("");
    const emit = __emit;
    common_vendor.computed(() => "传递的你的想法");
    common_vendor.watch(
      () => content.value,
      (val) => {
        if (running.value)
          emit("change", val);
      }
    );
    const inputInstRef = common_vendor.ref();
    const handleFocus = () => {
      var _a;
      (_a = inputInstRef.value) == null ? void 0 : _a.focus();
    };
    const submit = async (e) => {
      if (e.shiftKey)
        return;
      if (running.value || !sendContent.value)
        return;
      emit("on-before", sendContent.value);
      setTimeout(() => {
        setContent("");
      });
      const list = chatStore.messageList.filter((item) => item.content).map(({ content: content2, role }) => {
        return { content: content2, role };
      });
      if (chatStore.chat.prompt) {
        list.splice(-1, 0, {
          content: chatStore.chat.prompt,
          role: "user"
        });
      }
      let model = chatStore.currentChatModel;
      if (chatStore.agent) {
        model = chatStore.agent.model;
      }
      const req = {
        model,
        messages: list,
        stream: true
      };
      await send(req).finally(() => {
        emit("on-end", sendContent.value);
      });
    };
    const setContent = (val) => {
      sendContent.value = val;
    };
    const shortcut = (val) => {
      setContent(val);
      submit();
    };
    __expose({
      sendContent,
      shortcut,
      setContent,
      handleStop,
      running,
      handleFocus
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(submit),
        b: common_vendor.p({
          type: "success",
          size: "mini"
        }),
        c: common_vendor.sr(inputInstRef, "f17a0bac-0", {
          "k": "inputInstRef"
        }),
        d: common_vendor.o(($event) => sendContent.value = $event),
        e: common_vendor.p({
          placeholder: "请传递你的想法",
          modelValue: sendContent.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f17a0bac"]]);
wx.createComponent(Component);
