<template>
  <div>
    <!--设置菜单-->
    <transition name="slide-up">
      <div class="menu-wrapper"
           :class="{ hideBoxShadow: menuSettingVisible !== -1 }"
           v-show="titleAndMenuVisible"
      >
        <div class="icon-wrapper">
        <span class="icon-menu point"
              @click="showSetting(1)"
        ></span>
        </div>
        <div class="icon-wrapper">
        <span class="icon-progress point"
              @click="showSetting(2)"
        ></span>
        </div>
        <div class="icon-wrapper">
        <span class="icon-bright point"
              @click="showSetting(3)"
        ></span>
        </div>
        <div class="icon-wrapper point">
        <span class="icon-A"
              @click="showSetting(4)"
        ></span>
        </div>
      </div>
    </transition>
    <!--字号设置-->
    <ebook-menu-setting-font/>
    <!--字体设置-->
    <ebook-menu-setting-font-popup/>
    <!--主题设置-->
    <ebook-menu-setting-theme/>
    <!--阅读进度条-->
    <ebook-menu-setting-progress/>
    <!--目录-->
    <ebook-slide/>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import EbookMenuSettingFont from './EbookMenuSettingFont'
  import EbookMenuSettingFontPopup from './EbookMenuSettingFontPopup'
  import EbookMenuSettingTheme from './EbookMenuSettingTheme'
  import EbookMenuSettingProgress from './EbookMenuSettingProgress'
  import EbookSlide from './EbookSlide'

  export default {
    mixins: [
      ebookMixin
    ],
    components: {
      EbookSlide,
      EbookMenuSettingFont,
      EbookMenuSettingFontPopup,
      EbookMenuSettingTheme,
      EbookMenuSettingProgress
    },
    methods: {
      showSetting (key) {
        this.setMenuSettingVisible(key)
      },
      hideTitleAndMenu () {
        this.setMenuSettingVisible(-1) // 隐藏设置项
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .menu-wrapper {
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: px2rem($menuBarHeight);
    font-size: px2rem(20);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    z-index: 100;

    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
    }
  }

  .hideBoxShadow {
    box-shadow: none;
  }

  .catalog-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 150;
    background-color: #919191;
  }
</style>
