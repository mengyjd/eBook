<template>
  <transition name="fade">
    <div class="slide-content-wrapper"
         v-show="titleAndMenuVisible && menuSettingVisible === 1"
    >
      <transition name="slide-left">
        <div class="content"
             v-show="menuSettingVisible === 1"
        >
          <div class="content-page-wrapper"
               v-if="bookAvailable"
          >
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-page-tab-item"
                   :class="{'selected': currentTab === 1}"
                   @click="selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div class="content-page-tab-item"
                   :class="{'selected': currentTab === 2}"
                   @click="selectTab(2)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg"
           @click="hideTitleAndMenu"
           v-show="menuSettingVisible === 1"
      ></div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import EbookSlideContents from './EbookSlideContents'
  import EbookSlideBookmark from './EbookSlideBookmark'
  import EbookLoading from './EbookLoading'

  export default {
    mixins: [
      ebookMixin
    ],
    components: {
      EbookLoading
    },
    data () {
      return {
        currentTab: 1,
        content: EbookSlideContents,
        bookmark: EbookSlideBookmark
      }
    },
    methods: {
      selectTab(tab) {
        this.currentTab = tab
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .slide-content-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    z-index: 150;
    font-size: px2rem(14);

    .content {
      flex: 0 0 85%;
      width: 85%;
      background-color: #cecece;
      height: 100%;
      .content-page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .content-page {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        .content-page-tab {
          flex: 0 0 px2rem(48);
          height: px2rem(48);
          width: 100%;
          display: flex;
          border-top: 1px solid #b8b9bb;
          .content-page-tab-item {
            flex: 1;
            @include center;
            &.selected {
              color: #346cb9;
            }
          }
        }
      }
      .content-empty {
        width: 100%;
        height: 100%;
        @include center;
        z-index: 151;
      }
    }

    .content-bg {
      flex: 0 0 15%;
      width: 15%;
      background-color: rgba(0, 0, 0, .15);
      z-index: 149;
    }
  }
</style>
