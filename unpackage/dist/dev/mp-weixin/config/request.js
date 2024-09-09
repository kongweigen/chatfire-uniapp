"use strict";
const common_vendor = require("../common/vendor.js");
const request = (vm) => {
  common_vendor.index.$u.http.setConfig((config) => {
    config.baseURL = "http://103.74.173.48:6101";
    return config;
  });
  common_vendor.index.$u.http.interceptors.request.use((config) => {
    config.data = config.data || {};
    let token = common_vendor.index.getStorageSync("token");
    config.header["Authorization"] = `Bearer ${token}`;
    return config;
  }, (config) => {
    return Promise.reject(config);
  });
  common_vendor.index.$u.http.interceptors.response.use((response) => {
    var _a;
    const data = response.data;
    const custom = (_a = response.config) == null ? void 0 : _a.custom;
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
