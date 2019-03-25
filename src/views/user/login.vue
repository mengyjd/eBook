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
  import { getBookShelf, saveAllReadSettings, saveBookShelf, saveToken } from '../../utils/localStorage'
  import Login from '../../components/user/login'
  import { gotoRegister, gotoShelf } from '../../utils/routerSkip'
  import { deToken, flattenShelfList, spreadShelfList } from '../../utils/utils'
  import { syncShelf, getAllCloudData } from '../../api/user'
  import { appendShelfItemAdd, removeShelfItemAdd } from '../../utils/store'
  import { storeShelfMixin } from '../../utils/mixin'

  export default {
    mixins: [storeShelfMixin],
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
        if (status === 200 && data) {
          if (data.error_code === 0) {
            // 登录成功时
            this.initState(data) // 初始化vuex状态
            saveToken(data.token) // 将token保存到本地
            this.syncShelfData() // 同步云端数据
            gotoShelf(this) // 跳转到书架页
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
      },
      initState(data) {
        this.$store.commit('SET_TOKEN', data.token)
        this.$store.commit('SET_IS_LOGGED', true)
        this.$store.commit('SET_USERNAME', encodeURIComponent(this.loginInfo.username))
      },
      async syncShelfData () {
        getAllCloudData((
          { status: shelfStatus, data: shelfData },
          { status: setStatus, data: setData }) => {
          if (shelfStatus === 200 && shelfData) {
            this.handleData(shelfData.shelfList)
          } else {
            this.createSampleToast('同步书架失败，请稍后再试')
          }
          if (setStatus === 200 && setData) {
            saveAllReadSettings(setData.settings)
          } else {
            this.createSampleToast('同步主题设置失败，请稍后再试')
          }
        })
      },
      // 处理数据
      // 本地存在，云端没有：上传
      // 本地没有，云端存在：添加到书架
      // 本地存在，云端存在：覆盖
      handleData (cloudShelfList) {
        const localShelfList = removeShelfItemAdd(getBookShelf())

        // 如果云端书架为空，并且本地不为空，则上传本地书籍到云端
        if ((!cloudShelfList || cloudShelfList.length === 0) && (localShelfList || localShelfList.length !== 0)) {
          syncShelf(localShelfList)
          return
        }
        // 如果本地书架为空，直接将云端的书籍保存到本地
        if (!localShelfList || localShelfList.length === 0) {
          const AddMergedShelfList = appendShelfItemAdd(cloudShelfList)
          saveBookShelf(AddMergedShelfList)
          this.setShelfList(AddMergedShelfList)
          return
        }

        let flattenCloudShelfList = flattenShelfList(cloudShelfList)
        let flattenLocalShelfList = flattenShelfList(localShelfList)
        const duplicateBooks = this.findDuplicateBooks(flattenCloudShelfList, flattenLocalShelfList)
        // 找出本地存在 云端没有的书籍(将其上传)
        const onlyLocalBooks = this.deleteDuplicateBooks(duplicateBooks, flattenLocalShelfList)
        // 找出云端存在 本地没有的书籍(下拉到本地)
        const onlyCloudBooks = this.deleteDuplicateBooks(duplicateBooks, flattenCloudShelfList)
        // 同步后的书籍为：只存在本地+重复+只存在云端
        const mergedShelfList = this.mergeBooks(duplicateBooks, onlyLocalBooks, onlyCloudBooks)
        const AddMergedShelfList = appendShelfItemAdd(mergedShelfList)
        saveBookShelf(AddMergedShelfList)
        this.setShelfList(AddMergedShelfList)
        syncShelf(mergedShelfList) // 上传到云端
      },
      // 找出本地和云端重复的书籍
      findDuplicateBooks (flattenCloudShelfList, flattenLocalShelfList) {
        let duplicateBooks = []
        // 如果fileName相同，则认为是重复书籍
        flattenCloudShelfList.forEach(cloudBook => {
          flattenLocalShelfList.forEach(localBook => {
            if (cloudBook.fileName === localBook.fileName) {
              duplicateBooks.push(localBook)
            }
          })
        })
        return duplicateBooks
      },
      // 从书组中删除重复的书籍
      deleteDuplicateBooks(duplicateBooks, flattenList) {
        return flattenList.filter(localBook => {
          const result = duplicateBooks.findIndex(dupBook => {
            return localBook.fileName === dupBook.fileName
          })
          return result < 0
        })
      },
      mergeBooks(duplicateBooks, onlyLocalBooks, onlyCloudBooks) {
        // 合并后所有book到一个数组中
        const mergeBooks = [...duplicateBooks, ...onlyLocalBooks, ...onlyCloudBooks]
        // 将合并后的数组根据每本书的分组转换为二维数组
        return spreadShelfList(mergeBooks)
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
