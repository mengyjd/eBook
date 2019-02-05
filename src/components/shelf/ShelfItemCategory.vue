<template>
  <div class="shelf-item-category">
    <div class="books">
      <img v-for="(item, index) in data.categoryList" :key="index"
           :src="item.cover"
           alt=""
      >
    </div>
    <span class="category-text">{{ data.categoryText }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    },
    mounted () {
      console.log(this.data)
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
      img {
        width: 33.3%;
        padding: 0 2px;
        box-sizing: border-box;
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
