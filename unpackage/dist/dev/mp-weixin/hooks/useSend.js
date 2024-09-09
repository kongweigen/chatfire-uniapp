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
    }, () => {
      console.log("结束");
      running.value = false;
    });
    streamTask.onChunkReceived((res) => {
      const arrayBuffer = res.data;
      const uint8Array = new Uint8Array(arrayBuffer);
      const chunk = new common_vendor.textEncodingShimExports.TextDecoder("utf-8").decode(uint8Array);
      const t = getOpenAIContent(chunk);
      console.log("输出中", t);
      content.value += t;
      if (chunk.includes("[DONE]")) {
        console.log("输出结束");
        running.value = false;
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
function getOpenAIContent(chunk) {
  let content = "";
  try {
    const list = chunk.split("data:");
    list.forEach((item) => {
      if (item)
        content += JSON.parse(item).choices[0].delta.content || "";
    });
  } catch (error) {
  } finally {
    return content;
  }
}
exports.useSend = useSend;
