<template>
    <div class="scroll-wrapper"
         :class="{ 'no-scroll': ifNoScroll }"
         @scroll.passive="handleScroll"
         ref="scrollWrapper"
    >
      <slot></slot>
    </div>
</template>

<script>
  import { realPx, debounce } from '../../utils/utils'

  export default {
    props: {
      top: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number,
        default: 0
      },
      ifNoScroll: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      top() {
        this.refresh()
      },
      bottom() {
        this.refresh()
      }
    },
    methods: {
      handleScroll(e) {
        const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
        this.$emit('onScroll', offsetY)
      },
      scrollTo(x, y) {
        this.$refs.scrollWrapper.scrollTo(x, y)
      },
      refresh() {
        if (this.$refs.scrollWrapper) {
          this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
          this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll)
        }
      }
    },
    mounted() {
      this.refresh()
      window.addEventListener('resize', debounce(() => {
        this.refresh()
      }, 100))
    }
  }
</script>

<style lang="scss" scoped>
    // @import "../../assets/styles/global";

  .scroll-wrapper {
    position: relative;
    z-index: 150;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    &.no-scroll {
      overflow-y: hidden;
    }
  }
</style>
