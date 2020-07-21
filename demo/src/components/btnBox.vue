<template>
  <div class='bot_btn_box'>
    
    <!-- 上一首 -->
    <span class='icon_prev iconfont' @click="prev"></span>
    <span :class='(isStop?"icon_play":"icon_stop")+" iconfont"' @click='change'></span>
    <!-- 下一首 -->
    <span class='icon_next iconfont' @click='next'></span>
    <img :src="isrepeat?repIcon1:repIcon" class="rep_icon" @click="repeatChg">
    <img src="../assets/det_icon.png" class="det_icon" @click="showList">
  </div>
</template>
<style>
  @import '../less/icon.less';
</style>
<style lang="less">
  .bot_btn_box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 200;
    text-align: center;
    color: #fff;

    span:nth-child(2) {
      font-weight: 600;
    }

    span {
      font-size: 40px;
      margin: 0 5vw;

    }

    .rep_icon,.det_icon {
      width: 7vw;
      position: absolute;
      top: 50%;
      transform:translateY(-50%);
      -webkit-transform:translateY(-50%);
    }
    .rep_icon{
      left:5vw;
    }
    .det_icon{
      right:5vw;
    }
  }
</style>
<script>
  import bus from '../utils/event-bus.js';
  export default {
    name: 'btnBox',
    props: ["isStop", "actId"],
    data: function () {
      return {
        // activeId:this.actId
        isrepeat:false,
        repIcon:require('../assets/rep_icon.png'),
        repIcon1:require('../assets/rep_icon1.png')
      }
    },
    methods: {
      repeatChg(){
        // 切换当前播放模式
        this.isrepeat=!this.isrepeat;
        bus.$emit("changeRpt",this.isrepeat);
      },
      prev() {
        // 上一首 请求接口传递参数
        console.log("切换上一首");
        this.$emit("toprev");

      },
      change() {
        //播放 暂停切换 触发父级组件事件
        this.$emit("stop");
      },
      next() {
        // 下一首 请求接口传递参数
        console.log("切换下一首");
        this.$emit("tonext");
      },
      showList(){
        console.log("显示歌单2333");
        this.$emit("showmusic");
      }
    },
    created() {
      console.log("获取当前歌曲的Id==>", this.actId);
    },
    mounted() {
      console.log("组件挂载到页面上");
      bus.$emit("changeRpt",this.isrepeat);
    }
  }
</script>