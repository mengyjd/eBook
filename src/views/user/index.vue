<template>
  <div class="user-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .user-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
