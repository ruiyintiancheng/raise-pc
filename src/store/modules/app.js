import Cookies from 'js-cookie'

const app = {
  /* 数据 */
  state: {
    language: Cookies.get('language') || 'zh',
    containHeight: null,
    dialogHeight: null,
    pdfConfig: {}
  },
  /* 方法 */
  mutations: {
    SET_LANGUAGE: (state, language) => {
      language = language || 'zh'
      state.language = language
      Cookies.set('language', language)
    },
    SET_CONTAIN_HEIGHT: (state, height) => {
      state.containHeight = height
    },
    SET_DIALOG_HEIGHT: (state, height) => {
      state.dialogHeight = height
    },
    ADD_PDF_CONFIG: (state, params) => {
      state.pdfConfig[params.id] = params.pdfUrl
    }
  },
  /* 异步操作 */
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setContainHeight({ commit }, { height, dialogHeight }) {
      commit('SET_CONTAIN_HEIGHT', height)
      commit('SET_DIALOG_HEIGHT', dialogHeight)
    },
    addPdfConfig({ commit }, { id, pdfUrl }) {
      commit('ADD_PDF_CONFIG', { id, pdfUrl })
    }
  }
}

export default app
