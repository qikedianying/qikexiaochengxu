import {article} from "../../../model/article";
const app = getApp()
Component({
  properties: {
    articleList: Array
  },

  data: {
    hasLogin: false
  },
  ready() {
    if (app.globalData.userinfo.token) {
      this.setData({
        hasLogin: true
      })
    }
  },
  methods: {
    async zan(e) {
      const id = e.currentTarget.dataset.id
      const articleid = e.currentTarget.dataset.article
      try {
        const result = await article.zan({
          movieId: id,
          articleId: articleid
        })
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        })
        this.data.articleList = this.data.articleList.map(item => {
          if (item.id == articleid) {
            item.zan_count++
          }
          return item
        })
        this.setData({
          articleList: this.data.articleList
        })
      }catch (e) {
        console.log(e)
      }

    },
    goArticle(e) {
      const src = e.currentTarget.dataset.src
      wx.navigateTo({
        url: '/pages/home/article/index?src=' + src
      })
    }
  }
})
