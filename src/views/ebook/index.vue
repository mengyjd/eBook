<template>
  <div class="ebook" ref="ebook">
    <ebook-header></ebook-header>
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-bookmark></ebook-bookmark>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader.vue'
  import EbookTitle from '../../components/ebook/EbookTitle.vue'
  import EbookMenu from '../../components/ebook/EbookMenu.vue'
  import EbookBookmark from '../../components/ebook/EbookBookmark'
  import EbookHeader from '../../components/ebook/EbookHeader'
  import EbookFooter from '../../components/ebook/EbookFooter'
  import { ebookMixin } from '../../utils/mixin'
  import { getReadTime, saveReadTime } from '../../utils/localStorage'

  export default {
    mixins: [
      ebookMixin
    ],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu,
      EbookBookmark,
      EbookHeader,
      EbookFooter
    },
    watch: {
      offsetY (v) {
        if (v > 0) {
          // 显示标题和菜单栏时禁止下拉
          // 电子书分页完成前禁止下拉
          if (!this.titleAndMenuVisible && this.bookAvailable) {
            this.move(v)
          }
        } else if (v === 0) {
          this.restore()
        }
      }
    },
    methods: {
      move (v) {
        this.$refs.ebook.style.top = `${v}px`
      },
      restore () {
        this.$refs.ebook.style.transition = 'all 0.2s'
        this.$refs.ebook.style.top = 0
        setTimeout(() => {
          this.$refs.ebook.style.transition = ''
        }, 200)
      },
      startLoopReadTime () {
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          readTime = 0
        }
        this.readTimeTask = setInterval(() => {
          readTime++
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime)
          }
        }, 1000)
      }
    },
    mounted () {
      this.startLoopReadTime()
    },
    beforeDestroy () {
      if (this.readTimeTask) {
        clearInterval(this.readTimeTask)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .ebook {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #cecece;
  }
</style>
