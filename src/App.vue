<template>
  <div id="app">
    <router-view></router-view>
    <div class="two-dimension-code-wrapper" v-if="warringPopupVisible">
      <div class="two-dimension-code">
        <span class="warring-text">
          使用手机打开本网站获取更好的体验
        </span>
        <img src="./assets/images/ebookWebSite.png" alt="">
        <span class="close-btn icon-close"
              @click="closeWarringPopup"></span>
      </div>
    </div>
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
    data () {
      return {
        warringPopupVisible: false
      }
    },
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
      },
      // 判断用户是移动端还是pc端
      isPC () {
        const userAgentInfo = navigator.userAgent
        const Agents = [
          'Android', 'iPhone',
          'SymbianOS', 'Windows Phone',
          'iPad', 'iPod']
        let flag = true
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
          }
        }
        return flag
      },
      closeWarringPopup () {
        this.warringPopupVisible = false
      }
    },
    created () {
      this.login()
    },
    mounted () {
      this.warringPopupVisible = this.isPC()
    }
  }
</script>

<style lang="scss">
  @import "./assets/styles/global";

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .two-dimension-code-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 1000;
    font-size: 0;

    .two-dimension-code {
      position: absolute;
      height: 250px;
      width: 350px;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;

      .warring-text {
        font-size: 18px;
        line-height: 1.2;
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150px;
        transform: translate(-50%, -50%);
      }

      .close-btn {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 18px;
        line-height: 1.2;
      }
    }
  }

</style>
