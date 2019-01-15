<template>
  <div class="title-wrapper">
    <div class="title-text">{{titleText}}</div>
    <div class="btn-text" @click="onclickBtn">{{btnText}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      titleText: {
        type: String,
        required: true
      },
      btnText: {
        type: String,
        required: true
      }
    },
    methods: {
      onclickBtn() {
        this.$emit('onclickBtn')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .title-wrapper {
    display: flex;
    padding: 0 px2rem(10) px2rem(5) px2rem(10);
    justify-content: space-between;
    align-items: center;
    line-height: px2rem(40);
    .title-text {
      font-size: px2rem(18);
      font-weight: bold;
    }
    .btn-text {
      font-size: px2rem(15);
      color: $color-blue;
    }
  }
</style>
