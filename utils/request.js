import config  from '../config/env'
const app = getApp()
class HTTP {
  constructor () {
    this.baseUrl = config.API_URL
  }

  _request ({url, params={}, data, method, resolve, reject, isSign}) {
    const app = getApp()
    // 将params参数，拼接到到url上
    let urlParams=''
    Object.keys(params).forEach((key)=>{
      urlParams += `${key}=${params[key]}&`
    })

    url = urlParams.length >0 ? url + '?' + urlParams.slice(0,-1) : url
    wx.request({
      url: this.baseUrl + url,
      data,
      method,
      header: {
        token: app.globalData.userinfo.token
      },
      success: res => {
        if (res.data.code === 200) {
          resolve(res.data.data)
        } else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })

          reject()
        }
      },
      fail: err => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      },
      complete: res => {
        console.log(url, res, data, app.globalData.userinfo)
      }
    })
  }

  get ({url, params, data}) {
    return new Promise((resolve, reject) => {
      this._request({
        url,
        params,
        data,
        resolve,
        reject,
        method: 'GET'
      })
    })
  }

  post ({url, params, data, isSign}) {
    return new Promise((resolve, reject) => {
      this._request({
        url,
        params,
        data,
        resolve,
        reject,
        isSign,
        method: 'POST'
      })
    })
  }
}

export { HTTP }
