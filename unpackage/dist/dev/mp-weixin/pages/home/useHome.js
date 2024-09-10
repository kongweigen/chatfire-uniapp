"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../api/index.js");
const utils_constant = require("../../utils/constant.js");
const api_user_index = require("../../api/user/index.js");
const useHome = () => {
  const menuList = common_vendor.ref(utils_constant.menuMock);
  const createItem = common_vendor.ref(utils_constant.createItemMock);
  const historyList = common_vendor.ref(utils_constant.historyMock);
  const toPage = (item, routerType) => {
    const urlName = item.value || item;
    switch (urlName) {
      case "clear":
        toRoute(utils_constant.routerUrlMap["clear"], "clear");
        break;
      case "图片创作":
        toRoute(utils_constant.routerUrlMap["picDesign"]);
        break;
      case "视频创作":
        toRoute(utils_constant.routerUrlMap["videoDesign"]);
        break;
      case "fireChat":
        toRoute(utils_constant.routerUrlMap["fireChat"]);
        break;
      default:
        toRoute(utils_constant.routerUrlMap["picDesign"]);
        break;
    }
  };
  const toRoute = (url, type) => {
    if (type === "tab") {
      common_vendor.index.switchTab({
        url
      });
    } else {
      common_vendor.index.navigateTo({
        url: `/pages/design/index`
      });
    }
  };
  const toPcedit = (params) => {
    let query = "?";
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        query += `${key}=${params[key]}&`;
      }
    }
    query = query.substr(0, query.length - 1);
    common_vendor.index.navigateTo({
      url: `/pages/pcedit/index${query}`
    });
  };
  common_vendor.onMounted(() => {
    api_user_index.queryUser();
  });
  return {
    toPcedit,
    createItem,
    historyList,
    menuList,
    toPage
  };
};
exports.useHome = useHome;
