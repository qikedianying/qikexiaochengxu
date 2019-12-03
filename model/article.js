import {HTTP} from '../utils/request.js'
class Article extends HTTP{
  constructor() {
    super()
  }
  zan({movieId, articleId}) {
    return this.get({
      url: 'article/zan',
      params: {
        movieId,
        articleId
      }
    })
  }
}

const article = new Article()

export { article }
