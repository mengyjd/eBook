<template>
  <transition name="slide-up-popup">
    <div class="ebook-popup-list"
         v-show="fontFamilyVisible && titleAndMenuVisible"
    >

      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon"
             @click="hideFontFamily"
        >
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>

      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item"
             v-for="(item, index) in fontFamilyList"
             :key="index"
             :class="{ selected: isSelected(item) }"
             @click="setFontFamily(item.font)"
        >
          <span class="eook-popup-item-text">{{ item.font }}</span>
          <span class="icon-check"
                v-if="isSelected(item)"
          ></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import { FONT_FAMILY } from '../../utils/book'
  import { saveFontFamily } from '../../utils/localStorage'

  export default {
    mixins: [
      ebookMixin
    ],
    data () {
      return {
        fontFamilyList: FONT_FAMILY
      }
    },
    methods: {
      setFontFamily (font) {
        this.setDefaultFontFamily(font)
        if (font === 'Default') {
          this.currentBook.rendition.themes.font('Times New Roman')
        } else {
          this.currentBook.rendition.themes.font(font)
        }
        saveFontFamily(font)
      },
      isSelected (item) {
        return this.defaultFontFamily === item.font
      },
      hideFontFamily () {
        this.setFontFamilyVisible(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .ebook-popup-list {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    background-color: white;
    font-size: px2rem(14);
    width: 100%;
    box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .15);
  }

  .ebook-popup-title {
    display: flex;
    padding: px2rem(15);
    font-weight: bold;
    border-bottom: 1px solid #b8b9bb;
    @include center;

    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
    }
  }

  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      padding: px2rem(15);

      &.selected {
        color: #346cb9;
      }
    }

    .icon-check {
      float: right;
      margin-right: 15px;
      font-weight: bold;
    }
  }
</style>
