Page({
  data: {
    showDescribeMore: false
  },

  onLoad: function (options) {

  },

  changeDescribeStatus () {
    this.setData({
      showDescribeMore: !this.data.showDescribeMore
    })
  },
  onShareAppMessage: function () {

  }
})
