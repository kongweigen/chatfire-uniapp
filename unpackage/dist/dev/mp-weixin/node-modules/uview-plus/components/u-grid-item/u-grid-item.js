"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-grid-item",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$1],
  data() {
    return {
      parentData: {
        col: 0,
        // 父组件划分的宫格数
        border: true
        // 是否显示边框，根据父组件决定
      },
      classes: []
      // 类名集合，用于判断是否显示右边和下边框
    };
  },
  mounted() {
    this.init();
  },
  emits: ["click"],
  //  微信小程序中 options 选项
  options: {
    virtualHost: true
    //将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等
  },
  computed: {
    itemStyle() {
      const style = {
        background: this.bgColor
      };
      style["width"] = "100%";
      return common_vendor.deepMerge(style, common_vendor.addStyle(this.customStyle));
    }
  },
  methods: {
    init() {
      common_vendor.index.$on("$uGridItem", () => {
        this.gridItemClasses();
      });
      this.updateParentData();
      common_vendor.index.$emit("$uGridItem");
      this.gridItemClasses();
    },
    // 获取父组件的参数
    updateParentData() {
      this.getParentData("u-grid");
    },
    clickHandler() {
      var _a;
      let name = this.name;
      const children = (_a = this.parent) == null ? void 0 : _a.children;
      if (children && this.name === null) {
        name = children.findIndex((child) => child === this);
      }
      this.parent && this.parent.childClick(name);
      this.$emit("click", name);
    },
    async getItemWidth() {
      let width = 0;
      if (this.parent) {
        const parentWidth = await this.getParentWidth();
        width = parentWidth / Number(this.parentData.col) + "px";
      }
      this.width = width;
    },
    // 获取父元素的尺寸
    getParentWidth() {
    },
    gridItemClasses() {
      if (this.parentData.border) {
        let classes = [];
        this.parent.children.map((child, index) => {
          if (this === child) {
            const len = this.parent.children.length;
            if ((index + 1) % this.parentData.col !== 0 && index + 1 !== len) {
              classes.push("u-border-right");
            }
            const lessNum = len % this.parentData.col === 0 ? this.parentData.col : len % this.parentData.col;
            if (index < len - lessNum) {
              classes.push("u-border-bottom");
            }
          }
        });
        this.classes = classes;
      }
    }
  },
  beforeUnmount() {
    common_vendor.index.$off("$uGridItem");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.parentData.col > 0
  }, $data.parentData.col > 0 ? {
    b: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args)),
    c: common_vendor.n($data.classes),
    d: common_vendor.s($options.itemStyle)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d5274fb5"]]);
wx.createComponent(Component);
