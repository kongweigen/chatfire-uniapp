"use strict";
const common_vendor = require("../common/vendor.js");
require("../api/index.js");
const api_chat_index = require("../api/chat/index.js");
const useSend = () => {
  const running = common_vendor.ref(false);
  const content = common_vendor.ref("");
  const send = async (data) => {
    let controller2 = {};
    running.value = true;
    content.value = "";
    const streamTask = api_chat_index.chat2gpt({
      data,
      signal: controller2.signal
    });
    streamTask.onChunkReceived((res) => {
      const arrayBuffer = res.data;
      const uint8Array = new Uint8Array(arrayBuffer);
      const chunk = new common_vendor.textEncodingShimExports.TextDecoder("utf-8").decode(uint8Array);
      console.log("输出中", chunk);
      if (chunk.startsWith("{") && chunk.includes("{") && chunk.includes("}")) {
        try {
          const {
            msg
          } = JSON.parse(chunk);
          content.value = msg;
        } catch (e) {
          console.log("流异常", e);
          content.value = "系统异常";
        } finally {
          return;
        }
      } else {
        content.value += chunk;
      }
    });
  };
  const handleStop = () => {
    if (running.value) {
      controller.abort();
      running.value = false;
    }
  };
  return {
    content,
    running,
    send,
    handleStop
  };
};
exports.useSend = useSend;
