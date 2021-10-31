/*
 * @Author: lk
 * @Date: 2019-02-01 17:38:32
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-12-03 09:57:38
 * @Description:  入口js
 */
import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang'
import './icons'
import './errorLog'
import './permission'

import * as filters from './filters'

import elDragDialog from '@/directive/el-dragDialog'

Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

import surPagination from '@/components/Pagination'
Vue.component('surPagination', surPagination)

// Vue.prototype.$Message = Message

Vue.prototype.$Message = function(msg) {
  Message({ ...msg, showClose: true })
}

Vue.prototype.$Message.success = function(msg) {
  return Message.success({
    message: msg,
    showClose: true
  })
}
Vue.prototype.$Message.warning = function(msg) {
  return Message.warning({
    message: msg,
    showClose: true
  })
}
Vue.prototype.$Message.info = function(msg) {
  return Message.info({
    message: msg,
    showClose: true
  })
}
Vue.prototype.$Message.error = function(msg) {
  return Message.error({
    message: msg,
    showClose: true
  })
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.directive('elDragDialog', elDragDialog)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
