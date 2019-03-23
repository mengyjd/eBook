<template>
  <transition name="slide-up">
    <div class="setting-theme-wrapper"
         v-show="titleAndMenuVisible && menuSettingVisible === 3"
    >
      <div class="setting-theme-item"
           v-for="(item, index) in themeList"
           :key="index"
           @click="setTheme(index)"
           :class="{ selected: item.name === defaultTheme }"
      >
        <div class="theme-preview"
             :style="{backgroundColor: item.style.body.backgroundColor}"
             :class="{ selected: item.name === defaultTheme }"
        ></div>
        <span class="preview-text">{{item.alias}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import { saveBookTheme } from '../../utils/localStorage'
  import { removeAllCss } from '../../utils/book'

  export default {
    mixins: [
      ebookMixin
    ],
    methods: {
      setTheme(index) {
        const themeName = this.themeList[index].name
        this.setDefaultTheme(themeName)
        saveBookTheme(themeName)
        this.currentBook.rendition.themes.select(themeName)
        removeAllCss()
        this.initGlobalStyle(this.defaultTheme) // 改变全局主题
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .setting-theme-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    position: absolute;
    bottom: px2rem($menuBarHeight);
    left: 0;
    background-color: white;
    font-size: px2rem(14);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-theme-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;
      color: #333333;
      &.selected {
        color: #000;
        font-weight: bold;
      }
      .theme-preview {
        height: px2rem(65);
        box-sizing: border-box;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) rgba(0, 0, 0, .15);
          border: px2rem(2) solid #5e6369;
        }
      }
      .preview-text {
        text-align: center;
        margin-top: px2rem(5);
      }
    }
  }

</style>
