<template>
  <div class="user-info">
    <span class="icon-back_cycle" @click="showBack"></span>
    <div class="username">{{ decodeURIComponent($store.state.username) }}</div>
    <div class="content">
      <div class="info">累计阅读500分钟</div>
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
  import { getUserInfo } from '../../api/account'
  import { deToken } from '../../utils/utils'
  import { gotoLogin, gotoShelf } from '../../utils/routerSkip'

  export default {
    created() {
      // getUserInfo(encodeURIComponent(this.$store.state.username))
    },
    methods: {
      // 退出登录
      loginOut() {
        deToken(this) // 清空token
        gotoLogin(this)
        this.$store.commit('SET_IS_LOGGED', false)
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
