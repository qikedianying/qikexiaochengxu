Page({

  data: {
    list: [1, 1, 1, 1, 1, 1],
    current: 0,
  },

  onLoad: function (options) {

  },


  animationfinish(e) {
    if (e.detail.current === this.data.current) {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none'
      })
    } else {
      this.data.current = e.detail.current
    }
  },

  onShareAppMessage: function () {

  }
})
