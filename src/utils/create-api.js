import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/common/Toast'
import Popup from '../components/common/Popup'

Vue.use(CreateAPI)

Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)

Vue.mixin({
  methods: {
    createToast(setting) {
      return this.$createToast({
        $props: setting
      })
    },
    createPopup(setting) {
      return this.$createPopup({
        $props: setting
      })
    },
    createSampleToast(text) {
      return this.$createToast({
        text
      })
    }
  }
})
