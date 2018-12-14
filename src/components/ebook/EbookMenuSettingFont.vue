<template>
  <transition name="slide-up">
    <div class="setting-wrapper"
         v-show="menuSettingVisible === 4"
    >
      <div class="setting-font-size">
        <div class="preview">
      <span class="icon-A"
            :style="{ fontSize: fontSizeList[0].fontSize + 'px'}"
      ></span>
        </div>
        <div class="select">
          <div class="select-wrapper"
               v-for="(item, index) in fontSizeList"
               :key="index"
               @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point"
                   v-if="defaultFontSize === item.fontSize"
              >
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview">
      <span class="icon-A"
            :style="{ fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
      ></span>
        </div>
      </div>

      <div class="setting-font-family">
        <div class="setting-font-family-wrapper"
             @click="showFontFamilyPopup"
        >
          <span class="setting-font-family-text">{{ defaultFontFamily }}</span>
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { FONT_SIZE_LIST } from '@/utils/book.js'
  import { ebookMixin } from '../../utils/mixin.js'
  import { saveFontSize } from '../../utils/localStorage'

  export default {
    mixins: [
      ebookMixin
    ],
    data () {
      return {
        fontSizeList: FONT_SIZE_LIST
      }
    },
    methods: {
      showFontFamilyPopup () {
        this.setFontFamilyVisible(true)
      },
      setFontSize (fontSize) {
        this.setDefaultFontSize(fontSize)
        this.currentBook.rendition.themes.fontSize(fontSize + 'px')
        saveFontSize(this.fileName, fontSize) // 将当前书籍的字体大小设置保存到本地
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: px2rem($menuBarHeight);
    left: 0;
    display: flex;
    flex-direction: column;
    height: px2rem($menuBarSettingHeight);
    width: 100%;
  }

  .setting-font-size {
    width: 100%;
    flex: 2;
    background: white;
    display: flex;
    align-items: center;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    .select {
      flex: 1 0 0;
      display: flex;
      height: 100%;

      .select-wrapper {
        display: flex;
        flex: 1 0 0;
        align-items: center;
        /*去掉第一个横线*/
        &:first-child {
          .line:first-child {
            border-top: none;
          }
        }

        /*去掉最后一个横线*/
        &:last-child {
          .line:last-child {
            border-top: none;
          }
        }

        .line {
          height: 1px;
          width: 100%;
          border-top: 1px solid #acadaf;
        }

        .point-wrapper {
          position: relative;
          height: px2rem(8);
          border-left: 1px solid #acadaf;
          @include center;

          .point {
            position: absolute;
            height: px2rem(15);
            width: px2rem(15);
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 50%;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
            @include center;

            .small-point {
              height: 4px;
              width: 4px;
              border-radius: 50%;
              background-color: #000;
            }
          }
        }
      }
    }

    .preview {
      width: px2rem(40);
      @include center
    }
  }

  .setting-font-family {
    flex: 1;
    display: flex;
    font-size: px2rem(14);
    @include center;
    background-color: white;

    .setting-font-family-wrapper {
      @include center;
      height: 100%;
    }
  }

</style>
