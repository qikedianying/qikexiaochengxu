import {getDefaultShareData} from "../../../utils/util";

Page({
  data: {
    src: ''
  },
  onLoad: function (options) {
    this.setData({src: options.src})
  },
  onShareAppMessage: function () {
    return getDefaultShareData()
  }
})
