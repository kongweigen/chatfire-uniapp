"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_home_useHome = require("./useHome.js");
if (!Array) {
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  const _easycom_up_grid_item2 = common_vendor.resolveComponent("up-grid-item");
  const _easycom_up_grid2 = common_vendor.resolveComponent("up-grid");
  const _easycom_up_tabbar_item2 = common_vendor.resolveComponent("up-tabbar-item");
  const _easycom_up_tabbar2 = common_vendor.resolveComponent("up-tabbar");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  const _component_transition = common_vendor.resolveComponent("transition");
  (_easycom_up_swiper2 + _easycom_up_grid_item2 + _easycom_up_grid2 + _easycom_up_tabbar_item2 + _easycom_up_tabbar2 + _easycom_up_popup2 + _component_transition)();
}
const _easycom_up_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_grid_item = () => "../../node-modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_up_grid = () => "../../node-modules/uview-plus/components/u-grid/u-grid.js";
const _easycom_up_tabbar_item = () => "../../node-modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_up_tabbar = () => "../../node-modules/uview-plus/components/u-tabbar/u-tabbar.js";
const _easycom_up_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_swiper + _easycom_up_grid_item + _easycom_up_grid + _easycom_up_tabbar_item + _easycom_up_tabbar + _easycom_up_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { menuList, createItem, historyList, toPage, toPcedit } = pages_home_useHome.useHome();
    const showPop = common_vendor.ref(false);
    const list1 = common_vendor.ref([
      {
        url: "/static/banner11.png",
        backgroundColor: "#c1cdd1",
        btnColor: "rgb(30,144,230)"
      }
      // 更多图片及其背景色...
    ]);
    const mainItems = common_vendor.ref([
      {
        title: "智能换脸",
        content: "换成TA试试看",
        icon: "/static/face.svg"
      },
      {
        title: "音频转换",
        content: "清脆声音谁不忘",
        icon: "/static/pic.png"
      }
    ]);
    const currentBackgroundColor = common_vendor.ref(list1.value[0].backgroundColor);
    const btnColor = common_vendor.ref(list1.value[0].btnColor);
    const onSwiperChange = ({ current }) => {
      currentBackgroundColor.value = list1.value[current].backgroundColor;
      btnColor.value = list1.value[current].btnColor;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onSwiperChange),
        b: common_vendor.p({
          easingFunction: "easeInOutCubic",
          list: list1.value.map((item) => item.url),
          height: "600",
          radius: "0"
        }),
        c: common_assets._imports_0,
        d: common_vendor.o(($event) => showPop.value = true),
        e: common_vendor.f(common_vendor.unref(historyList), (item, k0, i0) => {
          return {
            a: item.img,
            b: item
          };
        }),
        f: btnColor.value,
        g: common_vendor.f(mainItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.content),
            c: item.icon,
            d: item
          };
        }),
        h: common_vendor.f(common_vendor.unref(menuList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.itemclass),
            b: common_vendor.f(item.subItems, (subItem, listIndex, i1) => {
              return {
                a: common_vendor.t(subItem.label),
                b: listIndex,
                c: common_vendor.o(($event) => common_vendor.unref(toPcedit)(subItem), listIndex),
                d: "44e3a1e9-3-" + i0 + "-" + i1 + "," + ("44e3a1e9-2-" + i0)
              };
            }),
            c: "44e3a1e9-2-" + i0 + ",44e3a1e9-0",
            d: item
          };
        }),
        i: common_assets._imports_1,
        j: common_assets._imports_1,
        k: common_vendor.p({
          border: false,
          col: "3",
          gap: "20px"
        }),
        l: common_vendor.o(_ctx.click1),
        m: common_vendor.p({
          text: "首页",
          icon: "home"
        }),
        n: common_vendor.o(_ctx.click1),
        o: common_vendor.p({
          text: "火宝",
          icon: "photo"
        }),
        p: common_vendor.o(_ctx.click1),
        q: common_vendor.p({
          text: "我的",
          icon: "account"
        }),
        r: common_vendor.o(_ctx.change1),
        s: common_vendor.p({
          value: _ctx.value1,
          fixed: true,
          placeholder: false,
          safeAreaInsetBottom: true
        }),
        t: common_vendor.f(common_vendor.unref(createItem), (item, k0, i0) => {
          return {
            a: item.src,
            b: common_vendor.t(item.label),
            c: item,
            d: common_vendor.o(($event) => common_vendor.unref(toPage)(item.label), item)
          };
        }),
        v: common_vendor.o(($event) => showPop.value = false),
        w: common_vendor.p({
          show: showPop.value,
          mode: "bottom",
          round: 8,
          closeOnClickOverlay: true,
          safeAreaInsetBottom: true
        }),
        x: common_vendor.p({
          name: "fade",
          type: "animation"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
