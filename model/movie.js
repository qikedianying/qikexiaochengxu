import {HTTP} from '../utils/request.js'
class Movie extends HTTP{
  constructor() {
    super()
  }
  getPopular() {
    return this.get({
      url: 'movie/popular',
    })
  }

  getDetail (id) {
    return this.get({
      url: 'movie/detail',
      params: { id }
    })
  }

  getList(pageNum) {
    return this.get({
      url: 'movie/list',
      params: { pageNum }
    })
  }
}

const movie = new Movie()

export { movie }
