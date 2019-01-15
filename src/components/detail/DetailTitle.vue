<template>
  <div class="title"
       :class="{'shadow': shadowVisible}"
  >
    <div class="icon-wrapper" @click="back">
      <span class="icon-back"></span>
    </div>
    <div class="icon-wrapper">
      <span class="icon-shelf"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      offsetY: Number
    },
    data () {
      return {
        shadowVisible: false
      }
    },
    watch: {
      offsetY(v) {
        this.shadowVisible = v > 0
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .title {
    width: 100%;
    height: px2rem(50);
    display: flex;
    justify-content: space-between;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    align-items: center;
    &.shadow {
      box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, .2);
    }

    .icon-wrapper {
      font-size: px2rem(20);
    }
  }

</style>
