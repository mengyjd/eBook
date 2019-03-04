<template>
  <div class="title"
       :class="{'shadow': shadowVisible}"
  >
    <div class="icon-wrapper" @click="back">
      <span class="icon-back"></span>
    </div>
    <div class="text-wrapper">
      <span class="text">{{text}}</span>
    </div>
    <div class="icon-wrapper">
      <span class="icon-shelf" @click="showShelf"></span>
    </div>
  </div>
</template>

<script>
  import { gotoShelf } from '../../utils/store'

  export default {
    props: {
      offsetY: Number,
      text: {
        type: String,
        default: ''
      }
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
      },
      showShelf() {
        gotoShelf(this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .title {
    width: 100%;
    height: px2rem(45);
    display: flex;
    justify-content: space-between;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    align-items: center;
    &.shadow {
      box-shadow: 0 px2rem(2) px2rem(2) rgba(0, 0, 0, .2);
    }

    .text-wrapper {
      font-weight: normal;
    }

    .icon-wrapper {
      font-size: px2rem(20);
    }
  }

</style>
