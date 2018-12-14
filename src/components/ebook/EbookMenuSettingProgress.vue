<template>
  <transition name="slide-up">
    <div class="setting-progress-wrapper"
         v-show="menuSettingVisible === 2"
    >
      <span class="read-time">{{ getReadTimeText() }}</span>
      <div class="read-progress-wrapper">
        <span class="icon-back"
              @click="prevSection"
        ></span>
        <input type="range"
               class="progress"
               min="0"
               max="100"
               :disabled="!bookAvailable"
               @change="onProgressChange($event.target.value)"
               @input="onprogressInput($event.target.value)"
               ref="progress"
               :value="progress"
        >
        <span class="icon-forward"
              @click="nextSection"
        ></span>
      </div>
      <div class="read-progress-info">
        <span class="progress-section-text">{{ getSectionName }}</span>
        <span class="progress-section-percentage">
            ({{ bookAvailable ? progress + '%' : '加载中...' }})
          </span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import { getReadTime } from '../../utils/localStorage'

  export default {
    mixins: [
      ebookMixin
    ],
    computed: {
      getSectionName () {
        if (this.section) {
          const sectionInfo = this.currentBook.section(this.section)
          if (sectionInfo && sectionInfo.href) {
            return this.currentBook.navigation.get(sectionInfo.href).label
          }
        }
        return ''
      }
    },
    watch: {
      progress() {
        // 当progress改变时更新进度条背景
        this.updateProgressBackground()
      }
    },
    methods: {
      getReadTimeText() {
        return this.$t('book.haveRead').replace('$1', this.getReadTimeByMinute())
      },
      getReadTimeByMinute() {
        let readTime = getReadTime(this.fileName)
        if (!readTime) {
          return 0
        } else {
          return Math.ceil(readTime / 60)
        }
      },
      // 松开进度条
      onProgressChange (progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress()
        })
      },
      // 拖动进度条
      onprogressInput (progress) {
        this.setProgress(progress)
      },
      prevSection () {
        if (this.section > 1 && this.bookAvailable) {
          this.setSection(this.section - 1).then(() => {
            this.displaySection()
          })
        }
      },
      nextSection () {
        if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
          this.setSection(this.section + 1).then(() => {
            this.displaySection()
          })
        }
      },
      // 显示当前进度条表示的页面
      displayProgress () {
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
        this.display(cfi)
      },
      displaySection () {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          this.display(sectionInfo.href)
        }
      },
      updateProgressBackground () {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .setting-progress-wrapper {
    width: 100%;
    height: px2rem($menuBarSettingHeight);
    position: absolute;
    bottom: px2rem($menuBarHeight);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    background-color: #cecece;
    font-size: px2rem(14);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .read-time {
      margin-top: px2rem(10);
    }

    .read-progress-wrapper {
      width: 100%;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      font-size: px2rem(22);
      display: flex;
      align-items: center;

      .progress {
        -webkit-appearance: none;
        height: px2rem(2);
        background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
        background-size: 0 100%;
        flex: 1;

        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(17);
          width: px2rem(17);
          border: 1px solid #ddd;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 4px 4px rgba(0, 0, 0, .15);
        }
      }
    }

    .read-progress-info {
      width: 100%;
      display: flex;
      padding: 0 px2rem(10);
      @include center;
      box-sizing: border-box;
      .progress-section-text {
        @include ellipsis;
      }
    }
  }
</style>
