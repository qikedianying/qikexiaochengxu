import {movie} from "../../../model/movie";
import {getDefaultShareData} from "../../../utils/util";

Page({
  data: {
    movieList: [],
    pageNum: 1,
    hasMore: true
  },
  onLoad: function (options) {
    this.getList()
  },
  async getList() {

    if (this.data.hasMore) {
      wx.showNavigationBarLoading()
      try {
        const movieList = await movie.getList(this.data.pageNum)
        const data = movieList.rows.filter(item => item.type !== -1)
        if (data.length === 0) {
          this.data.hasMore = false
          return
        }
        this.setData({
          movieList: [...this.data.movieList, ...data]
        })
      }catch (e) {
        console.log(e)
      } finally {
        wx.hideNavigationBarLoading()
      }
    } else {
      wx.showToast({
        title: '没有更多啦',
        icon: 'none'
      })
    }

  },
  onReachBottom() {
    this.data.pageNum++
    this.getList()
  },
  onShareAppMessage: function () {
    return getDefaultShareData()
  }
})
