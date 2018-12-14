import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss } from './book'
import { saveLocation } from './localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'currentBook',
      'titleAndMenuVisible',
      'menuSettingVisible',
      'fontFamilyVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'defaultTheme',
      'progress',
      'bookAvailable',
      'section'
    ]),
    themeList () {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setTitleAndMenuVisible',
      'setFileName',
      'setMenuSettingVisible',
      'setDefaultFontSize',
      'setCurrentBook',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setProgress',
      'setBookAvailable',
      'setSection'
    ]),
    initGlobalStyle(theme) {
      addCss(`${process.env.VUE_APP_RES_URL}/themes/${theme.toLowerCase()}_theme.css`)
    },
    refersLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi) * 100
      this.setProgress(Math.floor(progress))
      saveLocation(this.fileName, startCfi)
      this.setSection(currentLocation.start.index)
    },
    display(target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refersLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refersLocation()
          if (cb) cb()
        })
      }
    }
  }
}
