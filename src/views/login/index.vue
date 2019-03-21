<template>
  <div class="login-wrapper">
    <router-view></router-view>
    <div class="content">
      <input type="text"
             class="user-info"
             v-model="loginInfo.username"
             :placeholder="$t('login.inputAccount')">
      <input type="password"
             class="user-info"
             v-model="loginInfo.password"
             :placeholder="$t('login.inputPassword')">
      <div class="btn" @click="handleLogin">登录</div>
      <div class="btn" @click="handleRegister">注册</div>
    </div>
    <div class="btn-sign-up">{{ $t('login.SignUp') }}</div>
  </div>
</template>

<script>
  import { join, login } from '../../api/account'

  export default {
    data () {
      return {
        loginInfo: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      handleLogin () {
        if (!this.loginInfo.username) {
          return
        }
        if (!this.loginInfo.password) {
          return
        }
        login(this.loginInfo.username, this.loginInfo.password).then(res => {
          console.log(res)
        })
      },
      handleRegister () {
        if (!this.loginInfo.username) {
          return
        }
        if (!this.loginInfo.password) {
          return
        }
        join(this.loginInfo.username, this.loginInfo.password).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .login-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    @include center;
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

    .content {
      width: 100%;
      display: flex;
      @include center;
      flex-direction: column;

      .user-info {
        padding: 10px;
        box-sizing: border-box;
        line-height: 1.2;
        height: px2rem(30);
        width: 60%;
        border: 1px solid #fff;
        border-radius: 5px;
        margin-top: 15px;
        outline: none;
      }

      .btn {
        margin: px2rem(15) px2rem(25);
        background-color: #66b1ff;
        color: #fff;
        font-size: px2rem(14);
        border-radius: 4px;
        padding: 10px 15px;
      }
    }

    .btn-sign-up {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: px2rem(14);
      color: #fff;
    }
  }
</style>
