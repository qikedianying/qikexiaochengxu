Page({
  data: {
    type: ''
  },
  onLoad: function (options) {
    let type = +options.type
    this.setData({
      type
    })

  },
  getUserinfo (e) {
    console.log(e)
    if (e.detail.errMsg === "getUserInfo:ok") {
      switch (this.data.type) {
        case 1: wx.switchTab({
          url: '/pages/center/index/index'
        })
      }
    }
    console.log(e)
  },

  // someView () {
  //   wx.sw
  // }
})
