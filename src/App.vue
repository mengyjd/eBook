<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { checkLogin } from './api/account'
  import { home } from './api/store'
  import { saveHomeData } from './utils/localStorage'

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
      async getHomeDataFromServer () {
        const { status, data } = await home()
        if (status === 200 && data) {
          // 如果数据获取成功
          const homeData = {}
          homeData.randomBook = data.random
          homeData.bannerSrc = data.banner
          homeData.guessYouLike = data.guessYouLike
          homeData.hotRecommend = data.recommend
          homeData.featured = data.featured
          homeData.categoryList = data.categoryList
          homeData.categories = data.categories
          saveHomeData(homeData) // 将数据保存到本地
        }
      }
    },
    created () {
      this.login()
      // this.getHomeDataFromServer()
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
