"use strict";
const common_vendor = require("../common/vendor.js");
var define_import_meta_env_default = { VITE_CJS_IGNORE_WARNING: "true", VITE_USER_NODE_ENV: "development", VITE_ROOT_DIR: "/Users/peigen/Desktop/code/zhihe/mini/chatfire-uniapp", BASE_URL: "/", MODE: "development", DEV: true, PROD: false, SSR: false };
common_vendor.defineStore({
  id: "app",
  state: () => {
    return {
      theme: "auto",
      baseUrl: "",
      apiKey: "",
      customModels: []
      // 自定义模型
    };
  },
  getters: {
    key(state) {
      return state.apiKey || define_import_meta_env_default.VITE_API_KEY;
    },
    modelList(state) {
      return state.models.concat(state.customModels).filter((t) => t).map((val) => {
        return {
          label: val,
          key: val
        };
      });
    }
  },
  actions: {
    resolveSettings() {
      const json = localStorage.getItem("chatbot-api-settings") || "{}";
      const jsonObj = JSON.parse(json);
      this.setSettings(jsonObj);
    },
    setSettings(data) {
      this.apiKey = data.apiKey;
      this.currentModel = data.currentModel;
      localStorage.setItem("chatbot-api-settings", JSON.stringify(data));
    },
    setApiKey(key = "") {
      this.apiKey = key;
      localStorage.setItem("chatbot-api-key", key);
    },
    // setCustomModels(modelsStr = "") {
    //   if (Array.isArray(modelsStr)) {
    //     this.customModels = modelsStr
    //   } else {
    //     this.customModels = modelsStr.split(",") || []
    //   }
    //   localStorage.setItem(
    //     "chatbot-custom-models",
    //     JSON.stringify(this.customModels)
    //   )
    // },
    setSiderCollapsed(t) {
      this.collapsed = t;
    }
  }
});
