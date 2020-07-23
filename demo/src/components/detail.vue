<template>
  <div :style="{background:backUrl}">
    <!-- 歌曲封面 -->
    <record :isStop="isStop" :actmusic="actmusic" @stop="stop"></record>
    <!-- 歌词部分 -->
    <lyric :actmusic="actmusic" :currentTime="currentTime"></lyric>
    <div class="jdBar" ref="jdBar">
      <div class="jdIn" :style="{width:jdNum}">
        <span @touchstart="isbig =! isbig" @touchmove="dragmove" @touchend="isbig=!isbig"
          :style="{transform:`scale(${isbig?1.2:1})`}"></span>
      </div>
    </div>
    <!-- 切换按钮 -->
    <btnBox :isStop="isStop" @stop="stop" :actId="id" @tonext="tonext" @toprev="toprev" @showmusic="showmusic"></btnBox>
    <list :musicList="musicList" v-if="isload" @close="close" @handchange="chgMusic($event)" @addlist="addlist"></list>
    <audio :src="actmusic!=null?actmusic.music:''" @canplay="getDuration" ref="audio"></audio>
  </div>
</template>
<style lang="less">
  .jdBar {
    width: 100%;
    height: 1vh;
    background: rgba(0, 0, 0, .7);
    position: fixed;
    left: 0;
    bottom: 10vh;

    .jdIn {
      height: 1vh;
      background: #fff;
      border-radius: 0 0.5vh 0.5vh 0;
      position: relative;
    }

    span {
      width: 1.5vh;
      height: 1.5vh;
      background: skyblue;
      border-radius: 0.75vh;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -0.75vh;
    }

  }
</style>
<script>
  import record from '../components/record';
  import btnBox from '../components/btnBox';
  import lyric from '../components/lyric';
  import list from '../components/musiclist';
  import bus from '../utils/event-bus.js'

  //import helloWorld from './HelloWorld';
  //import lyric2 from './lyric2';
  let timer = null;
  export default {
    name: 'detail',
    data: function () {
      return {
        isStop: true,
        id: 1,
        backUrl: "url()",
        isshow: false,
        currentTime: 0,
        timeall: 0,
        isbig: false,
        musicList: [],
        isload: false,
        pagesize: 3,
        pagenum: 0,
        choseId: 0,
        actmusic: null
      }
    },
    components: {
      lyric,
      record,
      btnBox,
      list
    },
    computed: {
      jdNum: function () {

        let timeall = this.timeall;
        //console.log("===>", timeall);
        return this.currentTime / timeall * 100 + "%";
      }
    },
    methods: {
      addlist() {
        // 监听歌曲列表滚动到底

        //console.log("test");
        this.pagenum += 1;
        let pagenum = this.pagenum;
        let pagesize = this.pagesize;
        let musicList = this.musicList;
        // 请求歌曲列表 
        this.get('/music', { pagenum, pagesize, all: 1 }).then((res) => {
          console.log("获取当前歌曲列表==》", res);
          musicList.push(...res.data);
          this.musicList = musicList;
        })
        console.log("test", this.pagenum);
      },
      initMusic(id) {
        // 封装切换音乐代码
        this.id = id;
        this.isshow = false;
        let isStop = this.isStop;
        //切换歌曲
        this.changeMusic(id).then(() => {

          if (!isStop) {
            // 播放状态
            // 切换歌曲之后 需要重新触发播放
            this.$refs.audio.play();
            // 开启定时器 获取当前播放时间
            clearInterval(timer);
            this.update();
          } else {
            // 暂停状态下切换 初始化
            this.currentTime = 0
          }
        })
      },
      chgMusic(msg) {
        // 手动选择歌曲
        //console.log("获取事件参数==>", msg);
        let id = msg;
        console.log("获取选中下标==》", id);
        this.isload = false;
        this.initMusic(id);
      },
      close() {
        this.isload = false;
      },
      showmusic() {
        console.log("显示歌单666");
        this.isload = !this.isload;
      },
      dragmove(e) {
        //通过拖动进度条 改变当前时间=>改变 计算属性
        let handX = e.changedTouches[0].clientX;
        let parW = this.$refs.jdBar.offsetWidth;
        let timeall = this.timeall;
        this.currentTime = handX / parW * this.timeall;
        this.$refs.audio.currentTime = handX / parW * this.timeall;
      },

      getDuration() {
        console.log("获取音频时长==》", this.$refs.audio.duration);
        this.timeall = this.$refs.audio.duration;
      },
      stop() {
        // 改变两处按钮状态
        this.isStop = !this.isStop;
        let isStop = this.isStop;

        if (isStop) {
          // 暂停
          console.log("当前播放状态为==>", isStop);
          // this.$refs.audio获取当前audio实例
          this.$refs.audio.pause();
          //清除定时器
          clearInterval(timer);
        } else {
          // 播放
          console.log("当前播放状态为==>", isStop);
          this.$refs.audio.play();
          // 开启定时器 获取当前播放时间
          this.update();
        }
      },
      update() {

        const that = this;
        console.log(that.$refs.audio);
        timer = setInterval(() => {
          //console.log("当前播放时间", that.$refs.audio.currentTime);
          let currentTime = that.$refs.audio.currentTime
          that.currentTime = currentTime;
          if (currentTime >= that.timeall) {
            // 这一首播放结束自动到下一首
            console.log("当前曲目结束！！！");
            if (!this.isrepeat) {
              // 歌单循环
              clearInterval(timer);
              this.tonext();
            } else {
              // 当前单曲循环
              this.currentTime = 0;
              this.$refs.audio.play();
            }
          }
          //console.log("====", that.$refs.audio.currentTime)
        }, 10)
      },
      tonext() {
        // 下一首
        let id = this.id;
        id += 1;
        if (id > 3) {
          id = 1
        }
        console.log("当前Id为==>", id)
        this.initMusic(id);


      },
      toprev() {
        // 上一首
        let id = this.id;
        id -= 1;
        if (id < 1) {
          id = 3
        }
        console.log("当前Id为222==>", id)
        this.initMusic(id);
      },
      changeMusic(id) {
        //切换歌曲
        return new Promise((resolve, reject) => {

          console.log("切换歌曲啦 ==>当前播放状态", this.isStop);
          //每次切换会请求

          this.get('/music', { id }).then((res) => {
            console.log("获取当前对应数据==>", res);
            let data = res.data[0];
            this.actmusic = data;

            //this.isshow = true;
            this.backUrl = `url(${data.bg})`
            resolve()

            // this.update();
          }).catch((error) => {
            console.log(error)
            reject();
          })
        })

      }
    },

    created() {
      console.log("组件实例创建");
      console.log("获取audio==>", this.actmusic);
      this.get('/test').then((res) => {
        console.log("获取数据", res);
        alert("获取数据" + res);
      }).catch((error) => {
        console.log("报错==>", error)
        alert("报错==》" + error);
      })
      let id = this.id;
      this.changeMusic(id)
      let { pagesize, pagenum } = this;
      console.log("获取当前页码", pagenum, pagesize);

      this.get('/music', { pagesize, pagenum, all: 1 }).then((res) => {
        console.log("获取当前页数据===>>>>>", res.data)
        this.musicList = res.data;

      })
    },
    mounted() {
      console.log("组件挂载到页面上");
      // 监听当前播放模式
      bus.$on('changeRpt', (e) => {
        console.log("切换播放模式==>", e);
        this.isrepeat = e;
      })
    }
  }
</script>