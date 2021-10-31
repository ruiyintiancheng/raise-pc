import {
  constantRouterMap
} from '@/router'
import {
  deepClone
} from '@/utils'
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import Layout from '@/views/layout/Layout'
import user from './user'
// import { tranformStr, isRepeatComponent } from '@/utils/index'

/**
 * 设置访问路由的component对应的组件
 * @param {菜单数据} menuData
 */
function setBaseRouter(menuData, baseData, parentPath) {
  for (const item of menuData) {
    if (item.component) {
      // if (!isRepeatComponent(item.component)) {
      //   item.name = tranformStr(item.component)
      // } else {
      //   item.name = tranformStr(item.path)
      //   item.meta.name = tranformStr(item.component)
      // }
      try {
        if (hasQu(item)) {
          item.component = _import(item.component)
          item.realPath = true
        } else {
          item.component = _import('home/index')
          item.realPath = true
        }
      } catch (e) {
        item.component = _import('errorPage/404')
      }
    } else {
      item.component = _import('errorPage/404')
    }
    juRouter(parentPath, item, baseData)
  }
}

function juRouter(parentPath, item, baseData) {
  if (parentPath) {
    item.path = parentPath + '/' + item.path
  } else {
    item.path = item.path + ''
  }
  if (item.children && item.children.length > 0) {
    if (item.realPath) {
      const tempItem = deepClone(item)
      delete tempItem.children
      baseData.push(tempItem)
    }
    setBaseRouter(item.children, baseData, item.path)
  } else {
    baseData.push(item)
  }
}

/**
 * 设置路由最外层layout组件
 * @param {数据菜单} menuData
 */
function setLayout(menuData) {
  const baseMenu = []
  for (const iterator of menuData) {
    const itemMenu = {
      path: '/',
      component: Layout,
      children: [
        iterator
      ]
    }
    baseMenu.push(itemMenu)
    // pushBaseRouter(baseMenu, itemMenu, iterator)
  }
  return baseMenu
}

// function pushBaseRouter(baseMenu, itemMenu, iterator) {
//   if (iterator.meta && iterator.meta.roles) {
//     const canRoles = iterator.meta.roles
//     const currentRoles = user.state.roles
//     const canVisit = currentRoles.some(item => {
//       return canRoles.find(it => it === item)
//     })
//     if (canVisit) {
//       baseMenu.push(itemMenu)
//     } else {
//       itemMenu.children[0].component = _import('errorPage/404')
//       itemMenu.children[0].name = new Date().getTime()
//       baseMenu.push(itemMenu)
//     }
//   } else {
//     baseMenu.push(itemMenu)
//   }
// }

