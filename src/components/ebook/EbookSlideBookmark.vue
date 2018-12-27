<template>
  <div class="slide-bookmark">
    <div class="slide-bookmark-title">
      {{$t('book.bookmark')}} · {{bookmarks ? bookmarks.length : 0}}
    </div>
    <div class="slide-scroll-wrapper">
      <Scroll class="slide-bookmark-list"
              :top="48"
              :bottom="48"
      >
        <div class="bookmark-item"
             v-for="(bookmark, index) in bookmarks"
             :key="index"
             @click="displayBookmark(bookmark.cfi)"
        >
          <div class="icon-wrapper">
            <span class="icon-bookmark"></span>
          </div>
          <div class="bookmark-item-text">{{bookmark.text}}</div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from '../common/Scroll'
  import { getBookmark } from '../../utils/localStorage'
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [
      ebookMixin
    ],
    components: {
      Scroll
    },
    methods: {
      displayBookmark(target) {
        this.hideTitleAndMenu()
        this.display(target)
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .slide-bookmark {
    width: 100%;

    .slide-bookmark-title {
      width: 100%;
      height: px2rem(48);
      font-size: px2rem(14);
      padding: 0 px2rem(10);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: px2rem(1) solid #b8b9bb;
    }

    .slide-scroll-wrapper {
      flex: 1;

      .bookmark-item {
        margin: 0 px2rem(10);
        padding: px2rem(15) 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: px2rem(1) solid #b8b9bb;

        .icon-wrapper {
          margin-right: px2rem(7);
          background-color: #b8b9bb;
          padding: px2rem(5);
          border-radius: 50%;
        }

        .bookmark-item-text {
          line-height: px2rem(18);
          @include ellipsis2(3, normal)
        }
      }
    }
  }
</style>
