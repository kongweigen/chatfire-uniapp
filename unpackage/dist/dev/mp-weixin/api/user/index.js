"use strict";
const common_vendor = require("../../common/vendor.js");
const http = common_vendor.index.$u.http;
const queryUser = (data) => {
  return http.get("/box/system/user/getById", data);
};
exports.queryUser = queryUser;
