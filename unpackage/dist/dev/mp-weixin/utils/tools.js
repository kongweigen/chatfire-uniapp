"use strict";
const common_vendor = require("../common/vendor.js");
const positionDomViewBottom = (className = "_message_list") => {
  setTimeout(() => {
    common_vendor.index.pageScrollTo({
      selector: "._message_list",
      scrollTop: 1e3,
      duration: 300
    });
  });
};
const generateUUID = () => {
  let d = (/* @__PURE__ */ new Date()).getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function(c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : r & 3 | 8).toString(16);
    }
  );
  return uuid;
};
const copy = async (val) => {
  const copyInput = document.createElement("input");
  copyInput.value = val;
  document.body.appendChild(copyInput);
  copyInput.select();
  document.execCommand("copy");
  document.body.removeChild(copyInput);
};
exports.copy = copy;
exports.generateUUID = generateUUID;
exports.positionDomViewBottom = positionDomViewBottom;
