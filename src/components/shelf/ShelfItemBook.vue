<template>
  <div class="shelf-item-book" ref="itemBook">
    <img :src="data.cover" class="cover">
    <div class="book-name">{{ data.title }}</div>
    <transition name="fade">
      <div class="icon-private-wrapper" v-show="data.private">
        <div class="icon-bg"></div>
        <span class="icon-private"></span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-item-book {
    position: relative;
    width: 100%;
    height: 100%;

    .cover {
      width: 100%;
      height: 100%;
    }

    .book-name {
      @include ellipsis2(2, break-all)
    }

    .icon-bg {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-width: px2rem(17) px2rem(17) px2rem(17) px2rem(17);
      border-color: transparent transparent rgba(0, 0, 0, .3) rgba(0, 0, 0, .3);
      border-style: solid;
      transform-origin: left;
    }

    .icon-private {
      position: absolute;
      left: px2rem(3);
      bottom: px2rem(2);
      color: #fff;
      font-size: px2rem(12);
    }
  }
</style>
