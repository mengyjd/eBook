<template>
  <transition name="fade">
    <div class="shelf-title" v-show="shelfTitleVisible"
         :class="{'show-shadow': ifShowShadow}"
    >
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <span class="shelf-sub-title-text"
              v-show="isEditModel">{{selectText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left"
           @click="onClickClearCache">
        <span class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right"
           @click="onClickEdit">
        <span class="shelf-title-btn-text">{{$t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'

  export default {
    mixins: [storeShelfMixin],
    props: {
      offsetY: Number
    },
    data () {
      return {
        ifShowShadow: false
      }
    },
    watch: {
      offsetY(offsetY) {
        this.ifShowShadow = offsetY !== 0
      }
    },
    computed: {
      selectText () {
        const selectedNum = this.shelfSelected.length
        if (selectedNum === 0) {
          return this.$t('shelf.selectBook')
        } else if (selectedNum === 1) {
          return this.$t('shelf.haveSelectedBook').replace('$1', selectedNum)
        } else {
          return this.$t('shelf.haveSelectedBooks').replace('$1', selectedNum)
        }
      }
    },
    methods: {
      onClickClearCache () {
        console.log('clear cache')
      },
      onClickEdit () {
        this.setIsEditModel(!this.isEditModel)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-title {
    position: relative;
    font-size: px2rem(16);
    width: 100%;
    height: px2rem(42);
    background-color: #fff;
    z-index: 150;
    &.show-shadow {
      @include minBoxShadow;
    }

    .shelf-title-text-wrapper {
      color: #333;
      position: absolute;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;

      .shelf-title-text {
        font-size: px2rem(16);
        font-weight: bold;
      }

      .shelf-sub-title-text {
        font-size: px2rem(12);
        margin-top: 3px;
      }
    }

    .shelf-title-btn-wrapper {
      position: absolute;
      box-sizing: border-box;
      top: 0;
      height: 100%;
      @include center;

      .shelf-title-btn-text {
        font-size: px2rem(14);
        color: #666;
      }

      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(15);
      }

      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }
    }
  }
</style>
