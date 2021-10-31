/*
 * @Author: lk
 * @Date: 2019-02-01 17:36:33
 * @Last Modified by: lk
 * @Last Modified time: 2021-10-20 17:32:29
 */
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', name: 'login', component: _import('login/index'), hidden: true },
  { path: '/reset', component: _import('forgetPossword/index'), hidden: true },
  { path: '/retrieve', component: _import('emailAddress/index'), hidden: true },
  { path: '/register', component: _import('userRegistration/index'), hidden: true },
  { path: '/bindWechat', component: _import('userRegistration/bindWechat'), hidden: true },
  // { path: '/registerSuccess', component: _import('registerSuccess/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  // { path: '*', redirect: '/404', hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '',
        component: _import('home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'mymy',
        component: _import('mymy/index'),
        name: 'mymy'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'skip',
        component: _import('invite/coach'),
        name: 'skip'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'basicinformation',
        component: _import('invite/basicinformation'),
        name: 'basicinformation'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'basicinformationcopy',
        component: _import('invite/basicinformationcopy'),
        name: 'basicinformationcopy'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'salesReview',
        component: _import('salesReview/index'),
        name: 'salesReview'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'coachAudit',
        component: _import('coachAudit/index'),
        name: 'coachAudit'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'class',
        component: _import('chooseClass/index'),
        name: 'class'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'privacy',
        component: _import('privacy/index'),
        name: 'privacy'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'strengthen',
        component: _import('project/strengthen'),
        name: 'strengthen'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'jfdh',
        component: _import('mymy/components/jfdh'),
        name: 'jfdh'
      }
    ]
  }

]

export const dashboardRouterMap = [
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  // base: '/raise',
  routes: constantRouterMap
})

export const asyncRouterMap = [
]
