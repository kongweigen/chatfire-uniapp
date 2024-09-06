"use strict";
const common_vendor = require("../../common/vendor.js");
common_vendor.index.$u.http;
const chat2gpt = ({
  data,
  signal
}, config = {}) => {
  let token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODI0MTAyMzM0OTkzNzcyNTQ0LCJ1c2VyX2tleSI6IjgyMTIxYjdhLWU3MjMtNDYwMC1hMTlhLTAxYmIzODUzMWY0YSIsInVzZXJuYW1lIjoidGVzdCJ9.QckzY4WTJRTe9E0CGdlrzpL_DuQBBJnT7DYOjAJVmVhsLotGKnP597A-jBqid8H7UnMFiwG1JFRSf63PzvBvuQ";
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
      console.log(res);
    }
  });
};
exports.chat2gpt = chat2gpt;
