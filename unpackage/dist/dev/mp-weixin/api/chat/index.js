"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.index.$u.http;
const chat2gpt = ({
  data,
  signal
}, successCall) => {
  let token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODI0MTAyMzM0OTkzNzcyNTQ0LCJ1c2VyX2tleSI6IjMyMWEzMDRmLTdlZjktNDljMS1hYmE4LTBhOTBhMDdjZTgzOSIsInVzZXJuYW1lIjoidGVzdCJ9.9nLbW-MPMr42Y8em5BPSpXXoJkK6kxU3-ajFnYNfoMaHeg5fQ4AWyFJRSnsrUEMkNCULAQJraAb8c2833v9-lw";
  return common_vendor.index.request({
    method: "POST",
    url: "https://agi.chatfire.cn/box/chat/ask",
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
      successCall();
    }
  });
};
exports.chat2gpt = chat2gpt;
