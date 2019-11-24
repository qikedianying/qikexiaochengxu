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
}

const movie = new Movie()

export { movie }
