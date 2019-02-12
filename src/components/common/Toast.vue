<template>
  <transition name="fade">
    <div class="toast-wrapper"
         v-show="isShow"
         ref="toast">
      <div class="toast-text" v-html="showText"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'toast',
    props: {
      text: [String, Number],
      timeout: {
        default: 1500,
        type: Number
      }
    },
    data () {
      return {
        isShow: false,
        showText: ''
      }
    },
    methods: {
      show () {
        this.updateText(this.text)
        this.isShow = true
        clearTimeout(this.task)
        this.task = null
        this.task = setTimeout(() => {
          this.hide()
        }, this.timeout)
      },
      hide () {
        this.isShow = false
      },
      continueShow() {
        this.show()
        clearTimeout(this.task)
        this.task = null
      },
      updateText(newText) {
        this.showText = newText
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .toast-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 60%;
    transform: translate(-50%, -50%);
    font-size: px2rem(14);
    z-index: 1000;
    background-color: #cccccc;
    color: #fff;
    border-radius: px2rem(7);
    padding: px2rem(10) px2rem(20);
    box-sizing: border-box;
    line-height: px2rem(18);

    .toast-text {
      text-align: center;
      width: 100%;
      word-break: break-all;
    }
  }
</style>
