<template>
  <div class="ebook-header">
    <div class="header-text"
          ref="headerText"
    >
      {{getSectionName}}
    </div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin]
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-header {
    width: 100%;
    height: 35px;
    position: absolute;
    top: 0;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 1;
    font-size: px2rem(11);
    display: flex;
    align-items: center;
    background-color: transparent;
    .header-text {
      @include ellipsis;
      line-height: px2rem(18);
    }
  }
</style>
