<template>
  <div class="ebook-loading-animation">
    <div class="ebook-loading-animation-wrapper">
      <!--左右的三条线-->
      <div class="ebook-loading-item"
           v-for="(item, index) in line"
           :key="index"
      >
        <div class="ebook-loading-line-wrapper"
             v-for="(subItem, subIndex) in item"
             :key="subIndex"
        >
          <div class="ebook-loading-line"
               ref="line"
          ></div>
          <div class="ebook-loading-mask"
               ref="mask"
          ></div>
        </div>
      </div>
      <!--中间的竖线-->
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        add: true,
        end: false,
        line: [
          [{}, {}, {}],
          [{}, {}, {}]
        ],
        maskWidth: [
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ],
        lineWidth: [
          { value: 10 },
          { value: 10 },
          { value: 10 },
          { value: 10 },
          { value: 10 },
          { value: 10 }
        ]
      }
    },
    mounted () {
      this.task = setInterval(() => {
        this.$refs.mask.forEach((item, index) => {
          const mask = this.$refs.mask[index]
          const line = this.$refs.line[index]
          let maskWidth = this.maskWidth[index]
          let lineWidth = this.lineWidth[index]

          if (index === 0) {
            if (this.add && maskWidth.value <= 10) {
              maskWidth.value++
              lineWidth.value--
            } else if (!this.add && lineWidth.value <= 10) {
              maskWidth.value--
              lineWidth.value++
            }
          } else {
            if (this.add && maskWidth.value <= 10) {
              let preMaskWidth = this.maskWidth[index - 1]
              if (preMaskWidth.value >= 5) {
                maskWidth.value++
                lineWidth.value--
              }
            } else if (!this.add && lineWidth.value <= 10) {
              let preLineWidth = this.lineWidth[index - 1]
              if (preLineWidth.value >= 5) {
                maskWidth.value--
                lineWidth.value++
              }
            }
          }

          mask.style.flex = maskWidth.value
          line.style.flex = lineWidth.value

          if (index === this.maskWidth.length - 1) {
            if (this.add) {
              if (maskWidth.value >= 10) {
                this.end = true
              }
            } else {
              if (maskWidth.value <= 0) {
                this.end = true
              }
            }
          }

          if (this.end) {
            this.add = !this.add
            this.end = false
          }
        })
      }, 20)
    },
    beforeDestroy () {
      clearInterval(this.task)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .ebook-loading-animation {
    position: relative;
    z-index: 200;
    width: px2rem(63);
    height: px2rem(40);
    background-color: transparent;
    border-radius: px2rem(4);
    border: px2rem(2) solid white;

    .ebook-loading-animation-wrapper {
      display: flex;
      width: 100%;
      height: 100%;

      .ebook-loading-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        padding: px2rem(7) 0;
        box-sizing: border-box;

        .ebook-loading-line-wrapper {
          padding: 0 px2rem(7);
          box-sizing: border-box;
          @include left;
          display: flex;

          .ebook-loading-line {
            flex: 10;
            height: px2rem(2);
            background-color: white;
          }

          .ebook-loading-mask {
            flex: 0;
            height: px2rem(2);
          }
        }
      }

      .ebook-loading-center {
        position: absolute;
        left: 50%;
        top: 0;
        width: px2rem(2);
        background-color: white;
        height: 100%;
      }
    }
  }
</style>
