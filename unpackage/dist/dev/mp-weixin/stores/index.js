"use strict";
const common_vendor = require("../common/vendor.js");
require("./appStore.js");
require("./userStore.js");
require("./chatStore.js");
const store = common_vendor.createPinia();
exports.store = store;
