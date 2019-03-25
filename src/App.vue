<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { checkLogin } from './api/account'

  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
  export default {
    methods: {
      // 进入网站时先验证用户是否已登录
      login (cb) {
        checkLogin().then(({ status, data }) => {
          if (status === 200 && data.error_code === 0) {
            this.$store.commit('SET_IS_LOGGED', true)
            this.$store.commit('SET_USERNAME', data.username)
          } else {
            this.$store.commit('SET_IS_LOGGED', false)
          }
          if (cb) cb()
        })
      }
    },
    created () {
      this.login()
    }
  }
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
