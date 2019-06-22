<template>
  <div class="shelf-item-add responsive-book-box">
    <span class="icon-add"></span>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/responsive";

  .shelf-item-add {
    border: 1px solid #ccc;
    box-sizing: border-box;
    @include center;
    .icon-add {
      color: #ccc;
      font-size: px2rem(40);
    }
  }
</style>
