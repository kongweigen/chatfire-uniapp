"use strict";
const menuMock = [
  {
    subItems: [
      {
        value: "clear",
        label: "图片清晰",
        subLabel: "高清修复新科技，专业修图师同款"
      },
      {
        value: "watermark",
        label: "去除水印",
        subLabel: "水印去除新科技，专业修图师同款"
      },
      {
        value: "expand",
        label: "AI扩图",
        subLabel: "神奇扩图新科技，专业修图师同款"
      },
      {
        value: "draw",
        label: "AI重绘",
        subLabel: "AI重绘新科技，专业修图师同款"
      },
      {
        value: "style",
        label: "风格转换",
        subLabel: "风格转换新科技，专业修图师同款"
      }
    ],
    itemclass: "图文创意"
  },
  {
    subItems: [
      {
        value: "lock",
        label: "AI翻译"
      },
      {
        value: "star",
        label: "作业助手"
      },
      {
        value: "star",
        label: "课件助手"
      },
      {
        value: "photo",
        label: "论文助手"
      },
      {
        value: "photo",
        label: "编程助手"
      },
      {
        value: "photo",
        label: "简历助手"
      },
      {
        value: "photo",
        label: "商品文案"
      },
      {
        value: "photo",
        label: "短视频文案"
      }
    ],
    itemclass: "办公助手"
  }
];
const historyMock = [
  {
    img: "/static/chatFireLogo.png"
  },
  {
    img: "/static/chatFireLogo.png"
  },
  {
    img: "/static/chatFireLogo.png"
  }
];
const createItemMock = [
  {
    src: "/static/picAi.png",
    label: "图片创作"
  },
  {
    src: "/static/video.png",
    label: "视频创作"
  }
];
const routerUrlMap = {
  "clear": "/pages/image-clear/index",
  "picDesign": "/pages/design/index",
  "videoDesign": "/pages/design/index",
  "fireChat": "/pages/chat/index"
};
exports.createItemMock = createItemMock;
exports.historyMock = historyMock;
exports.menuMock = menuMock;
exports.routerUrlMap = routerUrlMap;
