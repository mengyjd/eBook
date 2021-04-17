<template>
  <div class="book-info-wrapper">
    <div class="blur-bg" :style="{backgroundImage: `url('${cover}')`}"></div>
    <div class="book-info">
      <div class="img-wrapper">
        <img class="img" :src="cover" alt="">
      </div>
      <div class="text-wrapper">
        <div class="text">{{fileName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cover: {
        type: String,
        default: ''
      },
      fileName: String
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .book-info-wrapper {
    position: relative;
    .blur-bg {
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      filter: blur(25px);
    }
    padding: px2rem(10) px2rem(15);
    .book-info {
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img-wrapper {
        margin-top: 20px;
        .img {
          width: px2rem(180);
          height: px2rem(220);
        }
      }
      .text-wrapper {
        margin-top: 20px;
        font-size: px2rem(16);
        .text {
          margin-bottom: px2rem(10);
          word-break:break-all;
          font-weight: bold;
          color: #409eff;
          &:first-child {
            font-size: px2rem(22);
          }
          &:nth-child(2) {
            color: #4aabff;
          }
        }
      }
    }
  }
</style>
