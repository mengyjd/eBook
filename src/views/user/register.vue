<template>
  <div class="register">
    <login :bottomText="$t('login.SignIn')"
           @back="showBack"
           @toggleRouter="showSignIn">
      <input type="text"
             class="user-info"
             v-model="userInfo.username"
             :placeholder="$t('login.inputAccount')">
      <input type="password"
             class="user-info"
             v-model="userInfo.password"
             :placeholder="$t('login.inputPassword')">
      <input type="password"
             class="user-info"
             v-model="userInfo.cpassword"
             :placeholder="$t('login.confirmPassword')">
      <div class="btn" @click="handleRegister">{{ $t('login.SignUp') }}</div>
    </login>
  </div>
</template>

<script>
  import { join } from '../../api/account'
  import Login from '../../components/user/login'
  import { gotoBack, gotoLogin } from '../../utils/routerSkip'
  import { deToken } from '../../utils/utils'

  export default {
    components: {
      Login
    },
    data () {
      return {
        userInfo: {
          username: '',
          password: '',
          cpassword: ''
        }
      }
    },
    methods: {
      async handleRegister () {
        if (!this.userInfo.username) {
          this.createSampleToast('请输入用户名')
          return
        }
        if (!this.userInfo.password) {
          this.createSampleToast('请输入密码')
          return
        }
        if (!this.userInfo.cpassword) {
          this.createSampleToast('请确认密码')
          return
        }
        const { status, data } = await join(this.userInfo.username, this.userInfo.password)
        if (status === 200 && data) {
          if (data.error_code === 0) {
            // 注册成功
            deToken(this) // 清除token
            gotoLogin(this) // 跳转到登陆页
          }
          this.createSampleToast(data.msg)
        } else {
          this.createSampleToast('网络连接错误，稍后再试')
        }
      },
      showSignIn() {
        gotoLogin(this)
      },
      showBack() {
        gotoBack(this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/login";

  .register {
    width: 100%;
    height: 100%;
  }
</style>
