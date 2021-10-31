import { getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { baseRequest } from '@/api/base'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    type: '',
    userId: null,
    deptId: null,
    roleName: '',
    ip: '',
    port: '',
    avatar: '',
    introduction: '',
    roles: [],
    menuStatus: '1',
    buttonJurisdiction: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_ROLE: (state, role) => {
      state.roles = role
    },
    SET_MENU_STATUS: (state, menuStatus) => {
      state.menuStatus = menuStatus
    },
    SET_ROLENAME: (state, roleName) => {
      state.roleName = roleName
    },
    SET_DEPTID: (state, deptId) => {
      state.deptId = deptId
    },
    SET_IP: (state, ip) => {
      state.ip = ip
    },
    SET_PORT: (state, port) => {
      state.port = port
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_BJ: (state, buttonJurisdiction) => {
      state.buttonJurisdiction = buttonJurisdiction
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token)
        setToken(token)
        if (localStorage.getItem('recommender') && localStorage.getItem('productId')) {
          baseRequest('/user/rwQrcodeRecord/add', { productId: localStorage.getItem('productId'), introId: localStorage.getItem('recommender') })
        }
        resolve()
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data.item
          commit('SET_NAME', data.userName)
          commit('SET_ROLE', data.roleTypes.split(','))
          commit('SET_USERID', data.userId)
          commit('SET_MENU_STATUS', data.menuStatus)
          // commit('SET_IP', '192.168.3.104')
          commit('SET_IP', '47.114.126.205')
          // commit('SET_IP', 'www.raise-wisdom.com')
          commit('SET_PORT', '3888')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 更改用户名
    SetUserName({ commit, state }, userName) {
      return new Promise((resolve, reject) => {
        commit('SET_NAME', userName)
        resolve()
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        localStorage.removeItem('recommender')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
