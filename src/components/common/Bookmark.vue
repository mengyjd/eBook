<template>
  <div class="bookmark-wrapper">
    <div class="bookmark"
         ref="bookmark"
         :style="style"
    ></div>
  </div>
</template>

<script>
  import { px2rem } from '@/utils/utils'

  export default {
    props: {
      height: Number,
      width: Number,
      color: String
    },
    computed: {
      style () {
        if (this.color) {
          return { borderColor: `${this.color} ${this.color} transparent ${this.color}` }
        }
        return {}
      }
    },
    mounted () {
      if (this.height && this.width) {
        this.$refs.bookmark.style.borderWidth = `${px2rem(this.height - 5)}rem ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(this.width / 2)}rem`
        this.$refs.bookmark.style.borderColor = `${this.color} ${this.color} transparent ${this.color}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .bookmark-wrapper {
    .bookmark {
      border-style: solid;
      border-width: px2rem(40) px2rem(8) px2rem(5) px2rem(8);
      border-color: white white transparent white;
    }
  }
</style>
