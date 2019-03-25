<template>
  <div class="login-wrapper">
    <!--返回按钮-->
    <span class="icon-back_cycle icon"
          @click="back"></span>
    <!--回到书架按钮-->
    <span class="icon-shelf icon"
          @click="showShelf"></span>

    <div class="content">
      <slot></slot>
    </div>
    <!--进入注册或登录页-->
    <span class="bottom-text"
          @click="toggleRouter">{{ bottomText }}</span>
  </div>
</template>

<script>
  import { gotoShelf } from '../../utils/routerSkip'

  export default {
    props: {
      bottomText: String
    },
    methods: {
      toggleRouter () {
        this.$emit('toggleRouter')
      },
      back () {
        this.$emit('back')
      },
      showShelf () {
        gotoShelf(this)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .login-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    @include center;
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

    .icon {
      position: absolute;
      font-size: px2rem(20);
      color: #fff;
      top: px2rem(10);
    }
    .icon-back_cycle {
      left: px2rem(10);
    }
    .icon-shelf {
      right: px2rem(10);
    }

    .content {
      width: 100%;
      display: flex;
      @include center;
      flex-direction: column;
    }

    .bottom-text {
      position: absolute;
      right: 15px;
      bottom: 15px;
      font-size: px2rem(12);
      color: #fff;
    }
  }
</style>
