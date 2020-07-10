import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store/index'
import i18n from './lang'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import './utils/boots'
import './utils/create-api'
import { getToken } from './utils/localStorage'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Axios.defaults.headers.common['Authentication-Token'] = store.state.token

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 判断是否存在token，如果存在将每个页面header都添加token
    if (getToken()) {
      const token = getToken()
      config.headers.common['authentication-token'] = token
      store.commit('SET_TOKEN', token) // 将token保存到vuex中
    }

    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // switch (error.response.status) {
      //   case 401:
      //     this.$store.commit('del_token')
      //     router.replace({
      //       path: '/login',
      //       query: { redirect: router.currentRoute.fullPath }// 登录成功后跳入浏览的当前页面
      //     })
      // }
    }
    return Promise.reject(error.response.data)
  })

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (getToken()) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login'
        // query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
