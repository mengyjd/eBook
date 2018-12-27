<template>
  <div class="ebook-bookmark"
       ref="bookmark"
  >
    <div class="ebook-bookmark-text-wrapper">
      <div class="bookmark-icon-down-wrapper" :class="{'rotate': rotate}">
        <span class="icon-down"></span>
      </div>
      <span class="bookmark-text">{{text}}</span>
    </div>

    <div class="ebook-bookmark-wrapper">
      <Bookmark
        :height="height"
        :width="width"
        :color="color"
        :style="isFixed ? fixedStyle : {}"
      ></Bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark'
  import { realPx } from '../../utils/utils'
  import { ebookMixin } from '../../utils/mixin'
  import { getBookmark, saveBookmark } from '../../utils/localStorage'

  const BLUE = '#346cbc'
  const WHITE = '#fff'
  export default {
    mixins: [
      ebookMixin
    ],
    components: {
      Bookmark
    },
    computed: {
      height () {
        return realPx(35)
      },
      width () {
        return realPx(14)
      },
      fixedStyle () {
        return {
          position: 'fixed',
          right: '15px',
          top: 0,
          zIndex: 10
        }
      }
    },
    data () {
      return {
        text: '',
        color: WHITE,
        rotate: false,
        threshold: realPx(45),
        isFixed: false
      }
    },
    watch: {
      offsetY (v) {
        if (!this.bookAvailable || this.titleAndMenuVisible) {
          return
        }
        if (v >= this.height && v <= this.threshold) {
          this.beforeThreshold(v)
        } else if (v > this.threshold) {
          this.alterThreshold(v)
        } else if (v > 0 && v < this.height) {
          this.beforeHeight()
        } else if (v === 0) {
          this.restore()
        }
      },
      isBookmark(isBookmark) {
        this.isFixed = this.isBookmark
        if (isBookmark) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
    },
    methods: {
      addBookmark () {
        const currentLocation = this.currentBook.rendition.currentLocation()
        const baseCfi = currentLocation.start.cfi.replace(/!.*/, '')
        // 当前页第一个字符的位置
        const startCfi = currentLocation.start.cfi.replace(/.*!/, '').replace(')', '')
        // 当前页最后一个字符的位置
        const endCfi = currentLocation.end.cfi.replace(/.*!/, '')
        const cfiRange = `${baseCfi}!,${startCfi},${endCfi}`
        this.currentBook.getRange(cfiRange).then(range => {
          const text = range.toString().replace(/\s\s/g) // 当前页的所有字符
          this.bookmarks.push({
            cfi: currentLocation.start.cfi,
            text
          })
          saveBookmark(this.fileName, this.bookmarks)
        })
        this.setIsBookmark(true)
      },
      removeBookmark () {
        // 获取当前页cfi
        const currentLocation = this.currentBook.rendition.currentLocation()
        const currentCfi = currentLocation.start.cfi
        if (this.bookmarks) {
          saveBookmark(this.fileName, this.bookmarks.filter(bookmark => bookmark.cfi !== currentCfi))
          this.setBookmarks(getBookmark(this.fileName))
        }
        this.setIsBookmark(false)
      },
      restore () {
        // 状态4 归位
        setTimeout(() => {
          this.$refs.bookmark.style.top = -this.height + 'px'
          this.rotate = false
        }, 200)
        if (this.isFixed) {
          this.addBookmark()
        } else {
          this.removeBookmark()
        }
      },
      beforeHeight () {
        // 状态一 到达书签高度之前
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }
      },
      beforeThreshold (v) {
        // 状态二 未到达临界状态
        this.$refs.bookmark.style.top = -v + 'px'
        this.beforeHeight()
      },
      alterThreshold (v) {
        // 状态三 超出临界状态
        if (this.isBookmark) {
          this.$refs.bookmark.style.top = -v + 'px'
          this.text = this.$t('book.releaseDeleteMark')
          this.rotate = true
          this.color = WHITE
          this.isFixed = false
        } else {
          this.$refs.bookmark.style.top = -v + 'px'
          this.text = this.$t('book.releaseAddMark')
          this.rotate = true
          this.color = BLUE
          this.isFixed = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    width: 100%;
    height: px2rem(35);
    background-color: #7d8188;
    font-size: px2rem(14);
    display: flex;
    color: white;

    .ebook-bookmark-text-wrapper {
      position: absolute;
      display: flex;
      bottom: 1px;
      right: px2rem(45);

      .bookmark-icon-down-wrapper {
        transition: all 0.2s linear;

        &.rotate {
          transform: rotate(180deg);
        }
      }
    }

    .ebook-bookmark-wrapper {
      position: absolute;
      right: 15px;
    }
  }
</style>
