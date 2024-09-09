"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.index.$u.http;
const chat2gpt = ({
  data,
  signal
}, successCall) => {
  let token = common_vendor.index.getStorageSync("token");
  return common_vendor.index.request({
    method: "POST",
    // url: 'https://agi.chatfire.cn/box/chat/ask', //仅为示例，并非真实接口地址。
    url: "http://103.74.173.48:6101/box/chat/ask",
    //仅为示例，并非真实接口地址。
    data,
    enableChunked: true,
    responseType: "stream",
    header: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${token}`
    },
    success: (res) => {
      console.log(res);
      successCall();
    }
  });
};
exports.chat2gpt = chat2gpt;
