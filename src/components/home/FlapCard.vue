<template>
  <div class="flap-card-wrapper"
       v-show="flapCardVisible">
    <!--加载动画-->
    <div class="flap-card-bg"
         :class="{'animation': runFlapCardAnimation}"
    >
      <div class="flap-card"
           v-for="(item, index) in flapCardList"
           :key="index"
      >
        <div class="flap-cared-circle">
          <div class="semi-circle semi-circle-left"
               :style="semiCircleStyle(item, 'imgLeft')"
               ref="left"
          ></div>
          <div class="semi-circle semi-circle-right"
               :style="semiCircleStyle(item, 'imgRight')"
               ref="right"
          ></div>
        </div>
      </div>
    </div>
    <!--烟花动画-->
    <div class="point-wrapper">
      <div class="point"
           v-for="item in pointList" :key="item"
           :class="{'animation': runPointAnimation}"
      ></div>
    </div>
    <!--关闭按钮-->
    <div class="flap-card-close">
      <div class="icon-close-wrapper"
           @click="closeFlapCard"
      >
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  import { flapCardList } from '../../utils/store'

  export default {
    mixins: [storeHomeMixin],
    props: {
      randomBook: Object
    },
    data () {
      return {
        flapCardList,
        front: 0,
        back: 1,
        animationTime: 25, // 卡片每一次翻转间隔时间
        runFlapCardAnimation: false, // 卡片翻转动画
        runPointAnimation: false, // 烟花动画
        pointList: null
      }
    },
    watch: {
      flapCardVisible(v) {
        if (v) {
          this.runAnimation()
        }
      },
      randomBook() {
        console.log(this.randomBook)
      }
    },
    created() {
      // 创建一个数组,用于在v-for循环中生成烟花动画所需dom
      this.pointList = []
      for (let i = 0; i < 18; i++) {
        this.pointList.push(`point${i}`)
      }
    },
    methods: {
      // 关闭随机推荐卡片
      closeFlapCard () {
        this.setFlapCardVisible(false)
        this.stopAnimation()
      },
      semiCircleStyle (item, direction) {
        return {
          backgroundImage: item[direction],
          backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
          zIndex: item.zIndex
        }
      },
      // 执行卡片翻转的操作
      rotate(index, type) {
        const item = this.flapCardList[index]
        let dom
        if (type === 'front') {
          dom = this.$refs.right[index]
        } else {
          dom = this.$refs.left[index]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`
        dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
      },
      // 计算卡片翻转的参数
      flapCardRotate() {
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree += 10
        frontFlapCard._g -= 5
        backFlapCard.rotateDegree -= 10
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5
        }
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        // 当一张图片转动完成后切换到下一组
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next()
        }
      },
      // 先将左侧的卡片翻转180度
      prepare() {
        const backFlapCard = this.flapCardList[this.back]
        backFlapCard.rotateDegree = 180
        backFlapCard._g = backFlapCard.g - 5 * 9
        this.rotate(this.back, 'back')
      },
      // 下一张卡片
      next() {
        // 在进行下一组旋转之前
        // 对上一组的图片进行还原操作
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree = 0
        backFlapCard.rotateDegree = 0
        frontFlapCard._g = frontFlapCard.g
        backFlapCard._g = backFlapCard.g
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        // 指向下一组图片
        this.front++
        this.back++
        const len = this.flapCardList.length
        if (this.front >= len) {
          this.front = 0
        }
        if (this.back >= len) {
          this.back = 0
        }
        // 动态设置zIndex
        // 100 => 96
        // 99 => 100
        // 98 => 99
        // 97 => 96
        // 96 => 97
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.front + len) % len)
        })
        this.prepare()
      },
      // 将每个卡片重置为初始状态
      reset() {
        this.front = 0
        this.back = 1
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - index
          item.rotateDegree = 0
          item._g = item.g
          this.rotate(index, 'front')
          this.rotate(index, 'back')
        })
      },
      // 启动卡片翻转动画
      startFlapCardAnimation() {
        this.prepare()
        // 25毫秒翻转一次卡片
        this.flapCardAnimationTimer = setInterval(() => {
          this.flapCardRotate()
        }, 25)
        setTimeout(() => {
          this.runFlapCardAnimation = false
        }, 2500)
      },
      // 停止卡片翻转动画
      stopAnimation() {
        if (this.flapCardAnimationTimer) {
          clearInterval(this.flapCardAnimationTimer)
        }
        this.reset()
      },
      // 开始烟花动画
      startRunPointAnimation() {
        this.runPointAnimation = true
        // 750ms后停止烟花动画
        setTimeout(() => {
          this.runPointAnimation = false
        }, 750)
      },
      // 开始播放动画
      runAnimation() {
        // 启动登场动画
        this.runFlapCardAnimation = true
        // 登场动画完成后再启动卡片翻转和烟花动画
        setTimeout(() => {
          this.startFlapCardAnimation()
          this.startRunPointAnimation()
        }, this.animationTime)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/flapCard";

  .flap-card-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    @include center;

    .point-wrapper {
      width: px2rem(64);
      height: px2rem(64);
      @include absCenter;
      z-index: 1500;
      .point {
        border-radius: 50%;
        @include absCenter;
        &.animation {
          @for $i from 1 to length($moves) {
            &:nth-child(#{$i}) {
              @include move($i)
            }
          }
        }
      }
    }

    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      background-color: #fff;
      border-radius: px2rem(5);
      @include center;
      &.animation {
        animation: flap-card-move $animationTime ease-in;
      }
      /*登场动画*/
      @keyframes flap-card-move {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.3);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      .flap-card {
        position: absolute;
        width: px2rem(45);
        height: px2rem(45);

        .flap-cared-circle {
          display: flex;
          width: 100%;
          height: 100%;
          .semi-circle {
            flex: 0 0 50%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: 50% 50%;
            backface-visibility: hidden;
          }
          .semi-circle-left {
            background-position: right center;
            border-radius: px2rem(24) 0 0 px2rem(24);
            transform-origin: right;
          }
          .semi-circle-right {
            background-position: left center;
            border-radius: 0 px2rem(24) px2rem(24) 0;
            transform-origin: left;
          }
        }
      }
    }

    .flap-card-close {
      position: absolute;
      bottom: px2rem(30);
      width: 100%;
      @include center;

      .icon-close-wrapper {
        @include center;
        width: px2rem(45);
        height: px2rem(45);
        z-index: 1100;
        border-radius: 50%;
        background-color: #333333;

        .icon-close {
          font-size: px2rem(30);
          color: #fff;
        }
      }
    }
  }
</style>
