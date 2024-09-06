"use strict";
const common_vendor = require("../common/vendor.js");
const request = (vm) => {
  common_vendor.index.$u.http.setConfig((config) => {
    config.baseURL = "https://agi.chatfire.cn";
    return config;
  });
  common_vendor.index.$u.http.interceptors.request.use((config) => {
    config.data = config.data || {};
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODI0MTAyMzM0OTkzNzcyNTQ0LCJ1c2VyX2tleSI6IjMyMWEzMDRmLTdlZjktNDljMS1hYmE4LTBhOTBhMDdjZTgzOSIsInVzZXJuYW1lIjoidGVzdCJ9.9nLbW-MPMr42Y8em5BPSpXXoJkK6kxU3-ajFnYNfoMaHeg5fQ4AWyFJRSnsrUEMkNCULAQJraAb8c2833v9-lw";
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
