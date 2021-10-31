/*
 * @Author: lk
 * @Date: 2019-02-01 17:38:40
 * @Last Modified by: lk
 * @Last Modified time: 2021-08-24 16:02:10
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { baseRequest } from '@/api/base'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/reset', '/retrieve', '/register', '/bindWechat', '/', '/member', '/about', '/course/firstStep', '/course/sp', '/course/coachTalk', '/course/training', '/course/firstStep/arrange', '/course/firstStep/order', '/course/exploredoor', '/skip', '/report', '/privacy']
const loginList = ['/login', '/reset', '/retrieve', '/register', '/bindWechat']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.query.recommender) {
    localStorage.setItem('recommender', to.query.recommender)
  }
  if (to.query.productId) {
    localStorage.setItem('productId', to.query.productId)
  }

  if (getToken()) {
    if (to.query.recommender && to.query.productId) {
      baseRequest('/user/rwQrcodeRecord/add', { productId: to.query.productId, introId: to.query.recommender })
    }
    /* has token*/
    if (loginList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      if (!store.getters.name && !store.getters.userId) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(_ => {
          store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to })
          })
        })
      } else {
        addRouter(next, to)
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      if (loginList.indexOf(to.path) !== -1) {
        next()
        NProgress.done()
      } else {
        addRouter(next, to)
      }
    } else {
      setLoginFromPage(to)
      next('/login') // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/**
 * 添加路由
 * @param {*} next
 */
function addRouter(next, to) {
  if (store.getters.addRouters.length === 0) {
    store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      next({ ...to })
    })
  } else {
    next()
  }
}

/**
 * 保存登录前页面地址
 * @param {*} to
 */
function setLoginFromPage(to) {
  const path = to.path
  const query = to.query
  const fromPage = JSON.stringify({ path, query })
  store.dispatch('SetLoginFromPage', fromPage)
}
