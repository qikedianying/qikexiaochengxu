import {getDefaultShareData} from "../../../utils/util";

Page({
  data: {

  },
  onLoad: function (options) {

  },
  copyWechat() {
    wx.setClipboardData({
      data: 'qikechat'
    })
  },
  onShareAppMessage: function () {
    return getDefaultShareData()
  }
})
