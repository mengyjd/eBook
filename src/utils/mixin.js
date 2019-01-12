import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, getReadTimeByMinute } from './book'
import { getBookmark, saveLocation } from './localStorage'

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
      'section',
      'cover',
      'metadata',
      'navigation',
      'offsetY',
      'isBookmark',
      'bookmarks',
      'totPage',
      'paginate'
    ]),
    themeList () {
      return themeList(this)
    },
    getSectionName () {
      return this.section ? this.navigation[this.section].label : ''
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
      'setSection',
      'setCover',
      'setMetadata',
      'setNavigation',
      'setOffsetY',
      'setIsBookmark',
      'setBookmarks',
      'setTotPage',
      'setPaginate'
    ]),
    initGlobalStyle(theme) {
      addCss(`${process.env.VUE_APP_RES_URL}/themes/${theme.toLowerCase()}_theme.css`)
    },
    refersLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi) * 100
        this.setProgress(Math.floor(progress))
        saveLocation(this.fileName, startCfi)
        this.setSection(currentLocation.start.index)
        const bookmark = getBookmark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
        } else {
          this.setIsBookmark(false)
        }

        const currentPage = currentLocation.start.location
        if (currentPage && currentPage > 0) {
          this.setPaginate(`${currentPage} / ${this.totPage}`)
        }
      }
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
    },
    // 翻页时隐藏标题栏和菜单栏
    hideTitleAndMenu () {
      this.setTitleAndMenuVisible(false) // 隐藏标题栏和菜单栏
      this.setMenuSettingVisible(-1) // 隐藏设置项
      this.setFontFamilyVisible(false) // 隐藏字体设置界面
    },
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    }
  }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchPageOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchPageOffsetY',
      'setFlapCardVisible'
    ])
  }
}
