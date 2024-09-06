"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const api_image_index = require("../../api/image/index.js");
const useClear = () => {
  const customStyle = common_vendor.ref({
    width: "700rpx",
    height: "100rpx",
    color: "#ffffff",
    fontSize: "42rpx",
    borderRadius: "50rpx",
    background: "#007CFF"
  });
  const loading = common_vendor.ref(false);
  const generate = async () => {
    const req = getPceditReq(sourceImage.value.url, sourceImage.value.url);
    console.log("generateImagePcedit ", req);
    common_vendor.index.showLoading({
      mask: true,
      title: "AI 处理中"
    });
    const res = await api_image_index.generateImagePcedit(req).catch(() => clearTask());
    if (!res)
      return;
    getTaskInterval(res.id);
  };
  const queryTasking = common_vendor.ref(false);
  const intervalCode = common_vendor.ref("");
  const imageUrl = common_vendor.ref("");
  const getTaskInterval = async (id) => {
    intervalCode.value = setInterval(async () => {
      if (queryTasking.value)
        return;
      queryTasking.value = true;
      const res = await api_index.getTaskById(id).catch(() => {
        clearTask();
      });
      queryTasking.value = false;
      if (res.picArr) {
        imageUrl.value = res.picArr[0].src;
        clearTask();
      }
    }, 3e3);
  };
  const clearTask = () => {
    common_vendor.index.hideLoading();
    queryTasking.value = false;
    loading.value = false;
    clearInterval(intervalCode.value);
  };
  const sourceImage = common_vendor.ref({});
  const uploadImage = () => {
    common_vendor.index.chooseImage({
      success: (chooseImageRes) => {
        const tempFile = chooseImageRes.tempFiles[0];
        const tempFilePath = chooseImageRes.tempFilePaths[0];
        let token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODI0MTAyMzM0OTkzNzcyNTQ0LCJ1c2VyX2tleSI6IjgyMTIxYjdhLWU3MjMtNDYwMC1hMTlhLTAxYmIzODUzMWY0YSIsInVzZXJuYW1lIjoidGVzdCJ9.QckzY4WTJRTe9E0CGdlrzpL_DuQBBJnT7DYOjAJVmVhsLotGKnP597A-jBqid8H7UnMFiwG1JFRSf63PzvBvuQ";
        common_vendor.index.showLoading({
          mask: true,
          title: "正在上传"
        });
        common_vendor.index.uploadFile({
          url: "https://agi.chatfire.cn/box/chat/file",
          //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: "file",
          header: {
            Authorization: `Bearer ${token}`
          },
          formData: {
            "file": tempFile,
            "purpose": "oss"
          },
          success: (uploadFileRes) => {
            common_vendor.index.hideLoading();
            sourceImage.value = JSON.parse(uploadFileRes.data).data;
          },
          fail: () => {
            common_vendor.index.hideLoading();
          }
        });
      }
    });
  };
  return {
    customStyle,
    sourceImage,
    imageUrl,
    uploadImage,
    generate
  };
};
function getPceditReq(original_url, thumb_url) {
  return {
    type: "3",
    original_url,
    thumb_url,
    query: "ChatfireAI图片助手",
    image_source: "1",
    picInfo: "",
    picInfo2: "",
    text: "",
    ext_ratio: "",
    // 扩图比例 1:1   3:4   4:3,
    expand_zoom: "",
    clid: "1",
    front_display: "2",
    create_level: "0",
    // 重绘 0～6
    style: "",
    // 风格 clay  橡皮泥的风 miyazaki 宫崎骏 monet 油画
    is_first: true
  };
}
exports.useClear = useClear;
