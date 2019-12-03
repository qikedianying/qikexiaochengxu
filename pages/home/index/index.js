import {movie} from "../../../model/movie";
import {getDefaultShareData} from "../../../utils/util";

Page({

  data: {
    list: [],
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
  currentChange(e) {
    console.log(e)
    this.setData({
      current: e.detail.current
    })
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
    return getDefaultShareData()
  }
})
