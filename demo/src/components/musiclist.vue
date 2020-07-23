<template>
  <div class="list">

    <div class="scrollBox" @scroll="scroll" ref="scrollBox">
      <ul ref="scrollIn">
        <li v-for="list in lists" :data-id="list.id" @click="changemusic(list.id)">{{list.title}}</li>
      </ul>
    </div>

    <div class="close" @click="close">
      关闭
    </div>

  </div>


</template>
<script>
  // 定义当前页面全局变量 
  let boxH = 0;
  let allH = 0;
  let timer = null;
  export default {
    name: "list",
    props: ["musicList"],
    data: function () {
      return {
        lists: [],
        pagenum: 1,
        pagesize: 3
      }
    },
    mounted() {
      console.log("获取歌曲列表==》》》》", this.musicList)

      this.lists = this.musicList;
      this.$nextTick(function () {
        // 在下次dom节点更新后执行 上面数据改变后 dom 没有立即更新
        //console.log("获取滚动容器的高度==》", this.$refs.scrollBox.offsetHeight);
        boxH = this.$refs.scrollBox.offsetHeight;
        allH = this.$refs.scrollIn.offsetHeight;
      })

    },
    methods: {

      scroll(e) {
        // 滚动时间
        // this.$refs.scrollBox.scrollTop 滚动高度
        let scrTop = this.$refs.scrollBox.scrollTop;
        if (scrTop >= (allH - boxH - 5)) {
          //console.log("滚动到底了！！");
          // 防抖
          clearInterval(timer);
          timer = setTimeout(() => {
            //执行代码处
            this.$emit("addlist");
            console.log("请求数据2333");
          }, 500)
        }
        //console.log("获取滚动元素==》", this.$refs.scrollBox.scrollTop);

      },
      changemusic(msg) {
        //console.log("获取当前歌曲Id==>", msg);
        // 当前歌曲后台传递Id为 msg
        this.$emit("handchange", msg);
      },
      close() {
        console.log("关闭歌曲列表");
        this.$emit("close");
      }
    }
  }
</script>
<style>
  .list {
    position: fixed;
    left: 1%;
    bottom: 1vh;
    background: rgba(255, 255, 255, .9);
    width: 98%;
    z-index: 999;
    border-radius: 1vw;
    line-height: 5vh;

  }

  .scrollBox {
    width: 100%;
    max-height: 17vh;
    overflow-y: auto;
  }

  ul {
    box-sizing: border-box;
    line-height: 5vh;
    padding: 0 15px 15px;
  }

  ul li {
    border-bottom: 1px dashed #ccc;
    list-style: none;
  }

  .close {
    border-top: 1px solid #ccc;
  }
</style>