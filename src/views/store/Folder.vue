<template>
  <div class="shelf-folder">
    <shelf-title />
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'

  export default {
    components: {
      ShelfTitle
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-folder {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
