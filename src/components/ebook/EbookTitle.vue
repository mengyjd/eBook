<template>
  <transition name="slide-down">
    <div class="title-wrapper"
         v-show="titleAndMenuVisible"
    >
      <div class="left">
      <span class="icon-back"
            @click="back"
      ></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf" @click="showShelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import { gotoShelf } from '../../utils/store'

  export default {
    mixins: [
      ebookMixin
    ],
    methods: {
      back () {
        this.$router.go(-1)
        this.setTitleAndMenuVisible(false)
      },
      showShelf () {
        gotoShelf(this)
        this.setTitleAndMenuVisible(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .title-wrapper {
    position: absolute;
    width: 100%;
    height: px2rem(48);
    z-index: 100;
    font-size: px2rem(20);
    background-color: white;
    display: flex;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);

    .left {
      display: flex;
      flex: 0 0 px2rem(60);
      align-items: center;
      margin-left: 10px;
    }

    .right {
      display: flex;
      flex: 1;
      justify-content: flex-end;

      .icon-wrapper {
        @include center;
        flex: 0 0 px2rem(40);
      }
    }
  }
</style>
