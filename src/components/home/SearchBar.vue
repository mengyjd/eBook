<template>
  <div>
    <!--搜索栏-->
    <div class="search-bar"
         :class="{'hide-title': !titleVisible, 'shadow': shadowVisible}"
    >
      <!--标题栏-->
      <transition name="title-move">
        <div class="search-title-wrapper"
             v-show="titleVisible"
        >
          <div class="icon-text-wrapper icon-wrapper">
            <span class="icon-text title">{{$t('home.title')}}</span>
          </div>
          <div class="icon-shake-wrapper point icon-wrapper"
               @click="showFlapCard"
          >
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <!--返回按钮-->
      <div class="icon-back-wrapper icon-wrapper point"
           :class="{'hide-title': !titleVisible}"
           @click="onBack"
      >
        <span class="icon-back icon"></span>
      </div>
      <!--搜索框-->
      <div class="search-input-wrapper"
           :class="{'hide-title': !titleVisible}">
        <div class="search-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bg">
          <div class="icon-search-wrapper">
            <span class="icon-search"></span>
          </div>
          <input type="text"
                 class="search-input"
                 @focus="showHotSearchVisible"
                 :placeholder="$t('home.hint')"
                 v-model="searchText"
                 @keyup.enter.exact="search"
          >
        </div>
      </div>
    </div>
    <!--热门搜索页-->
    <transition name="fade-slide-up">
      <hot-search-list v-show="hotSearchPageVisible"
                       ref="hotSearchList"
      ></hot-search-list>
    </transition>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  import HotSearchList from '../home/HotSearchList'
  import { saveSearchHistory } from '../../utils/localStorage'

  export default {
    mixins: [storeHomeMixin],
    components: {
      HotSearchList
    },
    data () {
      return {
        searchText: '',
        titleVisible: true,
        shadowVisible: false,
        hotSearchPageVisible: false
      }
    },
    watch: {
      offsetY (offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hotSearchPageOffsetY(offsetY) {
        if (offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
      }
    },
    methods: {
      showFlapCard() {
        this.setFlapCardVisible(true)
      },
      onBack () {
        if (this.hotSearchPageVisible) {
          this.hideHotSearchPageVisible()
        } else {
          this.$router.push({
            path: '/store/shelf'
          })
        }
        if (this.offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
        this.setOffsetY(0)
      },
      hideHotSearchPageVisible() {
        this.hotSearchPageVisible = false
      },
      showHotSearchVisible() {
        this.hotSearchPageVisible = true
        this.hideTitle()
        this.hideShadow() // 初始状态隐藏阴影
        this.$nextTick(() => {
          this.$refs.hotSearchList.reset()
        })
      },
      hideTitle () {
        this.titleVisible = false
      },
      showTitle () {
        this.titleVisible = true
      },
      hideShadow () {
        this.shadowVisible = false
      },
      showShadow () {
        this.shadowVisible = true
      },
      search() {
        if (this.searchText) {
          this.searchBook(this.searchText)
          saveSearchHistory(this.searchText)
          this.searchText = ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .search-bar {
    font-size: 0;
    width: 100%;
    height: px2rem(106);

    &.hide-title {
      height: px2rem(62)
    }

    &.shadow {
      box-shadow: 0 px2rem(2) px2rem(4) rgba(131, 131, 131, .3);
    }

    .search-title-wrapper {
      position: absolute;
      width: 100%;
      height: px2rem(48);
      background-color: #fff;

      .icon-wrapper {
        position: absolute;
        height: 100%;
        @include center;
      }

      .icon-text-wrapper {
        width: 100%;
      }

      .icon-shake-wrapper {
        right: px2rem(10);
      }
    }

    .icon-back-wrapper {
      position: absolute;
      left: px2rem(10);
      top: 0;
      z-index: 150;
      height: px2rem(48);
      @include center;
      transition: all $animationTime;

      &.hide-title {
        height: px2rem(62);
      }
    }

    .search-input-wrapper {
      position: absolute;
      top: px2rem(42);
      width: 100%;
      padding: px2rem(10);
      height: px2rem(62);
      box-sizing: border-box;
      transition: all $animationTime;
      display: flex;

      &.hide-title {
        top: 0;
      }

      .search-blank {
        width: 0;
        height: 100%;
        transition: all $animationTime;

        &.hide-title {
          width: px2rem(35);
        }
      }

      .search-bg {
        display: flex;
        flex: 1;
        height: 100%;
        border-radius: px2rem(20);
        background-color: #f4f4f4;
        transition: all $animationTime;

        .icon-search-wrapper {
          font-size: px2rem(18);
          margin-left: px2rem(15);
          color: #ccc;
          @include center;
        }

        .search-input {
          margin-right: px2rem(20);
          width: 100%;
          box-sizing: border-box;
          outline: none;
          margin-left: 10px;
          border-width: 0;
          background-color: transparent;
          font-size: px2rem(14);
        }
      }
    }
  }
</style>
