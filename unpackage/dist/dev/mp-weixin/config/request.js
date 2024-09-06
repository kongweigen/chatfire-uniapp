"use strict";
const common_vendor = require("../common/vendor.js");
const request = (vm) => {
  common_vendor.index.$u.http.setConfig((config) => {
    config.baseURL = "https://agi.chatfire.cn";
    return config;
  });
  common_vendor.index.$u.http.interceptors.request.use((config) => {
    config.data = config.data || {};
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODI0MTAyMzM0OTkzNzcyNTQ0LCJ1c2VyX2tleSI6IjgyMTIxYjdhLWU3MjMtNDYwMC1hMTlhLTAxYmIzODUzMWY0YSIsInVzZXJuYW1lIjoidGVzdCJ9.QckzY4WTJRTe9E0CGdlrzpL_DuQBBJnT7DYOjAJVmVhsLotGKnP597A-jBqid8H7UnMFiwG1JFRSf63PzvBvuQ";
    config.header["Authorization"] = `Bearer ${token}`;
    return config;
  }, (config) => {
    return Promise.reject(config);
  });
  common_vendor.index.$u.http.interceptors.response.use((response) => {
    var _a;
    const data = response.data;
    const custom = (_a = response.config) == null ? void 0 : _a.custom;
    debugger;
    if (data.code !== 200) {
      if (custom.toast !== false) {
        common_vendor.index.$u.toast(data.message);
      }
      if (custom == null ? void 0 : custom.catch) {
        return Promise.reject(data);
      } else {
        return new Promise(() => {
        });
      }
    }
    return data.data === void 0 ? {} : data.data;
  }, (response) => {
    return Promise.reject(response);
  });
};
exports.request = request;
