import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/common/Toast'
import Popup from '../components/common/Popup'
import ShelfDialog from '../components/shelf/ShelfGroupDialog'

Vue.use(CreateAPI)

Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.createAPI(ShelfDialog, true)

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
      const toast = this.createToast({
        text: text
      })
      toast.show()
      toast.updateText(text)
      return toast
    },
    createShelfDialog(groupName) {
      return this.$createShelfDialog({
        $props: {
          groupName
        }
      })
    }
  }
})
