<template>
  <div class="book-info-wrapper">
    <div class="book-info">
      <div class="img-wrapper">
        <img class="img" :src="cover" alt="">
      </div>
      <div class="text-wrapper">
        <div class="text">{{fileName}}</div>
        <div class="text">{{author}}</div>
        <div class="text">{{desc}}</div>
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
      fileName: String,
      author: String,
      desc: String
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .book-info-wrapper {
    padding: px2rem(10) px2rem(15);
    border-bottom: 1px solid #eee;
    .book-info {
      display: flex;
      .img-wrapper {
        .img {
          width: px2rem(110);
        }
      }
      .text-wrapper {
        margin-left: px2rem(10);
        font-size: px2rem(16);
        .text {
          margin-bottom: px2rem(10);
          word-break:break-all;
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
