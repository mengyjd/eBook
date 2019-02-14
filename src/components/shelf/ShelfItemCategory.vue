<template>
  <div class="shelf-item-category">
    <div class="books" v-if="data.itemList.length > 0">
      <img v-for="(book, index) in data.itemList" :key="index"
           :src="book.cover"
           alt=""
      >
    </div>
    <div class="group-none-wrapper" v-else>
      <span class="icon-book2"></span>
    </div>
    <span class="category-text">{{ data.title }}</span>
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

  .shelf-item-category {
    width: 100%;
    height: 100%;
    position: relative;
    .books {
      width: 100%;
      height: 100%;
      padding: 5px 2px;
      box-sizing: border-box;
      overflow: hidden;
      img {
        width: 33.3%;
        padding: 0 2px;
        box-sizing: border-box;
      }
    }
    .group-none-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      .icon-book2 {
        color: #ccc;
        font-weight: normal;
        font-size: px2rem(30);
      }
    }
    .category-text {
      font-size: px2rem(14);
      position: absolute;
      left: 0;
      bottom: -20px;
    }
  }
</style>
