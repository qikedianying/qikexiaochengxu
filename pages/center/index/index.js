Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {

  },
  onShow () {
    this.login()
  },

  login () {
    this.getAuthSetting()
      .then(res => {
        if (res) {
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        } else {
          console.log('else')
          wx.redirectTo({
            url: '/pages/login/index/index?type=1'
          })
        }
      })
  },

  // 获取授权信息
  getAuthSetting () {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          console.log('wx.getSetting', res)
          if (res.authSetting['scope.userInfo']) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },

  onShareAppMessage: function () {

  }
})
