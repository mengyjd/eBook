<template>
  <div class="store">
    <transition :name="slideDirection">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        slideDirection: ''
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (to.meta.key > from.meta.key) {
        this.slideDirection = 'slide-left'
      } else {
        this.slideDirection = 'slide-right'
      }
      next()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .store {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
