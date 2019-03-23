<template>
  <div class="login">
    <login :bottomText="$t('login.SignUp')"
           @back="showShelf"
           @toggleRouter="showSignUp">
      <input type="text"
             class="user-info"
             v-model="loginInfo.username"
             :placeholder="$t('login.inputAccount')">
      <input type="password"
             class="user-info"
             v-model="loginInfo.password"
             :placeholder="$t('login.inputPassword')">
      <div class="btn" @click="handleLogin">{{ $t('login.SignIn') }}</div>
    </login>
  </div>
</template>

<script>
  import { login } from '../../api/account'
  import { saveToken } from '../../utils/localStorage'
  import Login from '../../components/user/login'
  import { gotoRegister, gotoShelf } from '../../utils/routerSkip'
  import { deToken } from '../../utils/utils'

  export default {
    components: {
      Login
    },
    data () {
      return {
        loginInfo: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async handleLogin () {
        if (!this.loginInfo.username) {
          return
        }
        if (!this.loginInfo.password) {
          return
        }
        const { status, data } = await login(this.loginInfo.username, this.loginInfo.password)
        console.log(data)
        if (status === 200 && data) {
          if (data.error_code === 0) {
            // 登录成功
            // 将token保存到本地
            this.$store.commit('SET_TOKEN', data.token)
            saveToken(data.token)
            gotoShelf(this) // 跳转到书架页
            this.$store.commit('SET_IS_LOGGED', true)
            this.$store.commit('SET_USERNAME', encodeURIComponent(this.loginInfo.username))
          } else {
            // 登录失败,清除token
            deToken()
          }
          this.createSampleToast(data.msg)
        } else {
          this.createSampleToast('网络连接错误，稍后再试')
        }
      },
      showSignUp() {
        gotoRegister(this)
      },
      showShelf() {
        gotoShelf(this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/login";

  .login {
    width: 100%;
    height: 100%;
  }
</style>
