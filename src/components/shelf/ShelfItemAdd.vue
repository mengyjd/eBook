<template>
  <div class="shelf-item-add">
    <span class="icon-add"></span>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-item-add {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    @include center;
    .icon-add {
      color: #ccc;
      font-size: px2rem(40);
    }
  }
</style>
