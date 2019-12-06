import {movie} from "../../../model/movie";
import {login, loginSuccessHandle} from "../../../model/login";
import {SHARE_TYPE} from "../../../enum/share";

const app = getApp()
Page({
  data: {
    showDescribeMore: false,
    movieInfo: {},
    code: '',
    show: false,
    hasShare: false,
    userinfo: {}
  },

  onLoad: async function (options) {
    const id = options.id
    this.getMovieInfo(id)

    this.setData({
      userinfo: app.globalData.userinfo
    })
    const code = await this.getWxCode()
    this.data.code = code
  },
  async getMovieInfo (id) {
   try {
     const movieInfo = await movie.getDetail(id)
     wx.setNavigationBarTitle({
       title: movieInfo.name
     })
     this.setData({ movieInfo })
   } catch (e) {
     console.log(e)
   }
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
  async getUserinfo(e) {
    if (e.detail.errMsg === "getUserInfo:ok") {
      try {
        const data = await login.login({
          code: this.data.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        })
        app.globalData.userinfo = data
        this.setData({
          userinfo: data
        })
      }catch (e) {
        console.log(e)
      }
    }
  },
  copyUrl() {
    wx.setClipboardData({
      data: this.data.movieInfo.ftp_url
    })
    this.setData({
      show: false
    })
  },

  copyName() {
    wx.setClipboardData({
      data: '契客电影'
    })
  },

  async view() {
    if (this.data.hasShare) {
      this.setData({
        show: true
      })
    } else{
      wx.showToast({
        title: '分享后可见',
        icon: 'none'
      })
    }
    // try {
    //   wx.showToast({
    //     title: '想看成功',
    //     icon: 'none'
    //   })
    // }catch (e) {
    //   console.log(e)
    // }

  },

  changeDescribeStatus () {
    this.setData({
      showDescribeMore: !this.data.showDescribeMore
    })
  },
  onShareAppMessage: function () {
    this.data.hasShare = true
    return {
      title: this.data.movieInfo.name,
      path: `/pages/login/default/index?page=${SHARE_TYPE.DETAIL_PAGE}&id=${this.data.movieInfo.id}`,
      imageUrl: this.data.movieInfo.face
    }
  }
})
