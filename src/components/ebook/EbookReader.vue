<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import { ebookMixin } from '../../utils/mixin'
  import {
    getFontFamily,
    saveFontFamily,
    getFontSize,
    saveFontSize,
    getBookTheme,
    saveBookTheme,
    getLocation,
  } from '../../utils/localStorage'

  global.epub = Epub
  export default {
    mixins: [
      ebookMixin
    ],
    methods: {
      // 初始化手势
      initGesture () {
        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchStartX // 手指滑动的偏移量
          const time = event.timeStamp - this.touchStartTime // 手势滑动的时间
          if (time < 500 && offsetX > 40) {
            this.prevPage() // 右滑上一页
            // 翻页时将标题栏和菜单栏隐藏
            this.hideTitleAndMenu()
          } else if (time < 500 && offsetX < -40) {
            this.nextPage() // 左滑下一页
            this.hideTitleAndMenu()
          } else {
            this.toggleTitleAndMenu() // 点击屏幕切换标题栏和菜单栏
          }
        })
      },
      // 翻页时隐藏标题栏和菜单栏
      hideTitleAndMenu () {
        this.setTitleAndMenuVisible(false) // 隐藏标题栏和菜单栏
        this.setMenuSettingVisible(-1) // 隐藏设置项
        this.setFontFamilyVisible(false) // 隐藏字体设置界面
      },
      prevPage () {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refersLocation()
          })
        }
      },
      nextPage () {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refersLocation()
          })
        }
      },
      toggleTitleAndMenu () {
        this.setTitleAndMenuVisible(!this.titleAndMenuVisible)
        // 当标题栏和菜单栏隐藏时
        if (!this.titleAndMenuVisible) {
          this.setMenuSettingVisible(-1) // 隐藏设置项
          this.setFontFamilyVisible(false) // 隐藏字体设置界面
        }
      },
      initTheme () {
        let theme = getBookTheme(this.fileName)
        if (!theme) {
          theme = this.themeList[0].name
          saveBookTheme(this.fileName, 'Default')
        }
        this.setDefaultTheme(theme)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.rendition.themes.select(theme)
      },
      initFontFamily () {
        let font = getFontFamily(this.fileName)
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          this.rendition.themes.font(font)
          this.setDefaultFontFamily(font)
        }
      },
      initFontSize () {
        let size = getFontSize(this.fileName)
        if (!size) {
          size = this.defaultFontSize
          saveFontSize(this.fileName, this.defaultFontSize)
        }
        this.rendition.themes.fontSize(size + 'px')
        this.setDefaultFontSize(size)
      },
      initRendition () {
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight
        })
        const location = getLocation(this.fileName)
        this.display(location, () => {
          this.initFontFamily()
          this.initFontSize()
          this.initTheme()
          this.initGlobalStyle(this.defaultTheme)
        })
        // 引入nginx服务器上的web字体
        this.rendition.hooks.content.register(contents => {
          Promise.all([
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/webFonts/daysOne.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/webFonts/cabin.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/webFonts/montserrat.css`),
            contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/webFonts/tangerine.css`)
          ])
        })
      },
      initEpub: function () {
        const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.initGesture()
        this.book.ready.then(() => {
          // 对电子书进行分页
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.filename / 16)))
        }).then(() => {
          // 分页完成后设置电子书状态available为true
          this.setBookAvailable(true)
          this.refersLocation()
        })
      }
    },
    mounted () {
      // const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(this.$route.params.fileName.split('|').join('/'))
        .then(() => {
          this.initEpub()
        })
    }
  }
</script>

<style scoped>
</style>
