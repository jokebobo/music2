<template>
  <div class="record_box">
    <div :class="['record',isStop?'stop':'']" @click="change">
      <img :src="fm" alt="">
      <div class="record_bg"></div>
    </div>
    <div class="btn" v-show="isStop"></div>
  </div>
</template>
<style lang="less">
  .record_box {
    position: relative;
    height: 42vh;

    &::before {
      content: "";
      display: block;
      width: 30vw;
      height: 30vw;
      position: absolute;
      background-image: url("../assets/imgs/needle.png");
      background-size: contain;
      background-repeat: no-repeat;
      left: 45%;
      z-index: 100;
    }

    .record {
      width: 60vw;
      height: 60vw;
      position: relative;
      z-index: 20;
      margin: auto;
      top: 15vw;
      animation: rotateMove 4s linear infinite;

      img {
        position: absolute;
        width: 80%;
        height: auto;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .record_bg {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        background-image: url("../assets/imgs/circle.png");
        background-position: center center;
        background-size: contain;
      }
    }

    .stop {
      animation-play-state: paused;
    }

    .btn {
      position: absolute;
      z-index: 120;
      width: 15vw;
      height: 15vw;
      left: 50%;
      top: 37vw;
      transform: translate(-50%, 0);
      background: url('../assets/imgs/play_btn.png') no-repeat center center;
      background-size: contain;
    }

    @keyframes rotateMove {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
<script>
  export default {
    name: 'record',
    props: ["isStop", "actmusic"],
    data: function () {
      return {

      }
    },
    computed: {
      fm: function () {
        // 封面
        return this.actmusic != null ? this.actmusic.img : '';
      }
    },
    created() {
      //修改封面图
      // this.$nextTick(function () {
      //   this.fm = this.actmusic.img;
      // })
      // this.fm = this.actmusic.img;
    },
    beforeUpdated() {
      // console.log("组件更新状态之前");
    },
    updated() {
      // console.log("==组件更新状态之后==");
      // console.log("获取当前歌曲信息==>", this.actmusic);
    },
    methods: {
      change() {
        // console.log("点击播放切换");
        //修改当前组件样式 触发父级组件事件
        this.$emit("stop")
      }
    }
  }
</script>