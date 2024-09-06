"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore({
  id: "user",
  state: () => {
    return {
      isLogin: "",
      account: {
        token: 0
      },
      // 账户信息
      user: {}
      // 用户信息
    };
  },
  getters: {},
  actions: {
    setLogin(isLogin) {
      this.isLogin = isLogin;
    },
    setUser(data) {
      this.user = data;
    },
    setAccountToken(data) {
      this.account.token = data;
    }
  }
});
exports.useUserStore = useUserStore;
