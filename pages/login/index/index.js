import {login, loginSuccessHandle} from "../../../model/login";
import {getDefaultShareData} from "../../../utils/util";
const app = getApp()
Page({
  data: {
    code: ''
  },
  onLoad: async function (options) {
    const code = await this.getWxCode()
    this.data.code = code
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
        const data = await login.login({
          code: this.data.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        })
        loginSuccessHandle(data)
      }catch (e) {
        console.log(e)
      }
    }
  },
  onShareAppMessage: function () {
    return getDefaultShareData()
  }
})
