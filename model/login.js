import {HTTP} from '../utils/request.js'
import {SHARE_TYPE} from "../enum/share";
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
  app.globalData.userinfo = result
  if (shareData.page) {
    toPage(shareData, 'redirectTo')
  } else {
    wx.switchTab({
      url: '/pages/home/index/index'
    })
  }
}

const toPage = (params, func = 'navigateTo') => {
  switch (+params.page) {
    case SHARE_TYPE.DETAIL_PAGE: wx[func]({
        url: '/pages/home/detail/index?id=' + shareData.id
      })
      app.globalData.shareData = {}
      return
  }
}

export { login, loginSuccessHandle }
