<template>
  <transition name="fade">
    <div class="popup-wrapper"
         v-show="popupVisible"
         @click.self="hide">
      <transition name="slide-up">
        <div class="popup-content" v-show="popupVisible">
          <span class="title item"
                v-if="title && title.length > 0">{{ title }}</span>
          <span class="popup-btn item"
                :class="{'danger-btn': btn.type === 'danger'}"
                v-for="(btn, index) in btns" :key="index"
                @click.stop="btn.click">{{ btn.text }}</span>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'popup',
    props: {
      title: String,
      btns: Array
    },
    data () {
      return {
        popupVisible: true
      }
    },
    methods: {
      hide () {
        this.popupVisible = false
      },
      show () {
        this.popupVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .popup-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1000;

    .popup-content {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      z-index: 1100;

      .title {
        font-size: px2rem(12);
        line-height: 1.3;
        color: #999;
        height: px2rem(45);
        text-align: center;
      }

      .popup-btn {
        font-size: px2rem(16);
        font-weight: bold;
        color: #666;
        height: px2rem(60);
        border-top: 1px solid #eee;
        &.danger-btn {
          color: #ff669f
        }
      }

      .item {
        @include center;
      }
    }
  }
</style>
