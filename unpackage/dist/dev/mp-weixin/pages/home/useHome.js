"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../api/index.js");
const utils_constant = require("../../utils/constant.js");
const api_user_index = require("../../api/user/index.js");
const useHome = () => {
  const menuList = common_vendor.ref(utils_constant.menuMock);
  const createItem = common_vendor.ref(utils_constant.createItemMock);
  const historyList = common_vendor.ref(utils_constant.historyMock);
  const toPage = (item) => {
    debugger;
    switch (item.value) {
      case "clear":
        toRoute(utils_constant.routerUrlMap["clear"]);
        break;
      case "图片创作":
        toRoute(utils_constant.routerUrlMap["picDesign"]);
        break;
      case "视频创作":
        toRoute(utils_constant.routerUrlMap["videoDesign"]);
        break;
      default:
        toRoute(utils_constant.routerUrlMap["picDesign"]);
        break;
    }
  };
  const toRoute = (urlInfo) => {
    common_vendor.index.navigateTo({
      url: urlInfo
    });
  };
  common_vendor.onMounted(() => {
    api_user_index.queryUser();
  });
  return {
    createItem,
    historyList,
    menuList,
    toPage
  };
};
exports.useHome = useHome;
