<template>
    <div class="ebook-footer">
      <span class="current-time">{{currentTime}}</span>
      <span class="footer-progress-text">{{bookAvailable ? `${progress}%` : `${$t('book.loading')}`}}</span>
    </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin],
    data () {
      return {
        currentTime: ''
      }
    },
    mounted () {
      const date = new Date()
      this.currentTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      this.timeTask = setInterval(() => {
        this.currentTime = `${date.getHours()}:${date.getMinutes()}`
      }, 1000 * 60)
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/styles/global";
  .ebook-footer {
    width: 100%;
    height: 35px;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    background-color: transparent;
    box-sizing: border-box;
    font-size: px2rem(11);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
