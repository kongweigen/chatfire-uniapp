"use strict";
const common_vendor = require("../common/vendor.js");
const utils_tools = require("../utils/tools.js");
const useChatStore = common_vendor.defineStore({
  id: "chat",
  state: () => {
    return {
      loading: false,
      chatId: "",
      // 当前 chatId
      chatList: [],
      // 当前问答列表
      messageList: [],
      // 当前聊天信息
      chatInfo: {},
      // 当前聊天信息
      isHistory: false,
      // 是否是历史记录
      navType: "1",
      // 1 chat 2 histort 3 agents
      agent: void 0,
      panelShow: false,
      panelData: {},
      presetChatModels: [
        { key: "glm-3-turbo", label: "glm-3-turbo" },
        { key: "glm-4-air", label: "glm-4-air" },
        { key: "glm-4", label: "glm-4" },
        { key: "glm-4-flash", label: "glm-4-flash" },
        { key: "glm-4-9b-chat", label: "glm-4-9b-chat" }
      ],
      // 内置模型
      currentChatModel: "glm-3-turbo"
    };
  },
  getters: {
    chat: (state) => {
      return state.chatInfo;
    }
  },
  actions: {
    setCurrentChatModel(date) {
      this.currentChatModel = date;
    },
    switchPanel(data) {
      this.panelShow = data;
    },
    setAgent(data) {
      this.agent = data;
    },
    setPanelData(agent, file) {
      if (agent)
        this.panelData.agents = [agent];
      if (file)
        this.panelData.files = [file];
    },
    setNavType(type) {
      this.navType = type;
    },
    setHistory(isHistory) {
      this.isHistory = isHistory;
    },
    setSettings(data) {
      var _a;
      this.apiKey = data.apiKey;
      this.baseUrl = data.baseUrl;
      this.customModels = ((_a = data.models) == null ? void 0 : _a.split(",")) || [];
      localStorage.setItem("chatbot-api-settings", JSON.stringify(data));
    },
    setLoading(loading) {
      this.loading = loading;
    },
    // chat 相关
    initChat() {
      const chatListJson = localStorage.getItem("chatbot-chat-list") || "[]";
      const list = JSON.parse(chatListJson);
      this.chatList = list;
    },
    resetChat() {
      this.setNavType("1");
      this.switchPanel(false);
      this.setChat(null);
    },
    createChat() {
      const item = {
        id: utils_tools.generateUUID(),
        name: "新对话",
        headImg: "",
        lastMsg: "",
        updateTime: "",
        agentIds: [],
        fileList: []
      };
      this.chatList.push(item);
      this.setChat(item);
      this.initMessage(item.id);
      return item.id;
    },
    updateChatItem(data) {
      const t = this.chatList.find((item) => item.id === this.chat.id);
      if (t) {
        for (const key in data) {
          t[key] = data[key];
        }
        this.setChat(t);
      }
    },
    delChat(id) {
      this.chatList = this.chatList.filter((item) => item.id !== id);
      localStorage.setItem("chatbot-chat-list", JSON.stringify(this.chatList));
      $message.success("操作成功");
    },
    setChat(data) {
      this.chatId = data == null ? void 0 : data.id;
      this.chatInfo = data ? convertChat(data) : {};
      function convertChat(data2 = {}) {
        return {
          ...data2,
          title: data2.name,
          desc: data2.desc || "暂无备注",
          avatar: data2.headImg || "https://lf3-static.bytednsdoc.com/obj/eden-cn/zu-qz/ljhwZthlaukjlkulzlp/CNS-新封面图片/PPT生成.jpg"
        };
      }
    },
    initMessage(id) {
      var _a;
      this.chatId = id;
      const messageMapJson = localStorage.getItem("chatbot-chat-message-map") || "{}";
      const map = JSON.parse(messageMapJson);
      this.messageList = ((_a = map[id]) == null ? void 0 : _a.filter((t) => t.content)) || [];
    },
    addMessage(val) {
      if (this.messageList.length == 0) {
        this.updateChatItem({
          name: val
        });
      }
      this.messageList.push(
        {
          content: val,
          role: "user",
          status: "success",
          datetime: ""
        },
        {
          content: "",
          role: "system",
          status: "loading"
        }
      );
    },
    // 更新最后一条回复的状态、信息
    updateLastMessage(content, status) {
      debugger;
      if (!this.messageList[this.messageList.length - 1])
        return;
      if (status)
        this.messageList[this.messageList.length - 1].status = status;
      if (content)
        this.messageList[this.messageList.length - 1].content = content;
    }
  }
});
exports.useChatStore = useChatStore;