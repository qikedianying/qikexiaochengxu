import {login, loginSuccessHandle} from "../../../model/login";
const app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {

  },
  getWxCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          resolve(res.code)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  async getUserinfo (e) {
    if (e.detail.errMsg === "getUserInfo:ok") {
      try {
        const code = await this.getWxCode()
        const data = await login.login({
          code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        })
        loginSuccessHandle(data, app.globalData.shareData)
      }catch (e) {
        console.log(e)
      }
    }
  }
})
