"use strict";
const common_vendor = require("../../common/vendor.js");
const http = common_vendor.index.$u.http;
const generateImagePcedit = (params, config = {}) => {
  return http.post("/box/chat/pcedit", params, config);
};
exports.generateImagePcedit = generateImagePcedit;
