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
    createToast (settings) {
      return this.$createToast({
        $props: settings
      })
    },
    /**
     * @param settings Object
     */
    createPopup (settings) {
      return this.$createPopup({
        $props: settings
      })
    },
    createSampleToast (text) {
      const toast = this.createToast({
        text: text
      })
      toast.show()
      toast.updateText(text)
      return toast
    },
    createShelfDialog (settings) {
      return this.$createShelfDialog({
        $props: settings
      })
    }
  }
})
