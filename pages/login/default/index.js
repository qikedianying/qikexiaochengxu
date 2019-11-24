import {login, loginSuccessHandle} from "../../../model/login";
const app = getApp()
Page({
  data: {
    code: ''
  },
  onLoad: async function (options) {
    app.globalData.shareData = options
    wx.showLoading()
    try {
      await this.getAuthSetting()
      const code = await this.getWxCode()
      const { encryptedData, iv } = await this.getUserInfo()
      const data = await login.login({
        code, encryptedData, iv
      })
      loginSuccessHandle(data, options)
    } catch (e) {
      if (!e.auth) {
        wx.redirectTo({
          url: '/pages/login/index/index'
        })
      }
    } finally {
      wx.hideLoading()
    }
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: res => {
          console.log('userinfo', res)
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
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
  getAuthSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            resolve()
          } else{
            reject({
              auth: false
            })
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
})
