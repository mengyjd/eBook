import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import store from './modules/store'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    isLogged: false,
    username: '',
    isGetHomeFromServer: true // 是否从服务端请求home页面的数据
  },
  mutations,
  modules: {
    book,
    store
  },
  getters,
  actions
})
