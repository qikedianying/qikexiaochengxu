import {HTTP} from '../utils/request.js'
const app = getApp()
class Login extends HTTP{
  constructor() {
    super()
  }
  login(data) {
    return this.post({
      url: 'user/login',
      data
    })
  }
}

const login = new Login()

const loginSuccessHandle = (result, shareData) => {
  app.globalData.userInfo = result
  if (shareData.page) {
    switch (+shareData.page) {

    }
  } else {
    wx.switchTab({
      url: '/pages/home/index/index'
    })
  }
}

export { login, loginSuccessHandle }
