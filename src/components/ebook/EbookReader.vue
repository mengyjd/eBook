<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <transition name="fade">
      <div class="loading-wrapper" v-show="!bookDisplayed">
        <ebook-loading></ebook-loading>
      </div>
    </transition>
    <div class="ebook-reader-mask"
         ref="ebookReadMask"
         @click="initClick"
         @touchstart="touchStart"
         @touchmove="touchMove"
         @touchend="touchEnd"
         @mousedown.left="onMouseDown"
         @mousemove.left="onMouseMove"
         @mouseup.left="onMouseUp"
    ></div>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import EbookLoading from './EbookLoading'
  import { ebookMixin } from '../../utils/mixin'
  import {
    getFontFamily,
    saveFontFamily,
    getFontSize,
    saveFontSize,
    getBookTheme,
    saveBookTheme,
    getLocation, getBookmark
  } from '../../utils/localStorage'
  import { getLocalForage } from '../../utils/localforage'
  import { flatten } from '../../utils/book'

  global.epub = Epub
  export default {
    mixins: [
      ebookMixin
    ],
    data () {
      return {
        bookDisplayed: false,
        currentTheme: null
      }
    },
    components: {
      EbookLoading
    },
    methods: {
      onMouseDown (e) {
        this.mouseStartTime = e.timeStamp
        this.mouseState = 1
        this.startY = e.clientY
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseMove (e) {
        if (this.mouseState === 1) {
          this.mouseState = 2
        } else if (this.mouseState === 2) {
          // 计算Y轴偏移量并保存到vuex中
          this.setOffsetY(e.clientY - this.startY)
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseUp (e) {
        if (this.mouseState === 2) {
          this.mouseState = 3
          this.setOffsetY(0)
        } else {
          this.mouseState = 4
        }
        const clickTime = e.timeStamp - this.mouseStartTime
        if (clickTime < 150) {
          this.mouseState = 4
        }
        e.preventDefault()
        e.stopPropagation()
      },
      initClick (e) {
        if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
          return
        }
        const width = window.innerWidth
        const offsetX = e.offsetX
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage() // 点击右边上一页
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage() // 点击左边下一页
        } else {
          this.toggleTitleAndMenu() // 点击中间切换菜单
        }
      },
      touchStart (e) {
        this.startX = e.changedTouches[0].clientX
        this.startY = e.changedTouches[0].clientY
      },
      touchMove (e) {
        // 计算Y轴偏移量并保存到vuex中
        this.setOffsetY(e.changedTouches[0].clientY - this.startY)
        e.preventDefault()
        e.stopPropagation()
      },
      touchEnd (e) {
        // 计算X轴偏移量
        const offsetX = e.changedTouches[0].clientX - this.startX
        if (offsetX > 0 && offsetX > 40) {
          this.prevPage()
        } else if (offsetX < 0 && offsetX < -40) {
          this.nextPage()
        }
        this.setOffsetY(0)
      },
      prevPage () {
        this.hideTitleAndMenu()
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refersLocation()
          })
        }
      },
      nextPage () {
        this.hideTitleAndMenu()
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
        let themeName = getBookTheme(this.fileName)
        if (!themeName) {
          themeName = this.themeList[0].name
          saveBookTheme(this.fileName, 'Default')
        }
        this.setDefaultTheme(themeName)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
          if (themeName === theme.name) {
            this.currentTheme = theme
          }
        })
        this.rendition.themes.select(themeName)
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
          // method: 'default' // 兼容微信
          // flow: 'scrolled' // 上下滑动翻页
        })
        let location
        if (this.$route.query.href) {
          location = this.$route.query.href // 从链接中获取location
        } else {
          location = getLocation(this.fileName) // 从localStorage中获取location
        }
        // 显示location
        this.display(location, () => {
          this.initTheme()
          this.initFontFamily()
          this.initFontSize()
          this.initGlobalStyle(this.defaultTheme)
          this.bookDisplayed = true
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
      parseBook () {
        // 获取电子书的封面
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        // 将电子书树状结构的目录变成一维数组
        this.book.loaded.navigation.then(nav => {
          let navItem = flatten(nav.toc)

          function find (item, arr, level = 0) {
            return !item.parent ? level : find(
              arr.filter(parentItem => parentItem.id === item.parent)[0],
              arr,
              ++level
            )
          }

          navItem.forEach(item => {
            item.level = find(item, navItem)
          })
          this.setNavigation(navItem)
        })
      },
      initBookmarks () {
        this.setBookmarks(getBookmark(this.fileName))
        if (!this.bookmarks) {
          this.setBookmarks([])
        }
      },
      initEpub (url) {
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.initRendition()
        this.parseBook()
        this.initBookmarks()
        this.book.ready.then(() => {
          // 对电子书进行分页
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
        }).then((locations) => {
          // 对目录进行分页
          this.initMenuPageNum(locations)
          this.setTotPage(locations.length)
          // 分页完成后设置电子书状态available为true
          this.setBookAvailable(true)
          this.refersLocation()
        })
      },
      initMenuPageNum (locations) {
        // 为每一个章节添加pageList属性并初始化为数组
        this.navigation.forEach(nav => {
          nav.pagelist = []
        })
        locations.forEach(item => {
          const loc = item.match(/\[(.*)\]!/)[1]
          this.navigation.forEach(nav => {
            if (nav.href) {
              let href
              if (nav.href.match(/(.*)\.html/)) {
                href = nav.href.match(/(.*)\.html/)[1]
              } else if (nav.href.match(/(.*)\.xhtml/)) {
                href = nav.href.match(/(.*)\.xhtml/)[1].replace('html/', 'A')
              }
              if (loc === href) {
                nav.pagelist.push(item)
              }
            }
          })
          let currentPage = 1
          this.navigation.forEach((nav, index) => {
            if (index === 0) {
              nav.page = currentPage
            } else {
              nav.page = currentPage
            }
            currentPage += nav.pagelist.length + 1
          })
        })
      }
    },
    mounted () {
      const books = this.$route.params.fileName.split('|')
      const fileName = books[1]
      // 从indexDB中获取blob类型的离线电子书
      getLocalForage(fileName, book => {
        if (book) {
          this.setFileName(books.join('/'))
            .then(() => {
              this.initEpub(book)
            })
        } else {
          this.setFileName(books.join('/'))
            .then(() => {
              // 获取在线电子书
              const url = process.env.VUE_APP_EPUB_URL + '/' + this.fileName + '.epub'
              this.initEpub(url)
            })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";

  .ebook-reader {
    width: 100%;
    height: 100%;

    #read {
      position: absolute;
      top: 0;
      left: 0;
    }

    .ebook-reader-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
  }

  .loading-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    @include center;
    z-index: 1000;
  }
</style>