function hasQu(iterator) {
  if (iterator.meta && iterator.meta.roles) {
    const canRoles = iterator.meta.roles
    const currentRoles = user.state.roles
    const canVisit = currentRoles.some(item => {
      return canRoles.find(it => it === item)
    })
    return canVisit
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
    menu: [],
    fromPage: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    CLEAR_ROUTERS: (state) => {
      state.routers = []
    },
    SET_FROM_PAGE: (state, page) => {
      state.fromPage = page
    }
  },
  actions: {
    GenerateRoutes({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        const menuData = [{
          path: '/',
          name: 'home',
          component: 'home/index',
          meta: {
            title: '首页',
            icon: 'icon-shouye'
          }
        },
        {
          path: 'targetTool',
          name: 'targetTool',
          component: 'targetTool/index',
          meta: {
            title: 'LMI•SP',
            icon: 'icon-shouce'
          }
        },
        {
          path: 'course',
          name: 'course',
          meta: {
            title: '辅导项目',
            icon: 'icon-mubiao'
          },
          children: [{
            path: 'firstStep',
            name: 'firstStep',
            component: 'project/fs',
            meta: {
              title: 'First Step',
              icon: 'icon-kc'
            },
            children: [{
              path: 'buy/:id',
              name: 'firstStep-buy',
              component: 'firstStep/first/buy',
              props: (router) => ({
                id: router.params.id,
                type: router.query.type,
                name: router.query.name,
                groupId: router.query.groupId
              })
            },
            {
              path: 'spbuy/:id',
              name: 'sp-buy',
              component: 'firstStep/sp/buy',
              props: (router) => ({
                id: router.params.id,
                type: router.query.type,
                name: router.query.name,
                largess: router.query.largess
              })
            },
            {
              path: 'fast/:id',
              name: 'fast-buy',
              component: 'firstStep/sp/fast',
              props: (router) => ({
                id: router.params.id,
                type: router.query.type,
                name: router.query.name
              })
            },
            {
              path: 'order',
              name: 'order',
              component: 'project/order'
            },
            {
              path: 'arrange',
              name: 'arrange',
              component: 'project/arrange'
            }
            ]
          },
          {
            path: 'sp',
            name: 'sp',
            component: 'project/sp',
            meta: {
              title: '目标规划·SP',
              icon: 'icon-kecheng'
            }
          },
          {
            path: 'exploredoor',
            name: 'exploredoor',
            component: 'project/exploredoor',
            meta: {
              title: '探索之门',
              icon: 'door'
            }
          },
          {
            path: 'coachTalk',
            name: 'coachTalk',
            component: 'project/coachTalk',
            meta: {
              title: '1-1教练会谈',
              icon: 'one-menu'
            }
          },
          {
            path: 'training',
            name: 'training',
            component: 'project/training',
            meta: {
              title: 'TTT训练认证',
              icon: 'ttt-menu'
            }
          }
          ]
        },
        {
          path: 'production',
          name: 'production',
          meta: {
            title: '我的项目',
            icon: 'icon-xuexifdao'
          },
          children: [{
            path: 'learn',
            name: 'learn',
            component: 'learn/index',
            meta: {
              title: '学员项目',
              icon: 'icon-xuexi'
            },
            children: [{
              path: 'learnStep',
              name: 'learnStep',
              component: 'learn/learnStep/index'
            },
            {
              path: 'learnStepS',
              name: 'learnStepS',
              component: 'learn/learnStepS/index'
            },
            {
              path: 'learnExploreDoor',
              name: 'learnDoor',
              component: 'learn/learnDoor/index'
            },
            {
              path: 'learnFsplus',
              name: 'learnFsplus',
              component: 'learn/learnFsplus/index'
            },
            {
              path: 'database',
              name: 'database',
              component: 'learn/learnDoor/database'
            },
            {
              path: 'learnCoach/:orderId',
              name: 'learnCoach',
              component: 'learn/learnCoach/index'
            },
            {
              path: 'intoStudy/:recordId',
              name: 'intoStudy',
              component: 'learn/learnCoach/intoStudy'
            }

            ]
          },
          {
            path: 'teach',
            name: 'teach',
            component: 'teach/index',
            meta: {
              title: '教练项目',
              icon: 'icon-fudao',
              roles: ['0', '1', '2', '4', '10']
            },
            children: [{
              path: 'course/:id',
              name: 'teach-course',
              component: 'teach/course/courseTeach',
              meta: {
                roles: ['0', '1', '2', '4', '10']
              },
              props: (router) => ({
                id: router.params.id,
                startDate: router.query.startDate,
                endDate: router.query.endDate,
                sNum: router.query.sNum
              })
            },
            {
              path: 'strengthenTeach/:id',
              name: 'teach-strengthen',
              component: 'teach/course/strengthenTeach',
              meta: {
                roles: ['0', '1', '2', '4', '10']
              },
              props: (router) => ({
                id: router.params.id,
                startDate: router.query.startDate,
                endDate: router.query.endDate,
                sNum: router.query.sNum
              })
            },
            {
              path: 'examples',
              name: 'examples',
              component: 'learn/learnStep/examples',
              meta: {
                roles: ['0', '1', '2', '4', '10']
              }
              // props: (router) => ({
              //   id: router.params.id,
              //   startDate: router.query.startDate,
              //   endDate: router.query.endDate
              // })
            },
            {
              path: 'courseTutorship/:recordId',
              name: 'courseTutorship',
              component: 'teach/course/courseTutorship',
              meta: {
                roles: ['0', '1', '2', '4', '10']
              }
            },
            {
              path: 'ttt',
              name: 'ttt',
              component: 'teach/course/ttt',
              meta: {
                roles: ['0', '1', '2', '4', '10']
              }
            }
            ]
          },
          {
            path: '003',
            name: '003',
            component: 'course/index',
            meta: {
              title: '辅导设定',
              icon: 'icon-kechengguanli',
              roles: ['4']
            }
          },
          {
            path: '004',
            name: '004',
            component: 'learnManagement/index',
            meta: {
              title: '客户管理',
              icon: 'tob',
              roles: ['3']
            }
          },
          {
            path: '03ttt',
            name: '03ttt',
            component: 'teach/course/ttt',
            meta: {
              title: 'TTT资料库',
              icon: 'ttt-menu',
              roles: ['6']
            }
          }
          ]
        },
        {
          path: 'member',
          name: 'member',
          component: 'member/index',
          meta: {
            title: '会员权益',
            icon: 'icon-huiyuan'
          }
        },
        {
          path: 'about',
          name: 'about',
          component: 'about/index',
          meta: {
            title: '关于我们',
            icon: 'icon-women'
          }
        },
        {
          path: 'helpCenter',
          name: 'helpCenter',
          component: 'helpCenter/index',
          meta: {
            title: '帮助中心',
            icon: 'report'
          }
        },
        {
          path: 'system',
          name: 'system',
          meta: {
            title: '系统管理',
            icon: 'icon-guanli',
            roles: ['0', '1', '9']
          },
          children: [
            // {
            //   path: 'user',
            //   name: 'user',
            //   component: 'systemGui/user',
            //   meta: { title: '用户管理', icon: 'icon-yonghu', roles: ['0', '1'] }
            // },
            {
              path: 'user',
              name: 'user',
              component: 'systemGui/index',
              meta: {
                title: '用户管理',
                icon: 'icon-yonghu',
                roles: ['0', '1']
              }
            },
            {
              path: 'courseMana',
              name: 'courseMana',
              component: 'courseManage/index',
              meta: {
                title: '课程管理',
                icon: 'icon-juese',
                roles: ['0', '1']
              }
            },
            {
              path: 'finance',
              name: 'finance',
              component: 'financeManage/index',
              meta: {
                title: '财务管理',
                icon: 'icon-jiesuanguanli',
                roles: ['0', '1', '9']
              }
            },
            {
              path: 'oders',
              name: 'oders',
              component: 'orderManage/index',
              meta: {
                title: '第三方订单',
                icon: 'icon-order',
                roles: ['0', '1', '9']
              }
            },
            {
              path: 'check',
              name: 'check',
              component: 'checkManage/index',
              meta: {
                title: '审核管理',
                icon: 'icon-xiaoshoulishi',
                roles: ['0', '1']
              }
            },
            {
              path: 'resource',
              name: 'resource',
              component: 'resourceManage/index',
              meta: {
                title: '资源管理',
                icon: 'resource',
                roles: ['0', '1']
              }
            },
            {
              path: 'leaveword',
              name: 'leaveWord',
              component: 'leaveWordManage/index',
              meta: {
                title: '留言管理',
                icon: 'icon-ly',
                roles: ['0', '1']
              }
            }
            // {
            //   path: 'sale',
            //   name: 'sale',
            //   component: 'salesReview/index',
            //   meta: { title: '销售审核', icon: 'icon-xiaoshoushenhe', roles: ['0', '1'] }
            // },
            // {
            //   path: 'check',
            //   name: 'check',
            //   component: 'coachAudit/index',
            //   meta: { title: '教练审核', icon: 'icon-jiaolianshenhe', roles: ['0', '1'] }
            // },
            // {
            //   path: 'saleshistory',
            //   name: 'saleshistory',
            //   component: 'saleshistory/index',
            //   meta: { title: '销售历史', icon: 'icon-xiaoshoulishi', roles: ['0', '1', '8'] }
            // },
            // {
            //   path: 'Settlementmanagement',
            //   name: 'Settlementmanagement',
            //   component: 'Settlementmanagement/index',
            //   meta: { title: '结算管理', icon: 'icon-jiesuanguanli', roles: ['0', '1', '8'] }
            // }
            // {
            //   path: 'svgIcon',
            //   name: 'svgIcon',
            //   component: 'svg-icons/index',
            //   meta: { title: '图标管理', icon: 'icon-kechengguanli', dev: true }
            // }
          ]
        }
        ]
        var baseData = [] // 路由数据数组
        setBaseRouter(menuData, baseData)
        const baseMenu = setLayout(baseData)
        commit('SET_ROUTERS', baseMenu)
        commit('SET_MENU', menuData)
        resolve(baseMenu)
      })
    },
    SetLoginFromPage({
      commit,
      state
    }, data) {
      commit('SET_FROM_PAGE', data)
    }
  }
}

export default permission
