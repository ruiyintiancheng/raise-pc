/*
 * @Author: lk
 * @Date: 2019-02-01 17:37:48
 * @Last Modified by: lk
 * @Last Modified time: 2021-08-25 10:39:09
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
// import { getFlatForm } from '@/utils'

// const appUrls = ['/user/rwAppOrder/appCreateOrder', '/user/rwAppOrder/apppay']
NProgress.configure({ showSpinner: false })
// import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  headers: { 'Content-Type': 'application/json' }
  // timeout: 5000 // request timeout
})

const langMap = {
  zh: 'zh_CN',
  en: 'en_US'
}

// request interceptor
service.interceptors.request.use(config => {
  NProgress.start()
  // Do something before request is sent
  // const url = config.url
  // if (appUrls.indexOf(url) !== -1) {
  config.headers['platform'] = 'pc'
  // } else {
  // config.headers['platform'] = getFlatForm()
  // }
  if (store.getters.token) {
    config.headers['token'] = store.getters.token // 让每个请求携带token
  }
  let lang = Cookies.get('language')
  if (lang) {
    lang = langMap[lang]
  } else {
    lang = 'zh_CN'
  }
  config.headers['lang'] = lang // 国际化
  return config
}, error => {
  // Do something with request error
  NProgress.done()
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    if (response.config.responseType === 'blob') {
      NProgress.done()
      return response
    } else {
      if (!response.data) {
        Message({
          message: '网络异常',
          showClose: true,
          type: 'error',
          duration: 5 * 1000
        })
        NProgress.done()
        return Promise.reject()
      }
      const res = response.data
      if (res.code !== 1) {
        if (res.code === 2) {
          if (res.msg && (!res.data || !Object.getOwnPropertyNames(res.data).length > 0)) {
            Message({
              message: res.msg,
              showClose: true,
              type: 'warning',
              duration: 5 * 1000
            })
          }
          NProgress.done()
          return response.data
        } else {
          if (res.msg) {
            Message({
              message: res.msg,
              showClose: true,
              type: 'warning',
              duration: 5 * 1000
            })
          }
        }
        if (res.code === 10005 || res.code === 20007 || res.code === 20008 || res.code === 20050 || res.code === 20002) {
          // MessageBox.confirm('登录已过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
          //   confirmButtonText: '重新登录',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          // localStorage.setItem('loginMsg', res.msg)
          store.dispatch('LogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
          // })。
        }
        NProgress.done()
        return Promise.reject(res.msg)
      } else {
        if (res.data && res.data.freshToken) {
          store.dispatch('LoginByUsername', res.data.freshToken)
        }
        NProgress.done()
        return response.data
      }
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: '网络异常',
      showClose: true,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error) // 返回接口返回的错误信息
  })

export default service
