<template>
  <div class="user-info">
    <span class="icon-back_cycle" @click="showBack"></span>
    <div class="username">{{ decodeURIComponent($store.state.username) }}</div>
    <div class="content">
      <div class="info">累计阅读{{ userInfo.allReadTime }}分钟</div>
    </div>
    <div class="footer"
         @mousedown="onMousedown"
         @mouseup="onMouseup"
         @touchstart="ontouchstart"
         @touchend="ontouchend"
         ref="footer">
      <div class="login-out"
           @click="loginOut">{{ $t('login.loginOut') }}</div>
    </div>
  </div>
</template>

<script>
  import { deToken, flattenShelfList } from '../../utils/utils'
  import { gotoLogin, gotoShelf } from '../../utils/routerSkip'
  import { getBookShelf } from '../../utils/localStorage'
  import { removeShelfItemAdd } from '../../utils/store'

  export default {
    data () {
      return {
        userInfo: {
          allReadTime: 0
        }
      }
    },
    methods: {
      // 退出登录
      loginOut() {
        deToken(this) // 清空token
        this.$store.commit('SET_IS_LOGGED', false)
        this.$store.commit('SET_USERNAME', '')
        gotoLogin(this)
      },
      getUserInfo() {
        this.userInfo.allReadTime = this.getAllReadTime()
      },
      // 获取用户的累计阅读时间,单位分钟
      getAllReadTime() {
        let allReadTime = 0
        const shelfList = removeShelfItemAdd(getBookShelf())
        const flattenShelf = flattenShelfList(shelfList)
        flattenShelf.forEach(book => {
          if (book.readTime) {
            allReadTime += parseInt(book.readTime)
          }
        })
        return (allReadTime / 60).toFixed(1)
      },
      showBack() {
        gotoShelf(this)
      },
      onMousedown() {
        this.$refs.footer.style.backgroundColor = '#f78989'
      },
      onMouseup() {
        this.$refs.footer.style.backgroundColor = '#f56c6c'
      },
      ontouchstart() {
        this.$refs.footer.style.backgroundColor = '#f78989'
      },
      ontouchend() {
        this.$refs.footer.style.backgroundColor = '#f56c6c'
      }
    },
    mounted() {
      this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .user-info {
    width: 100%;
    height: 100%;
    font-size: px2rem(16);
    background-color: #fff;

    .icon-back_cycle {
      position: absolute;
      color: #fff;
      font-size: px2rem(20);
      left: px2rem(12);
      top: px2rem(12);
    }

    .username {
      height: 25%;
      @include center;
      font-size: px2rem(18);
      background-color: #31a9fe;
      color: #fff;
    }

    .content {
      margin: px2rem(20);
    }

    .footer {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      height: px2rem(45);
      background-color: #f56c6c;
      color: #fff;
      @include center;
    }
  }
</style>
