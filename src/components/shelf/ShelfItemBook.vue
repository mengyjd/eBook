<template>
  <div class="shelf-item-book" ref="itemBook">
    <img :src="data.cover" class="cover">
    <div class="book-name">{{ data.title }}</div>
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
    width: 100%;
    height: 100%;
    .cover {
      width: 100%;
      height: 100%;
    }
    .book-name {
      @include ellipsis2(2, break-all)
    }
  }
</style>
