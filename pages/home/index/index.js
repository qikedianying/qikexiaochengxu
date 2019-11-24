import {movie} from "../../../model/movie";

Page({

  data: {
    list: [1, 1, 1, 1, 1, 1],
    current: 0,
  },

  onLoad: function (options) {
    this.getMovie()
  },
  async getMovie() {
    try {
      const list = await movie.getPopular()
      this.setData({
        list
      })
    }catch (e) {
      console.log(e)
    }
  },

  // animationfinish(e) {
  //   if (e.detail.current === this.data.current) {
  //     wx.showToast({
  //       title: '没有更多啦',
  //       icon: 'none'
  //     })
  //   } else {
  //     this.data.current = e.detail.current
  //   }
  // },

  onShareAppMessage: function () {

  }
})
