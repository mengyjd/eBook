<template>
  <transition name="fade">
    <div class="dialog-bg-wrapper" v-show="visible">
      <div class="dialog-wrapper">
        <div class="dialog-title-wrapper">
          <span class="title-text">{{ title }}</span>
        </div>
        <div class="dialog-content">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <slot name="btn">
            <div class="btn-wrapper">
              <div class="btn btn-cancel" @click="hide">{{ $t('shelf.cancel') }}</div>
              <div class="btn btn-confirm">{{ $t('shelf.confirm') }}</div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: String
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .dialog-bg-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .2);
    @include center;

    .dialog-wrapper {
      width: 60%;
      max-height: 60%;
      background: #fff;
      border-radius: px2rem(10) px2rem(10);

      .dialog-title-wrapper {
        @include center;
        padding: px2rem(15) 0;
        font-size: px2rem(20);
        font-weight: bold;
      }

      .dialog-footer {
        width: 100%;
        display: flex;
        font-size: px2rem(16);
        height: px2rem(45);
        background: #4aabff;
        border-radius: 0 0 10px 10px;

        .btn-wrapper {
          width: 100%;
          display: flex;

          .btn {
            flex-grow: 1;
            font-weight: bold;
            color: #fff;
            @include center;
          }

          .btn-confirm {

          }
        }
      }
    }
  }
</style>
